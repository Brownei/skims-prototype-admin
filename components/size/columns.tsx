"use client"

import { ColumnDef } from "@tanstack/react-table"
import ClientMenu from "./client-menu"

export type SizeColumn = {
    id: string;
    adminId: string;
    name: string;
    value: string;
    createdAt: string;
    updatedAt: string;
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
        return <ClientMenu sizes={row.original}/>
    }
  }
]
