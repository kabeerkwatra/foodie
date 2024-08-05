/* eslint-disable react/display-name */
import  Link  from "next/link";

/* eslint-disable import/no-anonymous-default-export */
export default function (){
    return (
    <div className="flex flex-col justify-center h-screen">

    <div className="flex justify-center items-center h-1/8 text-3xl">
        Customer?
    </div>
    <div className="flex flex-col lg:flex-row my-5 items-center justify-center h-1/4">
        <Link href={"/user/signup"} className="bg-red-600 px-6 py-4 text-3xl m-2 lg:m-6 text-white rounded hover:ring-red-700 hover:ring-2 hover:bg-red-700">
            Sign Up
        </Link>
        <Link href={"/signin/user"} className="bg-red-600 px-6 py-4 text-3xl m-2 lg:m-6 text-white rounded hover:ring-red-700 hover:ring-2 hover:bg-red-700">
            Sign In
        </Link>
    </div>
    <div className="text-lg flex justify-center">
        Not a customer?
    </div>
    <Link href="/" className="text-sm flex justify-center underline">
        Go back to home page
    </Link>
    </div>)
}