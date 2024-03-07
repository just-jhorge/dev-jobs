"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AdminNavbar = () => {
  const router = useRouter();
  const { user, signOut } = useClerk();

  return (
    <div className="w-full">
      <div className="container flex items-center justify-between">
        <Link href="/admin">Admin Dashboard</Link>
        <div className="space-x-2">
          <span className="text-muted-foreground">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
          <Button
            variant="destructive"
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
