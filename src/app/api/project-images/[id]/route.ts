import { createHash } from "node:crypto";
import { getSql } from "@/src/lib/db";
export const dynamic = "force-dynamic";

/** Stream stored uploads as images rather than repeating base64 in page payloads. */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  const missing = () =>
    new Response(null, {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  if (!Number.isSafeInteger(id) || id < 1) return missing();
  const sql = getSql();
  if (!sql) return missing();
  try {
    const rows =
      await sql`SELECT image FROM site_projects WHERE id = ${id} AND published = true LIMIT 1`;
    const image = rows[0]?.image;
    if (typeof image !== "string" || image.length > 2_000_000) return missing();
    const match =
      /^data:(image\/(?:jpeg|png|webp|gif));base64,([a-zA-Z0-9+/]+=*)$/.exec(
        image,
      );
    if (!match) return missing();
    const data = Buffer.from(match[2], "base64");
    const etag = `"${createHash("sha256").update(data).digest("hex")}"`;
    const headers = {
      "Content-Type": match[1],
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff",
      ETag: etag,
    };
    if (request.headers.get("if-none-match") === etag)
      return new Response(null, { status: 304, headers });
    return new Response(data, { headers });
  } catch (error) {
    console.error("Project image could not be loaded", error);
    return new Response(null, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
