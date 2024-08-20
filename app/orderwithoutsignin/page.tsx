/* eslint-disable react/display-name */
"use client"
import SmallLoader from "../components/SmallLoader"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
/* eslint-disable import/no-anonymous-default-export */
export default function () {
    const loading = false
    const router = useRouter()
    let pincode=""
    return (<div className="flex flex-col items-center">
        <label className="text-2xl mt-32">Enter Pincode</label>
        <input onChange={(e)=>{pincode=e.target.value}} className="border-4 rounded-xl p-2 mt-2" type="text" maxLength={6} />
        {(!loading)?<button onClick={()=>{
            router.push(`/orderwithoutsignin/nearby?pincode=${pincode}`)
        }} className="bg-red-600 p-2 text-white rounded-xl mt-4 hover:bg-red-700 hover:ring-red-700 hover:ring-2">Find food nearby</button>:<SmallLoader/>}
    </div>)
}