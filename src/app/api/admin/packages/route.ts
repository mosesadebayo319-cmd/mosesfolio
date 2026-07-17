import { NextResponse } from 'next/server'
import { isAuthorizedRequest } from '@/src/lib/admin-auth'
import {
  createPackage,
  getSql,
  isDatabaseConfigured,
  listPackages,
} from '@/src/lib/db'

function linesToArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean)
  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'DATABASE_URL not set', packages: [] }, { status: 503 })
  }
  try {
    const sql = getSql()!
    const packages = await listPackages(sql)
    return NextResponse.json({ packages })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to load', packages: [] }, { status: 500 })
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
    const sql = getSql()!
    const pkg = await createPackage(sql, {
      title: String(body.title).trim(),
      description: String(body.description || '').trim(),
      includes: linesToArray(body.includes),
      best_for: body.best_for ? String(body.best_for) : undefined,
      not_for: body.not_for ? String(body.not_for) : undefined,
      pricing: body.pricing ? String(body.pricing) : undefined,
      published: body.published !== false,
      sort_order: Number(body.sort_order) || 0,
      slug: body.slug ? String(body.slug) : undefined,
    })
    return NextResponse.json({ package: pkg }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
