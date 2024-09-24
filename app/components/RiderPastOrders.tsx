"use client"

import { useSession } from "next-auth/react"
import useSWR from "swr"
import Loader from "./Loader"
import { Package } from "lucide-react"

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())

export default function RiderPastOrders() {
    const { data: session, status } = useSession()
    const { data: orders, error, isLoading } = useSWR(
        // @ts-ignore
        status === "authenticated" && session?.user?.rider_name
            // @ts-ignore
        ? `/api/getRiderOrders?rider=${session.user.rider_name}`
            : null,
        fetcher,
        { refreshInterval: 15000 }
    )

    if (status === "loading" || isLoading) return <Loader />
    if (status === "unauthenticated") return <div>Please sign in to access this page</div>
    if (error) return <div>Failed to load orders</div>
    // @ts-ignore
    if (!session?.user?.rider_name) return <div>Access denied. Rider information not found.</div>

    const deliveredOrders = orders?.orders.filter((order: any) => order.delivered === true) || []

    return (
        <div className="flex flex-col items-center max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-8 text-red-600 font-bold flex items-center">
                <Package className="w-8 h-8 mr-2" />
                Delivered Orders
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {deliveredOrders.length > 0 ? (
                    deliveredOrders.map((o: any) => (
                        <OrderCard key={o.id} order={o} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 text-lg">
                        (No delivered orders)
                    </div>
                )}
            </div>
        </div>
    )
}

function OrderCard({ order } : any) {
    const actualOrder = Object.entries(JSON.parse(order.items)).filter(([key, value]) => value !== 0)

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Order ID: {order.id}</h3>
            <ul className="mb-4 flex-grow">
                {actualOrder.map(([key, value]) => (
                    <li key={key} className="text-gray-700">{`${key} x ${value}`}</li>
                ))}
            </ul>
            <p className="text-lg font-bold text-gray-800">Total: ₹{order.amount}</p>
        </div>
    )
}