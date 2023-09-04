"use client"
import { MixerHorizontalIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ColorFilterOptionsProps<TData> {
  table: Table<TData>
}

export function ColorFilterOptions<TData>({
  table,
}: ColorFilterOptionsProps<TData>) {
  const router = useRouter()
  return (
    <div className="flex gap-3 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 flex font-ProExtraBold"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
        <div>
          <Button className="ml-auto h-8 flex font-ProExtraBold" variant='outline' size='sm' onClick={() => router.push('/dashboard/colors/new')}>
            <PlusCircledIcon className="mr-2 h-4 w-4"/>
            New Color
          </Button>
        </div>
      </DropdownMenu>
    </div>
  )
}

