"use server"
import prisma from "../lib/db"
/* eslint-disable import/no-anonymous-default-export */
export default async function(username: string,pincode: string,password: string,email: string){
    const restaurant = await prisma.rider.create({
        data:{
            rider_name:username,
            pincode,
            password,
            email
        }
    })
}