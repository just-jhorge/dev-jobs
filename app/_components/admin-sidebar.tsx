"use client";

import { Job } from "@prisma/client";
import { FormSubmitButton } from "./form-submit-button";
import { useFormState } from "react-dom";
import { approveJob, deleteJob } from "@/actions/admin-job-actions";

interface AdminSidebarProps {
  job: Job;
}

interface AdminButtonProps {
  jobId: number;
}

export const AdminSidebar = ({ job }: AdminSidebarProps) => {
  return (
    <aside className="flex w-full flex-none flex-row items-center gap-2 md:w-[254px]">
      {job.approved ? (
        <span className="w-full text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApprovedSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
};

function ApprovedSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveJob, undefined);

  return (
    <form action={formAction} className="w-full space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 text-white transition hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-destructive">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className="w-full space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-red-500 text-white transition hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-destructive">{formState.error}</p>
      )}
    </form>
  );
}
