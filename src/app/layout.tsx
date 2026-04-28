import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/realscout-widgets.css";
import Script from 'next/script';
import { 
  RealEstateExpertSchema, 
  FAQSchema, 
  LocalBusinessSchema, 
  RealEstateListingSchema,
  WebsiteSchema,
  OrganizationSchema,
  ReviewSchema,
  ServiceSchema,
} from '@/components/StructuredData';
import { CalendlyBadge } from '@/components/CalendlyBadge';
import { GbpActionStrip } from '@/components/sections/gbp-action-strip';
import { getSiteUrl } from '@/lib/site-url';

const siteUrl = getSiteUrl();

/** Supports server-only or `NEXT_PUBLIC_*` (if duplicated in Vercel for tooling). */
const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
  undefined;

const bingSiteVerification = process.env.BING_SITE_VERIFICATION?.trim();
const yandexSiteVerification = process.env.YANDEX_SITE_VERIFICATION?.trim();

const verificationMeta: NonNullable<Metadata["other"]> = {};
if (bingSiteVerification) verificationMeta["msvalidate.01"] = bingSiteVerification;
if (yandexSiteVerification)
  verificationMeta["yandex-verification"] = yandexSiteVerification;

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.json",
  title: {
    default: "The Vistas Summerlin | Berkshire Hathaway HomeServices Nevada Properties - Dr. Jan Duffy",
    template: "%s | The Vistas Summerlin | Berkshire Hathaway HomeServices Nevada Properties"
  },
  description: "Luxury homes in The Vistas Summerlin starting at $800K. Expert realtor Dr. Jan Duffy with Berkshire Hathaway HomeServices specializing in Las Vegas luxury real estate.",
  keywords: [
    "The Vistas Summerlin",
    "Vistas Summerlin homes for sale",
    "The Vistas Las Vegas",
    "Dr. Jan Duffy realtor",
    "Summerlin luxury homes",
    "Las Vegas luxury real estate",
    "The Vistas community center",
    "11312 Parkside Way",
    "flexible scheduling real estate",
    "Berkshire Hathaway HomeServices",
    "Berkshire Hathaway Nevada Properties",
    "BHHS Nevada Properties",
    "Berkshire Hathaway real estate agent"
  ],
  authors: [{ name: "Dr. Jan Duffy", url: siteUrl }],
  creator: "Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties Real Estate Expert",
  publisher: "Berkshire Hathaway HomeServices Nevada Properties | Dr. Jan Duffy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "The Vistas Summerlin | Homes by Dr. Jan Duffy - Las Vegas Expert",
    description: "The Vistas Summerlin offers luxury homes starting at $800K. Expert realtor Dr. Jan Duffy specializing in The Vistas community with flexible scheduling that works around YOUR lifestyle.",
    url: siteUrl,
    siteName: "The Vistas Summerlin | Homes by Dr. Jan Duffy",
    images: [
      {
        url: "/subcommunities/IMG_0737.JPG",
        width: 1200,
        height: 630,
        alt: "The Vistas Summerlin Luxury Homes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Vistas Summerlin | Homes by Dr. Jan Duffy - Las Vegas Expert",
    description: "The Vistas Summerlin offers luxury homes starting at $800K. Expert realtor Dr. Jan Duffy specializing in The Vistas community with flexible scheduling that works around YOUR lifestyle.",
    images: ["/subcommunities/IMG_0737.JPG"],
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  ...(Object.keys(verificationMeta).length ? { other: verificationMeta } : {}),
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fonts: Playfair + DM Sans via next/font/google (self-hosted); do not add Google Fonts links or @import — avoids duplicate network + render blocking */}
        {/* Theme color for supported browsers (Chrome, Safari, Edge) */}
        <meta name="theme-color" content="#2C3E50" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a252f" media="(prefers-color-scheme: dark)" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas" />
        <meta name="geo.position" content="36.1699;-115.1398" />
        <meta name="ICBM" content="36.1699, -115.1398" />
        <meta name="language" content="en-US" />
        
        {/* RSS Feed for Google Discover Follow Feature */}
        <link rel="alternate" type="application/rss+xml" 
              href={`${siteUrl}/feed.xml`} 
              title="The Vistas Summerlin Updates" />
        
        {/* Favicon Links for Google Search Results */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
        
        {/* Performance: preconnect with crossOrigin so hints match subresource fetches (avoids "unused" preconnect warnings) */}
        <link rel="preconnect" href="https://em.realscout.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.realscout.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://em.realscout.com" />
        <link rel="dns-prefetch" href="https://www.realscout.com" />
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
        {/* Calendly badge: official stylesheet (required for correct badge chrome) */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        
        {/* Business Information */}
        <meta name="business:contact_data:locality" content="Las Vegas" />
        <meta name="business:contact_data:region" content="NV" />
        <meta name="business:contact_data:postal_code" content="89138" />
        <meta name="business:contact_data:country_name" content="United States" />
        
        {/* 2025 SEO Schema Markup */}
        <RealEstateExpertSchema />
        <FAQSchema />
        <LocalBusinessSchema />
        <RealEstateListingSchema />
        <WebsiteSchema />
        <OrganizationSchema />
        <ReviewSchema />
        <ServiceSchema />
        
        {/* RealScout: afterInteractive so first paint is not behind ~200KB+ widget eval (LCP/TBT) */}
        <Script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          type="module"
          strategy="afterInteractive"
          id="realscout-widgets"
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
          id="calendly-widget-js"
        />
      </head>
      <body className={`antialiased ${playfair.variable} ${dmSans.variable} font-secondary text-text-light bg-deep`}>
        <GbpActionStrip />
        {/* Floating badge: init matches Calendly snippet (15min event, brand colors); see CalendlyBadge + globals.css placement */}
        <CalendlyBadge />
        {children}
      </body>
    </html>
  );
}
