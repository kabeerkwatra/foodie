/* eslint-disable react/display-name */
"use client"
import Loader from "@/app/components/Loader"
import OrderRequests from "@/app/components/OrderRequests"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
/* eslint-disable import/no-anonymous-default-export */
export default function (){
    const session = useSession()
    const router = useRouter()
    if (session.status == "loading") return <Loader/>
    if (session.status == "unauthenticated"){
        router.push("/signin/restaurant")
        return <div className="flex justify-center items-center">
            Not signed in, redirecting to signin page
        </div>
    } 
    return <OrderRequests/>
}