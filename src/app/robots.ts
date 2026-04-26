import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site-url'

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
        ],
      },
    ],
    sitemap: [
      `${site}/sitemap.xml`,
      `${site}/image-sitemap.xml`,
      `${site}/feed.xml`,
    ],
    host: site,
  }
}
