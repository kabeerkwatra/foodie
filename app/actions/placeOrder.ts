"use server"
import { redirect } from "next/navigation";
import prisma from "../lib/db";
/* eslint-disable import/no-anonymous-default-export */
export default async function(restaurant:string,username:string,pincode:string,order:string,total:number){

    const riders = await prisma.rider.findMany({
        where:{
            pincode:pincode
        }
    })
    const randomNumber = Math.floor((riders.length-1)*Math.random())
    const randomRider = riders[randomNumber]
    if(randomRider){
        const newOrder = await prisma.order.create({
            data:{
                items:order,
                amount:total,
                rider:{
                    connect:{
                        rider_name:randomRider.rider_name
                    }
                },
                user:{
                    connect:{
                        username:username
                    }
                },
                restaurant:{
                    connect:{
                        res_name:restaurant
                    }
                }

            }
        })
        redirect("/user/order?orderid="+String(newOrder.id))
    }
}