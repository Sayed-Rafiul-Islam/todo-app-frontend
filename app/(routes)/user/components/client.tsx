"use client"

import { Heading } from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { TaskColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { useEffect, useState } from "react"

interface TaskClientProps {
    data : TaskColumn[]
}

export const TaskClient : React.FC<TaskClientProps> = ({data}) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }

    const doneTasks : TaskColumn[] = data.filter((task : TaskColumn) => task.status === true )
    const undoneTasks : TaskColumn[] = data.filter((task : TaskColumn) => task.status === false )
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Total Tasks ${(data.length)}`}
                    description={`Finished ${doneTasks.length}, Unfinished ${undoneTasks.length}`}
                />
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} doneTasks={doneTasks} undoneTasks={undoneTasks} data={data} />
        </>
    )
}