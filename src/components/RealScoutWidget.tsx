'use client';
import { useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Buffer } from 'buffer';
import {
  getOfficeListingsPriceBand,
  OFFICE_LISTINGS_USD_MAX,
  OFFICE_LISTINGS_USD_MIN,
} from '@/lib/realscout-office-listings-band';

// The script is now loaded globally in app/layout.tsx
// const REALSCOUT_SCRIPT_SRC = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
const AGENT_ID = process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID;

interface Property {
  id: string;
  latitude: number;
  longitude: number;
  price: string;
  address: string;
}

interface RealScoutWidgetProps {
  'listing-status'?: string;
  'property-types'?: string;
  'price-min'?: string;
  'price-max'?: string;
  'beds-min'?: string;
  'baths-min'?: string;
  'geo-bounds-json'?: string;
  'sort-order'?: string;
  onListingsLoaded?: (properties: Property[]) => void;
}

function clampUsd(n: number): number {
  return Math.min(OFFICE_LISTINGS_USD_MAX, Math.max(OFFICE_LISTINGS_USD_MIN, n));
}

export function RealScoutWidget(props: RealScoutWidgetProps) {
  const widgetRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname() ?? '/';
  const band = useMemo(() => getOfficeListingsPriceBand(pathname), [pathname]);
  const { onListingsLoaded, ...widgetProps } = props;
  const agentEncodedId = AGENT_ID ? Buffer.from(`Agent-${AGENT_ID}`).toString('base64') : null;

  useEffect(() => {
    const currentWidget = widgetRef.current;
    
    const handleListingsLoaded = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (onListingsLoaded && customEvent.detail?.listings) {
        onListingsLoaded(customEvent.detail.listings);
      }
    };
    currentWidget?.addEventListener('rs:listings-loaded', handleListingsLoaded);

    return () => {
      currentWidget?.removeEventListener('rs:listings-loaded', handleListingsLoaded);
    };
  }, [onListingsLoaded]);

  if (!agentEncodedId) {
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded-lg text-center">
        Property search is temporarily unavailable. Missing Agent ID.
      </div>
    );
  }

  const fromMin = widgetProps['price-min']
    ? clampUsd(parseInt(widgetProps['price-min'], 10) || OFFICE_LISTINGS_USD_MIN)
    : parseInt(band.priceMin, 10);
  const fromMax = widgetProps['price-max']
    ? clampUsd(parseInt(widgetProps['price-max'], 10) || OFFICE_LISTINGS_USD_MAX)
    : parseInt(band.priceMax, 10);
  let lo = fromMin;
  let hi = fromMax;
  if (hi < lo) {
    [lo, hi] = [hi, lo];
  }

  const finalWidgetProps = {
    'agent-encoded-id': agentEncodedId,
    'sort-order': 'STATUS_AND_SIGNIFICANT_CHANGE',
    ...widgetProps,
    'price-min': String(lo),
    'price-max': String(hi),
  };

  return (
    <div className="w-full" style={{ minHeight: 800 }}>
      {/* We attach the ref directly to the custom element */}
      <realscout-office-listings ref={widgetRef} {...finalWidgetProps} />
    </div>
  );
} 