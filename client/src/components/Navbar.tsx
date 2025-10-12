import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className=" w-full px-1 flex items-center justify-between border-b border-gray-200 pb-4">
      {/* LEFT */}
      <Link href={"/"} className="flex items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden  md:block text-md font-medium tracking-wider">
          NEWTRENDZ
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href={"/"} className="ml-4 text-sm font-medium">
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <Bell className="w-4 h-4 text-gray-600" />
        <Link href={"/cart"}>
          <ShoppingCart className="w-4 h-4 text-gray-600" />
        </Link>
        <Link href={"/login"} className="text-sm font-medium">
          Sign in
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
