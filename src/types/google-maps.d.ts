/** Minimal Google Maps JS types for amenity map (install @types/google.maps for fuller coverage). */
export {};

declare global {
  interface Window {
    google?: typeof google;
    __vistasAmenityMapsReady?: () => void;
  }

  namespace google.maps {
    class Map {
      constructor(el: HTMLElement, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      fitBounds(bounds: LatLngBounds): void;
    }
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }
    class LatLngBounds {
      constructor();
      extend(point: LatLng | LatLngLiteral): void;
    }
    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      addListener(event: string, handler: () => void): void;
    }
    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      setContent(content: string): void;
      open(opts?: { map: Map; anchor?: Marker }): void;
      close(): void;
    }
    interface MapOptions {
      center?: LatLngLiteral;
      zoom?: number;
      mapId?: string;
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      streetViewControl?: boolean;
      mapTypeControl?: boolean;
      fullscreenControl?: boolean;
    }
    interface MarkerOptions {
      map?: Map;
      position?: LatLngLiteral;
      title?: string;
      label?: string | { text: string; color?: string };
    }
    interface InfoWindowOptions {
      content?: string;
    }
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    function importLibrary(name: string): Promise<unknown>;
  }

  namespace google.maps.places {
    class Place {
      static searchNearby(request: SearchNearbyRequest): Promise<{ places: Place[] }>;
      fetchFields(options: { fields: string[] }): Promise<void>;
      displayName?: string;
      formattedAddress?: string;
      location?: google.maps.LatLng;
      rating?: number;
      googleMapsURI?: string;
    }
    enum SearchNearbyRankPreference {
      POPULARITY = 'POPULARITY',
      DISTANCE = 'DISTANCE',
    }
    interface SearchNearbyRequest {
      fields: string[];
      locationRestriction: {
        center: google.maps.LatLng;
        radius: number;
      };
      includedPrimaryTypes: string[];
      maxResultCount: number;
      rankPreference?: SearchNearbyRankPreference;
    }
  }
}
