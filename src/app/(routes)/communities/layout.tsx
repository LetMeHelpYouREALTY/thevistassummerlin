import type { ReactNode } from 'react';
import { brandPageMetadata, withBrandKeywords } from '@/lib/brand-metadata';

export const metadata = brandPageMetadata({
  title: 'Vistas communities | Neighborhood guide',
  description:
    'Explore all Summerlin subcommunities in The Vistas—amenities, character, and active home opportunities with data-informed guidance from Dr. Jan Duffy.',
  path: '/communities',
  keywords: withBrandKeywords([
    'The Vistas Summerlin communities',
    'Summerlin neighborhood guide',
    'Vistas Summerlin homes for sale',
    'Canterra',
    'Kingwood',
    'Santalina',
  ]),
  socialTitle: 'The Vistas Summerlin communities | Neighborhood guide',
});

export default function CommunitiesLayout({ children }: { children: ReactNode }) {
  return children;
}
