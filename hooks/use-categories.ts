"use client"
import { Category } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getCategories(): Promise<Category[]> {
  const {data} = await axios.get('/api/categories')
  return data
}

export const useCategories = () => useQuery({
  queryKey: ['categories'],
  queryFn: getCategories
})

