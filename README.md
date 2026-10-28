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
3. **Admin dashboard** — open `/admin` and enter `ADMIN_SECRET`:
   - **Projects** — upload case studies + images  
   - **Services** — add/edit services  
   - **Messages** — contact form inbox

## Deploy (Vercel)

1. Import `mosesadebayo319-cmd/mosesfolio`
2. Set `NEXT_PUBLIC_SITE_URL` to your production URL
3. Deploy

## Contact

- WhatsApp for work: +234 812 432 8229  
- Direct calls: +234 816 469 4058  
- Email: mosesadebayo319@gmail.com  

## Project assistant

The floating project assistant is served from `public/project-assistant.html`, with its responsive host in `src/components/ProjectAssistant.tsx`. It only loads when opened and keeps conversation state in the current page session. Closing it does not submit anything.

Set `GROQ_API_KEY` as a server-only Vercel environment variable for Production and Preview. `GROQ_MODEL` optionally overrides the default `llama-3.3-70b-versatile` (verified in Groq's supported models documentation during implementation). Redeploy after changing environment variables. Never use a `NEXT_PUBLIC_` prefix for credentials.

The `/api/assistant` endpoint uses verified portfolio content, bounds and validates conversation input, and applies a best-effort per-instance rate limit. It does not log conversations or call outbound messaging tools. Messages submitted to the conversational assistant are processed by Groq. Without a working connection, guided service choices and enquiry preparation remain available. The enquiry is reviewed locally before the visitor chooses to open WhatsApp and send it.

Approved pricing ranges supplied by Moses are stored in `src/lib/assistant-pricing.ts`. The model selects valid service/tier identifiers; the server returns canonical NGN ranges and billing units, including hourly software rates and enterprise project fees. The UI renders indicative ranges, not binding offers. No authority to discount below these ranges or approve delivery/payment terms has been supplied. The server accepts `groq_api_key` as a compatibility alias for `GROQ_API_KEY`.
