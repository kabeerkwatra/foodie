"use server"
import prisma from "../lib/db"
/* eslint-disable import/no-anonymous-default-export */
export default async function(res_name: string,pincode: string,cuisine: string,password: string,email: string){
    const restaurant = await prisma.restaurant.create({
        data:{
            res_name,
            pincode,
            cuisine,
            password,
            email
        }
    })
}