# Mosesfolio

Portfolio for **Moses Oluwashina Adebayo** — digital marketing & web growth partner (Abuja, Nigeria).

## Stack

- Next.js 14 (App Router)
- TypeScript + Tailwind CSS
- FormSubmit.co contact API (no key required; confirm email once)
- Optional GA4 via `NEXT_PUBLIC_GA_ID`

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — offer, stats, work, proof, process |
| `/services` | Packages + detailed services |
| `/case-studies` | Full case studies with anchors |
| `/about` | Story, skills, recent roles |
| `/experience` | Full timeline |
| `/contact` | WhatsApp-first + form |
| `/testimonials` | Client quotes |

## Setup

```bash
npm install
npm run dev
```

### Environment

See `.env.example`. Important:

```env
NEXT_PUBLIC_SITE_URL=https://mosesfolio.online
DATABASE_URL=postgresql://...   # Neon free Postgres — stores form messages
ADMIN_SECRET=your-secret        # password for /admin
# NEXT_PUBLIC_GA_ID=G-XXXXXXXX  # optional
```

### Contact form + database

1. **Database** — messages are saved to Postgres (`contact_submissions` table).  
   Free setup guide: [docs/DATABASE_SETUP.md](./docs/DATABASE_SETUP.md) (Neon + Vercel).
2. **Email** — a copy is still sent to `mosesadebayo319@gmail.com` via FormSubmit.  
   Confirm FormSubmit once via the activation email if needed.
3. **View messages** — open `/admin` and enter `ADMIN_SECRET`.

## Deploy (Vercel)

1. Import `mosesadebayo319-cmd/mosesfolio`
2. Set `NEXT_PUBLIC_SITE_URL` to your production URL
3. Deploy

## Contact

- WhatsApp: +234 812 432 8229  
- Email: mosesadebayo319@gmail.com  
