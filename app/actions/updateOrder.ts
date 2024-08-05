"use server"
import prisma from "../lib/db";
export async function updateOrder(orderid:number,action:string){
    const update = await prisma.order.update({
        where:{
            id:orderid
        },
        data:{
            [action]:true
        }
    })
    if(update) return true
    else return false
}