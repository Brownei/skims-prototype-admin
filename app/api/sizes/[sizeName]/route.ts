import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function DELETE(
    req: Request,
    { params }: { params: { sizeName: string } }
  ) {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.sizeName) {
        return new NextResponse("Size name is required", { status: 400 });
      }
  
      const sizeByCurrentUser = await prismaClient.size.findUnique({
        where: {
          name: params.sizeName,
          adminId: currentUser.id,
        }
      });
  
      if (!sizeByCurrentUser) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const size = await prismaClient.size.delete({
        where: {
          name: params.sizeName,
        }
      });
    
      return NextResponse.json(size);
    } catch (error) {
      console.log('[SIZE_PROBLEMS]', error);
      return new NextResponse("size delete error", { status: 500 });
    }
  };
  
  
  export async function PATCH(
    req: NextRequest,
    { params }: { params: { sizeName: string } }
  ) {
    try {   
      const currentUser = await getCurrentUser();
      
      const { name, value } = await req.json();
      
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!name) {
        return new NextResponse("Name is required", { status: 400 });
      }
  
      if (!value) {
        return new NextResponse("Value is required", { status: 400 });
      }
  
      if (!params.sizeName) {
        return new NextResponse("Size name is required", { status: 400 });
      }
  
      const sizeToBeUpdated = await prismaClient.size.findUnique({
        where: {
          name: params.sizeName,
          adminId: currentUser.id,
        }
      });
  
      if (!sizeToBeUpdated) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const size = await prismaClient.size.update({
        where: {
          name: params.sizeName,
        },
        data: {
          name,
          value
        }
      });
    
      return NextResponse.json(size);
    } catch (error) {
      console.log('[SIZE UPDATE]', error);
      return new NextResponse("size update error", { status: 500 });
    }
  };