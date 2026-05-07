import type { ReactNode } from 'react';
import { brandPageMetadata, withBrandKeywords } from '@/lib/brand-metadata';

export const metadata = brandPageMetadata({
  title: 'The Vistas Summerlin community guide',
  description:
    'The Vistas Summerlin community overview—lifestyle, amenities, and buying or selling with Dr. Jan Duffy’s data-informed approach across 28 subcommunities.',
  path: '/communities/vistas',
  keywords: withBrandKeywords([
    'The Vistas Summerlin community',
    'Vistas Summerlin homes',
    'Summerlin living',
    'Dr. Jan Duffy Vistas',
  ]),
});

export default function VistasCommunityLayout({ children }: { children: ReactNode }) {
  return children;
}
