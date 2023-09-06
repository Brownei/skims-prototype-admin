import { connectToDB } from "@/lib/database";
import { prismaClient } from "@/lib/prismaClient";
import { hashSync } from "bcrypt-ts";
import { error } from "console";
import { NextRequest } from "next/server";


export const POST = async (req: NextRequest) => {
    const { email, firstName, lastName, hashedPassword } = await req.json();

    try {
        await connectToDB();

        if(!lastName || !firstName || !email || !hashedPassword) {
            return new Response("Incomplete credentials!", {status: 409})
        }

        const existingAdmin = await prismaClient.admin.findUnique({
            where: {
                email: email
            }
        })

        if(existingAdmin) {
            return new Response("User already exists!", {status: 409})
        } 

        const hashPassword = hashSync(hashedPassword, 10)
        const newAdmin = await prismaClient.admin.create({
            data: {
                email,
                firstName: firstName,
                lastName: lastName,
                hashedPassword: hashPassword,
            }
        })

        return new Response(JSON.stringify(newAdmin), {status: 200})

    } catch (error) {
        console.log(error)
        return new Response('Can not create new admin user', {status: 500})
    }
}