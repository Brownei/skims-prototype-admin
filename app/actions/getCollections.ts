"use server"
import { prismaClient } from "@/lib/prismaClient";
import getCurrentUser from "./getCurrentUser";
import { Admin } from "@prisma/client";
import { revalidatePath } from "next/cache";
  
export default async function getCollections() {
    const adminPromise: Promise<Admin | null> = getCurrentUser()
    const admin = await adminPromise
    try {
      const collections = await prismaClient.collection.findMany({
        where: {
            adminId: admin?.id
        }
      });
  
      const collectionList = collections.map((collection) => ({
        ...collection
      }));

      revalidatePath('/dashboard/collections')
  
      return collectionList;
    } catch (error: any) {
      throw new Error(error);
    }
}
  