"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { ClerkLoading, useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import { NavItem } from "@/types";
import { Button } from "../ui/button";

interface SidebarNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function SidebarNavItems({ items, setOpen }: SidebarNavProps) {
  const path = usePathname();
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start mt-0">
      <ClerkLoading>
        <Skeleton />
      </ClerkLoading>

      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <button
              key={index}
              className="border-b mt-1 "
              onClick={() => {
                if (setOpen) setOpen(false);

                router.push(`${item.href}`);
              }}
              disabled={item.disabled}
            >
              <span
                className={cn(
                  "group text-black text-[1rem] font-medium flex items-center px-3 py-3 hover:bg-[#EBE8F3]/50 duration-300 ease-in-out",
                  path === `${item.href}`
                    ? "bg-[#EBE8F3]/50 font-semibold"
                    : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span>{item.title}</span>
                {item.disabled && (
                  <span className=" bg-blue-100 text-blue-800 text-xs font-medium ml-1 px-2 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    soon
                  </span>
                )}
              </span>
            </button>
          )
        );
      })}
    </nav>
  );
}
