import { db } from "@/lib/db";
import { JobFilterForm } from "./job-filter-form";

export default async function JobFilterSidebar() {
  const distinctLocations = (await db.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return <JobFilterForm locations={distinctLocations} />;
}
