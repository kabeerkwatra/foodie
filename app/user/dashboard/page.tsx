/* eslint-disable react/display-name */
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { fetchRestos } from "@/app/actions/fetchRestos"
import Link from "next/link"
import useSWR from "swr"
import Loader from "@/app/components/Loader"
import SmallLoader from "@/app/components/SmallLoader"
/* eslint-disable import/no-anonymous-default-export */
export default function () {
    const clientSession = useSession()
    const { data: restaurants,isLoading } = useSWR("fetchRestos", fetchRestos)
    const router = useRouter()
    if (clientSession.status == "loading") {
        return <Loader />
    }
    // @ts-ignore
    if(!clientSession.data?.user?.username){
        router.push("/")
        return <div>User not signed in. Redirecting to homepage...</div>
    } 
    // @ts-ignore 
    else if (clientSession.status == "unauthenticated") {
        setTimeout(() => { router.push("/") }, 1000)
        return <div>User not signed in, redirecting to home page...</div>
    }
    else if (clientSession.status == "authenticated" && clientSession.data.user) {
        return <div className="flex flex-col w-screen justify-center items-center">
            <div className="text-5xl text-center font-semibold text-red-600 mb-10">Nearby restaurants</div>
            {isLoading?<SmallLoader/>:null}
            <ul className="flex flex-col">{restaurants?.map((r) => {
                return (
                    <Link className="text-3xl hover:text-red-700 hover:text-4xl my-2" href={{
                        pathname: "/user/dashboard/menu",
                        query: { restaurant: r.res_name,
                            pincode:r.pincode
                         }
                    }} key={r.res_name}>{r.res_name}</Link>
                )
            })}</ul>
        </div>
    }

}