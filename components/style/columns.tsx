"use client"

import { ColumnDef } from "@tanstack/react-table"
import ClientMenu from "./client-menu"

export type StyleColumn = {
  id: string;
  adminId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const columns: ColumnDef<StyleColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
        return <ClientMenu styles={row.original}/>
    }
  }
]
