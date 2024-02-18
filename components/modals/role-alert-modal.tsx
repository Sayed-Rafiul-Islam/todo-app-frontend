"use client"

import { useEffect, useState } from "react"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

interface RoleAlertModalProps {
    isOpen : boolean,
    onClose : () => void,
    onConfirm : () => void,
    loading : boolean,
    action : boolean,
    role : string,
    name : string,
}

export const RoleAlertModal : React.FC<RoleAlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    action,
    role,
    name
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }
    
    const description = action
    ? `You want to Promote ${name} to ${role === "user" ? 'Admin' : 'Super Admin'}`
    : `You want to Demote ${name} to User`

    return (
        <Modal 
            title="Are you sure?"
            description={description}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant='outline' onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant={action ? 'constractive' : 'destructive'} onClick={onConfirm}>
                    {action ? "Promote" : "Demote"}
                </Button>
            </div>
        </Modal>
    )
}