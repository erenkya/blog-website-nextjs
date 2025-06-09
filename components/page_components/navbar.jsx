"use client";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./theme-button";
import { Button } from "../ui/button";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import SearchBar from "./searchbar";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
    const pathname = usePathname();
    console.log(pathname);
    const [providers, setProviders] = useState(null);

    const { data: session } = useSession();

    useEffect(() => {
        const setAuthProviders = async () => {
            const res = await getProviders();
            console.log("Auth Providers:", res);
            setProviders(res);
        };
        setAuthProviders();
    }, []);

    return (
        <nav className="grid grid-cols-3 items-center p-4 sticky top-0 z-50 shadow-md">
            {/* Sol kısım */}
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" width={50} height={50} className="inline-block mr-2" />
                <span className="text-lg font-bold">FaBlog</span>
            </div>

            <SearchBar />

            <div className="flex items-center space-x-4 justify-end">
                {!session ? (
                    providers &&
                    Object.values(providers).map((provider, index) => (
                        <Button
                            key={index}
                            className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                            onClick={() => signIn(provider.id)}
                            variant={"secondary"}
                        >
                            <FaGoogle className="text-white mr-2" />
                            Login with {provider.name}
                        </Button>
                    ))
                ) : (
                    <>
                        {pathname == "/writeBlog" ? (
                            <Link href={"/"}>
                                <Button variant={"ghost"}>Home</Button>
                            </Link>
                        ) : (
                            <Link href={"/writeBlog"}>
                                <Button variant={"ghost"}>+ Write Your Blog!</Button>
                            </Link>
                        )}
                        <Button
                            className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                            onClick={() => signOut()}
                            variant={"secondary"}
                        >
                            Sign Out
                        </Button>
                    </>
                )}

                <ModeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
