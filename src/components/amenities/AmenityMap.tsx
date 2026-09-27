'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  AMENITY_CATEGORY_LABELS,
  AMENITY_CATEGORY_ORDER,
  CATEGORY_PLACE_TYPES,
  VISTAS_COMMUNITY,
  directionsUrlForPlace,
  type AmenityCategoryId,
} from '@/lib/amenities/community-config';
import { AmenityMapFallback } from './AmenityMapFallback';

type AmenityMapProps = {
  /** Compact mode hides category chips on small sections */
  variant?: 'full' | 'compact';
  initialCategory?: AmenityCategoryId;
  className?: string;
  /** Reserve height for CLS */
  mapHeight?: number;
};

type PlaceResult = {
  id: string;
  name: string;
  address: string;
  rating?: number;
  lat: number;
  lng: number;
  mapsUrl: string;
};

const MAP_SCRIPT_ID = 'vistas-google-maps-js';

function loadMapsScript(apiKey: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('window unavailable'));
  }
  if (window.google?.maps) {
    return Promise.resolve();
  }
  const existing = document.getElementById(MAP_SCRIPT_ID);
  if (existing) {
    return new Promise((resolve, reject) => {
      const check = () => {
        if (window.google?.maps) resolve();
        else setTimeout(check, 50);
      };
      check();
      setTimeout(() => reject(new Error('Maps script timeout')), 15000);
    });
  }

  return new Promise((resolve, reject) => {
    window.__vistasAmenityMapsReady = () => {
      resolve();
    };
    const script = document.createElement('script');
    script.id = MAP_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&loading=async&callback=__vistasAmenityMapsReady`;
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
    setTimeout(() => reject(new Error('Maps script timeout')), 20000);
  });
}

function buildInfoContent(place: PlaceResult): string {
  const rating =
    place.rating != null
      ? `<p class="text-sm text-gray-600 mt-1">Rating: ${place.rating.toFixed(1)}</p>`
      : '';
  return `<div class="p-1 max-w-[240px]">
    <p class="font-semibold text-gray-900">${place.name}</p>
    ${rating}
    <p class="text-sm text-gray-600 mt-1">${place.address}</p>
    <a href="${place.mapsUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-blue-600 font-medium mt-2 inline-block">Directions</a>
  </div>`;
}

export function AmenityMap({
  variant = 'full',
  initialCategory = 'restaurants',
  className = '',
  mapHeight = 420,
}: AmenityMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(initialCategory);
  const [useFallback, setUseFallback] = useState(!apiKey);
  const [loading, setLoading] = useState(Boolean(apiKey));
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: '120px',
  });

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const ensureCommunityMarker = useCallback((map: google.maps.Map) => {
    if (communityMarkerRef.current) return;
    const info = new google.maps.InfoWindow({
      content: buildInfoContent({
        id: 'community',
        name: VISTAS_COMMUNITY.markerTitle,
        address: VISTAS_COMMUNITY.markerAddress,
        lat: VISTAS_COMMUNITY.center.lat,
        lng: VISTAS_COMMUNITY.center.lng,
        mapsUrl: directionsUrlForPlace(
          VISTAS_COMMUNITY.markerTitle,
          VISTAS_COMMUNITY.markerAddress
        ),
      }),
    });
    infoWindowRef.current = info;
    const marker = new google.maps.Marker({
      map,
      position: VISTAS_COMMUNITY.center,
      title: VISTAS_COMMUNITY.markerTitle,
      label: { text: '★', color: '#1e3a5f' },
    });
    marker.addListener('click', () => {
      info.open({ map, anchor: marker });
    });
    communityMarkerRef.current = marker;
  }, []);

  const plotPlaces = useCallback(
    (map: google.maps.Map, places: PlaceResult[]) => {
      clearMarkers();
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(VISTAS_COMMUNITY.center);
      const info = infoWindowRef.current ?? new google.maps.InfoWindow();
      infoWindowRef.current = info;

      places.forEach((place) => {
        const marker = new google.maps.Marker({
          map,
          position: { lat: place.lat, lng: place.lng },
          title: place.name,
        });
        marker.addListener('click', () => {
          info.setContent(buildInfoContent(place));
          info.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
        bounds.extend({ lat: place.lat, lng: place.lng });
      });
      if (places.length > 0) {
        map.fitBounds(bounds);
      }
    },
    [clearMarkers]
  );

  const searchNearby = useCallback(
    async (map: google.maps.Map, category: AmenityCategoryId) => {
      const types = CATEGORY_PLACE_TYPES[category];
      setStatusMessage('Loading nearby places…');
      try {
        await google.maps.importLibrary('places');
        const center = new google.maps.LatLng(
          VISTAS_COMMUNITY.center.lat,
          VISTAS_COMMUNITY.center.lng
        );
        const { Place } = google.maps.places;
        const request: google.maps.places.SearchNearbyRequest = {
          fields: ['displayName', 'location', 'formattedAddress', 'rating', 'googleMapsURI'],
          locationRestriction: {
            center,
            radius: VISTAS_COMMUNITY.searchRadiusMeters,
          },
          includedPrimaryTypes: types,
          maxResultCount: 15,
          rankPreference: google.maps.places.SearchNearbyRankPreference.POPULARITY,
        };
        const { places } = await Place.searchNearby(request);
        const results: PlaceResult[] = [];
        for (const place of places) {
          await place.fetchFields({
            fields: ['displayName', 'location', 'formattedAddress', 'rating', 'googleMapsURI'],
          });
          const loc = place.location;
          if (!loc) continue;
          const name = place.displayName ?? 'Place';
          const address = place.formattedAddress ?? '';
          const lat = loc.lat();
          const lng = loc.lng();
          results.push({
            id: `${name}-${lat}-${lng}`,
            name,
            address,
            rating: place.rating,
            lat,
            lng,
            mapsUrl:
              place.googleMapsURI ??
              directionsUrlForPlace(name, address || `${lat},${lng}`),
          });
        }
        plotPlaces(map, results);
        setStatusMessage(
          results.length === 0
            ? 'No results for this filter. Try another category.'
            : null
        );
      } catch {
        setStatusMessage(null);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    },
    [plotPlaces]
  );

  const mapReadyRef = useRef(false);

  const initMap = useCallback(async () => {
    if (!apiKey || !mapContainerRef.current || mapRef.current) return;
    try {
      await loadMapsScript(apiKey);
      const map = new google.maps.Map(mapContainerRef.current, {
        center: VISTAS_COMMUNITY.center,
        zoom: VISTAS_COMMUNITY.defaultZoom,
        mapId: mapId || undefined,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      });
      mapRef.current = map;
      ensureCommunityMarker(map);
      mapReadyRef.current = true;
      await searchNearby(map, activeCategory);
    } catch {
      setUseFallback(true);
      setLoading(false);
    }
  }, [apiKey, mapId, ensureCommunityMarker, searchNearby, activeCategory]);

  useEffect(() => {
    if (!apiKey) {
      setUseFallback(true);
      setLoading(false);
      return;
    }
    if (inView && !mapReadyRef.current) {
      void initMap();
    }
  }, [apiKey, inView, initMap]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || useFallback || !mapReadyRef.current) return;
    setLoading(true);
    void searchNearby(map, activeCategory);
  }, [activeCategory, searchNearby, useFallback]);

  if (useFallback) {
    return (
      <AmenityMapFallback activeCategory={activeCategory} showFullList={variant === 'full'} />
    );
  }

  const chips = variant === 'compact'
    ? AMENITY_CATEGORY_ORDER.slice(0, 6)
    : AMENITY_CATEGORY_ORDER;

  return (
    <div className={className} ref={inViewRef}>
      <div
        role="tablist"
        aria-label="Filter nearby amenities by category"
        className="mb-4 flex flex-wrap gap-2"
      >
        {chips.map((cat) => {
          const selected = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`Show ${AMENITY_CATEGORY_LABELS[cat]} near ${VISTAS_COMMUNITY.shortName}`}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                selected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-800 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {AMENITY_CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 shadow-inner">
        <div
          ref={mapContainerRef}
          role="application"
          aria-label={`Interactive map of amenities near ${VISTAS_COMMUNITY.name}`}
          style={{ minHeight: mapHeight, height: mapHeight }}
          className="w-full bg-gray-100"
        />
        {loading && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/60 text-sm font-medium text-gray-700"
            aria-live="polite"
          >
            Loading map…
          </div>
        )}
      </div>
      {statusMessage && (
        <p className="mt-3 text-sm text-gray-600" aria-live="polite">{statusMessage}</p>
      )}
    </div>
  );
}
