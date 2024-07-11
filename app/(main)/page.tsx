import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

function page() {
  const { userId } = auth();
  return (
    <div className="flex items-center justify-center h-screen ">
      {userId ? (
        <Link
          href="/explore"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Explore MCQs
        </Link>
      ) : (
        <SignInButton mode="modal">
          <Button size="sm" variant="outline">
            Get Started
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default page;
