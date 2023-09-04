"use server"
import { prismaClient } from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
  
export default async function getSizes() {
    try {
      const sizes = await prismaClient.size.findMany();
  
      const SizesList = sizes.map((size) => ({
        ...size
      }));

      revalidatePath('/dashboard/sizes')
  
      return SizesList;
    } catch (error: any) {
      throw new Error(error);
    }
}
  