import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function DELETE(
    req: Request,
    { params }: { params: { colorName: string } }
  ) {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.colorName) {
        return new NextResponse("Color name is required", { status: 400 });
      }
  
      const colorByCurrentUser = await prismaClient.color.findUnique({
        where: {
          name: params.colorName,
          adminId: currentUser.id,
        }
      });
  
      if (!colorByCurrentUser) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const color = await prismaClient.color.delete({
        where: {
          name: params.colorName,
        }
      });
    
      return NextResponse.json(color);
    } catch (error) {
      console.log('[COLOR_PROBLEMS]', error);
      return new NextResponse("Color delete error", { status: 500 });
    }
  };
  
  
  export async function PATCH(
    req: NextRequest,
    { params }: { params: { colorName: string } }
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
  
      if (!params.colorName) {
        return new NextResponse("Color name is required", { status: 400 });
      }
  
      const colorToBeUpdated = await prismaClient.color.findUnique({
        where: {
          name: params.colorName,
          adminId: currentUser.id,
        }
      });
  
      if (!colorToBeUpdated) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const color = await prismaClient.color.update({
        where: {
          name: params.colorName,
        },
        data: {
          name,
          value
        }
      });
    
      return NextResponse.json(color);
    } catch (error) {
      console.log('[COLOR UPDATE]', error);
      return new NextResponse("Color update error", { status: 500 });
    }
  };