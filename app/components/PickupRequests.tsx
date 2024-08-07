/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import useSWR from "swr"
import { updateOrder } from "../actions/updateOrder"
import Loader from "./Loader"
export default function(){
    const session = useSession()
    if (session.status=="loading") return <Loader/>
    if(session.data && session.data.user && "rider_name" in session.data.user){

    const rider = session.data?.user?.rider_name
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    let {data:orders,isLoading,mutate} = useSWR(`/api/getRiderOrders?rider=${rider}`,fetcher,{refreshInterval:15000})
    const Orders = orders?.orders
    if (Orders){
    
        const unacceptedOrders=Orders.filter((order:any)=>order.accepted_by_rider==false)
        const acceptedOrders=Orders.filter((order:any)=>order.accepted_by_rider==true && order.delivered==false)
        const deliveredOrders=Orders.filter((order:any)=>order.delivered==true)
        let noUnacceptedOrders = true
        let noAcceptedOrders = true
        let noDeliveredOrders = true
        return <div className="flex flex-col font-semibold ">
                <div className="text-5xl text-center mb-5 text-red-600">
                    Pickup requests
                </div>
                <div className="flex flex-col justify-center items-center">
                    {unacceptedOrders.map((o:any)=>{
                        const actualOrder=Object.entries(JSON.parse(o.items)).filter(([key,value])=>value!=0)
                        if(actualOrder.length==0){
                            return null
                        } 
                        noUnacceptedOrders=false
                        return <div className="mb-5 flex flex-col items-center" key={o.id}>
                            <div>ORDER ID = {o.id}</div>
                            <div>{actualOrder.map(([key,value])=><div key={key}>{`${key} x ${value}`}</div>)}</div>
                            <div>  <button onClick={()=>{
                                updateOrder(o.id,"accepted_by_rider")
                                setTimeout(()=>{
                                    mutate()
                                },500)
                                }} className="mt-2 p-1 border-2 border-red-600 text-white bg-red-600 text-xs">Accept</button>
                                </div>
                            </div>
                    })}
                    {noUnacceptedOrders?<div className="mb-5">(No orders)</div>:null}
                    </div>
                <div className="text-5xl text-center mb-5 text-red-600">
                    Accepted Deliveries
                </div>
                <div id="acceptedOrders" className="flex flex-col justify-center items-center">
                    {acceptedOrders.map((o:any)=>{
                        const actualOrder=Object.entries(JSON.parse(o.items)).filter(([key,value])=>value!=0)
                        if(actualOrder.length==0) {return null}
                        noAcceptedOrders=false
                        return <div className="mb-5 flex flex-col items-center" key={o.id}>
                            <div>ORDER ID = {o.id}</div>
                            <div>{actualOrder.map(([key,value])=><div key={key}>{`${key} x ${value}`}</div>)}</div>
                            <div>  <button onClick={()=>{
                                updateOrder(o.id,"delivered")
                                setTimeout(()=>{
                                    mutate()
                                },500)
                                }} className="mt-2 p-1 border-2 border-red-600 text-white bg-red-600 text-xs">Mark as delivered</button>
                                </div>
                            </div>
                    })}
                    {noAcceptedOrders?<div className="mb-5">(No orders)</div>:null}
                </div>
                
            </div>
    }
    }
    }