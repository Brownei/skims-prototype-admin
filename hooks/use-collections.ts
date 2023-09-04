"use client"
import { Collection } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getCollections(): Promise<Collection[]> {
  const {data} = await axios.get('/api/collections')
  return data
}

export const useCollections = () => useQuery({
  queryKey: ['collections'],
  queryFn: getCollections,
})