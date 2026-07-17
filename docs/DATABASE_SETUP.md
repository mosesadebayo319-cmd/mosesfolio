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

## 4. Admin dashboard

1. Open: `https://mosesfolio.online/admin`
2. Enter your `ADMIN_SECRET` and sign in
3. Use tabs:
   - **Projects** — add case studies (title, story, metrics, image upload)
   - **Services** — add/edit services shown on `/services`
   - **Messages** — contact form submissions

### Notes on projects & services

- Until you add items in Admin, the public site shows the **default built-in** content.
- After you save at least one **published** project or service in the database, those replace the defaults for that section.
- Project images: upload a file (under ~1.4MB) or paste an image URL.
- Mark **Featured** to show a project on the homepage “Selected work” section.

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
