import { User } from "@prisma/client";
import prisma from "@/prisma/client";
export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function getUserById({
  xata_id,
  clerkUserId,
}: {
  xata_id?: string;
  clerkUserId?: string;
}) {
  try {
    if (!xata_id && !clerkUserId) {
      throw new Error("id or clerkUserId is required");
    }

    const query = xata_id ? { xata_id } : { clerkUserId };

    const user = await prisma.user.findUnique({ where: query });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function UpdateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: { clerkUserId: id },
      data,
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
