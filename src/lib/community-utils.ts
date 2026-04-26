import { promises as fs } from 'fs';
import path from 'path';
import { getNeighborhoodSlugs, getNeighborhoodBySlug } from '@/constants/neighborhoods';
// TODO: Implement or import these configs/utilities from './community-config'
export const DEFAULT_COMMUNITY_CONFIG = {
  descriptions: {
    templates: [
      'Discover the beauty and lifestyle of {name} in The Vistas Summerlin.',
      '{name} offers premier amenities and a vibrant community.',
      'Live luxuriously in {name}, one of Summerlin\'s most desirable neighborhoods.',
      'Experience comfort and convenience in {name} at The Vistas.',
      'Find your dream home in {name}, Summerlin\'s hidden gem.'
    ]
  },
  priceRanges: [
    '$400k - $600k',
    '$600k - $800k',
    '$800k - $1.2M',
    '$1.2M - $2M',
    '$2M+'
  ]
};
export const MARKET_TRENDS = {
  priceChanges: ['+2.1%', '+0.8%', '-1.3%', '+3.5%', '0.0%'],
  inventoryLevels: ['Low', 'Medium', 'High'],
  daysOnMarket: { min: 12, max: 60 }
};
export const LOCATION_CONFIG = {
  defaultCity: 'Las Vegas',
  defaultState: 'NV',
  baseCoordinates: { lat: 36.1911, lng: -115.3278 },
  coordinateRadius: 0.02
};
export const IMAGE_CONFIG = {
  supportedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.heic'],
  defaultImagePath: '/subcommunities/'
};
export function detectCommunityType(slug: string): string {
  if (slug.includes('luxury')) return 'luxury';
  if (slug.includes('condo')) return 'condo';
  if (slug.includes('family')) return 'family';
  return 'default';
}
export function getAmenitiesForType(type: string, count: number = 6): string[] {
  const all: Record<string, string[]> = {
    luxury: ['Gated Entry', 'Golf Course', 'Resort Pool', 'Clubhouse', 'Tennis Courts', 'Concierge', 'Fitness Center', 'Spa'],
    condo: ['Pool', 'Fitness Center', 'Covered Parking', 'Elevator', 'Pet Friendly', 'Security'],
    family: ['Parks', 'Playgrounds', 'Walking Trails', 'Community Pool', 'Schools Nearby', 'Sports Courts'],
    default: ['Parks', 'Pool', 'Trails', 'Security', 'Clubhouse', 'Fitness Center']
  };
  return (all[type] || all.default).slice(0, count);
}
export function getNeighborhoodScores(type: string): {
  walkScore?: number;
  transitScore?: number;
  bikeScore?: number;
  crimeRate?: 'Low' | 'Medium' | 'High';
  schoolRating?: number;
} {
  if (type === 'luxury') return { walkScore: 40, transitScore: 25, bikeScore: 60, crimeRate: 'Low' as const, schoolRating: 9 };
  if (type === 'condo') return { walkScore: 70, transitScore: 55, bikeScore: 80, crimeRate: 'Medium' as const, schoolRating: 7 };
  if (type === 'family') return { walkScore: 55, transitScore: 40, bikeScore: 70, crimeRate: 'Low' as const, schoolRating: 8 };
  return { walkScore: 50, transitScore: 35, bikeScore: 65, crimeRate: 'Medium' as const, schoolRating: 7 };
}

// ...existing CommunityData, filenameToSlug, slugToDisplayName, getAllCommunitySlugs, getCommunityBySlug, generateDescription, generateStats, generateAmenities, generateNeighborhoodScores, generateLocation, generateMarketTrends, simpleHash, communityExists...

export interface CommunityData {
  slug: string;
  name: string;
  image: string;
  description?: string;
  featured?: boolean;
  stats?: {
    listings?: number;
    avgPrice?: string;
    medianPrice?: string;
    priceRange?: string;
    soldLastMonth?: number;
    daysOnMarket?: number;
  };
  amenities?: string[];
  features?: string[];
  neighborhood?: {
    walkScore?: number;
    transitScore?: number;
    bikeScore?: number;
    crimeRate?: 'Low' | 'Medium' | 'High';
    schoolRating?: number;
  };
  location?: {
    city?: string;
    state?: string;
    zipCodes?: string[];
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  marketTrends?: {
    priceChange?: string;
    inventoryLevel?: 'Low' | 'Medium' | 'High';
    daysOnMarket?: number;
  };
}

export function filenameToSlug(filename: string): string {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  return nameWithoutExt.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function slugToDisplayName(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export async function getAllCommunitySlugs(): Promise<string[]> {
  try {
    // Use the neighborhoods.ts data as the source of truth
    const neighborhoodSlugs = getNeighborhoodSlugs();
    
    // Also include any image-based communities from subcommunities directory
    const subcommunitiesPath = path.join(process.cwd(), 'public', 'subcommunities');
    const files = await fs.readdir(subcommunitiesPath);
    const imageFiles = files.filter(file => 
      IMAGE_CONFIG.supportedFormats.some(format => 
        file.toLowerCase().endsWith(format.toLowerCase())
      )
    );
    const imageSlugs = imageFiles.map(filenameToSlug);
    
    // Combine both sources and remove duplicates
    const allSlugs = [...new Set([...neighborhoodSlugs, ...imageSlugs])];
    return allSlugs;
  } catch (error) {
    console.error('Error getting community slugs:', error);
    // Fallback to just neighborhood slugs
    return getNeighborhoodSlugs();
  }
}

export async function getCommunityBySlug(slug: string): Promise<CommunityData | null> {
  try {
    // First check if it's a neighborhood from neighborhoods.ts
    const neighborhood = getNeighborhoodBySlug(slug);
    if (neighborhood) {
      const communityType = detectCommunityType(slug);
      const communityData: CommunityData = {
        slug,
        name: neighborhood.name,
        image: '/subcommunities/IMG_0737.JPG', // Default image
        description: neighborhood.description,
        stats: {
          ...generateStats(communityType, slug),
          priceRange: neighborhood.priceRange
        },
        amenities: getAmenitiesForType(communityType, 6),
        neighborhood: getNeighborhoodScores(communityType),
        location: generateLocation(slug),
        marketTrends: generateMarketTrends(slug),
      };
      return communityData;
    }

    // Fallback to image-based communities
    const subcommunitiesPath = path.join(process.cwd(), 'public', 'subcommunities');
    const files = await fs.readdir(subcommunitiesPath);
    const imageFile = files.find(file => {
      const fileSlug = filenameToSlug(file);
      return fileSlug === slug;
    });
    
    if (imageFile) {
      const communityName = slugToDisplayName(slug);
      const communityType = detectCommunityType(slug);
      const communityData: CommunityData = {
        slug,
        name: communityName,
        image: `${IMAGE_CONFIG.defaultImagePath}${imageFile}`,
        description: generateDescription(communityName),
        stats: generateStats(communityType, slug),
        amenities: getAmenitiesForType(communityType, 6),
        neighborhood: getNeighborhoodScores(communityType),
        location: generateLocation(slug),
        marketTrends: generateMarketTrends(slug),
      };
      return communityData;
    }

    return null;
  } catch (error) {
    console.error('Error getting community data:', error);
    return null;
  }
}

function generateDescription(communityName: string): string {
  const templates = DEFAULT_COMMUNITY_CONFIG.descriptions.templates;
  const hash = simpleHash(communityName);
  const template = templates[hash % templates.length];
  return template.replace(/{name}/g, communityName);
}

function deterministicNumber(seed: string, min: number, max: number): number {
  const hash = simpleHash(seed);
  return min + (hash % (max - min + 1));
}

function generateStats(communityType: string = 'default', seedKey: string = 'default') {
  const listingsCount = deterministicNumber(`${seedKey}:listings`, 15, 95);
  const { priceRanges } = DEFAULT_COMMUNITY_CONFIG;
  const priceRangeIndex = communityType === 'luxury' 
    ? deterministicNumber(`${seedKey}:luxury-price-index`, 3, 4)
    : deterministicNumber(`${seedKey}:price-index`, 0, priceRanges.length - 1);
  return {
    listings: listingsCount,
    priceRange: priceRanges[priceRangeIndex] || priceRanges[0],
    soldLastMonth: deterministicNumber(`${seedKey}:sold`, 5, 24),
  };
}

function generateLocation(seedKey: string = 'default') {
  const { defaultCity, defaultState, baseCoordinates, coordinateRadius } = LOCATION_CONFIG;
  const latOffset = (deterministicNumber(`${seedKey}:lat`, 0, 1000) / 1000 - 0.5) * coordinateRadius;
  const lngOffset = (deterministicNumber(`${seedKey}:lng`, 0, 1000) / 1000 - 0.5) * coordinateRadius;
  return {
    city: defaultCity,
    state: defaultState,
    zipCodes: ['89138', '89135'],
    coordinates: {
      lat: baseCoordinates.lat + latOffset,
      lng: baseCoordinates.lng + lngOffset,
    },
  };
}

function generateMarketTrends(seedKey: string = 'default') {
  const { priceChanges, inventoryLevels, daysOnMarket } = MARKET_TRENDS;
  return {
    priceChange: priceChanges[deterministicNumber(`${seedKey}:price-change`, 0, priceChanges.length - 1)],
    inventoryLevel: inventoryLevels[deterministicNumber(`${seedKey}:inventory`, 0, inventoryLevels.length - 1)] as 'Low' | 'Medium' | 'High',
    daysOnMarket: deterministicNumber(`${seedKey}:dom`, daysOnMarket.min, daysOnMarket.max),
  };
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export async function getFeaturedCommunities(count: number = 3): Promise<CommunityData[]> {
  try {
    const slugs = await getAllCommunitySlugs();
    
    // Shuffle the slugs array
    const shuffledSlugs = [...slugs].sort(() => 0.5 - Math.random());
    
    // Get the first 'count' slugs
    const featuredSlugs = shuffledSlugs.slice(0, count);
    
    // Fetch community data for each featured slug
    const featuredCommunities = await Promise.all(
      featuredSlugs.map(slug => getCommunityBySlug(slug))
    );
    
    // Filter out any null results and return
    return featuredCommunities.filter((community): community is CommunityData => community !== null);
  } catch (error) {
    console.error('Error getting featured communities:', error);
    return [];
  }
}

export async function communityExists(slug: string): Promise<boolean> {
  const slugs = await getAllCommunitySlugs();
  return slugs.includes(slug);
} 