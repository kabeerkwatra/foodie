/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import { NEXT_AUTH } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ResSignUp from "@/app/components/ResSignUp";
import { Utensils } from "lucide-react";

export default async function() {
    const session: any = await getServerSession(NEXT_AUTH)
    if (session) {
        if (session.user != null) {
            redirect("/user/dashboard")   
        }
        else if (session.restaurant != null) {
            redirect("/restaurant/dashboard")
        }
        else if (session.rider != null) {
            redirect("/rider/dashboard")
        }
    }
    else {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <ResSignUp/>
                <footer className="bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <p className="text-center text-gray-500 text-sm">
                            © 2023 Foodie. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        )
    }
}