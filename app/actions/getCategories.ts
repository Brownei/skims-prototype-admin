"use server"

import { prismaClient } from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
  
export default async function getCategories() {
    try {
      const categories = await prismaClient.category.findMany();
  
      const CategoriesList = categories.map((category) => ({
        ...category
      }));

      revalidatePath('/dashboard/categories')
  
      return CategoriesList;
    } catch (error: any) {
      throw new Error(error);
    }
}