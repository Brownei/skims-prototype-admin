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

        const sizes = await prismaClient.size.findMany({
            where: {
                adminId: currentUser?.id
            }
        })

        return new Response(JSON.stringify(sizes), {status: 200})
    } catch (error) {
        console.log('Error in the GET sizes', error)
        return new Response('Error getting all the sizes', {status: 501})
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

        const existingSizes = await prismaClient.size.findFirst({
            where: {
                name,
                adminId: currentUser?.id as string,
            }
        })

        if(existingSizes) {
            return new Response("Existing size!")
        }

        const newSizes = await prismaClient.size.create({
            data: {
                name: name as string,
                value : value as string,
                adminId: currentUser?.id as string
            }
        })

        return new Response(JSON.stringify(newSizes), {status: 200})
        
    } catch (error) {
        console.log(error)
        return new Response('Failed to create a new size', { status: 500})
    }
}