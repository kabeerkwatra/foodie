import  CredentialsProvider  from "next-auth/providers/credentials"
import { signIn } from "next-auth/react"
import prisma from "./db"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"
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
                // console.log(req)
                const obj=JSON.parse(Object.keys(req.query)[0])
                const userType = Object.values(obj)[0]
                // console.log(typeof(userType))
                // console.log(userType)
                // console.log(credentials.email)
                // console.log(credentials.password)
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
                pincode:user.pincode
            }
        }
        return token
       },
       async session({session,token}:any){
        // console.log("session callback",{session,token,user})
        return {
            ...session,
            user:{
                ...session.user,
                pincode:token.pincode
            }
        }
       }
    },
    secret: process.env.NEXTAUTH_SECRET
}