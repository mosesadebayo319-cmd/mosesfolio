import { NextResponse } from 'next/server'
import { isAuthorizedRequest } from '@/src/lib/admin-auth'
import {
  deletePackage,
  getSql,
  isDatabaseConfigured,
  updatePackage,
} from '@/src/lib/db'

function linesToArray(value: unknown): string[] | undefined {
  if (value === undefined) return undefined
  if (Array.isArray(value)) return value.map(String).filter(Boolean)
  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

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
    const pkg = await updatePackage(sql, id, {
      title: body.title !== undefined ? String(body.title) : undefined,
      description:
        body.description !== undefined ? String(body.description) : undefined,
      includes: linesToArray(body.includes),
      best_for: body.best_for !== undefined ? String(body.best_for) : undefined,
      not_for: body.not_for !== undefined ? String(body.not_for) : undefined,
      pricing: body.pricing !== undefined ? String(body.pricing) : undefined,
      published: body.published !== undefined ? Boolean(body.published) : undefined,
      sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
      slug: body.slug !== undefined ? String(body.slug) : undefined,
    })
    if (!pkg) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ package: pkg })
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
    const ok = await deletePackage(sql, id)
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
