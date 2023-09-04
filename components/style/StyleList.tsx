"use client"

import { Label } from "@/components/ui/label"
import Error from "../Error"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { StyleColumn } from "./columns"
import { useStyles } from "@/hooks/use-styles"
import { Loader } from "../Loader"
import moment from 'moment'


const StyleList = () => {
  const {data: styles, isLoading, isError, isSuccess} = useStyles()

  if(isLoading) {
    return <Loader />
  }

  if(isError) {
    return <Error title="Check your connection please!" subtitle="Something must have happened" showReset/>
  }

  const styleDataItem: StyleColumn[] = styles.map((style) => ({
    id: style.id,
    createdAt: moment(style.createdAt).format('MMMM DD, YYYY'),
    updatedAt: moment(style.updatedAt).format('MMMM DD, YYYY'),
    name: style.name,
    adminId: style.adminId
  }))

  return (
    <div>
      {isSuccess && (
        <div className="mt-5">
          {/* List of Categories  */}
          <div className="mt-5">
            <Label className="text-lg font-ProExtraBold">List of Styles</Label>
            <DataTable columns={columns} data={styleDataItem}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default StyleList;

