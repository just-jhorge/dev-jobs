"use server";

import path from "path";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import { toSlug } from "@/lib/utils";
import { CreateJobSchema } from "@/schemas";
import { redirect } from "next/navigation";

export const createJob = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = CreateJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      { access: "public", addRandomSuffix: false },
    );

    companyLogoUrl = blob.url;
  }

  await db.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
    },
  });

  redirect("/jobs/job-submitted");
};
