/* eslint-disable import/no-anonymous-default-export */
"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
export async function session(){
    const serverSession : any= await getServerSession(NEXT_AUTH)
    return JSON.stringify(serverSession)
}