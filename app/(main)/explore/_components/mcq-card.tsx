"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MCQ, User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import DateComponent from "@/components/date-component";
import { useAuth } from "@clerk/nextjs";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
type MCQWithAuthor = MCQ & { author: User };
export function McqCard({ mcq }: { mcq: MCQWithAuthor }) {
  const { userId } = useAuth();
  const router = useRouter();
  return (
    <Card className="h-52">
      <CardHeader>
        <CardTitle>{mcq.title}</CardTitle>
        <CardDescription className="line-clamp-2  ">
          {mcq?.content}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        {mcq.isCreated ? (
          <div className="grid w-full items-center gap-4">
            <Button
              onClick={() => router.push(`/mcq/${mcq.id}`)}
              className="text-lg"
              variant="outline"
            >
              {userId ? "Play" : "Sign In"}
            </Button>
          </div>
        ) : (
          <div className="grid w-full items-center gap-4">
            <div className="flex items-center gap-3 text-xl text-muted-foreground">
              <Icons.spinner className="animate-spin w-4 h-4" />
              Generating Game
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
