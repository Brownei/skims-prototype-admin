"use client"

import { Label } from "@/components/ui/label"
import moment from "moment"
import { useColors } from "@/hooks/use-colors"
import { columns } from "./columns"
import Error from "../Error"
import { Loader } from "../Loader"
import { ColorColumn } from "./columns"
import { DataTable } from "./data-table"


const ColorList = () => {
  const {data: colors, isLoading, isError, isSuccess} = useColors()

  if(isError) {
    return <Error title="Check your connection please!" subtitle="Something must have happened" showReset/>
  }

  if(isLoading) {
    return <Loader />
  }

  const colorDataItem: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    value: color.value,
    createdAt: moment(color.createdAt).format('MMMM DD, YYYY'),
    updatedAt: moment(color.updatedAt).format('MMMM DD, YYYY'),
    name: color.name,
    adminId: color.adminId
  }))

  return (
    <div>
      {isSuccess && (
        <div className="mt-5">
          {/* List of Categories  */}
          <div className="mt-5">
            <DataTable columns={columns} data={colorDataItem}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorList;