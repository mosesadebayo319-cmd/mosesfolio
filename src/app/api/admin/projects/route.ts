import { initializeAdminContent } from "@/src/lib/admin-content";
import { revalidateContent } from "@/src/lib/revalidate-content";
export const dynamic = "force-dynamic";
import { parseProjectInput } from "@/src/lib/project-input";
import { NextResponse } from "next/server";
import { isAuthorizedRequest } from "@/src/lib/admin-auth";
import {
  createProject,
  getSql,
  isDatabaseConfigured,
  listProjects,
} from "@/src/lib/db";

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URL not set", projects: [] },
      { status: 503 },
    );
  }
  try {
    const sql = getSql()!;
    const projects = await listProjects(sql);
    return NextResponse.json({ projects });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load projects", projects: [] },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URL not set" },
      { status: 503 },
    );
  }

  try {
    let input;
    try {
      input = parseProjectInput(await request.json());
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error ? error.message : "Invalid project data",
        },
        { status: 400 },
      );
    }
    const sql = getSql()!;
    await initializeAdminContent(sql);
    const project = await createProject(sql, input);
    revalidateContent();
    return NextResponse.json({ project }, { status: 201 });
  } catch (e) {
    if ((e as { code?: string }).code !== "23505") console.error(e);
    return NextResponse.json(
      {
        error:
          (e as { code?: string }).code === "23505"
            ? "A project with this title or slug already exists. Edit that project or choose a different title."
            : "Failed to create project",
      },
      { status: (e as { code?: string }).code === "23505" ? 409 : 500 },
    );
  }
}
