"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type UserColumn = {
  email: string,
  userName: string,
  role: string
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "userName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell : ({row}) => <p className={row.original.status ? "text-green-500 font-bold" : "text-red-500 font-bold"}>{row.original.status ? "Done" : "Undone"}</p>
  // },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
