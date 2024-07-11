import  CredentialsProvider  from "next-auth/providers/credentials"
export const NEXT_AUTH={
    providers:[
        CredentialsProvider({
            name:"Email",
            credentials:{
                username:{label:"email",type:"text",placeholder:"Email"                    
                },
                password:{label:"password",type:"password",placeholder:"Password"}
            },
            async authorize(credentials:any){
                
                return {
                    id:"1",
                    username:"kk",
                    email:"abc@abc.com"
                }
            }
        })
    ],
    pages:{
        signIn:"/user/signin"
    }
}