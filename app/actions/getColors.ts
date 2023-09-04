"use server"
import { prismaClient } from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
  
export default async function getColors() {
    try {
      const colors = await prismaClient.color.findMany();
  
      const ColorsList = colors.map((color) => ({
        ...color
      }));

      revalidatePath('/dashboard/colors')
  
      return ColorsList;
    } catch (error: any) {
      throw new Error(error);
    }
}
  