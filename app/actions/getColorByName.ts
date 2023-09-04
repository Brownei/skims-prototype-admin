"use server"
import { prismaClient } from "@/lib/prismaClient";

interface IParams {
  colorName: string;
}

export default async function getColoryByName(
  params: IParams
) {
  try {
    const { colorName } = params;

    const color = await prismaClient.color.findUnique({
      where: {
        name: colorName
      }
    })

    if (!color) {
      return null;
    }

    return {
      ...color
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
