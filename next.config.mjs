/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudflare Workers has no built-in Next.js image optimizer on the free plan;
    // images are served as-is (they're already web-sized).
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'mecuryx.com' },
      { protocol: 'https', hostname: 'sgsministry.org' },
      { protocol: 'https', hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'heroeshelp.org.ng' },
      { protocol: 'https', hostname: 'www.heroeshelp.org.ng' },
    ],
  },
}

export default nextConfig

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
initOpenNextCloudflareForDev()
