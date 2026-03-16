import { db } from '@/lib/db';
import { project, about as aboutTable } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import PortfolioClient from './portfolio-client';
import type { Project } from '@/src/types';

export default async function Home() {
  // Fetch About Me data (Temporarily bypassed for debugging)
/*
  let about = await db.query.about.findFirst({
    where: eq(aboutTable.id, 'about-me')
  });
*/

  // Fallback if not seeded yet
  const about = {
      id: 'about-me',
      name: 'Bekhira Gacem',
      role: 'Platform Developer',
      description: 'Full-stack developer: Laravel, React / React Native, Go, and system design.',
      email: 'jervi@jervi.dev',
      phone: '+213558054300',
      location: 'Algeria',
      stats: [],
      skills: [],
      pdf_portfolio: null,
      socials: {
        github: 'https://github.com/Jervi-sir',
        linkedIn: 'https://www.linkedin.com/in/gacem-bekhira/',
      } as any,
      updatedAt: new Date()
    };

  // Fetch Projects data (Temporarily bypassed for debugging)
/*
  const rawProjects = await db.query.project.findMany({
    orderBy: [desc(project.createdAt)]
  });

  const projects: Project[] = rawProjects.map((p: any) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle || undefined,
    description: p.description,
    year: p.year,
    link: p.link || undefined,
    repo: p.repo || undefined,
    details: p.details || undefined,
    keyPoints: p.keyPoints,
    skills: p.skills as any[]
  }));
*/
  const projects: Project[] = [];

  return (
    <>
      <PortfolioClient initialProjects={projects} about={about} />
    </>
  );
}
