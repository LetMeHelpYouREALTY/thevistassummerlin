import { VISTAS_COMMUNITY, type AmenityCategoryId } from './community-config';

export type NearbyPlaceResult = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  mapsUrl: string;
};

function placeDisplayName(place: google.maps.places.Place): string {
  const dn = place.displayName;
  if (!dn) return 'Place';
  return String(dn);
}

function placeMapsUrl(
  place: google.maps.places.Place,
  name: string,
  address: string,
  lat: number,
  lng: number
): string {
  if (place.googleMapsURI) return place.googleMapsURI;
  const q = encodeURIComponent(address ? `${name}, ${address}` : `${lat},${lng}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

// One request per category per page session
const cache = new Map<string, Promise<NearbyPlaceResult[]>>();

export function searchCategory(
  categoryId: AmenityCategoryId,
  types: string[]
): Promise<NearbyPlaceResult[]> {
  let p = cache.get(categoryId);
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;
      const center = VISTAS_COMMUNITY.center;
      const { places } = await Place.searchNearby({
        fields: ['displayName', 'location', 'formattedAddress', 'googleMapsURI', 'id'],
        locationRestriction: {
          center,
          radius: VISTAS_COMMUNITY.searchRadiusMeters,
        },
        includedPrimaryTypes: types,
        maxResultCount: 10,
        rankPreference: 'POPULARITY' as google.maps.places.SearchNearbyRankPreference,
      });
      const results: NearbyPlaceResult[] = [];
      for (const place of places) {
        const loc = place.location;
        if (!loc) continue;
        const lat = loc.lat();
        const lng = loc.lng();
        const name = placeDisplayName(place);
        const address = place.formattedAddress ?? '';
        results.push({
          id: place.id ?? `${name}-${lat}-${lng}`,
          name,
          address,
          lat,
          lng,
          mapsUrl: placeMapsUrl(place, name, address, lat, lng),
        });
      }
      return results;
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }
  return p;
}
