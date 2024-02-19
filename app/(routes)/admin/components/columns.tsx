"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"


export type TaskColumn = {
    _id : string,
    label : string,
    task : string,
    tasker : string,
    status : boolean,
    comment : string,
    date : string
}

export const columns: ColumnDef<TaskColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "task",
    header: "Task",
  },
  {
    accessorKey: "tasker",
    header: "Tasker",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell : ({row}) => <p className={row.original.status 
      ? "text-green-500 font-bold" 
      : "text-red-500 font-bold"}
      >{row.original.status ? "Done" : "Undone"}</p>
  },
  {
    accessorKey: "comment",
    header: `Tasker's Comment`,
  },
  {
    accessorKey: "date",
    header: "Assigned Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
