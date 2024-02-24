import JobFilterSidebar from "@/app/_components/job-filter-sidebar";
import { JobResults } from "./_components/job-results";
import { JobFilterValues } from "@/schemas";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    remote?: string;
    location?: string;
  };
}

export default function Home({
  searchParams: { q, type, remote, location },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="max-w-5xl m-auto px-3 py-10 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer jobs
        </h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
