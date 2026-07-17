import { NextResponse } from 'next/server'
import { isAuthorizedRequest } from '@/src/lib/admin-auth'
import {
  deleteTestimonial,
  getSql,
  isDatabaseConfigured,
  updateTestimonial,
} from '@/src/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 503 })
  }
  const id = Number(params.id)
  if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  try {
    const body = await request.json()
    const sql = getSql()!
    const testimonial = await updateTestimonial(sql, id, {
      name: body.name !== undefined ? String(body.name) : undefined,
      role: body.role !== undefined ? String(body.role) : undefined,
      company: body.company !== undefined ? String(body.company) : undefined,
      quote: body.quote !== undefined ? String(body.quote) : undefined,
      link: body.link !== undefined ? String(body.link) : undefined,
      rating: body.rating !== undefined ? Number(body.rating) : undefined,
      published: body.published !== undefined ? Boolean(body.published) : undefined,
      sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
    })
    if (!testimonial) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ testimonial })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 503 })
  }
  const id = Number(params.id)
  if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  try {
    const sql = getSql()!
    const ok = await deleteTestimonial(sql, id)
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
