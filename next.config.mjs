/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'mecuryx.com' },
      { protocol: 'https', hostname: 'sgsministry.org' },
      { protocol: 'https', hostname: 'media.licdn.com' },
    ],
  },
}

export default nextConfig
