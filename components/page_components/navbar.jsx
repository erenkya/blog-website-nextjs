import { ModeToggle } from "./theme-button";
import { Button } from "../ui/button";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import SearchBar from "./searchbar";

const Navbar = () => {
    return (
        <nav className="grid grid-cols-3 items-center p-4 sticky top-0 z-50 shadow-md">
            {/* Sol kısım */}
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" width={50} height={50} className="inline-block mr-2" />
                <span className="text-lg font-bold">Brand</span>
            </div>

            {/* Orta kısım: Butonlar ortada olsun diye mx-auto */}
            <div className="flex items-center space-x-4 mx-auto">
                <Button variant={"ghost"} className="flex items-center">
                    Home
                </Button>
                <Button variant={"ghost"} className="flex items-center">
                    About
                </Button>
                <Button variant={"ghost"} className="flex items-center">
                    Contact
                </Button>
            </div>

            {/* Sağ kısım */}
            <div className="flex items-center space-x-4">
                <SearchBar />
                <Button variant={"secondary"}>Login</Button>
                <Button>Sign Up</Button>
                <ModeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
