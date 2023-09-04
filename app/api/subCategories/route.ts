import { connectToDB } from "@/lib/database";
import { prismaClient } from "@/lib/prismaClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Admin } from "@prisma/client";

export async function GET() {
    await connectToDB()
    const adminPromise: Promise<Admin | null> = getCurrentUser()
    const admin = await adminPromise

    try {
        const subCategories = await prismaClient.subCategory.findMany({
            where: {
                adminId: admin?.id
            }
        })

        return new Response(JSON.stringify(subCategories), {status: 200})
    } catch (error) {
        console.log('Error in the GET products', error)
        return new Response('Error getting all the subCategories', {status: 501})
    }
}