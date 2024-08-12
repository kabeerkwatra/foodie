/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function (userType: any) {
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const router = useRouter()
    const additional=JSON.stringify(userType)
    const next = Object.values(userType)[0]
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input onChange={(e)=>{setEmail(e.target.value)}} id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="text-sm">
                        </div>
                        <div className="mt-2">
                            <input onChange={(e)=>{setPassword(e.target.value)}} id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <button onClick={async ()=>{
                            const res = await signIn("credentials",{
                            email:email,
                            password:password,
                            callbackUrl:`/${next}/dashboard`,
                            },additional)
                        }} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}