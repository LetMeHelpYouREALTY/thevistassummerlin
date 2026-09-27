'use client';

import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { VISTAS_COMMUNITY } from '@/lib/amenities/community-config';
import { AmenityMap } from './AmenityMap';

type AmenityMapSectionProps = {
  variant?: 'light' | 'dark';
  mapVariant?: 'full' | 'compact';
  className?: string;
};

export function AmenityMapSection({
  variant = 'light',
  mapVariant = 'compact',
  className = '',
}: AmenityMapSectionProps) {
  const isDark = variant === 'dark';

  return (
    <section
      className={`${className} ${isDark ? 'dark-luxury-bg' : 'bg-gray-50'}`}
      aria-labelledby="nearby-amenities-heading"
    >
      <div className="section-shell py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-4 ${
                isDark
                  ? 'bg-white/10 text-blue-100 border border-white/20'
                  : 'bg-blue-50 text-blue-800 border border-blue-100'
              }`}
            >
              <MapPin className="w-4 h-4" aria-hidden />
              <span>What&apos;s nearby</span>
            </div>
            <h2
              id="nearby-amenities-heading"
              className={`text-3xl lg:text-4xl font-bold mb-4 ${
                isDark ? 'text-[#f0eaff]' : 'text-gray-900'
              }`}
            >
              Life near {VISTAS_COMMUNITY.shortName}
            </h2>
            <p className={isDark ? 'text-[#9b8ecf] text-lg' : 'text-gray-600 text-lg'}>
              Explore dining, grocery, parks, golf, healthcare, and schools around{' '}
              {VISTAS_COMMUNITY.regionLabel}. Filter the map, then dive into the full amenities
              guide.
            </p>
          </div>
          <Link
            href="/amenities"
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              isDark ? 'btn-primary' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Nearby amenities guide
            <ArrowRight className="w-5 h-5" aria-hidden />
          </Link>
        </div>
        <AmenityMap variant={mapVariant} />
      </div>
    </section>
  );
}
