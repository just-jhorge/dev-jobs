import { AdminSidebar } from "@/app/_components/admin-sidebar";
import { JobDetails } from "@/components/shared/job-details";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await db.job.findUnique({ where: { slug } });

  if (!job) notFound();

  return (
    <main className="mx-auto my-10 flex max-w-5xl flex-col gap-5 space-y-10 px-3 md:flex-row md:items-start md:space-y-0">
      <JobDetails job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}
