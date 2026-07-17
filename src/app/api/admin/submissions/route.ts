import { NextResponse } from 'next/server'
import {
  getSql,
  isDatabaseConfigured,
  listContactSubmissions,
} from '@/src/lib/db'

function isAuthorized(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false

  const header = request.headers.get('authorization')
  if (header === `Bearer ${secret}`) return true

  const url = new URL(request.url)
  if (url.searchParams.get('secret') === secret) return true

  return false
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          'DATABASE_URL is not set. Add a Neon Postgres connection string in Vercel env vars.',
        submissions: [],
      },
      { status: 503 }
    )
  }

  try {
    const sql = getSql()
    if (!sql) {
      return NextResponse.json(
        { error: 'Database client unavailable', submissions: [] },
        { status: 503 }
      )
    }

    const submissions = await listContactSubmissions(sql)
    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('List submissions failed:', error)
    return NextResponse.json(
      { error: 'Failed to load submissions', submissions: [] },
      { status: 500 }
    )
  }
}
