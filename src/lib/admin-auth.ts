import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'mosesfolio_admin'

export function getAdminSecret(): string | undefined {
  return process.env.ADMIN_SECRET
}

export function isValidAdminSecret(secret: string | null | undefined): boolean {
  const expected = getAdminSecret()
  if (!expected || !secret) return false
  return secret === expected
}

/** Authorize from Bearer header, ?secret=, or admin cookie */
export function isAuthorizedRequest(request: Request): boolean {
  const expected = getAdminSecret()
  if (!expected) return false

  const header = request.headers.get('authorization')
  if (header === `Bearer ${expected}`) return true

  const url = new URL(request.url)
  if (url.searchParams.get('secret') === expected) return true

  const cookieHeader = request.headers.get('cookie') || ''
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE}=([^;]+)`)
  )
  if (match && decodeURIComponent(match[1]) === expected) return true

  return false
}

export async function isAuthorizedFromCookies(): Promise<boolean> {
  const expected = getAdminSecret()
  if (!expected) return false
  const jar = cookies()
  const value = jar.get(ADMIN_COOKIE)?.value
  return value === expected
}
