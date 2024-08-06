"use client"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { useEffect, useState } from "react"
import placeOrder from "../actions/placeOrder"
import { useRouter } from "next/navigation"
import Loader from "./Loader"
export default function Menu({restaurant,pincode,username}:any){
    const session = useSession()
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    const {data:menu,isLoading} = useSWR(`/api/menu?restaurant=${restaurant}`,fetcher)
    const router = useRouter()
    // const menuItems:string[] = []
    const [orderItems,setOrderItems] = useState(Object.create({}))
    const [total,setTotal]=useState(0)
    let order={}
    let sum=0
    let menuItems = menu.menu.Menu
    useEffect(()=>{
        menuItems.forEach((i:any)=>{
            Object.defineProperty(order,i.item_name,{
                value:0,writable:true,enumerable:true,configurable:true
            })
            Object.defineProperty(i,"qty",{
                value:0,writable:true,enumerable:true,configurable:true
            })
        })
        setOrderItems(order)
    }) 
    // if(isLoading) return <Loader/>
    
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-6xl font-semibold mb-4">{restaurant}</div>
            <div className="text-5xl font-semibold mb-4">Menu</div>
            <div className="flex">
             <ul className="mx-2 text-2xl">
                <li className="font-semibold">Item</li>
                {menuItems.map((i:any)=>{
                 return <li className="mb-4" key={i.id}>{i.item_name}</li>
                })}</ul>            
             <ul className="mx-2 text-2xl">
             <li className="font-semibold">Price</li>
                {menuItems.map((i:any)=>{
                 return <li className="mb-4" key={i.id}>{i.price}</li>
                })}</ul>            
             <ul className="mx-2 text-2xl">
             <li className="font-semibold">Qty</li>
             {menuItems.map((i:any)=>{
                 return <li className="mb-4" key={i.id}><input onChange={(e)=>{
                    if(typeof(i.item_name)=="string"){
                        let order=orderItems
                        order[i.item_name]=e.target.value
                        i.qty=e.target.value
                        setOrderItems(order)
                        sum=0
                        menuItems.forEach((x:any)=>{
                            sum+=Number(x.qty)*x.price
                        })
                        setTotal(sum)
                    }
                    }} type="number" placeholder="0" className="h-6 w-10" min="0" max="10">
                    </input></li>
                    })}</ul>                  
            </div>
            {(total!=0)?<div>Total={total}</div>:<div>Add items to place an order</div>}
            {(total!=0)?
            <button onClick={()=>{
                placeOrder(restaurant,username,pincode,JSON.stringify(orderItems),total)
            }} className="my-4 text-3xl p-4 bg-red-500 text-white rounded-3xl hover:ring-2 hover:ring-red-500" type="button">Submit order</button>:null}
            </div>
    )
}
