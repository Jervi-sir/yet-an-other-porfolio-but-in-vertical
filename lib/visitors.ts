import { headers } from "next/headers";
import { db } from "./db";
import { visitors } from "./db/schema";

export async function trackVisitor(path: string = "/") {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = (forwardedFor ? forwardedFor.split(",")[0].trim() : headersList.get("x-real-ip")) || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    await db.insert(visitors).values({
      ip,
      userAgent,
      path,
    });
  } catch (error) {
    console.error("Failed to track visitor:", error);
  }
}
