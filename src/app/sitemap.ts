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

const staticRoutes: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/search', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/communities', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/properties/11773-golden-moments-avenue', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/valuation', changeFrequency: 'monthly', priority: 0.88 },
  { path: '/sell', changeFrequency: 'monthly', priority: 0.82 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/agents/dr-jan-duffy', changeFrequency: 'monthly', priority: 0.78 },
  { path: '/community-guide', changeFrequency: 'monthly', priority: 0.72 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.65 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.68 },
  { path: '/testimonials', changeFrequency: 'monthly', priority: 0.62 },
  { path: '/market-reports', changeFrequency: 'weekly', priority: 0.65 },
  { path: '/market-analysis', changeFrequency: 'weekly', priority: 0.62 },
  { path: '/investment', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/sold', changeFrequency: 'monthly', priority: 0.58 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const fromConstants = getNeighborhoodSlugs()
  const communitySlugs = [
    ...new Set([...fromConstants, ...EXTRA_COMMUNITY_SLUGS]),
  ].sort((a, b) => a.localeCompare(b, 'en'))

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const communityEntries: MetadataRoute.Sitemap = communitySlugs.map((slug) => ({
    url: `${baseUrl}/communities/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: slug === 'canterra' || slug === 'portofino' ? 0.85 : 0.8,
  }))

  return [...staticEntries, ...communityEntries]
}
