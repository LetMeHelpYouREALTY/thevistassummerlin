import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Dr. Jan Duffy | The Vistas Summerlin Real Estate Expert',
  description: 'Meet Dr. Jan Duffy, REALTOR serving The Vistas Summerlin with local market expertise, flexible scheduling, and buyer/seller strategy.',
  keywords: [
    'Dr. Jan Duffy REALTOR',
    'The Vistas Summerlin real estate expert',
    'Las Vegas REALTOR Summerlin',
    'buyer seller strategy Summerlin',
  ],
  openGraph: {
    title: 'About Dr. Jan Duffy | The Vistas Summerlin Real Estate Expert',
    description: 'Local market specialist for The Vistas Summerlin with proven buyer and seller guidance.',
    url: 'https://www.thevistassummerlin.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.thevistassummerlin.com/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
