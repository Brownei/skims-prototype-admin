"use client"

import { ColumnDef } from "@tanstack/react-table"
import ClientMenu from "./client-menu"
import Image from "next/image"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

export type CollectionColumn = {
    id: string;
    adminId: string;
    name: string;
    isEssentials: string;
    isLimitedEdition: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export const columns: ColumnDef<CollectionColumn>[] = [
    {
        accessorKey: "image",
        header: "Picture",
        cell: (info: any) => (
            <Image src={info?.getValue()} alt="Collection Image" height={150} width={150} blurDataURL="data:..." placeholder="blur" priority/>
        ),
        minSize: 100
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "isEssentials",
        header: "Essentials",
    },
    {
        accessorKey: "isLimitedEdition",
        header: "Limited Edition"
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
            return <ClientMenu collections={row.original}/>
        }
    }
]
