/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import useSWR from "swr"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
export default function (){
    const searchParams = useSearchParams()
    const pincode = searchParams.get('pincode')
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    const { data: restaurants,isLoading } = useSWR(`/api/nearbyRestos?pincode=${pincode}`, fetcher)
    console.log(restaurants)
    return (
        <div className="flex flex-col items-center">
            <div className="mt-5 text-5xl font-semibold text-red-600">Nearby Restaurants</div>
            <ul className="flex flex-col mt-5">
                {restaurants?.nearby?.map((r:any)=><Link 
                className="text-3xl hover:text-red-700 hover:text-4xl my-2" key={r.id} href={`/orderwithoutsignin/menu?restaurant=${r.res_name}&pincode=${r.pincode}`}>{r.res_name}</Link>)}
            </ul>
        </div>
    )
}