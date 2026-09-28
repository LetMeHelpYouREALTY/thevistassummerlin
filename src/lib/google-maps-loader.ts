const CALLBACK = "__vistasGoogleMapsLoaded";

type MapsWindow = Window & {
  google?: { maps?: { importLibrary?: (name: string) => Promise<Record<string, unknown>> } };
  [CALLBACK]?: () => void;
};

let loading: Promise<void> | null = null;

/**
 * Load the Maps JavaScript API once. Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
 * Places, Routes, and Geocoding libraries are requested through importLibrary.
 */
export function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser"));
  }

  const mapsWindow = window as MapsWindow;
  if (mapsWindow.google?.maps?.importLibrary) {
    return Promise.resolve();
  }

  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    mapsWindow[CALLBACK] = () => resolve();
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&callback=${CALLBACK}`;
    script.async = true;
    script.onerror = () => {
      loading = null;
      reject(new Error("Google Maps failed to load"));
    };
    document.head.appendChild(script);
  });

  return loading;
}

export function mapsApiKey(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";
}
