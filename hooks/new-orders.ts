"use client"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { prismaClient } from "@/lib/prismaClient"
import { Order } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getOrders(): Promise<Order[]> {
    const currentUser = await getCurrentUser()
    const data = await prismaClient.order.findMany({
        where: {
            adminId: currentUser?.id
        }, 
        include: {
            product: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return data
}

export const useOrders = () => useQuery({
  queryKey: ['orders'],
  queryFn: getOrders
})

