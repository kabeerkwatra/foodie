/* eslint-disable react/display-name */
"use client"
import Link from "next/link";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
                    <li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-red-600 hover:text-white hover:bg-red-600"><Link href="/">Home</Link></li>
                    {/* <li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-red-600 hover:text-white hover:bg-red-600"><Link href="/dashboard">Dashboard</Link></li>
                    <li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-red-600 hover:text-white hover:bg-red-600"><Link href="/profile">Profile</Link></li> */}
                </ul>
            </div>
            
                {(session.status=="authenticated")?(<div className="flex"><button onClick={async ()=>{
                    await signOut({callbackUrl:"/",redirect:true})
                }} className="px-4 py-3 m-2 font-bold text-white text-sm lg:text-lg bg-red-600 rounded-3xl hover:bg-red-700 hover:ring-red-700 hover:ring-2">
                    Sign Out
                </button></div>):null}
        </div>
    </div>
    )
}