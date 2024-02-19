"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type UserColumn = {
  _id : string
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
    cell : ({row}) => <p className={row.original.role === "admin" 
    ? "text-green-500 font-bold" 
    : "font-bold"}>{row.original.role}</p>
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
