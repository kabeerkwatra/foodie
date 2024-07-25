/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest } from "next";
import SignIn from "../../components/SignIn";
export default function({params,searchParams}:any){
    if(params.path[0]){
        const userType = params.path[0]
        console.log(userType)
        return <SignIn userType={userType}/>
    }
}