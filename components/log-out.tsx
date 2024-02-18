"use client"
import AccessProvider from "@/actions/accessProvider";
import { getAssignedTasks, logoutUser } from "@/app/redux/slice";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";




const LogOut = () => {
    const router = useRouter()
    const pathname = usePathname()
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem("user")
        router.push("/authentication")
    }
    return ( 
        <div className="flex mr-4">
            <button className={cn(
                "bg-red-500 py-1 px-3 rounded-sm text-white hover:bg-red-600 transition-all",
                pathname === "/authentication" ? "hidden" : "block"
            )} onClick={()=>dispatch(logoutUser())}>Log out</button>
        </div>
     );
}
 
export default LogOut;