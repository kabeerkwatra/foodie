/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"

import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { fetchMenu } from "@/app/actions/fetchMenu"
import useSWR from "swr"
import QtyInput from "@/app/components/QtyInput"
import { Suspense, useEffect } from "react"
import Loader from "@/app/components/Loader"
export default function(){
    const session = useSession()
    const searchParams = useSearchParams()
    const restaurant = searchParams.get('restaurant')
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    const {data:menu,isLoading} = useSWR(`/api/menu?restaurant=${restaurant}`,fetcher)
    if(isLoading){return <Loader/>}
    if(!menu){return <div>Loading...</div>}
    if(session.status == "authenticated" && menu){
        const menuItems = menu.menu.Menu
        let orderItems = {}
        menuItems.forEach((i:any)=>{
            Object.defineProperty(orderItems, i.item_name , {value:0,writable:true})
        })
        console.log(orderItems)
        return (
            <div className="flex flex-col justify-center items-center">
                <div className="text-6xl font-semibold mb-4">{restaurant}</div>
                <div className="text-5xl font-semibold mb-4">Menu</div>
                <div className="flex">
                 <ul className="mx-2 text-2xl">{menuItems.map((i:any)=>{
                     return <li className="mb-4" key={i.id}>{i.item_name}</li>
                    })}</ul>            
                 <ul className="mx-2 text-2xl">{menuItems.map((i:any)=>{
                     return <li className="mb-4" key={i.id}>{i.price}</li>
                    })}</ul>            
                 {/* <ul className="mx-2 text-2xl">{menuItems.map((i:any)=>{
                     return <li key={i.id}><input onChange={(e)=>{
                        orderItems[i.item_name]=e.target.value
                        }} type="number" placeholder="0" className="h-6 w-10" min="0" max="10">
                        </input></li>
                        })}</ul>             */}
                               
                </div>
            </div>
        )
    }
}