import { NextResponse } from 'next/server'
import { isAuthorizedRequest } from '@/src/lib/admin-auth'
import {
  createTestimonial,
  getSql,
  isDatabaseConfigured,
  listTestimonials,
} from '@/src/lib/db'

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'DATABASE_URL not set', testimonials: [] }, { status: 503 })
  }
  try {
    const sql = getSql()!
    const testimonials = await listTestimonials(sql)
    return NextResponse.json({ testimonials })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to load', testimonials: [] }, { status: 500 })
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
    if (!body?.name?.trim() || !body?.quote?.trim()) {
      return NextResponse.json({ error: 'Name and quote are required' }, { status: 400 })
    }
    const sql = getSql()!
    const testimonial = await createTestimonial(sql, {
      name: String(body.name).trim(),
      role: body.role ? String(body.role) : undefined,
      company: body.company ? String(body.company) : undefined,
      quote: String(body.quote).trim(),
      link: body.link ? String(body.link) : undefined,
      rating: Number(body.rating) || 5,
      published: body.published !== false,
      sort_order: Number(body.sort_order) || 0,
    })
    return NextResponse.json({ testimonial }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
