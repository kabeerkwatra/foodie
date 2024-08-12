import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const restaurant = req.nextUrl.searchParams.get('restaurant')
    if(restaurant){
        const orders = await prisma.order.findMany({
        where:{
            res_name:restaurant
        }
    })
    return NextResponse.json({orders})
} else return NextResponse.json({error:"Not found"})
}