"use client"
import { ProductColumn } from "@/components/products/columns"
import { Product } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getProducts(): Promise<Product[]> {
  const {data} = await axios.get('/api/products')
  return data as Product[]
}

export const useProducts = () => useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
})