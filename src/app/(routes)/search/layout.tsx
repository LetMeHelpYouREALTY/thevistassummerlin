import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getSiteUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Property Search | The Vistas Summerlin Homes for Sale',
  description:
    'Search The Vistas Summerlin homes for sale by price, beds, baths, and property type. Use focused filters to find active Las Vegas listings.',
  keywords: [
    'The Vistas Summerlin homes for sale',
    'property search Las Vegas',
    'The Vistas Summerlin',
    'Summerlin luxury homes',
    'single family homes',
    'townhomes',
    'condos',
    'active MLS listings',
  ],
  alternates: {
    canonical: `${getSiteUrl()}/search`,
  },
  openGraph: {
    title: 'Search The Vistas Summerlin Homes for Sale',
    description:
      'Filter active homes for sale in The Vistas Summerlin by price and property type.',
    url: `${getSiteUrl()}/search`,
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