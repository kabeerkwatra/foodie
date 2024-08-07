/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { updateOrder } from "../actions/updateOrder"
import Loader from "./Loader"
export default function(){
    const session = useSession()
    if(session.data && session.data.user && "res_name" in session.data.user){

    const res_name = session.data?.user?.res_name
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    let {data:orders,isLoading,mutate} = useSWR(`/api/getAllOrders?restaurant=${res_name}`,fetcher,{refreshInterval:15000})
    const Orders = orders?.orders
    if (isLoading) return <Loader/>
    if (Orders){
        const cookedOrders = Orders.filter((order:any)=> order.cooked==true)
        return <div className="flex flex-col font-semibold ">
                <div className="text-5xl text-center mb-5 text-red-600">
                    Cooked Orders
                </div>
                <div className="flex flex-col justify-center items-center">
                {cookedOrders.length==0?<div className="font-semibold">(No orders)</div>:null}
                    {cookedOrders.map((o:any)=>{
                        const actualOrder=Object.entries(JSON.parse(o.items)).filter(([key,value])=>value!=0)
                        if(actualOrder.length==0){
                            return null
                        } 
                        return <div className=" flex flex-col items-center mb-5 border-b p-2" key={o.id}>
                            <div>ORDER ID = {o.id}</div>
                            <div className="flex flex-col items-center">{actualOrder.map(([key,value])=><div key={key}>{`${key} x ${value}`}</div>)}</div>
                            <div>{`Total = ${o.amount}`}</div>
                            </div>
                    })}
                 </div>
                </div>
    }
}
}