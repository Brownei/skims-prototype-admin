"use server"
import { prismaClient } from "@/lib/prismaClient";
  
export default async function getSubCategories() {
    try {
      const subCategories = await prismaClient.subCategory.findMany();
  
      const SubCategoriesList = subCategories.map((subCategory) => ({
        ...subCategory
      }));
  
      return SubCategoriesList;
    } catch (error: any) {
      throw new Error(error);
    }
}