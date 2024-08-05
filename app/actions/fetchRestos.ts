"use server"
import { getServerSession } from "next-auth";
import prisma from "../lib/db";
import { NEXT_AUTH } from "../lib/auth";
export async function fetchRestos(){
    const session = await getServerSession(NEXT_AUTH)
    console.log(session)
    return await prisma.restaurant.findMany({
        where:{
            pincode:session.user.pincode
        }
    })

}