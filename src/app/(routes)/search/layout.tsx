import type { ReactNode } from 'react';
import { brandPageMetadata, withBrandKeywords } from '@/lib/brand-metadata';

export const metadata = brandPageMetadata({
  title: 'Property search',
  description:
    'Search The Vistas Summerlin homes with filters by price, beds, baths, and property type—active MLS inventory with Dr. Jan Duffy’s local expertise.',
  path: '/search',
  keywords: withBrandKeywords([
    'The Vistas Summerlin homes for sale',
    'property search Las Vegas',
    'Summerlin luxury homes',
    'active MLS listings',
    'townhomes Summerlin',
    'single family homes Summerlin',
  ]),
  socialTitle: 'Search homes for sale | The Vistas Summerlin',
});

export default function SearchLayout({ children }: { children: ReactNode }) {
  return children;
}
