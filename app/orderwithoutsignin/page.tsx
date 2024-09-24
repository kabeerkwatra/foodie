"use client"

import { useState } from 'react'
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import SmallLoader from "../components/SmallLoader"

export default function PincodeEntry() {
    const [pincode, setPincode] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (pincode.length === 6) {
            setLoading(true)
            try {
                await router.push(`/orderwithoutsignin/nearby?pincode=${pincode}`)
            } catch (error) {
                console.error("Navigation error:", error)
                setLoading(false)
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full space-y-6">
                <div>
                    <div className="flex justify-center">
                        <MapPin className="h-10 w-10 text-red-600" />
                    </div>
                    <h2 className="mt-4 text-center text-2xl font-extrabold text-gray-900">
                        Find Food Nearby
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your pincode to discover restaurants in your area
                    </p>
                </div>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="pincode" className="sr-only">
                                Pincode
                            </label>
                            <input
                                id="pincode"
                                name="pincode"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Enter Pincode"
                                maxLength={6}
                                pattern="\d{6}"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading || pincode.length !== 6}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                        >
                            {loading ? (
                                <SmallLoader />
                            ) : (
                                <>
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <MapPin className="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
                                    </span>
                                    Find food nearby
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}