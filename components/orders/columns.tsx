"use client"

import { ColumnDef } from "@tanstack/react-table"
import ClientMenu from "./client-menu"

export type OrderColumn = {
    id: string;
    isPaid: string;
    name: string;
    email: string;
    phone: string;
    pricePaid: string;
    address: string;
    products: string;
    createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "address",
    header: "Address"
  },
  {
    accessorKey: "phone",
    header: "Phone Number"
  },
  {
    accessorKey: "pricePaid",
    header: "Total Price"
  },
  {
    accessorKey: "products",
    header: "Products"
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({row}) => {
        return <ClientMenu orders={row.original}/>
    }
  }
]
