/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import useSWR from "swr"
import SmallLoader from "./SmallLoader"
export default function(){
    const session = useSession()
    if(session.data && session.data.user && "username" in session.data.user){
    const username = session.data?.user?.username
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    let {data:orders,isLoading,mutate} = useSWR(`/api/getUserOrders?user=${username}`,fetcher,{refreshInterval:15000})
    const Orders = orders?.orders
    let noOrders = true
    if (isLoading) return <div className="flex justify-center">
        <SmallLoader/>
    </div>
    if (Orders){
        return <div className="flex flex-col font-semibold ">
                {(isLoading)?<SmallLoader/>:null}
                <div className="flex flex-col justify-center items-center">
                    {Orders.map((o:any)=>{
                        const actualOrder=Object.entries(JSON.parse(o.items)).filter(([key,value])=>value!=0)
                        if(actualOrder.length==0){
                            return null
                        }
                        noOrders = false
                        let status = "Processing"
                        if(o.accepted_by_restaurant) status = "Cooking"
                        if(o.cooked) status = "Cooked"
                        if(o.picked_up) status = "On the way"
                        if(o.delivered) status = "Delivered"

                        return <div className=" flex flex-col items-center mb-5 border-b p-2" key={o.id}>
                            <Link className="hover:underline" href={`/order?orderid=${String(o.id)}`}>ORDER ID = {o.id}</Link>
                            <div className="flex flex-col items-center">{actualOrder.map(([key,value])=><div key={key}>{`${key} x ${value}`}</div>)}</div>
                            <div>{`Total = ${o.amount}`}</div>
                            <div>{`Status = ${status}`}</div> 
                            </div>
                    })}
                    {noOrders?<div className="mb-5">(No orders)</div>:null}
                 </div>
                </div>
    }
    
}
}