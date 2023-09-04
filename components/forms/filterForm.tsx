"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import React from "react"


interface FilterFormProps<TData> {
  table: Table<TData>
  filterOptions?: React.ReactNode
}

export function FilterForm<TData>({
  table,
  filterOptions
}: FilterFormProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between mt-3">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter with thier names...."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[60%]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {filterOptions}
    </div>
  )
}