import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, isValidAdminSecret } from '@/src/lib/admin-auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const secret = String(body?.secret || '')

    if (!process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'ADMIN_SECRET is not configured on the server.' },
        { status: 503 }
      )
    }

    if (!isValidAdminSecret(secret)) {
      return NextResponse.json({ error: 'Invalid admin secret' }, { status: 401 })
    }

    const res = NextResponse.json({ success: true })
    res.cookies.set(ADMIN_COOKIE, secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })
  return res
}
