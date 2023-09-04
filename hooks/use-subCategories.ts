"use client"

import { SubCategory } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getSubCategories(): Promise<SubCategory[]> {
  const {data} = await axios.get('/api/subCategories')
  return data
}

export const useSubCategories = () => useQuery({
  queryKey: ['sub-categories'],
  queryFn: getSubCategories
})