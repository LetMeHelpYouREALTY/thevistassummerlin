import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendlyButton } from '@/components/CalendlyButton';
import Navigation from '@/components/sections/navigation';
import { getSiteUrl } from '@/lib/site-url';

type AgentPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: AgentPageProps): Promise<Metadata> {
  const { id } = await params;
  const canonical = `${getSiteUrl()}/agents/${id}`;

  if (id !== 'dr-jan-duffy') {
    return {
      title: 'Agent Not Found | The Vistas Summerlin',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: 'Dr. Jan Duffy REALTOR | The Vistas Summerlin',
    description:
      'Meet Dr. Jan Duffy, real estate agent for The Vistas Summerlin in Summerlin West, Las Vegas. Office at 11312 Parkside Way. Call or text (702) 500-0607.',
    alternates: { canonical },
    openGraph: {
      title: 'Dr. Jan Duffy REALTOR | The Vistas Summerlin',
      description:
        'Local Vistas Summerlin market guidance and personalized home buying support from Dr. Jan Duffy.',
      url: canonical,
    },
  };
}

export default async function AgentProfilePage({ params }: AgentPageProps) {
  const { id } = await params;
  if (id !== 'dr-jan-duffy') notFound();

  return (
    <>
    <Navigation />
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Dr. Jan Duffy, real estate agent</h1>
      <p className="mb-6 text-lg text-gray-700">
        Homes by Dr. Jan Duffy · The Vistas Summerlin, Summerlin West, Las Vegas
      </p>
      <p className="mb-4 text-gray-700 leading-7">
        Dr. Jan Duffy serves buyers and sellers in The Vistas Summerlin and nearby Las Vegas
        communities with flexible scheduling and local market expertise. She helps clients evaluate
        neighborhood fit, pricing strategy, and listing opportunities with a clear, data-informed
        process.
      </p>
      <p className="mb-8 text-gray-700 leading-7">
        Contact: <a className="underline" href="tel:+17025000607">(702) 500-0607</a> |{' '}
        <a className="underline" href="mailto:DrJanSells@TheVistasSummerlin.com">
          DrJanSells@TheVistasSummerlin.com
        </a>
      </p>

      <div className="mb-6">
        <CalendlyButton utmCampaign="agents-profile" />
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/communities" className="underline">
          Explore Communities
        </Link>
        <Link href="/search" className="underline">
          Search Homes
        </Link>
        <Link href="/contact" className="underline">
          Contact Page
        </Link>
      </div>
    </main>
    </>
  );
}