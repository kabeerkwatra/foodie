/* eslint-disable react/display-name */
import  Link  from "next/link";

/* eslint-disable import/no-anonymous-default-export */
export default function (){
    return (
    <div className="flex flex-col justify-center h-screen">

    <div className="flex justify-center items-center h-1/8 text-3xl">
        Restaurant owner?
    </div>
    <div className="flex items-center justify-center h-1/4">
        <Link href={"/restaurant/signup"} className="bg-red-600 px-6 py-4 text-3xl m-6  text-white rounded hover:ring-red-700 hover:ring-2 hover:bg-red-700">
            Sign Up
        </Link>
        <Link href={"/signin/restaurant"} className="bg-red-600 px-6 py-4 text-3xl m-6 text-white rounded hover:ring-red-700 hover:ring-2 hover:bg-red-700">
            Sign In
        </Link>
    </div>
    <div className="text-lg flex justify-center">
        Not a restaurant owner?
    </div>
    <Link href="/" className="text-sm flex justify-center underline">
        Go back to home page
    </Link>
    </div>)
}