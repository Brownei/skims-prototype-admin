import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getErrorMessage } from "@/lib/error-handler";
import { is } from "date-fns/locale";

export async function GET(
  req: Request,
  { params }: { params: { collectionName: string } }
) {
  try {
    const admin = await getCurrentUser()

    if (!params.collectionName) {
      return new NextResponse("Collection name is required", { status: 400 });
    }

    const collection = await prismaClient.collection.findUnique({
      where: {
        name: params.collectionName,
        adminId: admin?.id
      }
    });
  
    return NextResponse.json(collection);
  } catch (error) {
    console.log('[COLLECTION_NAME GET]', getErrorMessage(error));
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
    req: Request,
    { params }: { params: { collectionName: string } }
  ) {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.collectionName) {
        return new NextResponse("Color name is required", { status: 400 });
      }
  
      const collectionByCurrentUser = await prismaClient.collection.findUnique({
        where: {
          name: params.collectionName,
          adminId: currentUser?.id,
        }
      });
  
      if (!collectionByCurrentUser) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const collection = await prismaClient.collection.delete({
        where: {
          name: params.collectionName,
        }
      });
    
      return NextResponse.json(collection);
    } catch (error) {
      console.log('[COLLECTION_PROBLEMS]', getErrorMessage(error));
      return new NextResponse("Collection delete error", { status: 500 });
    }
};
  
  
export async function PATCH(
    req: NextRequest,
    { params }: { params: { collectionName: string } }
  ) {
    try {   
      const currentUser = await getCurrentUser();
      
      const {name, imageUrl, isEssentials, isLimitedEdition}  = await req.json();
      
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.collectionName) {
        return new NextResponse("Collection name is required", { status: 400 });
      }
  
      const collectionToBeUpdated = await prismaClient.collection.findUnique({
        where: {
          name: params.collectionName as string,
          adminId: currentUser.id as string,
        }
      });
  
      if (!collectionToBeUpdated) {
        return new NextResponse("Unauthorized", { status: 405 });
      }

      if (!name && !collectionToBeUpdated.name) {
        return new NextResponse("Name is required", { status: 400 });
      }

      if (!imageUrl && !collectionToBeUpdated.image) {
        return new NextResponse("Image is required", { status: 400 });
      }
  
      const collection = await prismaClient.collection.update({
        where: {
          name: params.collectionName,
        },
        data: {
          name: name as string,
          image: imageUrl as string,
          isEssentials: isEssentials as boolean,
          isLimitedEdition: isLimitedEdition as boolean,
        }
      });
    
      return NextResponse.json(collection);
    } catch (error) {
      console.log('[COLLECTION UPDATE]', getErrorMessage(error));
      return new NextResponse("Collection update error", { status: 500 });
    }
};