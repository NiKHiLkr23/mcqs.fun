"use server";

import { inngest } from "@/inngest/client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
export async function generateMCQ(topic: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const mcq = await prisma.mCQ.create({
    data: {
      createdAt: new Date(),
      authorId: userId,
      title: topic,
      isCreated: false,
    },
  });

  const prompt = `Generate a detailed article with more than 10000 words and a set of 10 multiple-choice questions (MCQs) with answers on the topic ${topic}.`;

  const response = await inngest.send({
    name: "app/generate-mcq",
    data: {
      prompt: prompt,
      mcqId: mcq?.id,
    },
  });

  revalidatePath("/explore");

  return response;
}
