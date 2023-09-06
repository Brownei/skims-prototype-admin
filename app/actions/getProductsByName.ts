"use server"
import { prismaClient } from "@/lib/prismaClient";
import getCurrentUser from "./getCurrentUser";

interface IParams {
  productName: string;
}

export default async function getProductByName(
  params: IParams
) {
  try {
    const currentUser = await getCurrentUser()
    const { productName } = params;

    const product = await prismaClient.product.findMany({
        where: {
            name: productName,
            adminId: currentUser?.id
        }, 
        include: {
            images: true
        }
    })

    if (!product) {
      return null;
    }

    return {
      ...product
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
