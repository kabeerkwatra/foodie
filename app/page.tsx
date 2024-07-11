/* eslint-disable @next/next/no-img-element */
"use client"
import Image from "next/image"
import { useState } from "react"
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
      <div>ORDER | REVIEW</div>
    </div>
  </div>
  )
    
}
