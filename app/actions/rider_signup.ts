"use server"
import { PrismaClient } from "@prisma/client";

/* eslint-disable import/no-anonymous-default-export */
export default async function(username: string,pincode: string,password: string,email: string){
    const prisma = new PrismaClient()
    const restaurant = await prisma.rider.create({
        data:{
            username,
            pincode,
            password,
            email
        }
    })
}