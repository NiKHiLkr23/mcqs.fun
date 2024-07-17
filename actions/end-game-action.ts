"use server";

import { inngest } from "@/inngest/client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { endGameSchema } from "@/schemas/questions";
export async function endGameAction(payload: any) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const { gameId } = endGameSchema.parse(payload);
  const mcq = await prisma.mCQ.update({
    where: {
      id: gameId,
    },
    data: {
      timeEnded: new Date(),
    },
  });

  revalidatePath("/explore");
}
