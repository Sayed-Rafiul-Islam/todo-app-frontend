"use client"

import { UserForm } from "./components/user-form";

const SuperAdmin = async () => {
    return ( 
        <div className="flex-col">
            <div  className="flex-1 p-8 pt-6 space-y-4">
                <UserForm
                />
            </div>
        </div>
     );
}
 
export default SuperAdmin;