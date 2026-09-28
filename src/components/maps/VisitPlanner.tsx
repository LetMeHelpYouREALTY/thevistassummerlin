"use client";

import { useEffect, useRef, useState } from "react";
import { GBP_OFFICE_ADDRESS, getGbpLinks } from "@/lib/gbp";
import { loadGoogleMaps, mapsApiKey } from "@/lib/google-maps-loader";

const TRAVEL_MODES = [
  { id: "DRIVING", label: "Drive" },
  { id: "TRANSIT", label: "Transit" },
  { id: "WALKING", label: "Walk" },
  { id: "BICYCLING", label: "Bike" },
] as const;

type TravelModeId = (typeof TRAVEL_MODES)[number]["id"];

const AMENITIES = [
  { id: "restaurant", label: "Restaurants" },
  { id: "park", label: "Parks" },
  { id: "parking", label: "Parking" },
  { id: "supermarket", label: "Grocery" },
  { id: "cafe", label: "Coffee" },
] as const;

type AmenityId = (typeof AMENITIES)[number]["id"];

type LatLng = { lat: number; lng: number };

type TravelEstimate = {
  mode: TravelModeId;
  durationText: string;
  distanceText: string;
  result: unknown;
};

type AmenityPlace = {
  id: string;
  name: string;
  address: string;
  mapsUrl: string;
};

type DirectionsRendererHandle = {
  setMap: (map: MapHandle | null) => void;
  setDirections: (result: unknown) => void;
};

type MapsLibraries = {
  Map: new (el: HTMLElement, opts: Record<string, unknown>) => MapHandle;
  Marker: new (opts: Record<string, unknown>) => MarkerHandle;
  Geocoder: new () => {
    geocode: (
      req: { address: string },
      cb: (results: Array<{ geometry: { location: LatLngHandle } }> | null, status: string) => void,
    ) => void;
  };
  DirectionsService: new () => {
    route: (
      req: Record<string, unknown>,
      cb: (result: unknown, status: string) => void,
    ) => void;
  };
  DirectionsRenderer: new (opts: Record<string, unknown>) => DirectionsRendererHandle;
  PlaceAutocompleteElement?: new () => AutocompleteElement;
  Place?: {
    searchNearby: (req: Record<string, unknown>) => Promise<{ places?: NearbyPlace[] }>;
  };
  Autocomplete?: new (
    input: HTMLInputElement,
    opts: Record<string, unknown>,
  ) => { addListener: (event: string, cb: () => void) => void; getPlace: () => LegacyPlace };
};

type MapHandle = {
  setCenter: (pos: LatLng) => void;
  fitBounds: (bounds: unknown) => void;
};

type MarkerHandle = { setMap: (map: MapHandle | null) => void };

type LatLngHandle = { lat: () => number; lng: () => number };

type AutocompleteElement = HTMLElement & {
  includedRegionCodes?: string[];
  addEventListener: (type: string, listener: (event: AutocompleteEvent) => void) => void;
};

type AutocompleteEvent = {
  placePrediction?: { toPlace: () => PlaceHandle };
  place?: PlaceHandle;
  detail?: { placePrediction?: { toPlace: () => PlaceHandle }; place?: PlaceHandle };
};

type PlaceHandle = {
  location?: LatLngHandle | LatLng;
  formattedAddress?: string;
  displayName?: string | { text?: string };
  fetchFields: (req: { fields: string[] }) => Promise<void>;
};

type LegacyPlace = {
  formatted_address?: string;
  geometry?: { location?: LatLngHandle };
};

type NearbyPlace = {
  id?: string;
  displayName?: string | { text?: string };
  formattedAddress?: string;
  location?: LatLngHandle | LatLng;
  googleMapsURI?: string;
};

function readLatLng(value: LatLngHandle | LatLng | undefined): LatLng | null {
  if (!value) return null;
  if (typeof (value as LatLngHandle).lat === "function") {
    const handle = value as LatLngHandle;
    return { lat: handle.lat(), lng: handle.lng() };
  }
  const literal = value as LatLng;
  if (typeof literal.lat === "number" && typeof literal.lng === "number") return literal;
  return null;
}

function placeLabel(displayName: NearbyPlace["displayName"], fallback: string): string {
  if (typeof displayName === "string" && displayName.trim()) return displayName;
  if (displayName && typeof displayName === "object" && displayName.text) return displayName.text;
  return fallback;
}

function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder === 0 ? `${hours} hr` : `${hours} hr ${remainder} min`;
}

function formatMiles(meters: number): string {
  const miles = meters / 1609.344;
  return `${miles < 10 ? miles.toFixed(1) : Math.round(miles)} mi`;
}

async function importMaps(): Promise<MapsLibraries> {
  const googleMaps = (window as unknown as { google: { maps: { importLibrary: (name: string) => Promise<Record<string, unknown>> } } }).google.maps;
  const maps = await googleMaps.importLibrary("maps");
  const routes = await googleMaps.importLibrary("routes");
  const places = await googleMaps.importLibrary("places");
  const geocoding = await googleMaps.importLibrary("geocoding");
  return { ...maps, ...routes, ...places, ...geocoding } as unknown as MapsLibraries;
}

export function VisitPlanner() {
  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteHostRef = useRef<HTMLDivElement>(null);
  const mapHandle = useRef<MapHandle | null>(null);
  const office = useRef<LatLng | null>(null);
  const renderer = useRef<DirectionsRendererHandle | null>(null);
  const amenityMarkers = useRef<MarkerHandle[]>([]);
  const estimatesRef = useRef<Partial<Record<TravelModeId, TravelEstimate>>>({});
  const libraries = useRef<MapsLibraries | null>(null);

  const apiKey = mapsApiKey();
  const { directions: directionsUrl } = getGbpLinks();
  const [mode, setMode] = useState<TravelModeId>("DRIVING");
  const [amenity, setAmenity] = useState<AmenityId>("restaurant");
  const [estimates, setEstimates] = useState<Partial<Record<TravelModeId, TravelEstimate>>>({});
  const [places, setPlaces] = useState<AmenityPlace[]>([]);
  const [originLabel, setOriginLabel] = useState("");
  const [status, setStatus] = useState(apiKey ? "Loading map…" : "");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!apiKey || !mapRef.current) return;
    let cancelled = false;

    async function start() {
      try {
        await loadGoogleMaps(apiKey);
        if (cancelled || !mapRef.current) return;
        const libs = await importMaps();
        libraries.current = libs;
        const map = new libs.Map(mapRef.current, {
          center: { lat: 36.178, lng: -115.332 },
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        mapHandle.current = map;

        await new Promise<void>((resolve) => {
          const geocoder = new libs.Geocoder();
          geocoder.geocode({ address: GBP_OFFICE_ADDRESS }, (results, geoStatus) => {
            const location = results?.[0]?.geometry.location;
            const point = location ? { lat: location.lat(), lng: location.lng() } : null;
            if (geoStatus === "OK" && point) {
              office.current = point;
              map.setCenter(point);
              new libs.Marker({ map, position: point, title: GBP_OFFICE_ADDRESS });
            }
            resolve();
          });
        });

        renderer.current = new libs.DirectionsRenderer({ map, suppressMarkers: false });
        mountAutocomplete(libs);
        if (!cancelled) {
          setReady(true);
          setStatus("Enter a starting address to see travel time.");
        }
      } catch {
        if (!cancelled) setStatus("The map could not load. Use the Google Maps directions link below.");
      }
    }

    function mountAutocomplete(libs: MapsLibraries) {
      const host = autocompleteHostRef.current;
      if (!host) return;
      host.replaceChildren();

      if (libs.PlaceAutocompleteElement) {
        const element = new libs.PlaceAutocompleteElement();
        element.includedRegionCodes = ["us"];
        element.style.width = "100%";
        element.addEventListener("gmp-select", (event) => {
          void handleAutocomplete(event as AutocompleteEvent);
        });
        element.addEventListener("gmp-placeselect", (event) => {
          void handleAutocomplete(event as AutocompleteEvent);
        });
        host.appendChild(element);
        return;
      }

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Enter a starting address";
      input.autocomplete = "off";
      input.setAttribute("aria-label", "Starting address");
      input.className = "w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900";
      host.appendChild(input);
      if (!libs.Autocomplete) return;
      const legacy = new libs.Autocomplete(input, {
        componentRestrictions: { country: "us" },
        fields: ["geometry", "formatted_address"],
      });
      legacy.addListener("place_changed", () => {
        const place = legacy.getPlace();
        const point = place.geometry?.location
          ? { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
          : null;
        if (!point) return;
        void planFrom(point, place.formatted_address ?? "Your address");
      });
    }

    async function handleAutocomplete(event: AutocompleteEvent) {
      const prediction = event.placePrediction ?? event.detail?.placePrediction;
      const place = prediction ? prediction.toPlace() : event.place ?? event.detail?.place;
      if (!place) return;
      await place.fetchFields({ fields: ["formattedAddress", "location", "displayName"] });
      const point = readLatLng(place.location);
      if (!point) return;
      const label = place.formattedAddress || placeLabel(place.displayName, "Your address");
      await planFrom(point, label);
    }

    void start();
    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  useEffect(() => {
    if (!ready) return;
    void loadAmenities(amenity);
  }, [ready, amenity]);

  useEffect(() => {
    const selected = estimates[mode];
    if (selected && renderer.current) {
      renderer.current.setDirections(selected.result);
    }
  }, [mode, estimates]);

  async function planFrom(origin: LatLng, label: string) {
    const libs = libraries.current;
    if (!libs) return;
    setOriginLabel(label);
    setStatus("Checking travel times…");
    const service = new libs.DirectionsService();
    const next: Partial<Record<TravelModeId, TravelEstimate>> = {};

    await Promise.all(
      TRAVEL_MODES.map(async (item) => {
        const routed = await new Promise<TravelEstimate | null>((resolve) => {
          service.route(
            {
              origin,
              destination: GBP_OFFICE_ADDRESS,
              travelMode: item.id,
            },
            (result, routeStatus) => {
              if (routeStatus !== "OK" || !result) {
                resolve(null);
                return;
              }
              const leg = (result as { routes?: Array<{ legs?: Array<{ duration?: { text?: string; value?: number }; distance?: { text?: string; value?: number } }> }> }).routes?.[0]?.legs?.[0];
              const seconds = leg?.duration?.value;
              const meters = leg?.distance?.value;
              resolve({
                mode: item.id,
                durationText: leg?.duration?.text || (seconds ? formatDuration(seconds) : "—"),
                distanceText: leg?.distance?.text || (meters ? formatMiles(meters) : ""),
                result,
              });
            },
          );
        });
        if (routed) next[item.id] = routed;
      }),
    );

    estimatesRef.current = next;
    setEstimates(next);
    const active = next[mode] ?? TRAVEL_MODES.map((item) => next[item.id]).find(Boolean);
    if (!active) {
      setStatus("No route was found from that address. Try another starting point.");
      return;
    }
    if (!next[mode]) setMode(active.mode);
    setStatus(`${labelFor(active.mode)} from ${label} to the office is about ${active.durationText}${active.distanceText ? ` (${active.distanceText})` : ""}.`);
  }

  async function loadAmenities(type: AmenityId) {
    const libs = libraries.current;
    const center = office.current;
    const map = mapHandle.current;
    if (!libs?.Place || !center || !map) return;

    amenityMarkers.current.forEach((marker) => marker.setMap(null));
    amenityMarkers.current = [];

    try {
      const { places: found } = await libs.Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "googleMapsURI"],
        locationRestriction: { center, radius: 4000 },
        includedPrimaryTypes: [type],
        maxResultCount: 8,
      });
      const listed: AmenityPlace[] = [];
      (found ?? []).forEach((place, index) => {
        const point = readLatLng(place.location);
        const name = placeLabel(place.displayName, "Nearby place");
        if (point) {
          amenityMarkers.current.push(new libs.Marker({ map, position: point, title: name }));
        }
        listed.push({
          id: place.id || `${type}-${index}`,
          name,
          address: place.formattedAddress || "",
          mapsUrl: place.googleMapsURI || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`,
        });
      });
      setPlaces(listed);
    } catch {
      setPlaces([]);
    }
  }

  async function shareCurrentLocation() {
    if (!navigator.geolocation) {
      setStatus("This browser cannot share a location. Enter an address instead.");
      return;
    }
    setStatus("Finding your location…");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        void planFrom(
          { lat: position.coords.latitude, lng: position.coords.longitude },
          "Your location",
        );
      },
      () => setStatus("Location was blocked. Enter a starting address instead."),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  return (
    <section id="plan-your-visit" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-primary text-3xl font-bold text-gray-900 lg:text-4xl">Plan your visit</h2>
        <p className="mt-3 max-w-3xl text-lg text-gray-600">
          Directions to {GBP_OFFICE_ADDRESS}, with travel time by drive, transit, walk, and bike. The map also shows nearby restaurants, parks, and parking.
        </p>

        {!apiKey ? (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-gray-700">
              Open turn-by-turn directions in Google Maps. Live travel times on this page need the site Maps key.
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Get directions
            </a>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr]">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900" htmlFor="visit-start">
                  Starting address
                </label>
                <div id="visit-start" ref={autocompleteHostRef} className="min-h-[48px]" />
              </div>
              <button
                type="button"
                onClick={() => void shareCurrentLocation()}
                className="text-sm font-semibold text-blue-700 underline-offset-2 hover:underline"
              >
                Use my location
              </button>

              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Transportation mode">
                {TRAVEL_MODES.map((item) => {
                  const estimate = estimates[item.id];
                  const selected = mode === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setMode(item.id)}
                      className={`rounded-xl border px-3 py-3 text-left ${selected ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"}`}
                    >
                      <span className="block text-sm font-semibold text-gray-900">{item.label}</span>
                      <span className="block text-sm text-gray-600">{estimate?.durationText ?? "—"}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-sm leading-relaxed text-gray-700" role="status">{status}</p>
              {originLabel ? (
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-blue-700 hover:underline">
                  Open this route in Google Maps
                </a>
              ) : null}

              <div>
                <h3 className="text-lg font-bold text-gray-900">Nearby amenities</h3>
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Amenity type">
                  {AMENITIES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={amenity === item.id}
                      onClick={() => setAmenity(item.id)}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium ${amenity === item.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <ul className="mt-4 space-y-3">
                  {places.length === 0 ? (
                    <li className="text-sm text-gray-600">Nearby places appear here after the map loads.</li>
                  ) : (
                    places.map((place) => (
                      <li key={place.id}>
                        <a href={place.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline">
                          {place.name}
                        </a>
                        {place.address ? <p className="text-sm text-gray-600">{place.address}</p> : null}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            <div
              ref={mapRef}
              className="h-[420px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 lg:h-[640px]"
              role="region"
              aria-label={`Map of ${GBP_OFFICE_ADDRESS} and nearby amenities`}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function labelFor(mode: TravelModeId): string {
  switch (mode) {
    case "DRIVING":
      return "Driving";
    case "TRANSIT":
      return "Transit";
    case "WALKING":
      return "Walking";
    case "BICYCLING":
      return "Biking";
    default: {
      const neverMode: never = mode;
      return neverMode;
    }
  }
}
