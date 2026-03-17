import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { project as projectTable } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    const projects = await db.query.project.findMany({
      orderBy: [asc(projectTable.orderIndex)]
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Fetch projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received POST data:', JSON.stringify(data, null, 2).slice(0, 500));
    
    if (Array.isArray(data)) {
      console.log(`Processing bulk sync for ${data.length} projects`);
      await db.transaction(async (tx) => {
        for (let index = 0; index < data.length; index++) {
          const p = data[index];
          const { id, createdAt, updatedAt, ...rest } = p;
          
          const values = {
            id: id || `p-${Date.now()}-${index}`,
            title: rest.title || "Untitled",
            subtitle: rest.subtitle || null,
            description: rest.description || "",
            year: (rest.year ?? "").toString() || "—",
            link: rest.link || null,
            repo: rest.repo || null,
            details: rest.details || null,
            keyPoints: rest.keyPoints || [],
            skills: rest.skills || [],
            orderIndex: (rest.orderIndex !== undefined && rest.orderIndex !== null) ? rest.orderIndex : (index + 1) * 10,
            updatedAt: new Date(),
          };

          await tx.insert(projectTable)
            .values(values)
            .onConflictDoUpdate({
              target: projectTable.id,
              set: {
                title: values.title,
                subtitle: values.subtitle,
                description: values.description,
                year: values.year,
                link: values.link,
                repo: values.repo,
                details: values.details,
                keyPoints: values.keyPoints,
                skills: values.skills,
                orderIndex: values.orderIndex,
                updatedAt: values.updatedAt,
              }
            });
        }
      });
    } else {
      console.log('Processing individual upsert');
      const { id, createdAt, updatedAt, ...rest } = data;
      const values = {
        id: id || `p-${Date.now()}`,
        title: rest.title || "Untitled",
        subtitle: rest.subtitle || null,
        description: rest.description || "",
        year: (rest.year ?? "").toString() || "—",
        link: rest.link || null,
        repo: rest.repo || null,
        details: rest.details || null,
        keyPoints: rest.keyPoints || [],
        skills: rest.skills || [],
        updatedAt: new Date(),
      };
      await db.insert(projectTable)
        .values(values)
        .onConflictDoUpdate({
          target: projectTable.id,
          set: {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
            year: values.year,
            link: values.link,
            repo: values.repo,
            details: values.details,
            keyPoints: values.keyPoints,
            skills: values.skills,
            orderIndex: rest.orderIndex !== undefined ? rest.orderIndex : undefined,
            updatedAt: values.updatedAt,
          }
        });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Save error details:', error);
    const message = error instanceof Error ? error.stack || error.message : 'Failed to save projects';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
