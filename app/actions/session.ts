/* eslint-disable import/no-anonymous-default-export */
"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
export async function session(){
    const serverSession = await getServerSession(NEXT_AUTH)
    console.log(JSON.stringify(serverSession))
    return JSON.stringify(serverSession)
}