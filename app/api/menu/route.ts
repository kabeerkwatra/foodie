import prisma from "@/app/lib/db";
import { useSearchParams } from "react-router-dom";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest){
    const restaurant = req.nextUrl.searchParams.get('restaurant')
    if(restaurant){
        const menu = await prisma.restaurant.findUnique({
            where:{
                res_name:restaurant
            },
            select:{
                Menu:true
            }
        })
        return NextResponse.json({menu})
    }
    else{
        return NextResponse.json({message: "Restaurant not found",status:404})
    }
}