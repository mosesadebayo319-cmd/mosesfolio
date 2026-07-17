/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mecuryx.com',
      },
      {
        protocol: 'https',
        hostname: 'sgsministry.org',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'd2xsxph8kpxj0f.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'pub-1407f82391df4ab1951418d04be76914.r2.dev',
      },
    ],
  },
}

export default nextConfig
