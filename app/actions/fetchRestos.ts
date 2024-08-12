"use server"
import { getServerSession } from "next-auth";
import prisma from "../lib/db";
import { NEXT_AUTH } from "../lib/auth";
export async function fetchRestos(){
    const session : any = await getServerSession(NEXT_AUTH)
    return await prisma.restaurant.findMany({
        where:{
            pincode:session.user.pincode
        }
    })

}