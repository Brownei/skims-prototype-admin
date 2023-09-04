"use server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { prismaClient } from "@/lib/prismaClient";

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prismaClient.admin.findUnique({
      where: {
        email: session.user.email,
      }
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser
    };
  } catch (error: unknown) {
    console.error(error)
    return null;
  }
}

