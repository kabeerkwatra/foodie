import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const orderid = req.nextUrl.searchParams.get("orderid")
    const order = await prisma.order.findUnique({
        where:{
            id:Number(orderid)
        }
    })
    if(!order){
        return NextResponse.json({message:"Order not found"})
    }
    return NextResponse.json({order})
}