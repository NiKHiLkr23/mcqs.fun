import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

function page() {
  const { userId } = auth();
  return (
    <div className="flex items-center justify-center h-screen ">
      {userId ? (
        <div>explore page</div>
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
