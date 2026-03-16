import { ProjectUpsertForm } from "@/app/admin/components/upsert-form";

// Make the component async so you can await params
export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the promise to get the actual params object
  const { id } = await params;

  // Now pass the resolved id to your form
  // ProjectUpsertForm can stay a client component if it needs interactivity
  return <ProjectUpsertForm id={id} />;
}