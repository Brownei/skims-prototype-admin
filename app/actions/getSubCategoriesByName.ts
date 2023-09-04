"use server"
import { prismaClient } from "@/lib/prismaClient";

interface IParams {
  categoryName: string;
}

export default async function getSubCategoriesByName(
  params: IParams
) {
  try {
    const { categoryName } = params;

    const SubCategories = await prismaClient.category.findFirst({
      where: {
        name: categoryName,
      }, 
      select: {
        subCategories: true
      }
    });

    if (!SubCategories) {
      return null;
    }

    const subCategoryList = SubCategories.subCategories.map((subCategory) => ({
        ...subCategory
    }))

    return subCategoryList;
  } catch (error: any) {
    throw new Error(error);
  }
}
