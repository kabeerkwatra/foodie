"use client"

import useSWR from "swr"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Loader from "@/app/components/Loader"
import { MapPin, ChevronRight } from "lucide-react"

export default function NearbyRestaurants() {
    const searchParams = useSearchParams()
    const pincode = searchParams.get('pincode')
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    const { data: restaurants, isLoading } = useSWR(`/api/nearbyRestos?pincode=${pincode}`, fetcher)

    if (isLoading) return <Loader />

    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
            <div className="w-full max-w-2xl">
                <div className="flex items-center justify-center mb-6">
                    <MapPin className="h-8 w-8 text-red-600 mr-2" />
                    <h1 className="text-3xl font-bold text-gray-900">Nearby Restaurants</h1>
                </div>
                <p className="text-center text-gray-600 mb-8">
                    Discover great food options near pincode: {pincode}
                </p>
                {restaurants?.nearby?.length > 0 ? (
                    <ul className="bg-white shadow-sm rounded-lg overflow-hidden divide-y divide-gray-200">
                        {restaurants.nearby.map((r: any) => (
                            <li key={r.id}>
                                <Link 
                                    href={`/orderwithoutsignin/menu?restaurant=${r.res_name}&pincode=${r.pincode}`}
                                    className="block hover:bg-gray-50 transition duration-150 ease-in-out"
                                >
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="min-w-0 flex-1 flex items-center">
                                            <div className="flex-shrink-0">
                                                <MapPin className="h-6 w-6 text-red-400" />
                                            </div>
                                            <div className="min-w-0 flex-1 px-4">
                                                <div>
                                                    <p className="text-lg font-medium text-red-600 truncate">{r.res_name}</p>
                                                    <p className="mt-1 text-sm text-gray-500 truncate">Pincode: {r.pincode}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <ChevronRight className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-500 text-lg">No restaurants found in this area.</p>
                    </div>
                )}
            </div>
        </div>
    )
}