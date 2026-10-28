# Expressive portfolio redesign

Review branch only. Do not merge or promote to production until Moses approves.

## Direction

Warm ivory and ink with lime and violet accents. Oversized typography, a portrait collage, staggered project previews, and a consistent visual system across Home, Work, Services, About, Experience, Contact, and Testimonials.

## Interactions to review

- Portrait responds to a mouse pointer, with touch and reduced-motion exceptions.
- Work filters separate websites/products and marketing. Cards link to the complete case studies on the same page.
- Services expand and collapse using native, keyboard-accessible disclosures.
- Mobile menu closes after navigation and with Escape.
- Reveals, rotating graphic elements, and moving collaborator logos respect reduced motion. Footer includes a pause control.
- Project calls to action open the existing assistant. Its pricing logic, keyboard handling, and contact handoff remain intact.
- Contact form uses the existing endpoint. Work WhatsApp and direct phone numbers remain separate.
- CV download, GitHub, other social profiles, current Jeda Systems role, project stacks, and source-backed campaign figures are retained.

## Review notes

The production domain is unchanged. The Vercel preview runs on its own branch. Preview contact submissions should only be tested with a mocked endpoint to avoid sending a real enquiry. Physical iPhone keyboard behavior still warrants a device check.
