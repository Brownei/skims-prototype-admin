import { connectToDB } from "@/lib/database";
import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getErrorMessage } from "@/lib/error-handler";

export async function GET() {
    await connectToDB()
    const currentUser = await getCurrentUser()

    try {
        if(!currentUser) {
            NextResponse.error()
        }

        const collections = await prismaClient.collection.findMany({
            where: {
                adminId: currentUser?.id
            }
        })

        return new Response(JSON.stringify(collections), {status: 200})
    } catch (error) {
        console.log('Error in the GET collections', getErrorMessage(error))
        return new Response('Error getting all the collections', {status: 501})
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    await connectToDB();
    
    try {
        const {name, imageUrl, isLimitedEdition, isEssentials} = await req.json();
        const currentUser = await getCurrentUser()

        if(!currentUser) {
            NextResponse.error()
        }
        
        if(!name || !imageUrl) {
            return new Response("No valid information", {status: 404})
        }

        const existingCollections = await prismaClient.collection.findUnique({
            where: {
                name: name as string,
                adminId: currentUser?.id as string,
            }
        })

        if(existingCollections) {
            return new Response("Existing style!", {status: 409})
        }

        const newCollections = await prismaClient.collection.create({
            data: {
                name: name as string,
                adminId: currentUser?.id as string,
                image: imageUrl as string,
                isEssentials: isEssentials as boolean,
                isLimitedEdition: isLimitedEdition as boolean
            }
        })

        return new Response(JSON.stringify(newCollections), {status: 200})
        
    } catch (error) {
        console.log(getErrorMessage(error))
        return new Response('Failed to create a new collection', { status: 500})
    }
}