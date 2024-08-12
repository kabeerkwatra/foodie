/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import Loader from "./Loader"
export default function(){
    const session = useSession()
    if(session.data && session.data.user && "rider_name" in session.data.user){
    const rider_name = session.data?.user?.rider_name
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    let {data:orders,isLoading,mutate} = useSWR(`/api/getRiderOrders?rider=${rider_name}`,fetcher,{refreshInterval:15000})
    const Orders = orders?.orders
    let noOrders=true
    if (isLoading) return <Loader/>
    if (Orders){
        const deliveredOrders = Orders.filter((order:any)=>order.delivered==true)
        return <div className="flex flex-col font-semibold items-center">
                <div className="text-5xl text-center mb-5 text-red-600">
                    Delivered
                </div>
                <div className="flex flex-col justify-center items-center">
                    {deliveredOrders.map((o:any)=>{
                        const actualOrder=Object.entries(JSON.parse(o.items)).filter(([key,value])=>value!=0)
                        if(actualOrder.length==0){
                            return null
                        }
                        noOrders=false 
                        return <div className=" flex flex-col items-center mb-5 border-b p-2" key={o.id}>
                            <div>ORDER ID = {o.id}</div>
                            <div className="flex flex-col items-center">{actualOrder.map(([key,value])=><div key={key}>{`${key} x ${value}`}</div>)}</div>
                            <div>{`Total = ${o.amount}`}</div>
                            </div>
                    })}
                    {(noOrders)?<div className="mb-5">(No orders)</div>:null}
                 </div>
                </div>
    }
}
}