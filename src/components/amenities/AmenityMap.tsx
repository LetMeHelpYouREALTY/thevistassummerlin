'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  AMENITY_CATEGORY_LABELS,
  AMENITY_CATEGORY_ORDER,
  CATEGORY_PLACE_TYPES,
  VISTAS_COMMUNITY,
  curatedPlacesForCategory,
  directionsUrlForPlace,
  type AmenityCategoryId,
  type CuratedPlace,
} from '@/lib/amenities/community-config';
import { loadGoogleMaps, mapsAuthFailed } from '@/lib/amenities/load-google-maps';
import {
  searchCategory,
  type NearbyPlaceResult,
} from '@/lib/amenities/search-category';
import { AmenityMapFallback } from './AmenityMapFallback';

type AmenityMapProps = {
  variant?: 'full' | 'compact';
  initialCategory?: AmenityCategoryId;
  className?: string;
  mapHeight?: number;
};

function buildInfoWindowContent(
  doc: Document,
  place: { name: string; address: string; mapsUrl: string }
): HTMLElement {
  const wrap = doc.createElement('div');
  wrap.className = 'p-1 max-w-[240px]';
  const title = doc.createElement('p');
  title.className = 'font-semibold text-gray-900';
  title.textContent = place.name;
  wrap.appendChild(title);
  if (place.address) {
    const addr = doc.createElement('p');
    addr.className = 'text-sm text-gray-600 mt-1';
    addr.textContent = place.address;
    wrap.appendChild(addr);
  }
  const link = doc.createElement('a');
  link.href = place.mapsUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'text-sm text-blue-600 font-medium mt-2 inline-block';
  link.textContent = 'Directions';
  wrap.appendChild(link);
  return wrap;
}

function curatedToMapResult(place: CuratedPlace): NearbyPlaceResult {
  const lat = place.lat ?? VISTAS_COMMUNITY.center.lat;
  const lng = place.lng ?? VISTAS_COMMUNITY.center.lng;
  return {
    id: place.id,
    name: place.name,
    address: place.address,
    lat,
    lng,
    mapsUrl: directionsUrlForPlace(place.name, place.address),
  };
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
  const [useFallback, setUseFallback] = useState(!apiKey || mapsAuthFailed);
  const [loading, setLoading] = useState(Boolean(apiKey) && !mapsAuthFailed);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [curatedSidebar, setCuratedSidebar] = useState<CuratedPlace[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const mapReadyRef = useRef(false);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: '120px',
  });

  const enterFallback = useCallback(() => {
    mapRef.current = null;
    mapReadyRef.current = false;
    communityMarkerRef.current = null;
    markersRef.current = [];
    setUseFallback(true);
    setLoading(false);
    setStatusMessage(null);
  }, []);

  useEffect(() => {
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    const onAuthFail = () => enterFallback();
    window.addEventListener('gmaps:auth-failure', onAuthFail);
    return () => window.removeEventListener('gmaps:auth-failure', onAuthFail);
  }, [enterFallback]);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const openInfo = useCallback(
    (map: google.maps.Map, marker: google.maps.Marker, place: NearbyPlaceResult) => {
      const info = infoWindowRef.current ?? new google.maps.InfoWindow();
      infoWindowRef.current = info;
      info.setContent(
        buildInfoWindowContent(document, {
          name: place.name,
          address: place.address,
          mapsUrl: place.mapsUrl,
        })
      );
      info.open({ map, anchor: marker });
    },
    []
  );

  const plotPlaces = useCallback(
    (map: google.maps.Map, places: NearbyPlaceResult[]) => {
      clearMarkers();
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(VISTAS_COMMUNITY.center);

      places.forEach((place) => {
        const marker = new google.maps.Marker({
          map,
          position: { lat: place.lat, lng: place.lng },
          title: place.name,
        });
        marker.addListener('click', () => openInfo(map, marker, place));
        markersRef.current.push(marker);
        bounds.extend({ lat: place.lat, lng: place.lng });
      });
      if (places.length > 0) {
        map.fitBounds(bounds);
      }
    },
    [clearMarkers, openInfo]
  );

  const ensureCommunityMarker = useCallback(
    (map: google.maps.Map) => {
      if (communityMarkerRef.current) return;
      const communityPlace: NearbyPlaceResult = {
        id: 'community',
        name: VISTAS_COMMUNITY.markerTitle,
        address: VISTAS_COMMUNITY.markerAddress,
        lat: VISTAS_COMMUNITY.center.lat,
        lng: VISTAS_COMMUNITY.center.lng,
        mapsUrl: directionsUrlForPlace(
          VISTAS_COMMUNITY.markerTitle,
          VISTAS_COMMUNITY.markerAddress
        ),
      };
      const marker = new google.maps.Marker({
        map,
        position: VISTAS_COMMUNITY.center,
        title: VISTAS_COMMUNITY.markerTitle,
        label: { text: '★', color: '#1e3a5f' },
      });
      marker.addListener('click', () => openInfo(map, marker, communityPlace));
      communityMarkerRef.current = marker;
    },
    [openInfo]
  );

  const showCuratedForCategory = useCallback(
    (map: google.maps.Map, category: AmenityCategoryId) => {
      const curated = curatedPlacesForCategory(category);
      setCuratedSidebar(curated);
      if (curated.length > 0) {
        plotPlaces(map, curated.map(curatedToMapResult));
        setStatusMessage(`Showing featured places for ${AMENITY_CATEGORY_LABELS[category]}.`);
      } else {
        plotPlaces(map, []);
        setStatusMessage('No results for this filter. Try another category.');
      }
    },
    [plotPlaces]
  );

  const runCategorySearch = useCallback(
    async (map: google.maps.Map, category: AmenityCategoryId) => {
      if (mapsAuthFailed) {
        enterFallback();
        return;
      }
      setStatusMessage('Loading nearby places…');
      setCuratedSidebar([]);
      const types = CATEGORY_PLACE_TYPES[category];
      try {
        const results = await searchCategory(category, types);
        if (results.length === 0) {
          showCuratedForCategory(map, category);
        } else {
          plotPlaces(map, results);
          setStatusMessage(null);
        }
      } catch {
        showCuratedForCategory(map, category);
      } finally {
        setLoading(false);
      }
    },
    [enterFallback, plotPlaces, showCuratedForCategory]
  );

  const initMap = useCallback(async () => {
    if (!apiKey || mapsAuthFailed || !mapContainerRef.current || mapRef.current) return;
    try {
      await loadGoogleMaps(apiKey);
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
      await runCategorySearch(map, activeCategory);
    } catch {
      enterFallback();
    }
  }, [
    apiKey,
    mapId,
    ensureCommunityMarker,
    runCategorySearch,
    activeCategory,
    enterFallback,
  ]);

  useEffect(() => {
    if (!apiKey || mapsAuthFailed) {
      enterFallback();
      return;
    }
    if (inView && !mapReadyRef.current) {
      void initMap();
    }
  }, [apiKey, inView, initMap, enterFallback]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || useFallback || !mapReadyRef.current) return;
    setLoading(true);
    void runCategorySearch(map, activeCategory);
  }, [activeCategory, runCategorySearch, useFallback]);

  if (useFallback) {
    return (
      <AmenityMapFallback activeCategory={activeCategory} showFullList={variant === 'full'} />
    );
  }

  const chips =
    variant === 'compact' ? AMENITY_CATEGORY_ORDER.slice(0, 6) : AMENITY_CATEGORY_ORDER;

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
      {curatedSidebar.length > 0 && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2" aria-label="Featured places for this category">
          {curatedSidebar.map((place) => (
            <li
              key={place.id}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <span className="font-medium text-gray-900">{place.name}</span>
              <span className="block text-gray-600">{place.address}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
