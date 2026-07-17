/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
