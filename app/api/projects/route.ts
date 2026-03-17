import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { project as projectTable } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    const projects = await db.query.project.findMany({
      orderBy: [asc(projectTable.order)]
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
    
    // In the current admin logic, it sends the WHOLE array of projects to sync.
    if (Array.isArray(data)) {
      // Bulk sync logic
      await db.transaction(async (tx) => {
        for (let index = 0; index < data.length; index++) {
          const p = data[index];
          const { id, ...rest } = p;
          const values = {
            id: id || `new-${crypto.randomUUID()}`,
            ...rest,
            year: rest.year.toString(),
            order: rest.order !== undefined ? rest.order : index,
            updatedAt: new Date(),
          };

          await tx.insert(projectTable)
            .values(values)
            .onConflictDoUpdate({
              target: projectTable.id,
              set: values
            });
        }
      });
    } else {
      // Individual upsert
      const { id, ...rest } = data;
      const values = {
        id: id || `new-${crypto.randomUUID()}`,
        ...rest,
        year: rest.year.toString() || "—",
        updatedAt: new Date(),
      };
      await db.insert(projectTable)
        .values(values)
        .onConflictDoUpdate({
          target: projectTable.id,
          set: values
        });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Save error:', error);
    const message = error instanceof Error ? error.message : 'Failed to save projects';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
