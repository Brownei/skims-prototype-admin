"use server"
import { prismaClient } from "@/lib/prismaClient";

interface IParams {
  categoryName: string;
}

export default async function getCategoryByName(
  params: IParams
) {
  try {
    const { categoryName } = params;

    const category = await prismaClient.category.findUnique({
      where: {
        name: categoryName,
      }
    });

    if (!category) {
      return null;
    }

    return {
      ...category
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
