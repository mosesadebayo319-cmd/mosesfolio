import {
  services,
  servicePackages,
  homeTestimonials,
} from "@/src/data/content";
import { getDefaultProjects, projectIdentity } from "@/src/lib/content-loader";
import {
  ensureAllTables,
  isContentInitialized,
  listProjects,
  listServices,
  listPackages,
  listTestimonials,
  type getSql,
} from "@/src/lib/db";

type Sql = NonNullable<ReturnType<typeof getSql>>;

/** Import the currently visible built-ins once, after an authenticated admin login.
 * Nothing is deleted. Once initialized, an empty collection intentionally stays empty.
 */
export async function initializeAdminContent(sql: Sql) {
  await ensureAllTables(sql);
  const collections = [
    "projects",
    "services",
    "packages",
    "testimonials",
  ] as const;
  const initialized = await Promise.all(
    collections.map((collection) => isContentInitialized(sql, collection)),
  );
  if (initialized.every(Boolean)) return;
  const queries = [sql`SELECT pg_advisory_xact_lock(74687301)`];
  if (!initialized[0]) {
    const existing = await listProjects(sql);
    for (const [index, project] of Array.from(getDefaultProjects().entries())) {
      const matching = existing.find(
        (row) =>
          projectIdentity({ id: row.slug, title: row.title }) ===
          projectIdentity(project),
      );
      if (matching) {
        queries.push(sql`UPDATE site_projects SET
          role = COALESCE(role, ${project.role || null}),
          stack = CASE WHEN stack = '[]'::jsonb THEN ${JSON.stringify(project.stack || [])}::jsonb ELSE stack END,
          stack_label = COALESCE(stack_label, ${project.stackLabel || null}),
          project_url = COALESCE(project_url, ${project.projectUrl || null}),
          image_caption = COALESCE(image_caption, ${project.imageCaption || null}),
          outcome_note = COALESCE(outcome_note, ${project.outcomeNote || null}),
          result_heading = COALESCE(result_heading, ${project.resultHeading || null})
          WHERE id = ${matching.id} AND NOT EXISTS (SELECT 1 FROM site_content_state WHERE collection = 'projects')`);
      } else {
        queries.push(sql`INSERT INTO site_projects
          (slug, title, client, industry, timeframe, category, image, role, stack, stack_label, project_url, image_fit, image_position, image_caption, outcome_note, result_heading,
           problem, strategy, execution, metric1, label1, metric2, label2, metric3, label3, testimonial, testimonial_author, featured, published, sort_order)
          SELECT ${project.id}, ${project.title}, ${project.client}, ${project.industry}, ${project.timeframe}, ${project.category}, ${project.image}, ${project.role || null},
           ${JSON.stringify(project.stack || [])}::jsonb, ${project.stackLabel || null}, ${project.projectUrl || null}, 'cover', 'top', ${project.imageCaption || null}, ${project.outcomeNote || null}, ${project.resultHeading || null},
           ${project.problem}, ${project.strategy}, ${project.execution}, ${project.results.metric1}, ${project.results.label1}, ${project.results.metric2}, ${project.results.label2}, ${project.results.metric3}, ${project.results.label3},
           ${project.testimonial}, ${project.testimonialAuthor}, ${project.id === "impactdesk"}, true, ${index + existing.length}
          WHERE NOT EXISTS (SELECT 1 FROM site_content_state WHERE collection = 'projects') ON CONFLICT (slug) DO NOTHING`);
      }
    }
    queries.push(
      sql`UPDATE site_projects SET published = false WHERE (slug IN ('seo-transformation', 'digital-campaign-launch', 'content-marketing-strategy') OR title = 'Heroes Help Social Growth') AND NOT EXISTS (SELECT 1 FROM site_content_state WHERE collection = 'projects')`,
    );
  }
  if (!initialized[1] && !(await listServices(sql)).length) {
    for (const [index, service] of Array.from(services.entries()))
      queries.push(sql`INSERT INTO site_services
      (slug, title, description, benefits, deliverables, pricing, best_for, flagship, sort_order)
      SELECT ${service.id}, ${service.title}, ${service.description}, ${JSON.stringify(service.benefits)}::jsonb, ${JSON.stringify(service.deliverables)}::jsonb, ${service.pricing}, ${service.bestFor}, ${service.flagship}, ${index}
      WHERE NOT EXISTS (SELECT 1 FROM site_content_state WHERE collection = 'services') ON CONFLICT (slug) DO NOTHING`);
  }
  if (!initialized[2] && !(await listPackages(sql)).length) {
    for (const [index, item] of Array.from(servicePackages.entries()))
      queries.push(sql`INSERT INTO site_packages
      (slug, title, description, includes, best_for, not_for, pricing, sort_order)
      SELECT ${item.id}, ${item.title}, ${item.description}, ${JSON.stringify(item.includes)}::jsonb, ${item.bestFor}, ${item.notFor}, ${item.pricing}, ${index}
      WHERE NOT EXISTS (SELECT 1 FROM site_content_state WHERE collection = 'packages') ON CONFLICT (slug) DO NOTHING`);
  }
  if (!initialized[3] && !(await listTestimonials(sql)).length) {
    for (const [index, item] of Array.from(homeTestimonials.entries()))
      queries.push(sql`INSERT INTO site_testimonials
      (name, role, company, quote, link, rating, sort_order)
      SELECT ${item.name}, ${item.role}, ${item.company}, ${item.text}, ${item.link}, ${item.rating}, ${index}
      WHERE NOT EXISTS (SELECT 1 FROM site_content_state WHERE collection = 'testimonials')`);
  }
  for (const collection of collections)
    queries.push(
      sql`INSERT INTO site_content_state (collection) VALUES (${collection}) ON CONFLICT DO NOTHING`,
    );
  await sql.transaction(queries);
}
