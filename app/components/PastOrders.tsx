"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import useSWR from "swr"
import SmallLoader from "./SmallLoader"
import { Clock, CheckCircle, Truck, Coffee, Store } from "lucide-react"

interface Order {
  id: string;
  items: string;
  amount: number;
  res_name: string;
  accepted_by_restaurant: boolean;
  cooked: boolean;
  picked_up: boolean;
  delivered: boolean;
}

interface OrdersResponse {
  orders: Order[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function PastOrders() {
    const session = useSession()
    const { data: ordersResponse, error, isLoading } = useSWR<OrdersResponse>(
        session.data?.user && "username" in session.data.user
            ? `/api/getUserOrders?user=${session.data.user.username}`
            : null,
        fetcher,
        { refreshInterval: 15000 }
    )

    if (isLoading) return <div className="flex justify-center items-center"><SmallLoader /></div>
    if (error) return <div className="text-center py-4 text-red-600">Failed to load orders</div>
    if (!ordersResponse) return null

    const sortedOrders = [...ordersResponse.orders].sort((a, b) => parseInt(b.id) - parseInt(a.id))
    const noOrders = sortedOrders.length === 0

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Past Orders</h3>
            </div>
            <ul className="divide-y divide-gray-200">
                {sortedOrders.map((o: Order) => {
                    const actualOrder = Object.entries(JSON.parse(o.items)).filter(([, value]) => value !== 0)
                    if(actualOrder.length === 0) return null

                    let status = "Processing"
                    let StatusIcon = Clock

                    if(o.accepted_by_restaurant) {
                        status = "Cooking"
                        StatusIcon = Coffee
                    }
                    if(o.cooked) {
                        status = "Cooked"
                        StatusIcon = CheckCircle
                    }
                    if(o.picked_up) {
                        status = "On the way"
                        StatusIcon = Truck
                    }
                    if(o.delivered) {
                        status = "Delivered"
                        StatusIcon = CheckCircle
                    }

                    return (
                        <li key={o.id} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <Link href={`/order?orderid=${String(o.id)}`} className="text-sm font-medium text-red-600 hover:text-red-500 truncate">
                                    Order ID: {o.id}
                                </Link>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <StatusIcon className="h-5 w-5 text-red-500 mr-2" />
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        {status}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex flex-col">
                                    <p className="flex items-center text-sm text-gray-500 mb-1">
                                        <Store className="h-4 w-4 text-gray-400 mr-1" />
                                        {o.res_name}
                                    </p>
                                    <p className="flex items-center text-sm text-gray-500">
                                        {actualOrder.map(([key, value]) => `${key} x ${value}`).join(', ')}
                                    </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <p>Total: ₹{o.amount}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {noOrders && (
                <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No past orders</p>
                </div>
            )}
        </div>
    )
}