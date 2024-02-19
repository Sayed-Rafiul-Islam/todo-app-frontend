"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { UserColumn, columns } from "./columns"
import { UserDataTable } from "@/components/ui/user-data-table"

interface UserClientProps {
    data : UserColumn[]
}

export const UserClient : React.FC<UserClientProps> = ({data}) => {

    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Total Users ${(data.length)}`}
                    description="Manage admins and users"
                />
                <Button onClick={()=>router.push(`/superAdmin/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <UserDataTable searchKey="userName" columns={columns} data={data} />
        </>
    )
}