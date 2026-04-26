import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
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
      'https://www.thevistassummerlin.com/sitemap.xml',
      'https://www.thevistassummerlin.com/image-sitemap.xml',
      'https://www.thevistassummerlin.com/feed.xml',
    ],
    host: 'https://www.thevistassummerlin.com',
  }
}
