import { JobTypes, LocationTypes } from "@/lib/job-types";
import * as z from "zod";

const requiredString = z.string().min(1, { message: "Required" });
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    { message: "Must be an image file" },
  )
  .refine(
    (file) => {
      return !file || file.size <= 1024 * 1024 * 5;
    },
    { message: "File must be at most 5MB" },
  );

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or URL is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => LocationTypes.includes(value),
      { message: "Invalid location type" },
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    { message: "Location is required for on-site jobs", path: ["location"] },
  );

export const CreateJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine((value) => JobTypes.includes(value), {
      message: "Invalid job type",
    }),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(9, { message: "Max of 9 digits" }),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof CreateJobSchema>;

export const JobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof JobFilterSchema>;
