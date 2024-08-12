/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import Menu from "@/app/components/Menu"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import Loader from "@/app/components/Loader"
export default function(){
    const session = useSession()
    const router = useRouter()
    const data=JSON.stringify(session.data)
    const searchParams = useSearchParams()
    const restaurant = searchParams.get('restaurant')
    const pincode = searchParams.get('pincode')
    // @ts-ignore
    const username = session.data?.user?.username
    const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json())
    const {data:menu,isLoading} = useSWR(`/api/menu?restaurant=${restaurant}`,fetcher)
    if(isLoading){return <Loader/>}
    if(!menu){return <div>Loading...</div>}
    if(session.data && session.data.user && !("username"  in session.data.user)){
        router.push("/")
        return <div>User not signed in. Redirecting to homepage...</div>
    } 
    if(session.status == "authenticated" && menu && session.data &&session.data.user && "username" in session.data.user){
        return <Menu restaurant={restaurant} pincode={pincode} username={username}/>
    }
}