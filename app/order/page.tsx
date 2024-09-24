/* eslint-disable react/display-name */
"use client"
import Loader from "@/app/components/Loader"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import { CheckCircle, Clock, Utensils, Truck, Package } from 'lucide-react'

/* eslint-disable import/no-anonymous-default-export */
export default function(){
    const searchParams= useSearchParams()
    const orderid = searchParams.get('orderid')
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    let {data:order,isLoading} = useSWR(`/api/fetchOrder?orderid=${orderid}`,fetcher,{refreshInterval:10000})
    const router = useRouter()
    if(isLoading) return <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center"><Loader/></div>
    const actualOrder=Object.entries(JSON.parse(order.order.items)).filter(([key,value])=>value!=0)
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h1 className="text-3xl font-bold text-gray-900">Order Placed</h1>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Order ID: {orderid}</p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Restaurant</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.order.res_name}</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Items</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {actualOrder.map(([key,value])=><div key={key}>{key} x {String(value)}</div>)}
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Total</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{String(order.order.amount)}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-2xl font-bold text-gray-900">Order Activity</h2>
                    </div>
                    <div className="border-t border-gray-200">
                        {order?.order?.accepted_by_restaurant ? (
                            <div className="px-4 py-5 sm:p-6">
                                <ul className="space-y-4">
                                    {order?.order?.accepted_by_restaurant && (
                                        <li className="flex items-center text-sm text-gray-600">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            Order accepted by Restaurant
                                        </li>
                                    )}
                                    {order?.order?.accepted_by_rider && (
                                        <li className="flex items-center text-sm text-gray-600">
                                            <Utensils className="h-5 w-5 text-blue-500 mr-2" />
                                            Rider assigned ({order?.order?.rider_name})
                                        </li>
                                    )}
                                    {order?.order?.cooked && (
                                        <li className="flex items-center text-sm text-gray-600">
                                            <Package className="h-5 w-5 text-yellow-500 mr-2" />
                                            Finished Cooking
                                        </li>
                                    )}
                                    {order?.order?.picked_up && (
                                        <li className="flex items-center text-sm text-gray-600">
                                            <Truck className="h-5 w-5 text-purple-500 mr-2" />
                                            Order picked by rider
                                        </li>
                                    )}
                                    {order?.order?.delivered && (
                                        <li className="flex items-center text-sm text-gray-600">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            Order delivered
                                        </li>
                                    )}
                                </ul>
                            </div>
                        ) : (
                            <div className="px-4 py-5 sm:p-6 flex items-center text-sm text-gray-600">
                                <Clock className="h-5 w-5 text-orange-500 mr-2" />
                                Waiting for restaurant to accept
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}