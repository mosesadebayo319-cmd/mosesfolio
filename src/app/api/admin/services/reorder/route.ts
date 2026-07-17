import { NextResponse } from 'next/server'
import { isAuthorizedRequest } from '@/src/lib/admin-auth'
import { getSql, isDatabaseConfigured, reorderServices } from '@/src/lib/db'

export async function POST(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const ids = Array.isArray(body?.ids)
      ? body.ids.map(Number).filter((n: number) => Number.isFinite(n) && n > 0)
      : []
    if (!ids.length) {
      return NextResponse.json({ error: 'ids array required' }, { status: 400 })
    }
    const sql = getSql()!
    await reorderServices(sql, ids)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 })
  }
}
