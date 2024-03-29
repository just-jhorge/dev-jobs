import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { ModeToggle } from "../inputs/mode-toggle";

export const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 flex h-14 w-full items-center justify-center border-b bg-background shadow-sm">
      <nav className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Dev Jobs" width={40} height={40} />
          <span className="text-xl font-bold tracking-tight">Dev Jobs</span>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild>
            <Link href="/jobs/new">Post a job</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
