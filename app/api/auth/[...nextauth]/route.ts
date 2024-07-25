import { NEXT_AUTH } from "@/app/lib/auth";
import NextAuth from "next-auth/next";
// @ts-ignore
const handler = NextAuth(NEXT_AUTH)

export {handler as GET, handler as POST}

