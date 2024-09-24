"use client"

import { useSession } from "next-auth/react"
import useSWR from "swr"
import { updateOrder } from "../actions/updateOrder"
import Loader from "./Loader"
import LoadingButton from "./LoadingButton"
import { MapPin, CheckCircle, Truck } from "lucide-react"

interface Order {
    id: string;
    items: string;
    amount: number;
    accepted_by_rider: boolean;
    picked_up: boolean;
    delivered: boolean;
}

interface OrdersResponse {
    orders: Order[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function PickupRequests() {
    const { data: session, status } = useSession()
    // @ts-ignore
    const { data: ordersResponse, error, isLoading, mutate } = useSWR<OrdersResponse>(`/api/getRiderOrders?rider=${session?.user?.rider_name}`
       ,fetcher,
        { refreshInterval: 15000 }
    )

    if (status === "loading" || isLoading) return <Loader />
    if (status === "unauthenticated") return <div>Please sign in to access this page</div>
    if (error) return <div>Failed to load orders</div>
    // @ts-ignore
    if (!session?.user?.rider_name) return <div>Access denied. Rider information not found.</div>

    const orders = ordersResponse?.orders || []
    const unacceptedOrders = orders.filter((order) => order.accepted_by_rider === false)
    const acceptedOrders = orders.filter((order) => order.accepted_by_rider === true && order.picked_up === false)
    const pickedUpOrders = orders.filter((order) => order.picked_up === true && order.delivered === false)

    return (
        <div className="flex flex-col font-semibold max-w-4xl mx-auto px-4 py-8">
            <OrderSection
                title="New Pickup Requests"
                icon={<MapPin className="w-8 h-8 text-red-600" />}
                orders={unacceptedOrders}
                buttonText="Accept"
                buttonAction="accepted_by_rider"
                mutate={mutate}
            />

            <OrderSection
                title="Accepted Pickups"
                icon={<CheckCircle className="w-8 h-8 text-green-600" />}
                orders={acceptedOrders}
                buttonText="Mark as picked up"
                buttonAction="picked_up"
                mutate={mutate}
            />

            <OrderSection
                title="Picked Up Orders"
                icon={<Truck className="w-8 h-8 text-blue-600" />}
                orders={pickedUpOrders}
                buttonText="Mark as delivered"
                buttonAction="delivered"
                mutate={mutate}
            />
        </div>
    )
}

interface OrderSectionProps {
    title: string;
    icon: React.ReactNode;
    orders: Order[];
    buttonText: string;
    buttonAction: string;
    mutate: () => void;
}

function OrderSection({ title, icon, orders, buttonText, buttonAction, mutate }: OrderSectionProps) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl md:text-3xl text-center mb-6 text-gray-800 font-bold flex items-center justify-center">
                {icon}
                <span className="ml-2">{title}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        buttonText={buttonText}
                        buttonAction={buttonAction}
                        mutate={mutate}
                    />
                ))}
                {orders.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 text-lg">
                        (No orders)
                    </div>
                )}
            </div>
        </section>
    )
}

interface OrderCardProps {
    order: Order;
    buttonText: string;
    buttonAction: string;
    mutate: () => void;
}

function OrderCard({ order, buttonText, buttonAction, mutate }: OrderCardProps) {
    const actualOrder = Object.entries(JSON.parse(order.items)).filter(([, value]) => value !== 0)

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Order ID: {order.id}</h3>
            <ul className="mb-4 flex-grow">
                {actualOrder.map(([key, value]) => (
                    <li key={key} className="text-gray-700">{`${key} x ${value}`}</li>
                ))}
            </ul>
            <p className="text-lg font-bold text-gray-800 mb-4">Total: ₹{order.amount}</p>
            <LoadingButton
                onClick={async () => {
                    await updateOrder(Number(order.id), buttonAction)
                    mutate()
                }}
                className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md hover:from-red-700 hover:to-red-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
                {buttonText}
            </LoadingButton>
        </div>
    )
}