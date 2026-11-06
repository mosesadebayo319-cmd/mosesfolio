import {
  caseStudies as staticCaseStudies,
  homeTestimonials as staticTestimonials,
  servicePackages as staticPackages,
  services as staticServices,
} from "@/src/data/content";
import { recentCaseStudies } from "@/src/data/recent-case-studies";
import {
  getSql,
  listPackages,
  listProjects,
  listServices,
  listTestimonials,
  isContentInitialized,
  type DbPackage,
  type DbProject,
  type DbService,
  type DbTestimonial,
} from "@/src/lib/db";

export type PublicService = {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  deliverables: string[];
  pricing: string;
  bestFor: string;
  flagship: boolean;
};

export type PublicProject = {
  id: string;
  title: string;
  client: string;
  industry: string;
  timeframe: string;
  category: string;
  stack?: string[];
  stackLabel?: string;
  image: string;
  imageFit?: "contain" | "cover";
  imagePosition?: "top" | "center" | "bottom";
  imageCaption?: string;
  role?: string;
  projectUrl?: string;
  problem: string;
  strategy: string;
  execution: string;
  results: {
    metric1: string;
    label1: string;
    metric2: string;
    label2: string;
    metric3: string;
    label3: string;
  };
  testimonial: string;
  testimonialAuthor: string;
  featured?: boolean;
  resultHeading?: string;
  outcomeNote?: string;
};

export type PublicTestimonial = {
  name: string;
  role: string;
  company: string;
  text: string;
  link: string;
  rating: number;
};

export type PublicPackage = {
  id: string;
  title: string;
  description: string;
  includes: string[];
  bestFor: string;
  notFor: string;
  pricing: string;
};

function mapDbService(s: DbService): PublicService {
  return {
    id: s.slug || String(s.id),
    title: s.title,
    description: s.description,
    benefits: s.benefits,
    deliverables: s.deliverables,
    pricing: s.pricing || "Custom Quote",
    bestFor: s.best_for || "",
    flagship: s.flagship,
  };
}

function mapDbProject(p: DbProject): PublicProject {
  return {
    id: p.slug || String(p.id),
    title: p.title,
    client: p.client || "",
    industry: p.industry || "",
    timeframe: p.timeframe || "",
    category: p.category || "Project",
    image: p.image?.startsWith("data:")
      ? `/api/project-images/${p.id}?v=${encodeURIComponent(p.updated_at)}`
      : p.image || "/project-placeholder.svg",
    role: p.role || undefined,
    stack: p.stack,
    stackLabel: p.stack_label || undefined,
    projectUrl: p.project_url || undefined,
    imageFit: p.image_fit,
    imagePosition: p.image_position,
    imageCaption: p.image_caption || undefined,
    outcomeNote: p.outcome_note || undefined,
    resultHeading: p.result_heading || undefined,
    problem: p.problem || "",
    strategy: p.strategy || "",
    execution: p.execution || "",
    results: {
      metric1: p.metric1 || "—",
      label1: p.label1 || "Result",
      metric2: p.metric2 || "—",
      label2: p.label2 || "Result",
      metric3: p.metric3 || "—",
      label3: p.label3 || "Result",
    },
    testimonial: p.testimonial || "",
    testimonialAuthor: p.testimonial_author || "",
    featured: p.featured,
  };
}

function mapDbTestimonial(t: DbTestimonial): PublicTestimonial {
  return {
    name: t.name,
    role: t.role || "",
    company: t.company || "",
    text: t.quote,
    link: t.link || "#",
    rating: t.rating || 5,
  };
}

function mapDbPackage(p: DbPackage): PublicPackage {
  return {
    id: p.slug || String(p.id),
    title: p.title,
    description: p.description,
    includes: p.includes,
    bestFor: p.best_for || "",
    notFor: p.not_for || "",
    pricing: p.pricing || "Custom Quote",
  };
}

export async function getPublicServices(): Promise<PublicService[]> {
  try {
    const sql = getSql();
    if (!sql)
      return staticServices.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        benefits: s.benefits,
        deliverables: s.deliverables,
        pricing: s.pricing,
        bestFor: s.bestFor,
        flagship: s.flagship,
      }));
    const rows = await listServices(sql, { publishedOnly: true });
    if (!rows.length && !(await isContentInitialized(sql, "services"))) {
      const all = await listServices(sql);
      if (all.length) return [];
      return staticServices.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        benefits: s.benefits,
        deliverables: s.deliverables,
        pricing: s.pricing,
        bestFor: s.bestFor,
        flagship: s.flagship,
      }));
    }
    return rows.map(mapDbService);
  } catch (e) {
    console.error("getPublicServices failed:", e);
    if (getSql()) return [];
    return staticServices.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      benefits: s.benefits,
      deliverables: s.deliverables,
      pricing: s.pricing,
      bestFor: s.bestFor,
      flagship: s.flagship,
    }));
  }
}

function mapStaticProject(
  c: (typeof staticCaseStudies)[number],
): PublicProject {
  return {
    id: c.id,
    title: c.title,
    client: c.client,
    industry: c.industry,
    timeframe: c.timeframe,
    category: c.category,
    image: c.image,
    role: c.role,
    problem: c.problem,
    strategy: c.strategy,
    execution: c.execution,
    results: c.results,
    resultHeading: c.resultHeading,
    testimonial: c.testimonial,
    testimonialAuthor: c.testimonialAuthor,
  };
}

const retiredProjectIds = new Set([
  "seo-transformation",
  "digital-campaign-launch",
  "content-marketing-strategy",
]);

const retiredProjectTitles = new Set([
  "Heroes Help Social Growth",
  "B2B SEO Transformation",
  "Product Launch Ad Campaign",
  "Content Engine for Lead Quality",
]);

function isRetiredProject(project: { id: string; title: string }): boolean {
  return (
    retiredProjectIds.has(project.id) || retiredProjectTitles.has(project.title)
  );
}

export function projectIdentity(project: {
  id: string;
  title: string;
}): string {
  return /^impactdesk\b/i.test(project.title) ? "impactdesk" : project.id;
}

export function getDefaultProjects(): PublicProject[] {
  return [...recentCaseStudies, ...staticCaseStudies.map(mapStaticProject)].map(
    (project) => ({
      ...project,
      imageFit: "cover",
      imagePosition: "top",
      featured: project.id === "impactdesk",
    }),
  );
}

export async function getPublicProjects(): Promise<PublicProject[]> {
  const sql = getSql();
  if (!sql) return getDefaultProjects();
  try {
    // Read drafts too: a draft override must hide its built-in counterpart.
    const rows = await listProjects(sql);
    if (await isContentInitialized(sql, "projects")) {
      return rows.filter((row) => row.published).map(mapDbProject);
    }
    const seen = new Set<string>();
    const database = rows
      .filter((row) => !isRetiredProject({ id: row.slug, title: row.title }))
      .filter((row) => {
        const key = projectIdentity({ id: row.slug, title: row.title });
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    return [
      ...database.filter((row) => row.published).map(mapDbProject),
      ...getDefaultProjects().filter(
        (project) => !seen.has(projectIdentity(project)),
      ),
    ];
  } catch (error) {
    console.error("getPublicProjects failed:", error);
    return [];
  }
}

export async function getFeaturedProjects() {
  return (await getPublicProjects())
    .filter((project) => project.featured)
    .slice(0, 3)
    .map((project) => ({
      title: project.title,
      category: project.category,
      stack: project.stack,
      stackLabel: project.stackLabel,
      result: [project.results.metric1, project.results.label1]
        .filter(Boolean)
        .join(" "),
      image: project.image,
      imageFit: project.imageFit,
      href: `/case-studies#${project.id}`,
    }));
}

export async function getPublicTestimonials(): Promise<PublicTestimonial[]> {
  try {
    const sql = getSql();
    if (!sql) return staticTestimonials;
    const rows = await listTestimonials(sql, { publishedOnly: true });
    if (!rows.length && !(await isContentInitialized(sql, "testimonials"))) {
      if ((await listTestimonials(sql)).length) return [];
      return staticTestimonials;
    }
    return rows.map(mapDbTestimonial);
  } catch (e) {
    console.error("getPublicTestimonials failed:", e);
    return getSql() ? [] : staticTestimonials;
  }
}

export async function getPublicPackages(): Promise<PublicPackage[]> {
  try {
    const sql = getSql();
    if (!sql) {
      return staticPackages.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        includes: p.includes,
        bestFor: p.bestFor,
        notFor: p.notFor,
        pricing: p.pricing,
      }));
    }
    const rows = await listPackages(sql, { publishedOnly: true });
    if (!rows.length && !(await isContentInitialized(sql, "packages"))) {
      if ((await listPackages(sql)).length) return [];
      return staticPackages.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        includes: p.includes,
        bestFor: p.bestFor,
        notFor: p.notFor,
        pricing: p.pricing,
      }));
    }
    return rows.map(mapDbPackage);
  } catch (e) {
    console.error("getPublicPackages failed:", e);
    if (getSql()) return [];
    return staticPackages.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      includes: p.includes,
      bestFor: p.bestFor,
      notFor: p.notFor,
      pricing: p.pricing,
    }));
  }
}
