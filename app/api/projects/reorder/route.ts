import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { project as projectTable } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { id, targetId, position } = await request.json();

    if (!id || !targetId || !position) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get all projects in order to find neighbors
    const projects = await db.query.project.findMany({
      orderBy: [asc(projectTable.orderIndex)]
    });

    const targetIndex = projects.findIndex(p => p.id === targetId);
    if (targetIndex === -1) {
      return NextResponse.json({ error: 'Target project not found' }, { status: 404 });
    }

    // Filter out the moving project from neighbors calculation to avoid logic errors
    const otherProjects = projects.filter(p => p.id !== id);
    const newTargetIndex = otherProjects.findIndex(p => p.id === targetId);
    
    const insertIndex = position === 'after' ? newTargetIndex + 1 : newTargetIndex;
    
    const prevItem = otherProjects[insertIndex - 1];
    const nextItem = otherProjects[insertIndex];

    let newOrderIndex: number;
    const GAP = 10;

    if (!prevItem && nextItem) {
      newOrderIndex = (nextItem.orderIndex ?? 0) - GAP;
    } else if (prevItem && !nextItem) {
      newOrderIndex = (prevItem.orderIndex ?? 0) + GAP;
    } else if (prevItem && nextItem) {
      newOrderIndex = ((prevItem.orderIndex ?? 0) + (nextItem.orderIndex ?? 0)) / 2;
    } else {
      newOrderIndex = GAP;
    }

    // Update the project
    await db.update(projectTable)
      .set({ orderIndex: newOrderIndex, updatedAt: new Date() })
      .where(eq(projectTable.id, id));

    return NextResponse.json({ success: true, orderIndex: newOrderIndex });
  } catch (error) {
    console.error('Reorder error:', error);
    return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 });
  }
}
