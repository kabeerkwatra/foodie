/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import SignIn from "../../components/SignIn";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/lib/auth";
import { redirect } from "next/navigation";
export default async function({params,searchParams}:any){
    if(params.path[0]){
        const userType = params.path[0]
        const session : any= await getServerSession(NEXT_AUTH)
        if(session){
            if (session.user!= null){
                redirect("/user/dashboard")   
            }
            else if (session.restaurant!= null){
                redirect("/restaurant/dashboard")
            }
            else if (session.rider!= null){
                redirect("/rider/dashboard")
            }
        }
        else{
            return <SignIn userType={userType}/>
        }
    }
}