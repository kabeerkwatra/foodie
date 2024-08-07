/* eslint-disable react/display-name */

import { NEXT_AUTH } from "@/app/lib/auth";
import SignUp from "../../components/SignUp";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
/* eslint-disable import/no-anonymous-default-export */
export default async function (){
    const session : any = await getServerSession(NEXT_AUTH)
    if(session){
        if (session.user!=null){
            redirect("/user/dashboard")   
        }
        else if (session.restaurant != null){
            redirect("/restaurant/dashboard")
        }
        else if (session.rider != null){
            redirect("/rider/dashboard")
        }
    }
    else{
        return (
            <SignUp/>
        )
    }
    
}