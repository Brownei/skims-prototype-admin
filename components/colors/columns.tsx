"use client"

import { ColumnDef } from "@tanstack/react-table"
import ClientMenu from "./client-menu"
import { Color } from "@prisma/client"

export type ColorColumn = {
    id: string;
    adminId: string;
    name: string;
    value: string;
    createdAt: string;
    updatedAt: string;
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: (info: any) => (
      <div style={{backgroundColor: info?.getValue()}} className="h-5 w-5 rounded-full"/>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    id: "actions",
    cell: ({row}) => {
        return <ClientMenu colors={row.original}/>
    }
  }
]
