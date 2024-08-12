import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const username = req.nextUrl.searchParams.get('user')
    const orders = await prisma.order.findMany({
        where:{
            // @ts-ignore
            username:username
        }
    })
    return NextResponse.json({orders})
}