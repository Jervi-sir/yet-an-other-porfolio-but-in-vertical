import { VisitorList } from "./visitor-list";

export const dynamic = "force-dynamic";

export default async function VisitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  return <VisitorList currentPage={Number(page) || 1} />;
}
