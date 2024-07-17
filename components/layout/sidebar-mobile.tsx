"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useTheme } from "next-themes";
import { SidebarNavItems } from "./sidebar-nav-items";
import { navItems } from "@/constants/data";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MobileSidebar({ className }: SidebarProps) {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0 ">
          <div className="flex items-center  px-5 ">
            <h2 className="text-2xl  md:text-4xl font-bold tracking-tight ">
              MCQs.Fun
            </h2>
          </div>

          <Separator className=" mt-2 " />

          <div className="space-y-4 p-4">
            <div className="space-y-1">
              <SidebarNavItems items={navItems} setOpen={setOpen} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
