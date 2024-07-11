"use server"
import { PrismaClient } from "@prisma/client";

/* eslint-disable import/no-anonymous-default-export */
export default async function(res_name: string,pincode: string,cuisine: string,password: string,email: string){
    const prisma = new PrismaClient()
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