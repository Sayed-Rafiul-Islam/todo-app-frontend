"use client"

import { Heading } from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { TaskColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface TaskClientProps {
    data : TaskColumn[]
}

export const TaskClient : React.FC<TaskClientProps> = ({data}) => {

    const number = data.filter((task) => task.status === false)
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Undone Tasks ${(number.length)}`}
                    description="Manage Tasks for your store"
                />
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} data={data} />
        </>
    )
}