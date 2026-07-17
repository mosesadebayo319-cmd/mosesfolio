import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

export type ContactSubmission = {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  budget: string | null
  message: string
  created_at: string
}

export type DbService = {
  id: number
  title: string
  description: string
  benefits: string[]
  deliverables: string[]
  pricing: string | null
  best_for: string | null
  flagship: boolean
  slug: string
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type DbProject = {
  id: number
  title: string
  client: string | null
  industry: string | null
  timeframe: string | null
  category: string | null
  image: string | null
  problem: string | null
  strategy: string | null
  execution: string | null
  metric1: string | null
  label1: string | null
  metric2: string | null
  label2: string | null
  metric3: string | null
  label3: string | null
  testimonial: string | null
  testimonial_author: string | null
  slug: string
  featured: boolean
  published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export function getSql(): NeonQueryFunction<false, false> | null {
  const url = process.env.DATABASE_URL
  if (!url) return null
  return neon(url)
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String)
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed.map(String) : []
    } catch {
      return value
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    }
  }
  return []
}

function mapService(row: Record<string, unknown>): DbService {
  return {
    id: Number(row.id),
    title: String(row.title),
    description: String(row.description),
    benefits: parseStringArray(row.benefits),
    deliverables: parseStringArray(row.deliverables),
    pricing: row.pricing != null ? String(row.pricing) : null,
    best_for: row.best_for != null ? String(row.best_for) : null,
    flagship: Boolean(row.flagship),
    slug: String(row.slug),
    sort_order: Number(row.sort_order ?? 0),
    published: Boolean(row.published),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  }
}

function mapProject(row: Record<string, unknown>): DbProject {
  return {
    id: Number(row.id),
    title: String(row.title),
    client: row.client != null ? String(row.client) : null,
    industry: row.industry != null ? String(row.industry) : null,
    timeframe: row.timeframe != null ? String(row.timeframe) : null,
    category: row.category != null ? String(row.category) : null,
    image: row.image != null ? String(row.image) : null,
    problem: row.problem != null ? String(row.problem) : null,
    strategy: row.strategy != null ? String(row.strategy) : null,
    execution: row.execution != null ? String(row.execution) : null,
    metric1: row.metric1 != null ? String(row.metric1) : null,
    label1: row.label1 != null ? String(row.label1) : null,
    metric2: row.metric2 != null ? String(row.metric2) : null,
    label2: row.label2 != null ? String(row.label2) : null,
    metric3: row.metric3 != null ? String(row.metric3) : null,
    label3: row.label3 != null ? String(row.label3) : null,
    testimonial: row.testimonial != null ? String(row.testimonial) : null,
    testimonial_author:
      row.testimonial_author != null ? String(row.testimonial_author) : null,
    slug: String(row.slug),
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    sort_order: Number(row.sort_order ?? 0),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  }
}

export async function ensureAllTables(
  sql: NeonQueryFunction<false, false>
): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      budget TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS site_services (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
      deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
      pricing TEXT,
      best_for TEXT,
      flagship BOOLEAN NOT NULL DEFAULT false,
      slug TEXT NOT NULL UNIQUE,
      sort_order INT NOT NULL DEFAULT 0,
      published BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS site_projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      client TEXT,
      industry TEXT,
      timeframe TEXT,
      category TEXT,
      image TEXT,
      problem TEXT,
      strategy TEXT,
      execution TEXT,
      metric1 TEXT,
      label1 TEXT,
      metric2 TEXT,
      label2 TEXT,
      metric3 TEXT,
      label3 TEXT,
      testimonial TEXT,
      testimonial_author TEXT,
      slug TEXT NOT NULL UNIQUE,
      featured BOOLEAN NOT NULL DEFAULT false,
      published BOOLEAN NOT NULL DEFAULT true,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

/** @deprecated use ensureAllTables */
export async function ensureContactTable(
  sql: NeonQueryFunction<false, false>
): Promise<void> {
  await ensureAllTables(sql)
}

export async function saveContactSubmission(
  sql: NeonQueryFunction<false, false>,
  data: {
    name: string
    email: string
    phone?: string
    subject: string
    budget?: string
    message: string
  }
): Promise<ContactSubmission> {
  await ensureAllTables(sql)

  const rows = await sql`
    INSERT INTO contact_submissions (name, email, phone, subject, budget, message)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.phone || null},
      ${data.subject},
      ${data.budget || null},
      ${data.message}
    )
    RETURNING id, name, email, phone, subject, budget, message, created_at
  `

  return rows[0] as ContactSubmission
}

export async function listContactSubmissions(
  sql: NeonQueryFunction<false, false>
): Promise<ContactSubmission[]> {
  await ensureAllTables(sql)

  const rows = await sql`
    SELECT id, name, email, phone, subject, budget, message, created_at
    FROM contact_submissions
    ORDER BY created_at DESC
    LIMIT 200
  `

  return rows as ContactSubmission[]
}

// ─── Services ───────────────────────────────────────────────

export async function listServices(
  sql: NeonQueryFunction<false, false>,
  opts?: { publishedOnly?: boolean }
): Promise<DbService[]> {
  await ensureAllTables(sql)
  const rows = opts?.publishedOnly
    ? await sql`
        SELECT * FROM site_services
        WHERE published = true
        ORDER BY sort_order ASC, id DESC
      `
    : await sql`
        SELECT * FROM site_services
        ORDER BY sort_order ASC, id DESC
      `
  return (rows as Record<string, unknown>[]).map(mapService)
}

export async function createService(
  sql: NeonQueryFunction<false, false>,
  data: {
    title: string
    description: string
    benefits: string[]
    deliverables: string[]
    pricing?: string
    best_for?: string
    flagship?: boolean
    slug?: string
    sort_order?: number
    published?: boolean
  }
): Promise<DbService> {
  await ensureAllTables(sql)
  const slug = data.slug || slugify(data.title) || `service-${Date.now()}`
  const benefits = JSON.stringify(data.benefits || [])
  const deliverables = JSON.stringify(data.deliverables || [])

  const rows = await sql`
    INSERT INTO site_services (
      title, description, benefits, deliverables, pricing, best_for,
      flagship, slug, sort_order, published
    )
    VALUES (
      ${data.title},
      ${data.description},
      ${benefits}::jsonb,
      ${deliverables}::jsonb,
      ${data.pricing || null},
      ${data.best_for || null},
      ${data.flagship ?? false},
      ${slug},
      ${data.sort_order ?? 0},
      ${data.published ?? true}
    )
    RETURNING *
  `
  return mapService(rows[0] as Record<string, unknown>)
}

export async function updateService(
  sql: NeonQueryFunction<false, false>,
  id: number,
  data: Partial<{
    title: string
    description: string
    benefits: string[]
    deliverables: string[]
    pricing: string
    best_for: string
    flagship: boolean
    slug: string
    sort_order: number
    published: boolean
  }>
): Promise<DbService | null> {
  await ensureAllTables(sql)
  const existing = await sql`SELECT * FROM site_services WHERE id = ${id}`
  if (!existing.length) return null
  const cur = existing[0] as Record<string, unknown>

  const title = data.title ?? String(cur.title)
  const description = data.description ?? String(cur.description)
  const benefits = JSON.stringify(
    data.benefits ?? parseStringArray(cur.benefits)
  )
  const deliverables = JSON.stringify(
    data.deliverables ?? parseStringArray(cur.deliverables)
  )
  const pricing =
    data.pricing !== undefined
      ? data.pricing || null
      : cur.pricing != null
        ? String(cur.pricing)
        : null
  const best_for =
    data.best_for !== undefined
      ? data.best_for || null
      : cur.best_for != null
        ? String(cur.best_for)
        : null
  const flagship = data.flagship ?? Boolean(cur.flagship)
  const slug = data.slug ?? String(cur.slug)
  const sort_order = data.sort_order ?? Number(cur.sort_order ?? 0)
  const published = data.published ?? Boolean(cur.published)

  const rows = await sql`
    UPDATE site_services SET
      title = ${title},
      description = ${description},
      benefits = ${benefits}::jsonb,
      deliverables = ${deliverables}::jsonb,
      pricing = ${pricing},
      best_for = ${best_for},
      flagship = ${flagship},
      slug = ${slug},
      sort_order = ${sort_order},
      published = ${published},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return mapService(rows[0] as Record<string, unknown>)
}

export async function deleteService(
  sql: NeonQueryFunction<false, false>,
  id: number
): Promise<boolean> {
  await ensureAllTables(sql)
  const rows = await sql`DELETE FROM site_services WHERE id = ${id} RETURNING id`
  return rows.length > 0
}

// ─── Projects ───────────────────────────────────────────────

export async function listProjects(
  sql: NeonQueryFunction<false, false>,
  opts?: { publishedOnly?: boolean; featuredOnly?: boolean }
): Promise<DbProject[]> {
  await ensureAllTables(sql)

  if (opts?.featuredOnly && opts?.publishedOnly) {
    const rows = await sql`
      SELECT * FROM site_projects
      WHERE published = true AND featured = true
      ORDER BY sort_order ASC, id DESC
    `
    return (rows as Record<string, unknown>[]).map(mapProject)
  }

  if (opts?.publishedOnly) {
    const rows = await sql`
      SELECT * FROM site_projects
      WHERE published = true
      ORDER BY sort_order ASC, id DESC
    `
    return (rows as Record<string, unknown>[]).map(mapProject)
  }

  const rows = await sql`
    SELECT * FROM site_projects
    ORDER BY sort_order ASC, id DESC
  `
  return (rows as Record<string, unknown>[]).map(mapProject)
}

export async function createProject(
  sql: NeonQueryFunction<false, false>,
  data: {
    title: string
    client?: string
    industry?: string
    timeframe?: string
    category?: string
    image?: string
    problem?: string
    strategy?: string
    execution?: string
    metric1?: string
    label1?: string
    metric2?: string
    label2?: string
    metric3?: string
    label3?: string
    testimonial?: string
    testimonial_author?: string
    slug?: string
    featured?: boolean
    published?: boolean
    sort_order?: number
  }
): Promise<DbProject> {
  await ensureAllTables(sql)
  const slug = data.slug || slugify(data.title) || `project-${Date.now()}`

  const rows = await sql`
    INSERT INTO site_projects (
      title, client, industry, timeframe, category, image,
      problem, strategy, execution,
      metric1, label1, metric2, label2, metric3, label3,
      testimonial, testimonial_author,
      slug, featured, published, sort_order
    )
    VALUES (
      ${data.title},
      ${data.client || null},
      ${data.industry || null},
      ${data.timeframe || null},
      ${data.category || null},
      ${data.image || null},
      ${data.problem || null},
      ${data.strategy || null},
      ${data.execution || null},
      ${data.metric1 || null},
      ${data.label1 || null},
      ${data.metric2 || null},
      ${data.label2 || null},
      ${data.metric3 || null},
      ${data.label3 || null},
      ${data.testimonial || null},
      ${data.testimonial_author || null},
      ${slug},
      ${data.featured ?? false},
      ${data.published ?? true},
      ${data.sort_order ?? 0}
    )
    RETURNING *
  `
  return mapProject(rows[0] as Record<string, unknown>)
}

export async function updateProject(
  sql: NeonQueryFunction<false, false>,
  id: number,
  data: Partial<{
    title: string
    client: string
    industry: string
    timeframe: string
    category: string
    image: string
    problem: string
    strategy: string
    execution: string
    metric1: string
    label1: string
    metric2: string
    label2: string
    metric3: string
    label3: string
    testimonial: string
    testimonial_author: string
    slug: string
    featured: boolean
    published: boolean
    sort_order: number
  }>
): Promise<DbProject | null> {
  await ensureAllTables(sql)
  const existing = await sql`SELECT * FROM site_projects WHERE id = ${id}`
  if (!existing.length) return null
  const cur = existing[0] as Record<string, unknown>

  const pick = (key: string, val: string | undefined) =>
    val !== undefined
      ? val || null
      : cur[key] != null
        ? String(cur[key])
        : null

  const title = data.title ?? String(cur.title)
  const client = pick('client', data.client)
  const industry = pick('industry', data.industry)
  const timeframe = pick('timeframe', data.timeframe)
  const category = pick('category', data.category)
  const image = pick('image', data.image)
  const problem = pick('problem', data.problem)
  const strategy = pick('strategy', data.strategy)
  const execution = pick('execution', data.execution)
  const metric1 = pick('metric1', data.metric1)
  const label1 = pick('label1', data.label1)
  const metric2 = pick('metric2', data.metric2)
  const label2 = pick('label2', data.label2)
  const metric3 = pick('metric3', data.metric3)
  const label3 = pick('label3', data.label3)
  const testimonial = pick('testimonial', data.testimonial)
  const testimonial_author = pick('testimonial_author', data.testimonial_author)
  const slug = data.slug ?? String(cur.slug)
  const featured = data.featured ?? Boolean(cur.featured)
  const published = data.published ?? Boolean(cur.published)
  const sort_order = data.sort_order ?? Number(cur.sort_order ?? 0)

  const rows = await sql`
    UPDATE site_projects SET
      title = ${title},
      client = ${client},
      industry = ${industry},
      timeframe = ${timeframe},
      category = ${category},
      image = ${image},
      problem = ${problem},
      strategy = ${strategy},
      execution = ${execution},
      metric1 = ${metric1},
      label1 = ${label1},
      metric2 = ${metric2},
      label2 = ${label2},
      metric3 = ${metric3},
      label3 = ${label3},
      testimonial = ${testimonial},
      testimonial_author = ${testimonial_author},
      slug = ${slug},
      featured = ${featured},
      published = ${published},
      sort_order = ${sort_order},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return mapProject(rows[0] as Record<string, unknown>)
}

export async function deleteProject(
  sql: NeonQueryFunction<false, false>,
  id: number
): Promise<boolean> {
  await ensureAllTables(sql)
  const rows = await sql`DELETE FROM site_projects WHERE id = ${id} RETURNING id`
  return rows.length > 0
}
