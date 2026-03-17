import { db } from "@/lib/db";
import { visitors } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns"; // Wait, check if date-fns is installed

export async function VisitorList() {
  const allVisitors = await db.query.visitors.findMany({
    orderBy: [desc(visitors.visitedAt)],
    limit: 100,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-neutral-100 italic">Recent Visitors</h2>
        <span className="text-sm text-neutral-400">{allVisitors.length} last sessions</span>
      </div>

      <div className="grid gap-4">
        {allVisitors.map((v) => (
          <div
            key={v.id}
            className="p-4 rounded-xl border border-neutral-800/50 bg-neutral-900/30 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <code className="text-amber-500 font-mono text-sm">{v.ip}</code>
                <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
                  {v.path}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-mono truncate max-w-md">
                {v.userAgent}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-300">
                {new Date(v.visitedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}

        {allVisitors.length === 0 && (
          <div className="py-20 text-center border border-dashed border-neutral-800 rounded-2xl">
            <p className="text-neutral-500">No visitors recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
