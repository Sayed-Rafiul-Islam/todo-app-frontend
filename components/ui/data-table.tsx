"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel
} from "@tanstack/react-table"
import { useEffect, useState } from "react"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./dropdown-menu"
import { ArrowDown, ChevronDown, MoreHorizontal } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  searchKey : string,
  doneTasks: TData[],
  undoneTasks: TData[],
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  doneTasks,
  undoneTasks
}: DataTableProps<TData, TValue>) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
      )

    const [tableData, setTableData] = useState<TData[]>(data)
    const [filter, setFilter] = useState('All Tasks')

    useEffect(()=>{
        if (filter === "Finished") {
            setTableData(doneTasks)
        } else if (filter === "Unfinished") {
            setTableData(undoneTasks)
        } else {
            setTableData(data)
        }
    },[filter,data])

  const table = useReactTable({
    data : tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        columnFilters
      },
  })

  return (
    <div>
        <div className="flex items-center py-4 justify-between">
            <Input
                placeholder="Search"
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className=" p-2">
                        <ChevronDown size={15} className="mr-2" />
                        {filter}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={()=>setFilter("Finished")}>
                        Finished
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{setFilter("Unfinished")}}>
                        Unfinished
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{setFilter("All Tasks")}}>
                        All Tasks
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="rounded-md border flex-wrap">
            <Table className="overflow-scroll">
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup,index) => (
                    <TableRow key={index}>
                    {headerGroup.headers.map((header,index) => {
                        return (
                        <TableHead key={index} className="px-12 text-center">
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row,index) => (
                    <TableRow
                        key={index}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell className="text-center" key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    </div>
  )
}
