# Admin publishing

Sign in at `/admin`. Published changes appear on a fresh visit to the public pages; no redeployment is required for content updates.

| Editor | Public placement |
| --- | --- |
| Projects | Home project grid and Work / case studies |
| Featured project | The first published featured project in saved order fills the homepage feature; other published projects remain in the grid |
| Services | Home service cards and Services page |
| Packages | Services page |
| Testimonials | Client feedback page |

## Projects and images

Add a title, category, role, client, live project link, tools, challenge, strategy, execution, and any supported results. Results are optional; leave unsupported figures blank. Use Results context to explain limitations or illustrative screenshot data.

Upload JPEG, PNG, WebP, or GIF images up to 15 MB. Uploads are compressed in the browser into JPEG and stored with the project. Transparency is flattened onto white. HTTPS image links and existing site image paths are also supported. Animated GIF uploads become a still preview.

Use **Fill frame** for images without side gaps; edges may crop. Use **Show full image** when the entire screenshot must remain visible. Crop position supports top, centre, and bottom. The editor previews the same 16:9 image treatment used by homepage cards. Detailed case studies retain the full image. Failed image links show a neutral placeholder.

Uncheck Published to save a draft. Uncheck Featured to keep a published project only in the grid. Reorder projects with the order controls; the first featured published item becomes the large homepage story. View case study opens the published item directly.

## Existing content and migration

The first authenticated login, or first authenticated content mutation, imports the current built-in content into the database once. It preserves existing project records and images, fills missing project metadata, and does not overwrite existing service, package, or testimonial collections. Existing retired case studies stay unpublished. The current Heroes Help Social Media Programme is preserved.

Initialization uses a PostgreSQL transaction and advisory lock. Collection markers prevent a later login from recreating deleted content. Imported items become editable in the same dashboard. The schema changes are additive and preserve stored records. Drafts are excluded from public queries. A configured database error does not republish old static projects.

Site identity, the CV, experience, and collaborator logos remain maintained in the site source; they are not fields in these editors.

## Verification

Run `node --test tests/admin-content.test.cjs`, `npm run lint`, and `npm run build`.

The complete browser flow was also exercised with an isolated PostgreSQL 16 database through a local Neon-compatible HTTP bridge: upload → authenticated API → SQL persistence → homepage and case studies, including featured ordering, metadata, image fit, drafts, deletion, empty collections, initialization idempotence, validation, services, packages, and testimonials. No production credentials or content were used for those tests.

Uploaded image bytes are served by `/api/project-images/[id]` for published projects only. Public page payloads contain image URLs, not copies of the base64 file. Responses use ETags and must revalidate, so edits remain current and unpublished image requests return 404.
