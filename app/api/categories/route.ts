import { connectToDB } from "@/lib/database";
import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getErrorMessage } from "@/lib/error-handler";

export async function GET() {
    await connectToDB()
    const currentUser = await getCurrentUser()

    try {
        if(!currentUser) {
            NextResponse.error()
        }

        const categories = await prismaClient.category.findMany({
            where: {
                adminId: currentUser?.id
            }
        })

        return new Response(JSON.stringify(categories), {status: 200})
    } catch (error) {
        console.log('Error in the GET categories', error)
        return new Response('Error getting all the categories', {status: 501})
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    await connectToDB();
    
    try {
        const { name, subCategoriesName } = await req.json();
        const currentUser = await getCurrentUser()

        if(!currentUser) {
            NextResponse.error()
        }
        
        if(!name || !subCategoriesName) {
            return new Response("No valid information")
        }

        const existingCategories = await prismaClient.category.findUnique({
            where: {
                name: name as string,
                adminId: currentUser?.id as string,
            }, include: {
                subCategories: true
            }
        })

        if(existingCategories) {
            return new Response("Existing category!")
        }


        const newCategories = await prismaClient.category.create({
            data: {
                name: name as string,
                admin: {
                    connect: {
                        id: currentUser?.id as string
                    }
                },
                subCategories: {
                    createMany: {
                        data: subCategoriesName.map((subCategoriesName: string) => ({
                            name: subCategoriesName,
                            adminId: currentUser?.id as string
                        }))
                    }
                }, 
            }
        })

        return new Response(JSON.stringify(newCategories), {status: 200})
        
    } catch (error) {
        console.log(getErrorMessage(error))
        return new Response('Failed to create a new category', { status: 500})
    }
}