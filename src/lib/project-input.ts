import type { createProject } from "@/src/lib/db";

type ProjectInput = Parameters<typeof createProject>[1];
export function parseProjectInput(
  value: unknown,
  partial = false,
): ProjectInput {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Invalid project data.");
  const body = value as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  const fields = [
    "title",
    "client",
    "industry",
    "timeframe",
    "category",
    "image",
    "role",
    "stack_label",
    "project_url",
    "image_caption",
    "outcome_note",
    "result_heading",
    "problem",
    "strategy",
    "execution",
    "metric1",
    "label1",
    "metric2",
    "label2",
    "metric3",
    "label3",
    "testimonial",
    "testimonial_author",
    "slug",
  ];
  for (const key of fields) {
    if (body[key] === undefined) continue;
    if (typeof body[key] !== "string")
      throw new Error(`${key.replaceAll("_", " ")} must be text.`);
    const text = (body[key] as string).trim();
    const limit =
      key === "image"
        ? 2_000_000
        : [
              "problem",
              "strategy",
              "execution",
              "testimonial",
              "outcome_note",
            ].includes(key)
          ? 15000
          : 500;
    if (text.length > limit)
      throw new Error(`${key.replaceAll("_", " ")} is too long.`);
    result[key] = text;
  }
  if ((!partial || "title" in body) && !result.title)
    throw new Error("Title is required.");
  if (result.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(result.slug)))
    throw new Error("Use lowercase words separated by hyphens for the slug.");
  if (result.project_url) {
    let url: URL;
    try {
      url = new URL(String(result.project_url));
    } catch {
      throw new Error("Enter a valid live project URL.");
    }
    if (!["https:", "http:"].includes(url.protocol))
      throw new Error("Live project links must use https or http.");
  }
  if (result.image) {
    const image = String(result.image);
    const local = /^\/(?!\/)[^\s\\]+$/.test(image);
    const data =
      /^data:image\/(?:jpeg|png|webp|gif);base64,[a-zA-Z0-9+/]+=*$/.test(image);
    let remote = false;
    try {
      remote = new URL(image).protocol === "https:";
    } catch {}
    if (!local && !data && !remote)
      throw new Error(
        "Use an uploaded image, a site image path, or an https image URL.",
      );
  }
  if (body.stack !== undefined) {
    const stack =
      typeof body.stack === "string" ? body.stack.split(/[,\n]/) : body.stack;
    if (!Array.isArray(stack) || stack.some((item) => typeof item !== "string"))
      throw new Error("Enter tools as a list or comma-separated text.");
    const tools = Array.from(
      new Set(stack.map((item) => item.trim()).filter(Boolean)),
    );
    if (tools.length > 30 || tools.some((tool) => tool.length > 80))
      throw new Error("Use up to 30 tools, with short names.");
    result.stack = tools;
  }
  for (const key of ["featured", "published"]) {
    if (body[key] !== undefined) {
      if (typeof body[key] !== "boolean")
        throw new Error(`${key} must be true or false.`);
      result[key] = body[key];
    }
  }
  for (const [key, options] of [
    ["image_fit", ["cover", "contain"]],
    ["image_position", ["top", "center", "bottom"]],
  ] as const) {
    if (body[key] !== undefined) {
      if (!(options as readonly unknown[]).includes(body[key]))
        throw new Error(`Invalid ${key.replaceAll("_", " ")}.`);
      result[key] = body[key];
    }
  }
  if (body.sort_order !== undefined) {
    if (
      typeof body.sort_order !== "number" ||
      !Number.isInteger(body.sort_order) ||
      body.sort_order < 0 ||
      body.sort_order > 1000000
    )
      throw new Error("Order must be a non-negative whole number.");
    result.sort_order = body.sort_order;
  }
  return result as ProjectInput;
}
