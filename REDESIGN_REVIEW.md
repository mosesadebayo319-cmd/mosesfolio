# Jeda layout portfolio preview

Review only. Do not merge or release to production until Moses approves this preview.

## Direction

Recreates the public layout and measured typography of jedaacademy.com in the existing Next.js application: rounded navigation, equal hero panels, four information cards, image tiles, a featured project, gradient project filtering, portrait sections, and a four-column footer. Headings use Inter; navigation and body copy use Montserrat, hosted locally. The reference uses WordPress TutorStarter and Elementor. No Jeda Academy logos, photographs, illustrations, copy, or source code are included.

## Review interactions

- Live project search and category selection, with an empty-state reset; existing detailed case-study filters remain available.
- Service disclosures, project links, mobile navigation, image hover transitions, scroll reveals, and full-colour animated collaborator logos.
- Reduced-motion support and the existing motion pause control.
- Decorative numbering, arrows, tagline labels, and tiny section labels removed. Functional controls, project results, and contact details retained.
- Existing project assistant preserves pricing controls, keyboard handling, suggested replies, and reviewed WhatsApp handoff.
- CV, social profiles, Jeda Systems experience, documented results, direct phone, and separate work WhatsApp preserved.

Contact form checks use a mocked endpoint so verification does not send a real enquiry. Existing design-foundation attribution remains visible; see THIRD_PARTY_NOTICES.md.

## Homepage audit refinements

The homepage now has one wide ImpactDesk feature and one searchable grid for the remaining projects. Collaborator logos appear directly after the introduction; the repeated image-tile gallery and extra contact banner are removed. Project images use landscape frames with contain fitting, campaign results are readable HTML, and service/biography sections are shorter. ImpactDesk screenshot figures remain explicitly identified as illustrative.

Legacy admin ImpactDesk entries with alternate IDs are consolidated in the public project merge, keeping the reviewed case study and preserving stored data. Browser checks cover responsive layouts, grid filters/search/reset, case-study navigation, assistant opening/closing, the CV, reduced motion, and a mocked contact submission. A focused project-merge check verifies canonical precedence and retention of unrelated projects.
