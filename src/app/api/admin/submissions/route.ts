import { NextResponse } from 'next/server'
import { isAuthorizedRequest } from '@/src/lib/admin-auth'
import {
  getSql,
  isDatabaseConfigured,
  listContactSubmissions,
} from '@/src/lib/db'

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        error: 'DATABASE_URL is not set.',
        submissions: [],
      },
      { status: 503 }
    )
  }

  try {
    const sql = getSql()
    if (!sql) {
      return NextResponse.json(
        { error: 'Database unavailable', submissions: [] },
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
