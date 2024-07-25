/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import SignIn from "../../components/SignIn";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/lib/auth";
import { redirect } from "next/navigation";
export default async function({params,searchParams}:any){
    if(params.path[0]){
        const userType = params.path[0]
        console.log(userType)
        const session = await getServerSession(NEXT_AUTH)
        console.log(session)
        if(session){
            if (session.user){
                redirect("/user/dashboard")   
            }
            else if (session.restaurant){
                redirect("/restaurant/dashboard")
            }
            else if (session.rider){
                redirect("/rider/dashboard")
            }
        }
        else{
            return <SignIn userType={userType}/>
        }
    }
}