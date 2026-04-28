'use client';

import { useEffect, useMemo, useRef } from 'react';
import { buildCalendlyUrl, CALENDLY_URL_15MIN } from '@/lib/calendly';

type CalendlyEmbedProps = {
  url?: string;
  utmCampaign?: string;
  title?: string;
  minHeight?: number;
};

export function CalendlyEmbed({
  url,
  utmCampaign,
  title = 'Schedule a consultation with Dr. Jan Duffy',
  minHeight = 700,
}: CalendlyEmbedProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const resolvedUrl = useMemo(
    () =>
      buildCalendlyUrl(url ?? CALENDLY_URL_15MIN, {
        utm_campaign: utmCampaign,
      }),
    [url, utmCampaign]
  );

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    let cancelled = false;
    let tries = 0;
    const maxTries = 200;
    const intervalId = window.setInterval(() => {
      tries += 1;
      const Calendly = (
        window as Window & {
          Calendly?: {
            initInlineWidget: (opts: {
              url: string;
              parentElement: HTMLElement;
            }) => void;
          };
        }
      ).Calendly;

      if (!Calendly) {
        if (tries >= maxTries) window.clearInterval(intervalId);
        return;
      }

      window.clearInterval(intervalId);
      if (cancelled || !parentRef.current) return;
      parentRef.current.innerHTML = '';
      Calendly.initInlineWidget({
        url: resolvedUrl,
        parentElement: parentRef.current,
      });
    }, 100);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      if (parentRef.current) parentRef.current.innerHTML = '';
    };
  }, [resolvedUrl]);

  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-[rgba(212,168,67,0.25)] bg-white shadow-xl"
      aria-label={title}
    >
      <div
        ref={parentRef}
        className="calendly-inline-widget w-full"
        style={{ minWidth: 320, height: minHeight }}
      />
    </div>
  );
}
