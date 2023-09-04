"use server"
import { prismaClient } from "@/lib/prismaClient";

interface IParams {
  sizeName: string;
}

export default async function getSizeyByName(
  params: IParams
) {
  try {
    const { sizeName } = params;

    const size = await prismaClient.size.findUnique({
      where: {
        name: sizeName
      }
    })

    if (!size) {
      return null;
    }

    return {
      ...size
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
