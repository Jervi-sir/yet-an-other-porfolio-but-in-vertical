import { db } from "@/lib/db";
import { project as projectTable, about as aboutTable } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import PortfolioClient from "./portfolio-client";
import type { Project } from "@/src/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const about =
    (await db.query.about.findFirst({
      where: eq(aboutTable.id, "about-me"),
    })) ??
    {
      id: "about-me",
      name: "Bekhira Gacem",
      role: "Platform Developer",
      description:
        "Full-stack developer: Laravel, React / React Native, Go, and system design.",
      email: "jervi@jervi.dev",
      phone: "+213558054300",
      location: "Algeria",
      stats: [],
      skills: [],
      pdf_portfolio: null,
      socials: {
        github: "https://github.com/Jervi-sir",
        linkedIn: "https://www.linkedin.com/in/gacem-bekhira/",
      },
      updatedAt: new Date(),
    };

  const rawProjects = await db.query.project.findMany({
    orderBy: [asc(projectTable.order)],
  });

  const projects: Project[] = rawProjects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle || undefined,
    description: p.description,
    year: p.year,
    link: p.link || undefined,
    repo: p.repo || undefined,
    details: p.details || undefined,
    keyPoints: p.keyPoints,
    skills: (p.skills ?? []) as Project["skills"],
    order: p.order,
  }));

  return <PortfolioClient initialProjects={projects} about={about} />;
}
