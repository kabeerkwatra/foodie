"use client"
import Loader from "@/app/components/Loader";
import PastOrders from "@/app/components/PastOrders";
import { useSession } from "next-auth/react";
export default function Page(){
    const session = useSession()
    
    if(session.status == "loading") return <Loader/>
    if(session.data && session.data.user && "username" in session.data.user){
        const username = session.data.user?.username
        return <div>
        <div className="text-5xl text-center mb-5 text-red-600 font-semibold">
                    My Orders
                </div>
         <PastOrders/>
         </div>
    }
}