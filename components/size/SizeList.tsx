"use client"

import Error from "../Error"
import { SizeColumn, columns } from "./columns"
import { DataTable } from "./data-table"
import { useSizes } from "@/hooks/use-size"
import { Loader } from "../Loader"
import moment from "moment"


const SizeList = () => {
  const {data: sizes, isLoading, isError} = useSizes()

  if(isError) {
    return <Error title="Check your connection please!" subtitle="Something must have happened" showReset/>
  }

  if(isLoading) {
    return <Loader />
  }

  const sizeDataItem: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    createdAt: moment(size.createdAt).format('MMMM DD, YYYY'),
    updatedAt: moment(size.updatedAt).format('MMMM DD, YYYY'),
    name: size.name,
    value: size.value,
    adminId: size.adminId
  }))

  return (
    // List of Sizes
    <DataTable columns={columns} data={sizeDataItem}/>
  )
}

export default SizeList;