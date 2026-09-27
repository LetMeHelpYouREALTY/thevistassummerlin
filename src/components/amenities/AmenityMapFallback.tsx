'use client';

import {
  AMENITY_CATEGORY_LABELS,
  CURATED_NEARBY_PLACES,
  VISTAS_COMMUNITY,
  directionsUrlForPlace,
  getKeylessMapEmbedUrl,
  type AmenityCategoryId,
} from '@/lib/amenities/community-config';

type AmenityMapFallbackProps = {
  activeCategory?: AmenityCategoryId;
  showFullList?: boolean;
  className?: string;
};

export function AmenityMapFallback({
  activeCategory,
  showFullList = true,
  className = '',
}: AmenityMapFallbackProps) {
  const embedUrl = getKeylessMapEmbedUrl();
  const filtered = activeCategory
    ? CURATED_NEARBY_PLACES.filter((p) => p.category === activeCategory)
    : CURATED_NEARBY_PLACES;

  return (
    <div className={className}>
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-inner"
        style={{ minHeight: 420 }}
      >
        <iframe
          title={`Map of ${VISTAS_COMMUNITY.name} and nearby amenities`}
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      {showFullList && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Featured places near {VISTAS_COMMUNITY.shortName}
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {filtered.map((place) => (
              <li
                key={place.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <p className="font-medium text-gray-900">{place.name}</p>
                <p className="text-sm text-gray-600 mt-1">{place.address}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {AMENITY_CATEGORY_LABELS[place.category]}
                </p>
                <a
                  href={directionsUrlForPlace(place.name, place.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Directions
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
