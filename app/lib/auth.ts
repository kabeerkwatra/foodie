import  CredentialsProvider  from "next-auth/providers/credentials"
import prisma from "./db"
export const NEXT_AUTH={
    providers:[
        CredentialsProvider({
            name:"Email",
            credentials:{
                username:{label:"email",type:"text",placeholder:"Email"                    
                },
                password:{label:"password",type:"password",placeholder:"Password"}
            },
            // @ts-ignore
            async authorize(credentials:{email:string,password:string},req:any){
                const obj=JSON.parse(Object.keys(req.query)[0])
                const userType = Object.values(obj)[0]
                if (userType == "user"){
                    const user = await prisma.user.findFirst({
                        where:{
                            email:credentials.email,
                            password:credentials.password
                        }
                    })
                    if(user){
                        return user
                    }
                    else{
                        return null
                    }

                }
                else if(userType == "rider"){
                    const rider = await prisma.rider.findFirst({
                        where:{
                            email:credentials.email,
                            password:credentials.password,
                        }
                    })
                    if (rider){
                        return rider
                    }
                    else return null
            }
            else if (userType == "restaurant"){
                const restaurant = await prisma.restaurant.findFirst({
                    where:{
                        email:credentials.email,
                        password:credentials.password
                    }
                })
                if (restaurant){
                    return restaurant
                }
                else return null
            }
        }
    })],
    callbacks:{
       async jwt({token,user}:any){
        if(user){
            return {
                ...token,
                pincode:user.pincode,
                username:user.username,
                res_name:user.res_name,
                rider_name:user.rider_name
            }
        }
        return token
       },
       async session({session,token}:any){
        return {
            ...session,
            user:{
                ...session.user,
                pincode:token.pincode,
                username:token.username,
                res_name:token.res_name,
                rider_name:token.rider_name
            }
        }
       }
    },
    secret: process.env.NEXTAUTH_SECRET
}