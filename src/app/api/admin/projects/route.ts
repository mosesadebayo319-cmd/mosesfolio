import { NextResponse } from 'next/server'
import { isAuthorizedRequest } from '@/src/lib/admin-auth'
import {
  createProject,
  getSql,
  isDatabaseConfigured,
  listProjects,
} from '@/src/lib/db'

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'DATABASE_URL not set', projects: [] }, { status: 503 })
  }
  try {
    const sql = getSql()!
    const projects = await listProjects(sql)
    return NextResponse.json({ projects })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to load projects', projects: [] }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 503 })
  }

  try {
    const body = await request.json()
    if (!body?.title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Limit data-URL images (~1.5MB base64 ≈ 2M chars safety)
    if (body.image && String(body.image).length > 2_000_000) {
      return NextResponse.json(
        { error: 'Image too large. Use a smaller image (under ~1.5MB) or an image URL.' },
        { status: 400 }
      )
    }

    const sql = getSql()!
    const project = await createProject(sql, {
      title: String(body.title).trim(),
      client: body.client ? String(body.client) : undefined,
      industry: body.industry ? String(body.industry) : undefined,
      timeframe: body.timeframe ? String(body.timeframe) : undefined,
      category: body.category ? String(body.category) : undefined,
      image: body.image ? String(body.image) : undefined,
      problem: body.problem ? String(body.problem) : undefined,
      strategy: body.strategy ? String(body.strategy) : undefined,
      execution: body.execution ? String(body.execution) : undefined,
      metric1: body.metric1 ? String(body.metric1) : undefined,
      label1: body.label1 ? String(body.label1) : undefined,
      metric2: body.metric2 ? String(body.metric2) : undefined,
      label2: body.label2 ? String(body.label2) : undefined,
      metric3: body.metric3 ? String(body.metric3) : undefined,
      label3: body.label3 ? String(body.label3) : undefined,
      testimonial: body.testimonial ? String(body.testimonial) : undefined,
      testimonial_author: body.testimonial_author
        ? String(body.testimonial_author)
        : undefined,
      featured: Boolean(body.featured),
      published: body.published !== false,
      sort_order: Number(body.sort_order) || 0,
      slug: body.slug ? String(body.slug) : undefined,
    })
    return NextResponse.json({ project }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to create project' },
      { status: 500 }
    )
  }
}
