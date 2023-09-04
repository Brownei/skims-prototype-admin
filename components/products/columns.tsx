"use client"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import ClientMenu from "./client-menu"

export type ProductColumn = {
  id: string;
  adminId: string;
  category: string;
  subCategory: string;
  name: string;
  price: string;
  isFeatured: string;
  isSoldOut: string;
  color: string[] | undefined;
  style: string[] | undefined;
  collection: string[] | undefined;
  createdAt: string;
  updatedAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: (info: any) => (
      <div style={{backgroundColor: info?.getValue()}} className="h-5 w-5 rounded-full"/>
    ),
  },
  {
    accessorKey: "style",
    header: "Style"
  },
  {
    accessorKey: "collection",
    header: "Collection"
  },
  {
    accessorKey: "isSoldOut",
    header: "Sold Out"
  },
  {
    accessorKey: "isFeatured",
    header: "Featured"
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
        return <ClientMenu products={row.original}/>
    }
  }
]
