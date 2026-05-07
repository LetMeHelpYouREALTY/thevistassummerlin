import { brandPageMetadata, withBrandKeywords } from '@/lib/brand-metadata';

export const metadata = brandPageMetadata({
  title: 'About Dr. Jan Duffy',
  description:
    'Meet Dr. Jan Duffy—local market expertise, data-informed strategy, and personalized service for buyers and sellers across 28 Vistas Summerlin subcommunities.',
  path: '/about',
  keywords: withBrandKeywords([
    'Dr. Jan Duffy REALTOR',
    'The Vistas Summerlin real estate expert',
    'Las Vegas REALTOR Summerlin',
    'buyer seller strategy Summerlin',
  ]),
  socialTitle: 'About Dr. Jan Duffy | The Vistas Summerlin real estate expert',
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
