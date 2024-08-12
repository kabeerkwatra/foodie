/* eslint-disable react/display-name */
"use client"
import Loader from "@/app/components/Loader";
import PickupRequests from "@/app/components/PickupRequests";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/* eslint-disable import/no-anonymous-default-export */

export default function (){
    const session = useSession()
    const router = useRouter()
    if (session.status=="loading") return <Loader/>
    if (session.status=="unauthenticated") {
        router.push("/signin/rider")
        return (
                <div className="flex justify-center items-center">
                    Redirecting to signin page...
                </div>        )
    }
    return <PickupRequests/>
}