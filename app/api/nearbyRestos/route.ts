import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest){
    const pincode = req.nextUrl.searchParams.get('pincode')
    if (pincode) {
        const nearby = await prisma.restaurant.findMany({
            where:{
                pincode: pincode
            }
        })
        return NextResponse.json({nearby})
    }
    return NextResponse.json("No restaurants nearby")
}