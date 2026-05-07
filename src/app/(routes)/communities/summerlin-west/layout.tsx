import type { ReactNode } from 'react';
import { brandPageMetadata, withBrandKeywords } from '@/lib/brand-metadata';

export const metadata = brandPageMetadata({
  title: 'Summerlin West | Community guide',
  description:
    'Summerlin West community spotlight—amenities, home styles, and real estate guidance with Dr. Jan Duffy’s data-informed Summerlin strategy.',
  path: '/communities/summerlin-west',
  keywords: withBrandKeywords([
    'Summerlin West Las Vegas',
    'Summerlin West homes for sale',
    'Summerlin master plan',
    'Dr. Jan Duffy Summerlin West',
  ]),
});

export default function SummerlinWestLayout({ children }: { children: ReactNode }) {
  return children;
}
