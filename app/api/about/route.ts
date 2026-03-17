import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { about as aboutTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const about = await db.query.about.findFirst({
      where: eq(aboutTable.id, "about-me"),
    });

    return NextResponse.json(about ?? null);
  } catch (error) {
    console.error("Fetch about error:", error);
    return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 });
  }
}
