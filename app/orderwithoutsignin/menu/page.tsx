/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import MenuWOSignin from "@/app/components/MenuWOSignin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
export default function(){
    const searchParams = useSearchParams()
    // const pincode = searchParams.get('pincode')
    const restaurant = searchParams.get('restaurant')
    // const session = useSession()
    const router = useRouter()
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    const {data:menu,isLoading} = useSWR(`/api/menu?restaurant=${restaurant}`,fetcher)
    if(isLoading){return <Loader/>}
    if(!menu){return <div>Loading...</div>}
    if(menu){
        return <MenuWOSignin/>
    }
}
