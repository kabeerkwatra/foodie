import prisma from "../lib/db";

export async function fetchMenu(restaurant: string){
    const menu = await prisma.restaurant.findUnique({
        where:{
            res_name:restaurant
        },
        select:{
            Menu:true
        }
    })
    return menu
}