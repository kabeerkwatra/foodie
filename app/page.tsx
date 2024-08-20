/* eslint-disable @next/next/no-img-element */
"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  const session = useSession()
  if (session.status == "authenticated") {
    if (session.data && session.data.user && "username" in session.data?.user) {
      router.push("/user/dashboard")
    }
    else if (session.data && session.data.user && "res_name" in session.data?.user) {
      router.push("/restaurant/dashboard")
    }
    else if (session.data && session.data.user && "rider_name" in session.data?.user) {
      router.push("/rider/dashboard")
    }
  }
  return (
    <div className="flex flex-col items-center text-center h-screen">
      <div className="flex flex-col lg:flex-row h-1/2 w-screen justify-center">
        <Link href="/user" className="flex justify-center items-center h-full w-4/5 lg:w-1/5 shadow-none m-2 rounded-3xl bg-red-600 text-white font-bold text-3xl hover:ring-4 hover:ring-red-700  hover:bg-red-700">Customer</Link>
        <Link href="/restaurant" className="flex justify-center items-center h-full w-4/5 lg:w-1/5 shadow-none m-2 rounded-3xl bg-red-600 text-white font-bold text-3xl hover:ring-4 hover:ring-red-700  hover:bg-red-700">Restaurant<br />Owner</Link>
        <Link href="/rider" className="flex justify-center items-center h-full w-4/5 lg:w-1/5 shadow-none m-2 rounded-3xl bg-red-600 text-white font-bold text-3xl hover:ring-4 hover:ring-red-700  hover:bg-red-700">Delivery<br />Partner</Link>
      </div>
      <Link href="/orderwithoutsignin" className="bg-red-600 hover:bg-red-700 m-4 p-4 rounded-2xl text-white text-xl mt-10 hover:ring-4 hover:ring-red-700">Order without signin</Link>
      <div className="font-semibold">(For testing purposes, please use pincode - 110011)</div>
    </div>
  )
}

