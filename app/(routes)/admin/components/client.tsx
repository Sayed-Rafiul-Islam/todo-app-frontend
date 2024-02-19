"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { TaskColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { useEffect, useState } from "react"


interface TaskClientProps {
    data : TaskColumn[]
}

export const TaskClient : React.FC<TaskClientProps> = ({data}) => {
    const router = useRouter()

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
                    description={`Completed ${doneTasks.length}, Incompleted : ${undoneTasks.length}` }              
                    />
                <Button onClick={()=>router.push(`/admin/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="tasker" columns={columns} doneTasks={doneTasks} undoneTasks={undoneTasks} data={data} />
        </>
    )
}