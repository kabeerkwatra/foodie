/* eslint-disable @next/next/no-img-element */
"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  const session = useSession()
  if (session.status == "authenticated"){
    if (session.data && session.data.user && "username" in session.data?.user){
      router.push("/user/dashboard")
    }
    else if (session.data && session.data.user && "res_name" in session.data?.user){
      router.push("/restaurant/dashboard")
    }
    else if (session.data && session.data.user && "rider_name" in session.data?.user){
      router.push("/rider/dashboard")
    }
  }
  return (
  <div className="flex justify-center items-center h-screen text-center">
    <div><div className="flex justify-center text-3xl">
    </div>
      <br/>
      <div className="flex flex-col lg:flex-row h-screen w-screen justify-center items-center">
        <Link href="/user" className="flex justify-center items-center h-1/2 w-4/5 lg:w-1/5 shadow-none m-2 rounded-3xl bg-red-600 text-white font-bold text-3xl hover:ring-4 hover:ring-red-700  hover:bg-red-700">Customer</Link>
        <Link href="/restaurant" className="flex justify-center items-center h-1/2 w-4/5 lg:w-1/5 shadow-none m-2 rounded-3xl bg-red-600 text-white font-bold text-3xl hover:ring-4 hover:ring-red-700  hover:bg-red-700">Restaurant<br/>Owner</Link>
        <Link href="/rider" className="flex justify-center items-center h-1/2 w-4/5 lg:w-1/5 shadow-none m-2 rounded-3xl bg-red-600 text-white font-bold text-3xl hover:ring-4 hover:ring-red-700  hover:bg-red-700">Delivery<br/>Partner</Link>
      </div>
    </div>
  </div>
  )
}

