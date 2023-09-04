"use client"
import { Style } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getStyles(): Promise<Style[]> {
  const {data} = await axios.get('/api/styles')
  return data
}

export const useStyles = () => useQuery({
  queryKey: ['styles'],
  queryFn: getStyles,
})