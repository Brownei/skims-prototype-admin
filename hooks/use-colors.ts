"use client"
import { Color } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getColors(): Promise<Color[]> {
  const {data} = await axios.get('/api/colors')
  return data
}

export const useColors = () => useQuery({
  queryKey: ['colors'],
  queryFn: getColors
})