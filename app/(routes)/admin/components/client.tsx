"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { TaskColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface TaskClientProps {
    data : TaskColumn[]
}

export const TaskClient : React.FC<TaskClientProps> = ({data}) => {
    const router = useRouter()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Tasks ${(data.length)}`}
                    description="Manage Tasks for your store"
                />
                <Button onClick={()=>router.push(`/admin/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="tasker" columns={columns} data={data} />
        </>
    )
}