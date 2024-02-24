"use server";

import { redirect } from "next/navigation";
import { JobFilterSchema } from "@/schemas";

export const filterJobs = (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = JobFilterSchema.parse(values);

  console.log(q, type, location, remote);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
};
