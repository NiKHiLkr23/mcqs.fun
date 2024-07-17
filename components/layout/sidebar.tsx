"use client";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/nextjs";
import { Icons } from "../icons";
import { usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { SidebarNavItems } from "./sidebar-nav-items";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  if (!user && pathname === "/") return null;

  return (
    <nav
      className={cn(
        `relative hidden min-h-screen border-r border-stone-200 pt-16 lg:block w-[17rem]`
      )}
    >
      <ClerkLoading>
        <SidebarLoading />
      </ClerkLoading>
      <ClerkLoaded>
        <div className="space-y-4 px-2">
          <SidebarNavItems items={navItems} />
        </div>
      </ClerkLoaded>
    </nav>
  );
}

const SidebarLoading = () => {
  return (
    <div>
      <div className=" flex flex-col gap-2  m-1 mb-6 items-center">
        {navItems.map((i) => (
          <Skeleton
            key={i.title}
            className={cn(
              "w-full border-b ",
              buttonVariants({ variant: "secondary" })
            )}
          />
        ))}
      </div>
    </div>
  );
};
