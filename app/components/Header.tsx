/* eslint-disable react/display-name */

import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";

/* eslint-disable import/no-anonymous-default-export */
export default function(){
    return (
    <div className="flex border-b-2 items-center m-2">
        <div>
            <Link href="/">
            <Logo />
            </Link>
        </div>
        <div className="flex justify-between w-full">
            <div className="flex">
                <ul className="flex">
                    <li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-black hover:text-white hover:bg-black"><Link href="/">Home</Link></li>
                    <li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-black hover:text-white hover:bg-black"><Link href="/about">About</Link></li>
                    <li className="content-center p-2 m-2 text-xl rounded-3xl hover:ring-2 hover:ring-black hover:text-white hover:bg-black"><Link href="/profile">Profile</Link></li>
                </ul>
            </div>
            <div className="flex">
                <Link href="/user/signin">
                <div className="p-2 m-2 border-4 border-black rounded-3xl hover:bg-black hover:text-white">SignIn</div>
                </Link>
                <Link href={"/user/signup"}>
                <div className="p-2 m-2 border-4 border-black rounded-3xl hover:bg-black hover:text-white">SignUp</div>
                </Link>
            </div>
        </div>
    </div>
    )
}