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
      <section>
        <div className="container flex flex-col items-center px-4 py-8 mx-auto text-center md:px-10 lg:px-32 xl:max-w-5xl">
          <h1 className="text-4xl font-bold leading-none sm:text-5xl">
            Create and Play
            <span className="text-blue-600"> Exciting </span>
            Multiple-Choice Quiz Games
          </h1>
          <p className="px-8 mt-8 mb-12 text-lg">
            Discover a New Way to Learn and Test Your Knowledge.
          </p>
          <div className="flex flex-wrap justify-center">
            {userId ? (
              <Link
                href="/explore"
                className={cn(
                  "text-lg",
                  buttonVariants({ variant: "outline" })
                )}
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
        </div>
      </section>
    </div>
  );
}

export default page;
