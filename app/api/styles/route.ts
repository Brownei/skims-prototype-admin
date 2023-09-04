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

        const styles = await prismaClient.style.findMany({
            where: {
                adminId: currentUser?.id
            }
        })

        return new Response(JSON.stringify(styles), {status: 200})
    } catch (error) {
        console.log('Error in the GET styles', error)
        return new Response('Error getting all the styles', {status: 501})
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    await connectToDB();
    
    try {
        const {name} = await req.json();
        const currentUser = await getCurrentUser()

        if(!currentUser) {
            NextResponse.error()
        }
        
        if(!name) {
            return new Response("No valid information")
        }

        const existingStyles = await prismaClient.style.findUnique({
            where: {
                name,
                adminId: currentUser?.id as string,
            }
        })

        if(existingStyles) {
            return new Response("Existing style!")
        }

        const newStyles = await prismaClient.style.create({
            data: {
                name: name as string,
                adminId: currentUser?.id as string
            }
        })

        return new Response(JSON.stringify(newStyles), {status: 200})
        
    } catch (error) {
        console.log(error)
        return new Response('Failed to create a new styles', { status: 500})
    }
}