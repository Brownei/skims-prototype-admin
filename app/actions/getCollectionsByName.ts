"use server"
import { prismaClient } from "@/lib/prismaClient";

interface IParams {
  collectionName: string;
}

export default async function getCollectionByName(
  params: IParams
) {
  try {
    const { collectionName } = params;

    const collection = await prismaClient.collection.findUnique({
      where: {
        name: collectionName
      }
    })

    if (!collection) {
      return null;
    }

    // const remasteredCollection = {
    //   id: collection.id,
    //   adminId: collection.adminId,
    //   name: collection.name,
    //   isEssentials: ,
    //   isLimitedEdition: boolean,
    //   image: string,
    //   createdAt: Date,
    //   updatedAt: Date,
    // }

    return {
      ...collection
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
