import { headers } from 'next/headers';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { getSiteUrl } from '@/lib/site-url';

const SEGMENT_LABELS: Record<string, string> = {
  about: 'About',
  blog: 'Blog',
  buy: 'Buy',
  communities: 'Communities',
  contact: 'Contact',
  faq: 'FAQ',
  search: 'Search Homes',
  sell: 'Sell',
  testimonials: 'Testimonials',
  valuation: 'Home Valuation',
  'community-guide': 'Community Guide',
  'market-reports': 'Market Reports',
  'market-analysis': 'Market Analysis',
  investment: 'Investment',
  hoa: 'HOA',
  privacy: 'Privacy',
  terms: 'Terms',
  sold: 'Sold Homes',
  properties: 'Properties',
};

function labelForSegment(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Auto BreadcrumbList for (routes) inner pages. Community detail pages emit their own
 * BreadcrumbSchema with richer labels — skip those to avoid duplicate JSON-LD.
 */
export async function PathBreadcrumbSchema() {
  const pathname = (await headers()).get('x-pathname') ?? '';
  if (!pathname || pathname === '/') return null;

  const pagesWithCustomBreadcrumbs = new Set(['/faq', '/testimonials']);
  if (pagesWithCustomBreadcrumbs.has(pathname)) return null;

  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'communities' && segments.length > 1) return null;

  const siteUrl = getSiteUrl();
  const items: Array<{ name: string; url: string }> = [{ name: 'Home', url: siteUrl }];

  let path = '';
  for (const segment of segments) {
    path += `/${segment}`;
    items.push({
      name: labelForSegment(segment),
      url: `${siteUrl}${path}`,
    });
  }

  return <BreadcrumbSchema items={items} />;
}
