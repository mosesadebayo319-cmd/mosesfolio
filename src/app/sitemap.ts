import { MetadataRoute } from 'next'
import { site } from '@/src/data/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/services',
    '/case-studies',
    '/about',
    '/contact',
    '/experience',
    '/testimonials',
  ]

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
