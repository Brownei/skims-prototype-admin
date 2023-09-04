import { connectToDB } from "@/lib/database";
import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
    await connectToDB()
    const currentUser = await getCurrentUser()

    try {
        if(!currentUser) {
            NextResponse.error()
        }

        const categories = await prismaClient.color.findMany({
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
        const { name, value } = await req.json();
        const currentUser = await getCurrentUser()

        if(!currentUser) {
            NextResponse.error()
        }
        
        if(!name || !value) {
            return new Response("No valid information")
        }

        const existingColors = await prismaClient.color.findFirst({
            where: {
                name,
                adminId: currentUser?.id as string,
            }
        })

        if(existingColors) {
            return new Response("Existing color!")
        }

        const newColors = await prismaClient.color.create({
            data: {
                name: name as string,
                value : value as string,
                adminId: currentUser?.id as string
            }
        })

        return new Response(JSON.stringify(newColors), {status: 200})
        
    } catch (error) {
        console.log(error)
        return new Response('Failed to create a new Color', { status: 500})
    }
}