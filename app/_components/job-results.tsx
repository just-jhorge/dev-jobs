import { db } from "@/lib/db";
import { JobCard } from "@/components/cards/job-card";
import { JobFilterValues } from "@/schemas";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export const JobResults = async ({
  filterValues: { q, type, remote, location },
}: JobResultsProps) => {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString } },
          { companyName: { contains: searchString } },
          { type: { contains: searchString } },
          { locationType: { contains: searchString } },
          { location: { contains: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await db.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobCard job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters
        </p>
      )}
    </div>
  );
};
