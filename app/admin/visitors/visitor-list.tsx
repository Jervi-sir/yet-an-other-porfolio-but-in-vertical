import { db } from "@/lib/db";
import { visitors } from "@/lib/db/schema";
import { count, desc, sql } from "drizzle-orm";
import { format } from "date-fns";
import { VisitorChart } from "./visitor-chart";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface VisitorListProps {
  currentPage: number;
}

export async function VisitorList({ currentPage = 1 }: VisitorListProps) {
  const pageSize = 15;
  const offset = (currentPage - 1) * pageSize;

  // Fetch paginated visitors
  const allVisitors = await db.query.visitors.findMany({
    orderBy: [desc(visitors.visitedAt)],
    limit: pageSize,
    offset: offset,
  });

  // Fetch total count
  const [{ value: totalCount }] = await db.select({ value: count() }).from(visitors);
  const totalPages = Math.ceil(totalCount / pageSize);

  // Fetch chart data (grouped by day)
  const statsResult = await db
    .select({
      date: sql<string>`DATE(${visitors.visitedAt})`,
      views: count(),
    })
    .from(visitors)
    .groupBy(sql`DATE(${visitors.visitedAt})`)
    .orderBy(desc(sql`DATE(${visitors.visitedAt})`))
    .limit(100);

  const chartData = statsResult.map((r) => ({
    date: r.date,
    views: Number(r.views),
  }));

  const paginationItems = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(i);
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1">

        <div className="">
          <VisitorChart data={chartData} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-neutral-100 italic font-bold tracking-tighter uppercase">
            Recent Activity {' '}
            <small className="text-xs text-amber-600">( {totalCount.toLocaleString()} {' '} total views )</small>
          </h2>
          <span className="text-sm text-neutral-400">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="grid gap-4">
          {allVisitors.map((v) => (
            <div
              key={v.id}
              className="p-4 rounded-xl border border-neutral-800/50 bg-neutral-900/30 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-amber-900/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <code className="text-amber-500 font-mono text-sm group-hover:text-amber-400">{v.ip}</code>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700 uppercase tracking-tighter font-bold font-mono">
                    {v.path}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 font-mono truncate max-w-md">
                  {v.userAgent}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-300">
                  {format(new Date(v.visitedAt), "MMM d, HH:mm:ss")}
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

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-8">
            {currentPage > 1 && (
              <Button variant="outline" size="sm" asChild className="rounded-lg border-neutral-800">
                <Link href={`/admin/visitors?page=${currentPage - 1}`}>Prev</Link>
              </Button>
            )}

            <div className="flex items-center gap-1 mx-2">
              {paginationItems.map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  asChild
                  className={`w-9 h-9 rounded-lg ${page === currentPage
                    ? "bg-amber-600 hover:bg-amber-700 text-white border-transparent"
                    : "border-neutral-800 text-neutral-400"
                    }`}
                >
                  <Link href={`/admin/visitors?page=${page}`}>{page}</Link>
                </Button>
              ))}
            </div>

            {currentPage < totalPages && (
              <Button variant="outline" size="sm" asChild className="rounded-lg border-neutral-800">
                <Link href={`/admin/visitors?page=${currentPage + 1}`}>Next</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
