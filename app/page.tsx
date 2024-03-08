import JobFilterSidebar from "@/app/_components/job-filter-sidebar";
import { JobResults } from "./_components/job-results";
import { JobFilterValues } from "@/schemas";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    remote?: string;
    location?: string;
    page?: string;
  };
}

function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? "Remote developer jobs"
        : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, remote, location },
}: PageProps): Metadata {
  return {
    title: `${getTitle({ q, type, location, remote: remote === "true" })} | Dev Jobs`,
  };
}

export default function Home({
  searchParams: { q, type, remote, location, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="m-auto max-w-5xl space-y-10 px-3 py-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {getTitle(filterValues)}
        </h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
