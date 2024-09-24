/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { updateOrder } from "../actions/updateOrder"
import Loader from "./Loader"
import { useRouter } from "next/navigation"
import LoadingButton from "./LoadingButton"
import { ClipboardList, CheckCircle } from "lucide-react"

export default function() {
    const session = useSession()
    const router = useRouter()
    
    if (session.status == "loading") return <Loader />
    if (session.data && session.data.user && "res_name" in session.data.user) {
        const restaurant = session.data?.user?.res_name
        const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
        let { data: orders, isLoading, mutate } = useSWR(`/api/getAllOrders?restaurant=${restaurant}`, fetcher, { refreshInterval: 15000 })
        const Orders = orders?.orders

        if (Orders) {
            const unacceptedOrders = Orders.filter((order: any) => order.accepted_by_restaurant == false).reverse()
            const acceptedOrders = Orders.filter((order: any) => order.accepted_by_restaurant == true && order.cooked == false).reverse()
            let noUnacceptedOrders = true
            let noAcceptedOrders = true

            return (
                <div className="flex flex-col font-semibold max-w-4xl mx-auto px-4 py-8">
                    

                    <OrderSection
                        title="New Order Requests"
                        icon={<ClipboardList className="w-8 h-8 text-red-600" />}
                        orders={unacceptedOrders}
                        noOrders={noUnacceptedOrders}
                        buttonText="Accept"
                        buttonAction="accepted_by_restaurant"
                        mutate={mutate}
                    />

                    <OrderSection
                        title="Accepted Orders"
                        icon={<CheckCircle className="w-8 h-8 text-green-600" />}
                        orders={acceptedOrders}
                        noOrders={noAcceptedOrders}
                        buttonText="Mark as Cooked"
                        buttonAction="cooked"
                        mutate={mutate}
                    />
                </div>
            )
        }
    }
    return null
}

function OrderSection({ title, icon, orders, noOrders, buttonText, buttonAction, mutate }:any) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl md:text-3xl text-center mb-6 text-gray-800 font-bold flex items-center justify-center">
                {icon}
                <span className="ml-2">{title}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((o: any) => {
                    const actualOrder = Object.entries(JSON.parse(o.items)).filter(([key, value]) => value != 0)
                    if (actualOrder.length == 0) return null
                    noOrders = false
                    return (
                        <OrderCard
                            key={o.id}
                            order={o}
                            actualOrder={actualOrder}
                            buttonText={buttonText}
                            buttonAction={buttonAction}
                            mutate={mutate}
                        />
                    )
                })}
                {noOrders && (
                    <div className="col-span-full text-center text-gray-500 text-lg">
                        (No orders)
                    </div>
                )}
            </div>
        </section>
    )
}

function OrderCard({ order, actualOrder, buttonText, buttonAction, mutate }:any) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-4 text-red-600">Order ID: {order.id}</h3>
                <ul className="mb-4">
                    {actualOrder.map(([key, value]:any) => (
                        <li key={key} className="text-gray-700">
                            {key} x {value}
                        </li>
                    ))}
                </ul>
                <p className="text-lg font-bold text-gray-800 mb-4">Total: ₹{order.amount}</p>
            </div>
            {buttonText && (
                <div className="mt-auto">
                    <LoadingButton
                        onClick={async () => {
                            await updateOrder(order.id, buttonAction)
                            mutate()
                        }}
                        className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md hover:from-red-700 hover:to-red-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        {buttonText}
                    </LoadingButton>
                </div>
            )}
        </div>
    )
}