"use client"

import { ChevronsDown, ChevronsUp, Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertModal } from "@/components/modals/alert-modal"
import { removeTask } from "@/actions/tasks"
import { removeTaskLocal, removeUser, updateRole } from "@/app/redux/slice"
import { useDispatch } from "react-redux"
import { RoleAlertModal } from "@/components/modals/role-alert-modal"

interface CellActionProps {
    data : UserColumn
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const dispatch = useDispatch()

    
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [roleModal, setRoleModal] = useState(false)
    const [action, setAction] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)
            dispatch(removeUser(data._id))
            toast.success("User removed..")
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const handleRole = async () => {
        setLoading(true)
        if (data.role === "admin") {
            if (action) {
                dispatch(updateRole({_id : data._id,role :"superAdmin"}))
                toast.success(`${data.userName} promoted to Super Admin`)
            } else {
                dispatch(updateRole({_id : data._id,role :"user"}))
                toast.success(`${data.userName} demoted to User`)
            }
        } else {
            dispatch(updateRole({_id : data._id,role :"admin"}))
            toast.success(`${data.userName} promoted to Admin`)
        }
        setLoading(false)
        setRoleModal(false)
        
    }

    return (
        <>
            <AlertModal 
            isOpen={open} 
            onClose={()=>setOpen(false)} 
            onConfirm={onDelete} 
            loading={loading} />

            <RoleAlertModal
            isOpen={roleModal} 
            onClose={()=>setRoleModal(false)} 
            onConfirm={handleRole} 
            loading={loading}
            role={data.role}
            action={action}
            name={data.userName} />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    {
                        data.role === "user" ?
                        <DropdownMenuItem onClick={()=>setRoleModal(true)}>
                            <div className="flex" onClick={() => setAction(true)}>
                                <ChevronsUp className="h-4 w-4 mr-2 text-green-500" />
                                Promote
                            </div>
                        </DropdownMenuItem>
                        :
                        <>
                            <DropdownMenuItem onClick={() => setRoleModal(true)}>
                                <div className="flex" onClick={() => setAction(true)}>
                                    <ChevronsUp className="h-4 w-4 mr-2 text-green-500" />
                                    Promote
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setRoleModal(true)}> 
                                <div className="flex" onClick={() => setAction(false)}>
                                    <ChevronsDown className="h-4 w-4 mr-2 text-red-500" />
                                    Demote
                                </div>
                            </DropdownMenuItem>
                        </>
                    }
                    
                    {/* <DropdownMenuItem onClick={()=>setOpen1(true)}>
                        {
                            data.role === "user" 
                            ? 
                            <div className="flex" onClick={()=>setPromote(true)}>
                                <ChevronsUp className="h-4 w-4 mr-2 text-green-500" />
                                Promote
                            </div>
                            : 
                            <div>
                                <div className="flex">
                                <ChevronsUp className="h-4 w-4 mr-2 text-green-500" />
                                Promote
                                </div>
                                <div className="flex">
                                <ChevronsDown className="h-4 w-4 mr-2 text-red-500" />
                                Demote
                                </div>
                            </div>
                        }
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={()=>setOpen(true)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}