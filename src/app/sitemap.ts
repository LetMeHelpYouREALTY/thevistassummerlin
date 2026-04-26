import { MetadataRoute } from 'next'
import { getNeighborhoodSlugs } from '@/constants/neighborhoods'

const baseUrl = 'https://www.thevistassummerlin.com'

const staticRoutes: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/valuation', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/communities', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/search', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/sell', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/market-reports', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/market-analysis', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/investment', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/community-guide', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/properties/11773-golden-moments-avenue', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/testimonials', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/agents/dr-jan-duffy', changeFrequency: 'monthly', priority: 0.8 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  // Keep sitemap focused on canonical neighborhood slugs.
  // Image-derived legacy slugs are still reachable via redirects when needed.
  const communitySlugs = getNeighborhoodSlugs()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const communityEntries: MetadataRoute.Sitemap = communitySlugs.map((slug) => ({
    url: `${baseUrl}/communities/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticEntries, ...communityEntries]
}
