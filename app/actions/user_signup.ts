"use server"
import { PrismaClient } from "@prisma/client"

/* eslint-disable import/no-anonymous-default-export */
export default async function (username: string, password: string,pincode: string,email: string){
    const prisma = new PrismaClient()
    const user= await prisma.user.create({
        data:{
        username,
        password,
        email,
        pincode
    }
})
}