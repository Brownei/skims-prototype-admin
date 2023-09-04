import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: { productName: string } }
) {
  try {
    if (!params.productName) {
      return new NextResponse("Product name is required", { status: 400 });
    }

    const product = await prismaClient.product.findUnique({
      where: {
        name: params.productName
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_NAME GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
    req: Request,
    { params }: { params: { productName: string } }
  ) {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.productName) {
        return new NextResponse("Color name is required", { status: 400 });
      }
  
      const productByCurrentUser = await prismaClient.product.findUnique({
        where: {
          name: params.productName,
          adminId: currentUser?.id,
        }, include: {
            category: true,
            subCategory: true,
            images: true,
            collection: true,
            size: true,
            color: true,
            style: true
        }
      });
  
      if (!productByCurrentUser) {
        return new NextResponse("Product not found", { status: 404 });
      }

      for(const images of productByCurrentUser.images) {
        await prismaClient.image.delete({
            where: {
                id: images.id
            }
        })
      }
  
      const product = await prismaClient.product.delete({
        where: {
          name: params.productName
        }
      });
    
      return NextResponse.json(product);
    } catch (error) {
      console.log('[PRODUCT_PROBLEMS]', error);
      return new NextResponse("product delete error", { status: 500 });
    }
};
  
  
export async function PATCH(
    req: NextRequest,
    { params }: { params: { productName: string } }
  ) {
    try {   
      const currentUser = await getCurrentUser();
      
      const {name, description, categoryName, subCategoryName, size, style, color, images, collection, price, isFeatured, isArchived, quantity}  = await req.json();
      
      if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.productName) {
        return new NextResponse("Product name is required", { status: 400 });
      }
      
      const productToBeUpdated = await prismaClient.product.findUnique({
        where: {
          name: params.productName as string,
          adminId: currentUser?.id as string,
        }, include: {
            category: true,
            subCategory: true,
            images: true,
            collection: true,
            size: true,
            color: true,
            style: true
        }
      });

      if (!productToBeUpdated) {
        return new NextResponse("Categroy not found", { status: 404 });
      }
      
      if (!name && !productToBeUpdated?.name) {
        return new NextResponse("Name is required", { status: 400 });
      }

      if(!categoryName && !productToBeUpdated?.category) {
        return new NextResponse("Category name is required", { status: 400 });
      }

      if(!description && !productToBeUpdated.details) {
        return new NextResponse("Description is required", { status: 400 });
      }

      if(!subCategoryName && !productToBeUpdated.subCategory) {
        return new NextResponse("Sub-Category name is required", { status: 400 });
      }

      if(!size && !productToBeUpdated.size) {
        return new NextResponse("Size is required", { status: 400 });
      }

      if(!style && !productToBeUpdated.style) {
        return new NextResponse("Style is required", { status: 400 });
      }

      if(!collection && !productToBeUpdated.collection) {
        return new NextResponse("Collection is required", { status: 400 });
      }

      if(!color && !productToBeUpdated.color) {
        return new NextResponse("Color is required", { status: 400 });
      }

      if(!images && !productToBeUpdated.images) {
        return new NextResponse("Images is required", { status: 400 });
      }

      if(!price && !productToBeUpdated.price) {
        return new NextResponse("Price is required", { status: 400 });
      }

      if(!isFeatured && !productToBeUpdated.isFeatured) {
        return new NextResponse("If featured is required to be stated", { status: 400 });
      }

      if(!isArchived && !productToBeUpdated.isSoldOut) {
        return new NextResponse("If archived is required to be stated", { status: 400 });
      }

      if(!quantity && !productToBeUpdated.quantity) {
        return new NextResponse("Quantity is required", { status: 400 });
      }

  
      const product = await prismaClient.product.update({
        where: {
          name: params.productName,
        },
        data: {
            name: name as string,
            price: price as number,
            details: description as string,
            category: categoryName,
            subCategory: subCategoryName,
            quantity: quantity as number,
            isFeatured: isFeatured as boolean,
            isSoldOut: isArchived as boolean,
            size: size,
            color: color,
            style: style,
            collection: collection,
            admin: {
                connect: {
                    id: currentUser?.id as string
                }
            },
            images: {
                updateMany: images.map((image: string) => ({
                    url: image,
                }))
            }
           
        }
      });
    
      return NextResponse.json(product);
    } catch (error) {
      console.log('[category UPDATE]', error);
      return new NextResponse("category update error", { status: 500 });
    }
};