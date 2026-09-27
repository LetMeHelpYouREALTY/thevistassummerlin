/**
 * Hyperlocal anchor for The Vistas Summerlin amenity map.
 * Center: 11312 Parkside Way (GBP office / Vistas marketing hub), geocoded via Google Maps public listing.
 * @see https://www.google.com/maps/search/11312+Parkside+Way,+Las+Vegas,+NV+89138
 */
export const VISTAS_COMMUNITY = {
  name: 'The Vistas Summerlin',
  shortName: 'The Vistas',
  city: 'Las Vegas',
  state: 'NV',
  postalCode: '89138',
  regionLabel: 'Summerlin, Las Vegas',
  center: {
    lat: 36.182756,
    lng: -115.334891,
  },
  /** Visible label on the community marker */
  markerTitle: 'The Vistas Summerlin',
  markerAddress: '11312 Parkside Way, Las Vegas, NV 89138',
  defaultZoom: 13,
  searchRadiusMeters: 8000,
} as const;

export type AmenityCategoryId =
  | 'restaurants'
  | 'cafes'
  | 'grocery'
  | 'parks'
  | 'golf'
  | 'healthcare'
  | 'pharmacies'
  | 'shopping'
  | 'parking'
  | 'fitness'
  | 'schools';

export type CuratedPlace = {
  id: string;
  name: string;
  address: string;
  category: AmenityCategoryId;
  schemaType:
    | 'Restaurant'
    | 'CafeOrCoffeeShop'
    | 'GroceryStore'
    | 'Park'
    | 'GolfCourse'
    | 'Hospital'
    | 'Pharmacy'
    | 'ShoppingCenter'
    | 'ParkingFacility'
    | 'ExerciseGym'
    | 'School';
  /** Official page used to verify name and address */
  sourceUrl: string;
  lat?: number;
  lng?: number;
};

/**
 * Family master-planned community (not 55+ / not high-rise): default category order per spec.
 */
export const AMENITY_CATEGORY_ORDER: AmenityCategoryId[] = [
  'restaurants',
  'cafes',
  'grocery',
  'parks',
  'golf',
  'healthcare',
  'pharmacies',
  'shopping',
  'parking',
  'fitness',
  'schools',
];

export const AMENITY_CATEGORY_LABELS: Record<AmenityCategoryId, string> = {
  restaurants: 'Restaurants',
  cafes: 'Cafes',
  grocery: 'Grocery',
  parks: 'Parks',
  golf: 'Golf',
  healthcare: 'Healthcare',
  pharmacies: 'Pharmacies',
  shopping: 'Shopping',
  parking: 'Parking',
  fitness: 'Fitness',
  schools: 'Schools',
};

/** Google Places API (New) primary types per filter chip */
export const CATEGORY_PLACE_TYPES: Record<AmenityCategoryId, string[]> = {
  restaurants: ['restaurant'],
  cafes: ['cafe', 'coffee_shop'],
  grocery: ['grocery_store', 'supermarket'],
  parks: ['park', 'national_park'],
  golf: ['golf_course'],
  healthcare: ['hospital', 'doctor'],
  pharmacies: ['pharmacy', 'drugstore'],
  shopping: ['shopping_mall', 'department_store'],
  parking: ['parking'],
  fitness: ['gym', 'fitness_center'],
  schools: ['school', 'primary_school', 'secondary_school'],
};

/**
 * Curated destinations near The Vistas (Summerlin west). Addresses verified against official sources.
 */
export const CURATED_NEARBY_PLACES: CuratedPlace[] = [
  {
    id: 'downtown-summerlin',
    name: 'Downtown Summerlin',
    address: '1980 Festival Plaza Dr, Las Vegas, NV 89135',
    category: 'shopping',
    schemaType: 'ShoppingCenter',
    sourceUrl: 'https://www.downtownsummerlin.com/',
    lat: 36.0697,
    lng: -115.3334,
  },
  {
    id: 'whole-foods-summerlin',
    name: 'Whole Foods Market',
    address: '2475 S Town Center Dr, Las Vegas, NV 89135',
    category: 'grocery',
    schemaType: 'GroceryStore',
    sourceUrl: 'https://www.wholefoodsmarket.com/stores/summerlin',
    lat: 36.0719,
    lng: -115.3315,
  },
  {
    id: 'smiths-charleston',
    name: "Smith's Food and Drug",
    address: '9851 W Charleston Blvd, Las Vegas, NV 89117',
    category: 'grocery',
    schemaType: 'GroceryStore',
    sourceUrl: 'https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/charleston-blvd/70600115',
    lat: 36.1585,
    lng: -115.303,
  },
  {
    id: 'summerlin-hospital',
    name: 'Summerlin Hospital Medical Center',
    address: '657 N Town Center Dr, Las Vegas, NV 89144',
    category: 'healthcare',
    schemaType: 'Hospital',
    sourceUrl: 'https://www.thevalleyhealthsystem.com/locations/summerlin-hospital',
    lat: 36.0679,
    lng: -115.3341,
  },
  {
    id: 'tpc-las-vegas',
    name: 'TPC Las Vegas',
    address: '9851 Canyon Run Dr, Las Vegas, NV 89144',
    category: 'golf',
    schemaType: 'GolfCourse',
    sourceUrl: 'https://tpc.com/lasvegas/',
    lat: 36.1882,
    lng: -115.3405,
  },
  {
    id: 'palo-verde-hs',
    name: 'Palo Verde High School',
    address: '333 S Pavilion Center Dr, Las Vegas, NV 89144',
    category: 'schools',
    schemaType: 'School',
    sourceUrl: 'https://pvh.ccsd.net/',
    lat: 36.0712,
    lng: -115.3375,
  },
  {
    id: 'sig-rogich-ms',
    name: 'Sig Rogich Middle School',
    address: '2350 Red Rock St, Las Vegas, NV 89135',
    category: 'schools',
    schemaType: 'School',
    sourceUrl: 'https://srm.ccsd.net/',
    lat: 36.0645,
    lng: -115.3218,
  },
  {
    id: 'red-rock-canyon',
    name: 'Red Rock Canyon National Conservation Area',
    address: '1000 Scenic Loop Dr, Las Vegas, NV 89161',
    category: 'parks',
    schemaType: 'Park',
    sourceUrl: 'https://www.nps.gov/redr/',
    lat: 36.1357,
    lng: -115.4279,
  },
  {
    id: 'summerlin-centre-park',
    name: 'Summerlin Centre Community Park',
    address: '10588 Pine Glen Rd, Las Vegas, NV 89135',
    category: 'parks',
    schemaType: 'Park',
    sourceUrl: 'https://www.summerlin.com/explore/parks/summerlin-centre-community-park/',
    lat: 36.0562,
    lng: -115.3211,
  },
];

export function getKeylessMapEmbedUrl(): string {
  const { lat, lng } = VISTAS_COMMUNITY.center;
  return `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
}

export function directionsUrlForPlace(name: string, address: string): string {
  const q = encodeURIComponent(`${name}, ${address}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

export function curatedPlacesForCategory(category: AmenityCategoryId): CuratedPlace[] {
  return CURATED_NEARBY_PLACES.filter((p) => p.category === category);
}
