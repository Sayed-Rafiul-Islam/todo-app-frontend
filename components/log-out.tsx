"use client"
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


import { logoutUser } from "@/app/redux/slice";
import { AppDispatch } from "@/app/redux/store";
import { cn } from "@/lib/utils";

const LogOut = () => {
    const pathname = usePathname()
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const logOut = () => {
        router.push('/authentication')
        dispatch(logoutUser())
    }
    return ( 
        <div className="flex mr-4">
            <button className={cn(
                "bg-red-500 py-1 px-3 rounded-sm text-white hover:bg-red-600 transition-all",
                pathname === "/authentication" ? "hidden" : "block"
            )} onClick={logOut}>Log out</button>
        </div>
     );
}
 
export default LogOut;