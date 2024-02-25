"use server";

import { redirect } from "next/navigation";
import { JobFilterSchema } from "@/schemas";

export const filterJobs = (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = JobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
};
