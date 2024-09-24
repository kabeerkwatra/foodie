"use client"

import Loader from "@/app/components/Loader"
import PastOrders from "@/app/components/PastOrders"
import { useSession } from "next-auth/react"
import { ClockIcon } from "lucide-react"

export default function Page() {
    const session = useSession()
    
    if (session.status === "loading") {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    if (session.data && session.data.user && "username" in session.data.user) {
        return (
            <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center justify-center">
                            <ClockIcon className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 mr-2" />
                            My Past Orders
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">View and track your order history</p>
                    </div>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <PastOrders />
                    </div>
                </div>
            </div>
        )
    }

    return null
}