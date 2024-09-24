"use client"

import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import Loader from "./Loader"
import { useState, useEffect } from "react"
import placeOrder from "../actions/placeOrder"
import SmallLoader from "./SmallLoader"

export default function MenuWOSignin() {
    const searchParams = useSearchParams()
    const pincode = searchParams.get('pincode')
    const restaurant = searchParams.get('restaurant')
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    const {data:menu, isLoading} = useSWR(`/api/menu?restaurant=${restaurant}`, fetcher)
    const [orderItems, setOrderItems] = useState(Object.create({}))
    const [total, setTotal] = useState(0)
    const [pressed, setPressed] = useState(false)
    let menuItems = menu?.menu?.Menu || []
    let order = {}
    let sum = 0

    useEffect(() => {
        menuItems.forEach((i:any) => {
            Object.defineProperty(order, i.item_name, {
                value: 0, writable: true, enumerable: true, configurable: true
            })
            Object.defineProperty(i, "qty", {
                value: 0, writable: true, enumerable: true, configurable: true
            })
        })
        setOrderItems(order)
    }, [menuItems])

    if (isLoading) return <Loader />

    return (
        <div className="min-h-screen bg-gray-100 py-6 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-red-500 px-4 py-5 sm:px-6">
                        <h1 className="text-2xl font-bold text-white">{restaurant}</h1>
                        <p className="mt-1 text-sm text-red-100">Menu</p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {menuItems.map((i:any) => (
                                        <tr key={i.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.item_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <input
                                                    onChange={(e) => {
                                                        if(typeof(i.item_name) == "string"){
                                                            let order = orderItems
                                                            order[i.item_name] = e.target.value
                                                            i.qty = e.target.value
                                                            setOrderItems(order)
                                                            sum = 0
                                                            menuItems.forEach((x:any) => {
                                                                sum += Number(x.qty) * x.price
                                                            })
                                                            setTotal(sum)
                                                        }
                                                    }}
                                                    type="number"
                                                    placeholder="0"
                                                    className="mt-1 block w-16 rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 text-right px-2"
                                                    min="0"
                                                    max="10"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 text-right">
                            {(total != 0) ?
                                <div className="text-xl font-semibold text-gray-900 mb-4">Total: ₹{total}</div>
                                :
                                <div className="text-gray-500 mb-4">Add items to place an order</div>
                            }
                            {(total != 0 && !pressed) ?
                                <button
                                    onClick={() => {
                                        setPressed(true)
                                        placeOrder(String(restaurant), "guest", String(pincode), JSON.stringify(orderItems), total)
                                    }}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    type="button"
                                >
                                    Place Order
                                </button>
                                : null
                            }
                            {(pressed) ? <SmallLoader /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}