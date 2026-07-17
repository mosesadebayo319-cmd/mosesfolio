import {
  caseStudies as staticCaseStudies,
  featuredProjects as staticFeatured,
  services as staticServices,
} from '@/src/data/content'
import { getSql, listProjects, listServices, type DbProject, type DbService } from '@/src/lib/db'

export type PublicService = {
  id: string
  title: string
  description: string
  benefits: string[]
  deliverables: string[]
  pricing: string
  bestFor: string
  flagship: boolean
}

export type PublicProject = {
  id: string
  title: string
  client: string
  industry: string
  timeframe: string
  category: string
  image: string
  problem: string
  strategy: string
  execution: string
  results: {
    metric1: string
    label1: string
    metric2: string
    label2: string
    metric3: string
    label3: string
  }
  testimonial: string
  testimonialAuthor: string
  featured?: boolean
}

function mapDbService(s: DbService): PublicService {
  return {
    id: s.slug || String(s.id),
    title: s.title,
    description: s.description,
    benefits: s.benefits,
    deliverables: s.deliverables,
    pricing: s.pricing || 'Custom Quote',
    bestFor: s.best_for || '',
    flagship: s.flagship,
  }
}

function mapDbProject(p: DbProject): PublicProject {
  return {
    id: p.slug || String(p.id),
    title: p.title,
    client: p.client || '',
    industry: p.industry || '',
    timeframe: p.timeframe || '',
    category: p.category || 'Project',
    image: p.image || '/case-studies/digital-campaigns.jpg',
    problem: p.problem || '',
    strategy: p.strategy || '',
    execution: p.execution || '',
    results: {
      metric1: p.metric1 || '—',
      label1: p.label1 || 'Result',
      metric2: p.metric2 || '—',
      label2: p.label2 || 'Result',
      metric3: p.metric3 || '—',
      label3: p.label3 || 'Result',
    },
    testimonial: p.testimonial || '',
    testimonialAuthor: p.testimonial_author || '',
    featured: p.featured,
  }
}

function mapStaticServices(): PublicService[] {
  return staticServices.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    benefits: s.benefits,
    deliverables: s.deliverables,
    pricing: s.pricing,
    bestFor: s.bestFor,
    flagship: s.flagship,
  }))
}

function mapStaticProjects(): PublicProject[] {
  return staticCaseStudies.map((c) => ({
    id: c.id,
    title: c.title,
    client: c.client,
    industry: c.industry,
    timeframe: c.timeframe,
    category: c.category,
    image: c.image,
    problem: c.problem,
    strategy: c.strategy,
    execution: c.execution,
    results: c.results,
    testimonial: c.testimonial,
    testimonialAuthor: c.testimonialAuthor,
  }))
}

/** Published services from DB, or static fallback */
export async function getPublicServices(): Promise<PublicService[]> {
  try {
    const sql = getSql()
    if (!sql) return mapStaticServices()
    const rows = await listServices(sql, { publishedOnly: true })
    if (!rows.length) return mapStaticServices()
    return rows.map(mapDbService)
  } catch (e) {
    console.error('getPublicServices failed:', e)
    return mapStaticServices()
  }
}

/** Published projects from DB, or static fallback */
export async function getPublicProjects(): Promise<PublicProject[]> {
  try {
    const sql = getSql()
    if (!sql) return mapStaticProjects()
    const rows = await listProjects(sql, { publishedOnly: true })
    if (!rows.length) return mapStaticProjects()
    return rows.map(mapDbProject)
  } catch (e) {
    console.error('getPublicProjects failed:', e)
    return mapStaticProjects()
  }
}

/** Featured projects for home — DB featured, else first 3, else static */
export async function getFeaturedProjects(): Promise<
  { title: string; category: string; result: string; image: string; href: string }[]
> {
  try {
    const sql = getSql()
    if (sql) {
      let rows = await listProjects(sql, {
        publishedOnly: true,
        featuredOnly: true,
      })
      if (!rows.length) {
        rows = (await listProjects(sql, { publishedOnly: true })).slice(0, 3)
      }
      if (rows.length) {
        return rows.map((p) => ({
          title: p.title,
          category: p.category || 'Project',
          result: [p.metric1, p.label1].filter(Boolean).join(' ') || 'View case study',
          image: p.image || '/case-studies/digital-campaigns.jpg',
          href: `/case-studies#${p.slug}`,
        }))
      }
    }
  } catch (e) {
    console.error('getFeaturedProjects failed:', e)
  }

  return staticFeatured
}
