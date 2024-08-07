/* eslint-disable react/display-name */
"use client"
import Loader from "@/app/components/Loader"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"

/* eslint-disable import/no-anonymous-default-export */
export default function(){
    const session = useSession()
    const searchParams= useSearchParams()
    const orderid = searchParams.get('orderid')
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    let {data:order,isLoading} = useSWR(`/api/fetchOrder?orderid=${orderid}`,fetcher,{refreshInterval:10000})
    const router = useRouter()
    if(isLoading) return <Loader/>
    if(session.status == "unauthenticated"){
        setTimeout(()=>router.push("/signin/user"),2000)
        return  <div className="flex justify-center items-center">
                    Redirecting to signin page...
                </div>
    }
    return (
        <div className="flex justify-center flex-col items-center">
            <div className="text-4xl mt-20">
                Order placed
            </div>
            <div className="mt-10 text-2xl">
                Order ID - {orderid}
            </div>
            <div className="mt-10 text-2xl">Order Activity </div>
            {order?.order?.accepted_by_restaurant?
            <div className="flex flex-col border-red-500 rounded-xl items-center border-2 mt-5 p-4">
            {(order?.order?.accepted_by_restaurant)?<div className="text-lg">
                Order accepted by Restaurant
            </div>:null}
            {(order?.order?.accepted_by_rider)?<div className="mt-5 text-lg">
                Rider assigned
            </div>:null}
            {(order?.order?.cooked)?<div className="mt-5 text-lg">
                Finished Cooking
                </div>:null}
            {(order?.order?.picked_up)?<div className="mt-5 text-lg">
                Order picked by rider
            </div>:null}
            {(order?.order?.delivered)?<div className="mt-5 text-lg">
                Order delivered
            </div>:null}

            </div>:<div className="mt-5">Waiting for restaurant to accept</div>}
        </div>
    )
}