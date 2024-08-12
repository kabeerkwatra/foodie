"use server"
import prisma from "../lib/db"
/* eslint-disable import/no-anonymous-default-export */
export default async function (username: string, password: string,pincode: string,email: string){
    const user= await prisma.user.create({
        data:{
        username,
        password,
        email,
        pincode
        }
    })
    return true
}