import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'The Vistas Summerlin Communities | Dr. Jan Duffy',
  description:
    'Explore The Vistas Summerlin communities in Las Vegas, including luxury neighborhoods, amenities, and current home opportunities.',
  alternates: {
    canonical: 'https://www.thevistassummerlin.com/communities',
  },
  openGraph: {
    title: 'The Vistas Summerlin Communities',
    description:
      'Explore Vistas Summerlin neighborhoods and available homes with Dr. Jan Duffy.',
    url: 'https://www.thevistassummerlin.com/communities',
  },
};

export default function CommunitiesLayout({ children }: { children: ReactNode }) {
  return children;
}
