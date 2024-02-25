import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { ModeToggle } from "../inputs/mode-toggle";

export const Navbar = () => {
  return (
    <header className="border-b shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Dev Jobs" width={40} height={40} />
          <span className="text-xl font-bold tracking-tight">Dev Jobs</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/jobs/new">Post a job</Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};
