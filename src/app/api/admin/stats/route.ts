import { NextResponse } from 'next/server'
import { isAuthorizedRequest } from '@/src/lib/admin-auth'
import { getDashboardStats, getSql, isDatabaseConfigured } from '@/src/lib/db'

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: 'DATABASE_URL not set', stats: null },
      { status: 503 }
    )
  }
  try {
    const sql = getSql()!
    const stats = await getDashboardStats(sql)
    return NextResponse.json({ stats })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to load stats', stats: null }, { status: 500 })
  }
}
