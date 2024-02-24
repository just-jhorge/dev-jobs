import { filterJobs } from "@/actions/filter-jobs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { JobTypes } from "@/lib/job-types";

interface JobFilterFormProps {
  locations: string[];
}

export const JobFilterForm = ({ locations }: JobFilterFormProps) => {
  return (
    <aside className="md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, Company, etc..." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Job Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All types</option>
              {JobTypes.map((jobType) => (
                <option key={jobType} value={jobType}>
                  {jobType}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Job Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remote" name="remote" />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button className="w-full" type="submit">
            Filter jobs
          </Button>
        </div>
      </form>
    </aside>
  );
};
