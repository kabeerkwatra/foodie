import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const rider = req.nextUrl.searchParams.get('rider')
    const orders = await prisma.order.findMany({
        where:{
            rider_name:rider
        }
    })
    return NextResponse.json({orders})
}