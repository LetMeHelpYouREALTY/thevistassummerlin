import type { Metadata } from 'next';
import { withBrandKeywords } from '@/lib/brand-metadata';

// Vercel CLI on Windows can fail prebuilt packaging ("Unable to find lambda for route") for
// static App Router pages when file-tracing fallbacks list many routes. Forcing this segment
// to request-time rendering ensures each route has a server bundle. `/` stays static via `app/page.tsx`.
// See: https://github.com/vercel/next.js/issues/82155
export const dynamic = 'force-dynamic';

/**
 * Segment-wide defaults only (no title/canonical/OG URL): those must be set per route so
 * inner pages never inherit the homepage canonical.
 */
export const metadata: Metadata = {
  keywords: withBrandKeywords([
    'The Vistas community center',
    '11312 Parkside Way',
    'Las Vegas 89138',
    'flexible scheduling real estate',
    'Summerlin subcommunities',
    'data-informed listing strategy',
  ]),
};

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
