"use client"

import { useState } from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const session = useSession()

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Kolker+Brush&display=swap');
            `}</style>
            <header className="bg-red-500 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-3xl sm:text-4xl font-normal tracking-wide text-white hover:text-red-100 transition-colors duration-200" style={{ fontFamily: "'Kolker Brush', cursive" }}>
                                Foodie
                            </Link>
                        </div>
                        {session.data?.user && (
                            <>
                                <nav className="hidden lg:flex space-x-4">
                                    {renderNavLinks()}
                                </nav>
                                <div className="hidden lg:flex items-center space-x-4">
                                    {renderUserInfo()}
                                </div>
                                <div className="lg:hidden">
                                    <button
                                        onClick={toggleMenu}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        {isMenuOpen ? (
                                            <X className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Menu className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {isMenuOpen && session.data?.user && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-2">
                            {renderNavLinks()}
                        </div>
                        <div className="pt-4 pb-3 border-t border-red-400">
                            <div className="px-2 space-y-2">
                                {renderUserInfo()}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )

    function renderNavLinks() {
        const links = []
        if (session.data?.user && "username" in session.data.user) {
            links.push({ href: "/user/dashboard", label: "Nearby" })
            links.push({ href: "/user/past-orders", label: "My Orders" })
        } else if (session.data?.user && "res_name" in session.data.user) {
            links.push({ href: "/restaurant/dashboard", label: "Pending Orders" })
            links.push({ href: "/restaurant/past-orders", label: "Cooked Orders" })
        } else if (session.data?.user && "rider_name" in session.data.user) {
            links.push({ href: "/rider/dashboard", label: "Current Pickups" })
            links.push({ href: "/rider/past-orders", label: "Already Delivered" })
        }

        return links.map((link) => (
            <NavLink key={link.href} href={link.href}>
                {link.label}
            </NavLink>
        ))
    }

    function renderUserInfo() {
        if (session.data?.user) {
            const userName = ("username" in session.data.user && session.data.user.username) ||
                             ("res_name" in session.data.user && session.data.user.res_name) ||
                             ("rider_name" in session.data.user && session.data.user.rider_name)
            return (
                <>
                    <span className="block lg:inline-block text-sm font-medium rounded-full bg-red-600 px-3 py-1 text-center w-full lg:w-auto">
                        {String(userName)}
                    </span>
                    <button
                        onClick={async () => {
                            await signOut({callbackUrl:"/",redirect:true})
                        }}
                        className="block lg:inline-block text-sm font-medium bg-white text-red-500 px-3 py-1 rounded-full hover:bg-red-100 transition-colors duration-200 text-center w-full lg:w-auto mt-2 lg:mt-0"
                    >
                        Sign Out
                    </button>
                </>
            )
        }
        return null
    }
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="block lg:inline-block text-center text-white hover:bg-red-600 hover:text-white px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full lg:w-auto"
        >
            {children}
        </Link>
    )
}