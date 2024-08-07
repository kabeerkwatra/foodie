"use client"
import Loader from "@/app/components/Loader";
import RestoPastOrders from "@/app/components/RestoPastOrders";
import { useSession } from "next-auth/react";
export default function Page(){
    const session = useSession()
    if(session.status == "loading") return <Loader/>
    if(session.data && session.data.user && "res_name" in session.data.user){
        const res_name = session.data.user?.res_name
        return <RestoPastOrders/>
    }
}