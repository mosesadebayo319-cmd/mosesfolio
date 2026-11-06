import { initializeAdminContent } from "@/src/lib/admin-content";
import { revalidateContent } from "@/src/lib/revalidate-content";
export const dynamic = "force-dynamic";
import { parseProjectInput } from "@/src/lib/project-input";
import { NextResponse } from "next/server";
import { isAuthorizedRequest } from "@/src/lib/admin-auth";
import {
  deleteProject,
  getSql,
  isDatabaseConfigured,
  updateProject,
} from "@/src/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URL not set" },
      { status: 503 },
    );
  }

  const id = Number(params.id);
  if (!Number.isSafeInteger(id) || id < 1)
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    let input;
    try {
      input = parseProjectInput(await request.json(), true);
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
    const project = await updateProject(sql, id, input);
    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    revalidateContent();
    return NextResponse.json({ project });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URL not set" },
      { status: 503 },
    );
  }

  const id = Number(params.id);
  if (!Number.isSafeInteger(id) || id < 1)
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    const sql = getSql()!;
    await initializeAdminContent(sql);
    const ok = await deleteProject(sql, id);
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidateContent();
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
