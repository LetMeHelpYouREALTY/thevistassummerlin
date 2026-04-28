import { MetadataRoute } from 'next'
import { getNeighborhoodSlugs } from '@/constants/neighborhoods'
import { getSiteUrl } from '@/lib/site-url'

const baseUrl = getSiteUrl()

/**
 * Vistas subcommunity routes that exist in `app/(routes)/communities/*` but are not in
 * `constants/neighborhoods` (e.g. nav-only or extended coverage pages).
 * Keeps the XML sitemap aligned with real 200 URLs for Search Console.
 */
const EXTRA_COMMUNITY_SLUGS = [
  'ashton-park',
  'santaluz',
  'vistas',
  'red-rock',
  'summerlin-west',
  'macdonald-highlands',
  'southern-highlands',
  'img-0737',
  'img-0738',
  'img-0739',
] as const

const staticRoutes = [
  { path: '' },
  { path: '/search' },
  { path: '/communities' },
  { path: '/properties/11773-golden-moments-avenue' },
  { path: '/valuation' },
  { path: '/sell' },
  { path: '/about' },
  { path: '/contact' },
  { path: '/agents/dr-jan-duffy' },
  { path: '/community-guide' },
  { path: '/blog' },
  { path: '/faq' },
  { path: '/testimonials' },
  { path: '/market-reports' },
  { path: '/market-analysis' },
  { path: '/investment' },
  { path: '/sold' },
  { path: '/privacy' },
  { path: '/terms' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // `NEXT_PUBLIC_BASE_URL` should match the canonical Search Console property host.
  const fromConstants = getNeighborhoodSlugs()
  const communitySlugs = [
    ...new Set([...fromConstants, ...EXTRA_COMMUNITY_SLUGS]),
  ].sort((a, b) => a.localeCompare(b, 'en'))

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
  }))

  const communityEntries: MetadataRoute.Sitemap = communitySlugs.map((slug) => ({
    url: `${baseUrl}/communities/${slug}`,
  }))

  return [...staticEntries, ...communityEntries]
}
