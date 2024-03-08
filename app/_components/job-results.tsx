import { db } from "@/lib/db";
import { JobCard } from "@/components/cards/job-card";
import { JobFilterValues } from "@/schemas";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
}

export const JobResults = async ({
  filterValues,
  page = 1,
}: JobResultsProps) => {
  const { q, type, remote, location } = filterValues;

  const jobsPerPage = 5;

  const skip = (page - 1) * jobsPerPage;

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

  const jobsPromise = db.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const countsPromise = db.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countsPromise]);

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
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
};

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, type, remote, location },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous
      </Link>
      <span className="font-semibold text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
