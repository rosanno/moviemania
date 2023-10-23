"use client";

import { useEffect, useState } from "react";
import { Tv, Search, Menu } from "lucide-react";
import Link from "next/link";

import { items } from "@/constant";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import LoginDialog from "./login-dialog";

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    window.scrollY > 100 ? setIsScrolling(true) : setIsScrolling(false);
  };

  return (
    <header
      className={cn(
        "fixed z-50 inset-x-0 h-16 flex items-center transition-colors duration-300",
        isScrolling ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav className="px-4 md:px-10 flex items-center w-full">
        <Link
          href="/"
          className="
             flex 
             items-center 
             text-white 
             text-lg 
             md:text-lg 
             lg:text-lg 
             2xl:text-xl 
             font-oswald 
             font-bold 
             tracking-wider
            "
        >
          Mo
          <Tv className="w-6 h-6 text-rose-500" />m
          <span className="text-rose-500">ania</span>
        </Link>
        <div
          className="
           hidden
           sm:flex
           items-center 
           gap-2 ml-6 
           px-2.5 py-1 
           bg-gray-600/20 
           rounded-3xl
           w-full
           max-w-full
           md:w-[540px]
           lg:w-[430px] 
           xl:w-[540px]"
        >
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            className="
              text-sm py-1 
              bg-transparent 
              outline-none 
              w-full 
              text-white 
              placeholder:text-gray-300
            "
          />
        </div>
        <div className="ml-auto flex items-center lg:hidden">
          <Button size="icon" variant="ghost">
            <Search className="h-6 w-6 text-white" />
          </Button>
          <Button size="icon" variant="ghost">
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </div>
        <div className="ml-auto hidden md:hidden lg:flex">
          <ul className="flex items-center gap-5 border-r border-r-gray-100/20 px-5">
            {items.map((item) => {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-white text-sm font-semibold hover:text-yellow-400 transition duration-150"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-3 pl-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-gray-300 hover:text-white hover:bg-transparent"
            >
              Sign In
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Sign up
                </Button>
              </DialogTrigger>
              <LoginDialog />
            </Dialog>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
