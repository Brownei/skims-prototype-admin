import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: { categoryName: string } }
) {
  try {
    if (!params.categoryName) {
      return new NextResponse("category name is required", { status: 400 });
    }

    const category = await prismaClient.category.findUnique({
      where: {
        name: params.categoryName
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    console.log('[category_NAME GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
    req: Request,
    { params }: { params: { categoryName: string } }
  ) {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.categoryName) {
        return new NextResponse("Color name is required", { status: 400 });
      }
  
      const categoryByCurrentUser = await prismaClient.category.findUnique({
        where: {
          name: params.categoryName,
          adminId: currentUser?.id,
        }, include: {
            subCategories: true
        }
      });
  
      if (!categoryByCurrentUser) {
        return new NextResponse("Category not found", { status: 404 });
      }

      for(const subCategory of categoryByCurrentUser.subCategories) {
        await prismaClient.subCategory.delete({
            where: {
              id: subCategory.id
            }
        })
      }
  
      const category = await prismaClient.category.delete({
        where: {
          name: params.categoryName
        }
      });
    
      return NextResponse.json(category);
    } catch (error) {
      console.log('[CATEGORY_PROBLEMS]', error);
      return new NextResponse("category delete error", { status: 500 });
    }
};
  
  
export async function PATCH(
    req: NextRequest,
    { params }: { params: { categoryName: string } }
  ) {
    try {   
      const currentUser = await getCurrentUser();
      
      const {name, subCategoriesName}  = await req.json();
      
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.categoryName) {
        return new NextResponse("Category name is required", { status: 400 });
      }
      
      const categoryToBeUpdated = await prismaClient.category.findUnique({
        where: {
          name: params.categoryName as string,
          adminId: currentUser?.id as string,
        },
        include: {
          subCategories: true
        }
      });

      if (!categoryToBeUpdated) {
        return new NextResponse("Category not found", { status: 404 });
      }
      
      if (!name && !categoryToBeUpdated.name) {
        return new NextResponse("Name is required", { status: 400 });
      }

      if(!subCategoriesName && !categoryToBeUpdated.subCategories) {
        return new NextResponse("Sub-Categories name/names are required", { status: 400 });
      }

  
      const category = await prismaClient.category.update({
        where: {
          name: params.categoryName,
        },
        data: {
          name: name as string,
          subCategories: {
            upsert: [
              subCategoriesName.map((i: string) => ({
                where: {name: i},
                update: {name: i},
                create: {name: i, adminId: currentUser?.id}
              }))
            ]
          },
        }
      });
    
      return NextResponse.json(category);
    } catch (error) {
      console.log('[CATEGORY_UPDATE]', error);
      return new NextResponse("Category update error", { status: 500 });
    }
};