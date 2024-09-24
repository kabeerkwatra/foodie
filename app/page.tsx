"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserIcon, UtensilsIcon, TruckIcon } from "lucide-react"

export default function Component() {
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow p-4 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">What would you like to do?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/user" className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <div className="h-32 bg-red-500 flex items-center justify-center">
              <UserIcon className="w-16 h-16 text-white" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Customer</h3>
              <p className="text-gray-600 mt-2">Order delicious meals</p>
            </div>
          </Link>

          <Link href="/restaurant" className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <div className="h-32 bg-red-500 flex items-center justify-center">
              <UtensilsIcon className="w-16 h-16 text-white" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Restaurant Owner</h3>
              <p className="text-gray-600 mt-2">Manage your restaurant</p>
            </div>
          </Link>

          <Link href="/rider" className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <div className="h-32 bg-red-500 flex items-center justify-center">
              <TruckIcon className="w-16 h-16 text-white" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Delivery Partner</h3>
              <p className="text-gray-600 mt-2">Start delivering food</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Link href="/orderwithoutsignin" className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Order without signin
          </Link>
          <p className="mt-4 text-gray-600 text-sm">(For testing purposes, please use pincode - 110011)</p>
        </div>
      </main>
    </div>
  )
}