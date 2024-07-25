/* eslint-disable @next/next/no-img-element */
"use client"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
export default function Home() {
  const [login,setLogin] = useState(true)
  return (
  <div className="flex justify-center items-center h-screen text-center">
    <div><div className="flex justify-center text-3xl">
      {/* <Image src="C:\Users\rachn\Desktop\KabeerKwatra\Projects\foodie\app\images\pasta.png" alt="pasta" height="100" width="100"></Image> */}
    </div>
      <br/>
      <div className="flex h-screen w-screen justify-center items-center">
        <Link href="/user" className="flex justify-center items-center h-1/2 w-1/5 shadow-none m-2 rounded-3xl bg-red-600 text-white font-bold text-3xl hover:ring-4 hover:ring-red-700  hover:bg-red-700">Customer</Link>
        <Link href="/restaurant" className="flex justify-center items-center h-1/2 w-1/5 shadow-none m-2 rounded-3xl bg-red-600 text-white font-bold text-3xl hover:ring-4 hover:ring-red-700  hover:bg-red-700">Restaurant<br/>Owner</Link>
        <Link href="/rider" className="flex justify-center items-center h-1/2 w-1/5 shadow-none m-2 rounded-3xl bg-red-600 text-white font-bold text-3xl hover:ring-4 hover:ring-red-700  hover:bg-red-700">Delivery<br/>Partner</Link>
      </div>
    </div>
  </div>
  )
    
}
