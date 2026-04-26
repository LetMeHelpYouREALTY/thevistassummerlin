import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getSiteUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'The Vistas Summerlin Communities | Neighborhood Guide & Homes for Sale',
  description:
    'Explore The Vistas Summerlin neighborhood guide with community-by-community home styles, amenities, and links to active homes for sale in Las Vegas.',
  keywords: [
    'The Vistas Summerlin communities',
    'Summerlin neighborhood guide',
    'Vistas Summerlin homes for sale',
    'Las Vegas luxury neighborhoods',
    'Canterra Kingwood Santalina',
  ],
  alternates: {
    canonical: `${getSiteUrl()}/communities`,
  },
  openGraph: {
    title: 'The Vistas Summerlin Communities | Neighborhood Guide',
    description:
      'Compare The Vistas Summerlin neighborhoods, amenities, and active home opportunities.',
    url: `${getSiteUrl()}/communities`,
  },
};

export default function CommunitiesLayout({ children }: { children: ReactNode }) {
  return children;
}
