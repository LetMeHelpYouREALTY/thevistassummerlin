import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  typedRoutes: false,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // Other page redirects (middleware handles www/HTTP redirects)
      {
        source: '/market',
        destination: '/market-reports',
        permanent: true,
      },
      {
        source: '/communities/img_0738',
        destination: '/communities/img-0738',
        permanent: true,
      },
      {
        source: '/map',
        destination: '/communities',
        permanent: true,
      },
      {
        source: '/communities/summerlin-park',
        destination: '/communities',
        permanent: true,
      },
      {
        source: '/blog/:page(\\d+)',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/amenities',
        destination: '/community-guide',
        permanent: true,
      },
      {
        source: '/communities/canyon-ridge',
        destination: '/communities',
        permanent: true,
      },
      {
        source: '/communities/img-0737',
        destination: '/communities/barrington',
        permanent: true,
      },
      {
        source: '/communities/img-0738',
        destination: '/communities/kingwood',
        permanent: true,
      },
      {
        source: '/communities/img-0739',
        destination: '/communities/santalina',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; base-uri 'self'; frame-ancestors 'self' https://vercel.com https://*.vercel.com; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://em.realscout.com https://www.realscout.com; connect-src 'self' https://em.realscout.com https://www.realscout.com https:; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:; frame-src 'self' https://www.google.com https://www.youtube.com https://player.vimeo.com https://em.realscout.com https://www.realscout.com;",
          },
        ],
      },
    ]
  },
};

export default nextConfig; 