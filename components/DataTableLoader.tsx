import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableLoaderProps {
  columnCount: number
  rowCount?: number
  className?: string 
}

export function DataTableLoader({
  columnCount,
  rowCount = 10,
  className
}: DataTableLoaderProps) {
  return (
    <main className={className}>
      <div className="w-full space-y-3 overflow-auto">
        <Skeleton className="w-40 h-6"/>
        <div className="flex justify-between items-center">
          <Skeleton className="w-40 h-6"/>
          <div className="flex gap-3 items-center">
            <Skeleton className="w-40 h-6"/>
            <Skeleton className="w-40 h-6"/>
          </div>
        </div>
        <div className="rounded-md border">
          <Table className="min-w-[640px]">
            <TableHeader>
              {Array.from({ length: 1 }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  {Array.from({ length: columnCount }).map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className="h-6 w-full" />
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  {Array.from({ length: columnCount }).map((_, i) => (
                    <TableCell key={i}>
                      {i === 0 ? (
                        <Skeleton className="h-40 w-full" />
                      ) : (
                        <Skeleton className="h-6 w-full" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
          <div className="flex-1">
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-[70px]" />
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="hidden h-8 w-8 lg:block" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="hidden h-8 w-8 lg:block" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}