/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { updateOrder } from "../actions/updateOrder"
import Loader from "./Loader"
import { CheckCircle } from "lucide-react"

export default function() {
    const session = useSession()
    if (session.data && session.data.user && "res_name" in session.data.user) {
        const res_name = session.data?.user?.res_name
        const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
        let { data: orders, isLoading, mutate } = useSWR(`/api/getAllOrders?restaurant=${res_name}`, fetcher, { refreshInterval: 15000 })
        const Orders = orders?.orders
        if (isLoading) return <Loader />
        if (Orders) {
            const cookedOrders = Orders.filter((order: any) => order.cooked == true).reverse()
            return (
                <div className="flex flex-col font-semibold max-w-4xl mx-auto px-4 py-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-8 text-red-600 font-bold flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 mr-2" />
                        Cooked Orders
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cookedOrders.length == 0 ? (
                            <div className="col-span-full text-center text-gray-500 text-lg">
                                (No orders)
                            </div>
                        ) : (
                            cookedOrders.map((o: any) => {
                                const actualOrder = Object.entries(JSON.parse(o.items)).filter(([key, value]) => value != 0)
                                if (actualOrder.length == 0) {
                                    return null
                                }
                                return (
                                    <div key={o.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col transition duration-300 ease-in-out transform hover:scale-105">
                                        <h3 className="text-lg font-semibold mb-4 text-red-600">Order ID: {o.id}</h3>
                                        <ul className="mb-4 flex-grow">
                                            {actualOrder.map(([key, value]:any) => (
                                                <li key={key} className="text-gray-700">
                                                    {key} x {value}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-lg font-bold text-gray-800">Total: ₹{o.amount}</p>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            )
        }
    }
    return null
}