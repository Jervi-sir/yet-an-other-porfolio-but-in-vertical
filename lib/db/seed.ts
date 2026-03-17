// Must run before importing the db client (ESM import evaluation order).
import 'dotenv/config';

console.log('DATABASE_URL from env:', process.env.DATABASE_URL);

import { db } from './index';
import { project as projectTable, about as aboutTable } from './schema';
import projectsData from '../../src/projects.json';
import { sql } from 'drizzle-orm';
import type { Project } from '../../src/types';

async function seed() {
  console.log('Start seeding...');

  const aboutValues = {
    id: 'about-me',
    name: 'Bekhira Gacem',
    role: 'Platform Developer',
    description: `Full-stack developer: Laravel, React / React Native, Go, and system design.\nI build marketplaces, social media platforms, real-time apps, and robust APIs.`,
    email: 'jervi@jervi.dev',
    phone: '+213558054300',
    location: 'Algeria',
    pdf_portfolio: '/portfolio.pdf?show=true',
    skills: ["Laravel", "React", "React Native", "Go", "System Design", "PostgreSQL"], // ← array is fine, text[] handles it

    // Use sql`` + ::jsonb for these two
    stats: sql`${JSON.stringify([
      { value: "20+", label: "Projects" },
      { value: "7y", label: "Experience" },
      { value: "3", label: "Frameworks" }
    ])}::jsonb`,

    socials: sql`${JSON.stringify({
      github: 'https://github.com/Jervi-sir',
      linkedIn: 'https://www.linkedin.com/in/gacem-bekhira/',
      instagram: 'https://www.instagram.com/gacem_humen/',
      tiktok: 'https://www.tiktok.com/@what_jervi_thinks_of_dz'
    })}::jsonb`,

    updatedAt: new Date(),
  };

  await db.insert(aboutTable).values(aboutValues).onConflictDoUpdate({
    target: aboutTable.id,
    set: {
      name: aboutValues.name,
      role: aboutValues.role,
      description: aboutValues.description,
      email: aboutValues.email,
      phone: aboutValues.phone,
      location: aboutValues.location,
      pdf_portfolio: aboutValues.pdf_portfolio,
      skills: aboutValues.skills,
      stats: aboutValues.stats,           // ← still works because it's sql``
      socials: aboutValues.socials,       // ← still works
      updatedAt: aboutValues.updatedAt,
    },
  });

  console.log('Seeded About Me');

  const data = projectsData as unknown as Project[];
  for (let i = 0; i < data.length; i++) {
    const p = data[i];
    const projectValues = {
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      year: p.year?.toString() || "—",
      link: p.link,
      repo: p.repo,
      details: p.details,
      keyPoints: p.keyPoints || [],
      skills: p.skills || [],
      order: i,
      updatedAt: new Date(),
    };

    await db.insert(projectTable).values(projectValues).onConflictDoUpdate({
      target: projectTable.id,
      set: projectValues,
    });
    console.log(`Synced project: ${p.title} (Order: ${i})`);
  }

  console.log('Seeding finished.');
  process.exit(0);
}

seed().catch((e) => {
  console.error('Seeding error:', e);
  process.exit(1);
});
