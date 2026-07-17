# Contact form database setup (Neon + Vercel)

Form submissions are stored in a **Postgres** database (Neon free tier works well) and can still be emailed via FormSubmit.

## 1. Create a free database

1. Go to [https://neon.tech](https://neon.tech) and sign up (GitHub login is fine)
2. Create a project (e.g. `mosesfolio`)
3. Copy the **connection string** (starts with `postgresql://...`)

You do **not** need to create tables manually — the app creates `contact_submissions` on first use.

## 2. Add env vars on Vercel

Project → **Settings → Environment Variables**:

| Name | Value |
|------|--------|
| `DATABASE_URL` | Your Neon connection string |
| `ADMIN_SECRET` | A long random password only you know |
| `NEXT_PUBLIC_SITE_URL` | `https://mosesfolio.online` |

Apply to **Production** (and Preview if you want).

## 3. Redeploy

Deployments → **Redeploy** the latest production deployment  
(or push a small commit so Vercel rebuilds).

## 4. View messages

1. Open: `https://mosesfolio.online/admin`
2. Enter your `ADMIN_SECRET`
3. Click **Load messages**

## 5. How data flows

```
Contact form
  → /api/contact
  → saves row in Postgres (contact_submissions)
  → also emails mosesadebayo319@gmail.com (FormSubmit)
```

## Table shape

| Column | Type |
|--------|------|
| id | serial |
| name | text |
| email | text |
| phone | text (optional) |
| subject | text |
| budget | text (optional) |
| message | text |
| created_at | timestamptz |

## Local development

1. Copy `.env.example` → `.env.local`
2. Paste the same `DATABASE_URL` and `ADMIN_SECRET`
3. `npm install` && `npm run dev`
