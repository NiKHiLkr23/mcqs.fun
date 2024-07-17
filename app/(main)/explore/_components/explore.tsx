import CreateMcqForm from "@/components/forms/create-mcq-form";
import { Separator } from "@/components/ui/separator";
import React from "react";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { McqCard } from "./mcq-card";
async function Explore() {
  const { userId } = auth();
  const availableMcqs = userId
    ? await prisma.mCQ.findMany({
        where: {
          OR: [{ isCreated: true }, { isCreated: false, authorId: userId }],
        },
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : await prisma.mCQ.findMany({
        where: {
          isCreated: true,
        },
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

  return (
    <div className=" px-5 my-16 w-full h-screen">
      <CreateMcqForm />

      <Separator className="my-2  " />
      <h2 className="text-2xl font-semibold py-5">Explore MCQs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {availableMcqs.map((mcq) => (
          <McqCard mcq={mcq} key={mcq.id} />
        ))}
      </div>
    </div>
  );
}

export default Explore;
