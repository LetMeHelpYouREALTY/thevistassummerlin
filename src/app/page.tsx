import Home from './home';
import { BRAND_META_DESCRIPTION } from '@/lib/brand-kit';
import { brandPageMetadata, withBrandKeywords } from '@/lib/brand-metadata';

export const metadata = brandPageMetadata({
  title: 'Luxury Summerlin homes & local expertise',
  description: BRAND_META_DESCRIPTION,
  path: '/',
  keywords: withBrandKeywords([
    'The Vistas Summerlin',
    'Dr. Jan Duffy realtor',
    'Canterra',
    'Summerlin master-planned community',
  ]),
  socialTitle: 'The Vistas Summerlin | Luxury homes by Dr. Jan Duffy',
});

export default function Page() {
  return <Home />;
}
