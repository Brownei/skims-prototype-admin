"use client"
import { Label } from "@/components/ui/label"
import { DataTable } from "./data-table"
import { CollectionColumn } from "./columns"
import { useCollections } from "@/hooks/use-collections"
import Error from "../Error"
import { Suspense, useState } from "react"
import moment from "moment"
import { DataTableLoader } from "../DataTableLoader"
import { useFilteredItemsStore } from "@/hooks/useStore"


const CollectionList = () => {
  const {data: collections, isLoading, isError} = useCollections()
  if(isLoading) {
    return <DataTableLoader className="mt-10" columnCount={6} rowCount={5}/>
  }

  if(isError) {
    return <Error title="Check your connection please!" subtitle="Something must have happened" showReset/>
  }

  const collectionDataItem: CollectionColumn[] = collections.map((collection) => ({
    id: collection.id,
    createdAt: moment(collection.createdAt).format('MMMM D, YYYY'),
    updatedAt: moment(collection.updatedAt).format('MMMM D, YYYY'),
    name: collection.name,
    image: collection.image,
    adminId: collection.adminId,
    isEssentials: collection.isEssentials ? 'Yes' : 'No',
    isLimitedEdition: collection.isLimitedEdition ? 'Yes' : 'No'
  }))

  return (
    <div>
      {/* List of Collections  */}
      <div className="mt-10">
        <Label className="text-lg font-ProExtraBold">List of Collections</Label>
        <DataTable collectionDataItem={collectionDataItem}/>
      </div>
    </div>
  )
}

export default CollectionList;