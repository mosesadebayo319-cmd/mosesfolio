import { NextResponse } from 'next/server'
import { isAuthorizedRequest } from '@/src/lib/admin-auth'
import { deleteProject, getSql, isDatabaseConfigured, updateProject } from '@/src/lib/db'

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
    if (body.image && String(body.image).length > 2_000_000) {
      return NextResponse.json(
        { error: 'Image too large. Use a smaller image or an image URL.' },
        { status: 400 }
      )
    }

    const sql = getSql()!
    const str = (k: string) =>
      body[k] !== undefined ? String(body[k]) : undefined

    const project = await updateProject(sql, id, {
      title: str('title'),
      client: str('client'),
      industry: str('industry'),
      timeframe: str('timeframe'),
      category: str('category'),
      image: str('image'),
      problem: str('problem'),
      strategy: str('strategy'),
      execution: str('execution'),
      metric1: str('metric1'),
      label1: str('label1'),
      metric2: str('metric2'),
      label2: str('label2'),
      metric3: str('metric3'),
      label3: str('label3'),
      testimonial: str('testimonial'),
      testimonial_author: str('testimonial_author'),
      slug: str('slug'),
      featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
      published:
        body.published !== undefined ? Boolean(body.published) : undefined,
      sort_order:
        body.sort_order !== undefined ? Number(body.sort_order) : undefined,
    })
    if (!project) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ project })
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
    const ok = await deleteProject(sql, id)
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
