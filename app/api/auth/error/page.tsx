"use client"
import SmallLoader from "@/app/components/SmallLoader"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { NextRequest } from "next/server"
import { useState } from "react"

export default function Page(){
    const searchParams= useSearchParams()
    const err = searchParams.get('error')
    const router = useRouter()
    const [show,setShow]=useState(false)
    setTimeout(()=>setShow(true),500)
    setTimeout(()=>router.back(),1000)
    return <div className="flex flex-col justify-center items-center text-3xl">
        <div>{err}</div>
        <div>Please try again</div>
        {(show)?<div className="flex flex-col items-center"><div className="text-2xl mt-10">Redirecting...</div>
            <SmallLoader/>
        </div>:null}
    </div>
}