"use client"

import moment from "moment"
import { columns } from "./columns"
import Error from "../Error"
import { Loader } from "../Loader"
import { OrderColumn } from "./columns"
import { DataTable } from "./data-table"
import { useOrders } from "@/hooks/new-orders"


const OrderList = (orderDataItem: OrderColumn[]) => {

  return (
    <div>
        <div className="mt-5">
          {/* List of Categories  */}
          <div className="mt-5">
            <DataTable columns={columns} data={orderDataItem}/>
          </div>
        </div>
    </div>
  )
}

export default OrderList;