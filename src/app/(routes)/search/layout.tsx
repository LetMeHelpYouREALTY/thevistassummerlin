import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Property Search | The Vistas Summerlin Homes by Dr. Jan Duffy',
  description:
    'Search homes for sale in The Vistas Summerlin, Las Vegas with Dr. Jan Duffy. Explore luxury listings, pricing, and neighborhood options.',
  keywords: [
    'property search',
    'homes for sale',
    'The Vistas Summerlin',
    'luxury homes',
    'Las Vegas homes',
    'single family homes',
    'townhomes',
    'condos',
    'Dr. Jan Duffy',
  ],
  alternates: {
    canonical: 'https://www.thevistassummerlin.com/search',
  },
  openGraph: {
    title: 'Property Search | The Vistas Summerlin',
    description:
      'Search homes for sale in The Vistas Summerlin with local guidance from Dr. Jan Duffy.',
    url: 'https://www.thevistassummerlin.com/search',
    images: [
      {
        url: '/subcommunities/IMG_0737.JPG',
        width: 1200,
        height: 630,
        alt: 'The Vistas Summerlin luxury property search',
      },
    ],
  },
};

export default function SearchLayout({ children }: { children: ReactNode }) {
  return children;
}