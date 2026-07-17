import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

export type ContactSubmission = {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  budget: string | null
  message: string
  created_at: string
}

export function getSql(): NeonQueryFunction<false, false> | null {
  const url = process.env.DATABASE_URL
  if (!url) return null
  return neon(url)
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL)
}

/** Create the contact_submissions table if it does not exist. */
export async function ensureContactTable(
  sql: NeonQueryFunction<false, false>
): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      budget TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

export async function saveContactSubmission(
  sql: NeonQueryFunction<false, false>,
  data: {
    name: string
    email: string
    phone?: string
    subject: string
    budget?: string
    message: string
  }
): Promise<ContactSubmission> {
  await ensureContactTable(sql)

  const rows = await sql`
    INSERT INTO contact_submissions (name, email, phone, subject, budget, message)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.phone || null},
      ${data.subject},
      ${data.budget || null},
      ${data.message}
    )
    RETURNING id, name, email, phone, subject, budget, message, created_at
  `

  return rows[0] as ContactSubmission
}

export async function listContactSubmissions(
  sql: NeonQueryFunction<false, false>
): Promise<ContactSubmission[]> {
  await ensureContactTable(sql)

  const rows = await sql`
    SELECT id, name, email, phone, subject, budget, message, created_at
    FROM contact_submissions
    ORDER BY created_at DESC
    LIMIT 200
  `

  return rows as ContactSubmission[]
}
