"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function NotFound() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  return (
    <div className="">
      <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60  bg-background/95 backdrop-blur  z-50  ">
        <nav className="h-14 flex items-center justify-between px-4 max-w-[1540px] mx-auto">
          <div className=" flex items-center gap-4">
            <Link href="/">
              <Image
                src={
                  resolvedTheme === "dark"
                    ? "/images/xcrow_logo_dark.png"
                    : "/images/xcrow_logo_light.png"
                }
                width={100}
                height={100}
                alt="light"
                className="w-12 h-8 "
              />
            </Link>
            <h2 className="text-4xl font-bold tracking-tight ">xcrow</h2>
          </div>
        </nav>
      </div>
      <div className="flex flex-col mb-16 items-center justify-center text-center  mt-24 p-5">
        <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
          404
        </span>
        <h2 className="my-2 font-heading text-2xl font-bold">
          Something&apos;s missing
        </h2>
        <p>
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="mt-8 flex justify-center gap-2">
          <Button onClick={() => router.back()} variant="default" size="lg">
            Go back
          </Button>
          <Button onClick={() => router.push("/")} variant="ghost" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
