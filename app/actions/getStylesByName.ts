"use server"
import { prismaClient } from "@/lib/prismaClient";

interface IParams {
  styleName: string;
}

export default async function getStylesByName(
  params: IParams
) {
  try {
    const { styleName } = params;

    const style = await prismaClient.style.findUnique({
      where: {
        name: styleName
      }
    })

    if (!style) {
      return null;
    }

    return {
      ...style
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
