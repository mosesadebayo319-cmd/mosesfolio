import { revalidateContent } from "@/src/lib/revalidate-content";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { isAuthorizedRequest } from "@/src/lib/admin-auth";
import { getSql } from "@/src/lib/db";
import { initializeAdminContent } from "@/src/lib/admin-content";

export async function POST(request: Request) {
  if (!isAuthorizedRequest(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sql = getSql();
  if (!sql)
    return NextResponse.json(
      { error: "Database is not configured" },
      { status: 503 },
    );
  try {
    await initializeAdminContent(sql);
    revalidateContent();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin content initialization failed", error);
    return NextResponse.json(
      { error: "Could not prepare site content. Please try again." },
      { status: 500 },
    );
  }
}
