import type { ReactNode } from 'react';
import { brandPageMetadata, withBrandKeywords } from '@/lib/brand-metadata';

export const metadata = brandPageMetadata({
  title: 'Southern Highlands | Community guide',
  description:
    'Southern Highlands lifestyle and homes overview—market context and buyer/seller strategy with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.',
  path: '/communities/southern-highlands',
  keywords: withBrandKeywords([
    'Southern Highlands Las Vegas',
    'Southern Highlands homes',
    'luxury neighborhood Las Vegas',
    'Dr. Jan Duffy Southern Highlands',
  ]),
});

export default function SouthernHighlandsLayout({ children }: { children: ReactNode }) {
  return children;
}
