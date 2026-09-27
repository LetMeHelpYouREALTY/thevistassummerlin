import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import { AmenityMap } from '@/components/amenities/AmenityMap';
import {
  AmenitiesAgentAreaSchema,
  AmenitiesBreadcrumbSchema,
  AmenitiesFaqSchema,
  AmenitiesPlacesItemListSchema,
  VistasCommunityPlaceSchema,
} from '@/components/amenities/AmenitiesStructuredData';
import { RealEstateExpertSchema } from '@/components/StructuredData';
import { CalendlyButton } from '@/components/CalendlyButton';
import { GBP_OFFICE_ADDRESS, gbpTelHref } from '@/lib/gbp';
import { VISTAS_COMMUNITY, AMENITY_CATEGORY_LABELS } from '@/lib/amenities/community-config';
import {
  AMENITIES_FAQS,
  CATEGORY_COPY,
  COMMUTE_COPY,
} from '@/lib/amenities/page-content';
import { getSiteUrl } from '@/lib/site-url';
import { MapPin, Phone, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: `Nearby Amenities in ${VISTAS_COMMUNITY.name}, Las Vegas | Local Guide`,
  description:
    'Interactive map and hyperlocal guide to restaurants, grocery, parks, golf, healthcare, schools, and shopping near The Vistas Summerlin. Dr. Jan Duffy, Las Vegas REALTOR.',
  openGraph: {
    title: `Nearby Amenities in ${VISTAS_COMMUNITY.name}, Las Vegas`,
    description:
      'Explore what is near The Vistas Summerlin—dining, errands, recreation, and commute snapshots with an interactive amenity map.',
    url: `${getSiteUrl()}/amenities`,
    type: 'website',
  },
  alternates: {
    canonical: `${getSiteUrl()}/amenities`,
  },
};

export default function AmenitiesPage() {
  return (
    <div className="flex min-h-screen flex-col font-secondary text-gray-800 bg-gray-50">
      <AmenitiesFaqSchema />
      <AmenitiesBreadcrumbSchema />
      <AmenitiesPlacesItemListSchema />
      <VistasCommunityPlaceSchema />
      <AmenitiesAgentAreaSchema />
      <RealEstateExpertSchema />
      <Navigation />
      <main className="flex-grow">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-blue-200 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Nearby Amenities</span>
            </nav>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-blue-100 text-sm mb-6">
              <MapPin className="w-4 h-4" aria-hidden />
              {VISTAS_COMMUNITY.regionLabel}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Nearby Amenities in {VISTAS_COMMUNITY.name}, Las Vegas
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
              Use the interactive map to filter restaurants, grocery, parks, golf, healthcare,
              pharmacies, shopping, fitness, and schools around {VISTAS_COMMUNITY.shortName}. Written
              sections below stay in plain HTML for search and answer engines.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive amenity map</h2>
            <AmenityMap variant="full" mapHeight={480} />
            <p className="mt-4 text-sm text-gray-500">
              Categories:{' '}
              {Object.values(AMENITY_CATEGORY_LABELS).join(', ')}. Map data requires{' '}
              <code className="text-xs bg-gray-100 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>
              ; without it, a static embed and curated list appear instead.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {CATEGORY_COPY.map((block) => (
              <article key={block.id} id={block.id} className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{block.title}</h2>
                {block.paragraphs.map((p) => (
                  <p key={p} className="text-gray-700 leading-relaxed mb-3 max-w-3xl">
                    {p}
                  </p>
                ))}
              </article>
            ))}

            <article>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{COMMUTE_COPY.title}</h2>
              <ul className="space-y-3 max-w-3xl">
                {COMMUTE_COPY.items.map((item) => (
                  <li key={item.label} className="flex gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden />
                    <span>
                      <strong className="text-gray-900">{item.label}:</strong> {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Amenities FAQ for {VISTAS_COMMUNITY.shortName} buyers
            </h2>
            <div className="space-y-4">
              {AMENITIES_FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden"
                >
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-gray-900 list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-blue-600 text-sm group-open:rotate-180 transition-transform" aria-hidden>
                      ▼
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-gray-700 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Your hyperlocal REALTOR for {VISTAS_COMMUNITY.shortName}</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Dr. Jan Duffy helps buyers and sellers navigate all 28 Vistas subcommunities with
              data-backed pricing and neighborhood context. Nevada license S.0197614.LLC · Berkshire
              Hathaway HomeServices Nevada Properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href={gbpTelHref()}
                className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-900 px-6 py-3 font-semibold hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-5 h-5" aria-hidden />
                Call Dr. Jan: (702) 500-0607
              </a>
              <CalendlyButton variant="button" utmCampaign="amenities-page" />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                Contact
                <ArrowRight className="w-5 h-5" aria-hidden />
              </Link>
            </div>
            <p className="text-sm text-blue-200">
              {GBP_OFFICE_ADDRESS} · DrJanSells@TheVistasSummerlin.com
            </p>
            <p className="mt-6 text-sm text-blue-300">
              <Link href="/communities" className="underline hover:text-white">Explore Vistas neighborhoods</Link>
              {' · '}
              <Link href="/search" className="underline hover:text-white">Search MLS listings</Link>
              {' · '}
              <Link href="/community-guide" className="underline hover:text-white">Community guide</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
