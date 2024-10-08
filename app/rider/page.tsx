import Link from "next/link";
import { Bike } from "lucide-react";

export default function RiderAuthPage() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center">
                        <Bike className="w-8 h-8 text-red-600 mr-2" />
                        Rider
                    </h2>  
                </div>

                <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border-t-4 border-red-500">
                    <div className="space-y-6">
                        <div>
                            <Link 
                                href="/rider/signup" 
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                            >
                                Sign Up
                            </Link>
                        </div>
                        <div>
                            <Link 
                                href="/signin/rider" 
                                className="w-full flex justify-center py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Not a delivery partner?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link href="/" className="font-medium text-red-600 hover:text-red-500">
                                Go back to home page
                            </Link>
                        </div>
                    </div>
                </div>
            <div className="text-center">For testing purposes,please use these credentials.<br></br> Email - neeraj@rider | Password - pass</div>
            </div>
        </div>
    )
}