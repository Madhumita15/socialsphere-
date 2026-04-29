"use client";

import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserNavbar = () => {
  const pathname = usePathname();

  const navbarmenu = [
    { path: "/featured", name: "Featured" },
    { path: "/rising", name: "Rising" },
    { path: "/artists", name: "Artists" },
  ];
  return (
    <>
      <div className="pr-12 pl-12  justify-between flex-row pt-6   hidden md:flex z-40">
        <div className="flex flex-row md:gap-6 lg:gap-8">
          {navbarmenu?.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={` font-semibold text-[14px] leading-5   ${isActive ? "text-[#D493FF] border-b-2 pb-1 border-[#D493FF] " : "text-[#A1A1AA]"}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center md:gap-3 lg:gap-5">
          <div className="flex rounded-2xl gap-4 md:w-48 lg:w-69.5 h-9 pt-2.25 pr-6 pl-6 pb-2.5 bg-[#262626] ">
            <Search className="text-[#71717A] w-[15.5px] h-[15.5px]" />{" "}
            <Input
              className="bg-transparent text-[14px] border-none outline-none  w-46 h-4.5"
              placeholder="Search Creators...."
            />
          </div>

          <Bell className="w-5 h-6 text-[#A1A1AA]" />
          
        </div>
      </div>

      {/* mobile navbar */}
      <div className="fixed top-0 left-0 right-0 bg-[#121111] border-b border-[#262626] md:hidden z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <h1 className="font-extrabold font-serif text-base bg-linear-to-r from-[#D493FF] to-[#FF7354] bg-clip-text text-transparent">
            SocialSphere+
          </h1>

          {/* Search and Notification */}
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full gap-2 px-3 h-8 bg-[#262626]">
              <Search className="text-[#71717A] w-4 h-4" />
              <Input
                className="bg-transparent text-xs border-none outline-none w-20 h-full placeholder-[#71717A]"
                placeholder="Search..."
              />
            </div>
            <Bell className="w-5 h-5 text-[#A1A1AA]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNavbar;
