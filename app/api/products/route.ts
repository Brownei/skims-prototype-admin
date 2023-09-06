import { connectToDB } from "@/lib/database";
import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(req: NextRequest) {
    await connectToDB()
    const currentUser = await getCurrentUser()
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const styleId = searchParams.get('styleId') || undefined;
    const collectionId = searchParams.get('collectionId') || undefined;
    const subCategoryId = searchParams.get('subCategoryId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    try {
        if(!currentUser) {
            NextResponse.error()
        }

        const products = await prismaClient.product.findMany({
            where: {
                adminId: currentUser?.id,
                categoryId,
                colorId,
                styleId,
                collectionId,
                subCategoryId,
                isFeatured: isFeatured ? true : undefined,
                isSoldOut: false
            }, 
            include: {
                category: true,
                subCategory: true,
                color: true,
                collection: true,
                style: true,
                size: true,
                images: true,
                order: true
            }
        })

        return new Response(JSON.stringify(products), {status: 200})
    } catch (error) {
        console.log('Error in the GET products', error)
        return new Response('Error getting all the products', {status: 501})
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    await connectToDB();
    
    try {
        const { name, details, categoryId, subCategoryId, sizeId, styleId, colorId, images, collectionId, price, isFeatured, quantity, isSoldOut } = await req.json();
        const currentUser = await getCurrentUser()

        if(!currentUser) {
            NextResponse.error()
        }
        
        if(!name || !details || !price) {
            return new Response("No valid details about the product", {status: 300})
        }

        if(!categoryId || !subCategoryId) {
            return new Response("No valid categories/sub-categories about the product", {status: 300})
        }

        if(!sizeId || !styleId || !colorId) {
            return new Response("No valid color/style/size about the product", {status: 300})
        }

        if(!collectionId || !quantity) {
            return new Response("No valid collection/quantity about the product", {status: 300})
        }

        if(!images || images.length < 0) {
            return new Response("No picture about the product", {status: 300})
        }

        const existingProducts = await prismaClient.product.findUnique({
            where: {
                name: name as string,
                adminId: currentUser?.id as string
            }, include: {
                images: true,
                size: true,
            }
        })

        if(existingProducts) {
            return new Response("Existing product!")
        }


        const newProducts = await prismaClient.product.create({
            data: {
                name: name as string,
                price: price as number,
                details: details as string,
                categoryId: categoryId as string,
                subCategoryId: subCategoryId as string,
                quantity: quantity as number,
                isFeatured: isFeatured as boolean,
                isSoldOut: isSoldOut as boolean,
                adminId: currentUser?.id as string,
                sizeId: sizeId.map((size: string) => (size)),
                colorId: colorId as string,
                styleId: styleId as string,
                collectionId: collectionId as string,
                images: {
                    createMany: {
                        data: images.map((image: string) => ({
                            url: image,
                            adminId: currentUser?.id as string
                        }))
                    }
                }
            }
        })

        return new Response(JSON.stringify(newProducts), {status: 200})
        
    } catch (error) {
        console.log(error)
        return new Response('Failed to create a new product', { status: 500})
    }
}