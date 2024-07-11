"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import {
  ClerkLoaded,
  ClerkLoading,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
function Header() {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60  bg-background/95 backdrop-blur  z-50 bg-white text-black ">
      <nav className="h-14 flex items-center justify-between px-4 max-w-[1540px] mx-auto">
        <div className=" flex items-center lg:gap-4">
          <Link href="/" className=" flex items-center lg:gap-4">
            <h2 className="  text-4xl font-bold tracking-tight ">MCQs</h2>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="sm" variant="outline">
                  Get Started
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </nav>
    </div>
  );
}

export default Header;
