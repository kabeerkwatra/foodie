"use client"
import Loader from "@/app/components/Loader";
import RiderPastOrders from "@/app/components/RiderPastOrders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Page(){
    const session = useSession()
    const router = useRouter()
    if(session.status == "loading") return <Loader/>
    if(session.status == "unauthenticated"){
        router.push("/signin.rider")
        return  <div className="flex justify-center items-center">
                    Redirecting to signin page...
                </div>
    }
    if(session.data && session.data.user && "rider_name" in session.data.user){
        const rider_name = session.data.user?.rider_name
        return <RiderPastOrders/>
    }
}