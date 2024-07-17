import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import MCQ from "../_components/mcq";

type Props = {
  params: {
    mcqId: string;
  };
};

const MCQPage = async ({ params: { mcqId } }: Props) => {
  const { userId } = auth();

  const mcq = await prisma.mCQ.findUnique({
    where: {
      id: mcqId,
    },
    include: {
      questions: true,
    },
  });

  return <MCQ mcq={mcq!} />;
};

export default MCQPage;
