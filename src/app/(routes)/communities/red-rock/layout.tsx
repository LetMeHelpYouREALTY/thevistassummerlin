import type { ReactNode } from 'react';
import { brandPageMetadata, withBrandKeywords } from '@/lib/brand-metadata';

export const metadata = brandPageMetadata({
  title: 'Red Rock | Las Vegas area guide',
  description:
    'Red Rock community spotlight near Summerlin—lifestyle context and real estate guidance from Dr. Jan Duffy with local expertise and flexible scheduling.',
  path: '/communities/red-rock',
  keywords: withBrandKeywords([
    'Red Rock Las Vegas',
    'Red Rock real estate',
    'Summerlin adjacent',
    'Dr. Jan Duffy',
  ]),
});

export default function RedRockCommunityLayout({ children }: { children: ReactNode }) {
  return children;
}
