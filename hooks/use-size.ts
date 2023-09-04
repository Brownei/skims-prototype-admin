"use client"
import { Size } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getSizes(): Promise<Size[]> {
  const {data} = await axios.get('/api/sizes')
  return data
}

export const useSizes = () => useQuery({
  queryKey: ['sizes'],
  queryFn: getSizes
})