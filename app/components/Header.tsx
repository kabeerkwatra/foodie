/* eslint-disable react/display-name */
"use client"
import Link from "next/link";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";

/* eslint-disable import/no-anonymous-default-export */
export default function(){
    const router = useRouter()
    const session = useSession()
    return (
    <div className="flex border-b-2 items-center m-2">
        <div>
            <Link href="/">
            <Logo />
            </Link>
        </div>
        <div className="flex justify-between w-full">
            <div className="flex">
                <ul className="flex">
                    {(session.data && session.data.user && "username" in session.data?.user)?<li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-red-600 hover:text-white hover:bg-red-600"><Link href="/user/dashboard">Nearby</Link></li>:null}
                    {(session.data && session.data.user && "username" in session.data?.user)?<li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-red-600 hover:text-white hover:bg-red-600"><Link href="/user/past-orders">My Orders</Link></li>:null}
                    {(session.data && session.data.user && "res_name" in session.data?.user)?<li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-red-600 hover:text-white hover:bg-red-600"><Link href="/restaurant/dashboard">Pending Orders</Link></li>:null}
                    {(session.data && session.data.user && "res_name" in session.data?.user)?<li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-red-600 hover:text-white hover:bg-red-600"><Link href="/restaurant/past-orders">Cooked Orders</Link></li>:null}
                    {(session.data && session.data.user && "rider_name" in session.data?.user)?<li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-red-600 hover:text-white hover:bg-red-600"><Link href="/rider/dashboard">Current Pickups</Link></li>:null}
                    {(session.data && session.data.user && "rider_name" in session.data?.user)?<li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-red-600 hover:text-white hover:bg-red-600"><Link href="/rider/past-orders">Already Delivered</Link></li>:null}
                </ul>
            </div>
            <div className="flex">
                
                
            {(session.data && session.data.user && "username" in session.data?.user)?
            <div className="content-center p-2 m-2 font-bold underline text-xl rounded-3xl">{String(session?.data?.user?.username)}</div>:null}
            {(session.data && session.data.user && "res_name" in session.data?.user)?
            <div className="content-center p-2 m-2 font-bold underline text-xl rounded-3xl">{String(session?.data?.user?.res_name)}</div>:null}
            {(session.data && session.data.user && "rider_name" in session.data?.user)?
            <div className="content-center p-2 m-2 font-bold underline text-xl rounded-3xl">{String(session?.data?.user?.rider_name)}</div>:null}
                {(session.status=="authenticated")?(<div className="flex"><button onClick={async ()=>{
                    await signOut({callbackUrl:"/",redirect:true})
                }} className="px-4 py-3 m-2 font-bold text-white text-sm lg:text-lg bg-red-600 rounded-3xl hover:bg-red-700 hover:ring-red-700 hover:ring-2">
                    Sign Out
                </button></div>):null}
        </div>
        </div>
    </div>
    )
}