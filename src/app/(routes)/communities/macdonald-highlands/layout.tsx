import type { ReactNode } from 'react';
import { brandPageMetadata, withBrandKeywords } from '@/lib/brand-metadata';

export const metadata = brandPageMetadata({
  title: 'MacDonald Highlands | Luxury community guide',
  description:
    'MacDonald Highlands luxury overview—views, amenities, and buying or selling with trusted guidance from Dr. Jan Duffy in the greater Summerlin market.',
  path: '/communities/macdonald-highlands',
  keywords: withBrandKeywords([
    'MacDonald Highlands Las Vegas',
    'MacDonald Highlands luxury homes',
    'Henderson luxury real estate',
    'Dr. Jan Duffy MacDonald Highlands',
  ]),
});

export default function MacDonaldHighlandsLayout({ children }: { children: ReactNode }) {
  return children;
}
