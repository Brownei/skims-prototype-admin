import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: { styleName: string } }
) {
  try {
    if (!params.styleName) {
      return new NextResponse("Style name is required", { status: 400 });
    }

    const style = await prismaClient.style.findUnique({
      where: {
        name: params.styleName
      }
    });
  
    return NextResponse.json(style);
  } catch (error) {
    console.log('[STYLE_NAME GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
    req: Request,
    { params }: { params: { styleName: string } }
  ) {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.styleName) {
        return new NextResponse("Style name is required", { status: 400 });
      }
  
      const styleByCurrentUser = await prismaClient.style.findUnique({
        where: {
          name: params.styleName,
          adminId: currentUser?.id,
        }
      });
  
      if (!styleByCurrentUser) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const style = await prismaClient.style.delete({
        where: {
          name: params.styleName,
        }
      });
    
      return NextResponse.json(style);
    } catch (error) {
      console.log('[STYLE_PROBLEMS]', error);
      return new NextResponse("Style delete error", { status: 500 });
    }
};
  
  
export async function PATCH(
    req: NextRequest,
    { params }: { params: { styleName: string } }
  ) {
    try {   
      const currentUser = await getCurrentUser();
      
      const {name}  = await req.json();
      
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!name) {
        return new NextResponse("Name is required", { status: 400 });
      }
  
      if (!params.styleName) {
        return new NextResponse("Style name is required", { status: 400 });
      }
  
      const styleToBeUpdated = await prismaClient.style.findUnique({
        where: {
          name: params.styleName as string,
          adminId: currentUser.id as string,
        }
      });
  
      if (!styleToBeUpdated) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const style = await prismaClient.style.update({
        where: {
          name: params.styleName,
        },
        data: {
          name: name as string
        }
      });
    
      return NextResponse.json(style);
    } catch (error) {
      console.log('[STYLE UPDATE]', error);
      return new NextResponse("Style update error", { status: 500 });
    }
};