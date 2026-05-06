"use client";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Compass,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Plus,
  User,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

const UserSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutUser, user } = useAuthStore();
  const sidebarMenu = [
    { path: "/user/home", name: "Home", icon: LayoutDashboard },
    { path: "/user/discovery", name: "Discovery", icon: Compass },
    { path: "/user/reels", name: "Reels", icon: Video },
    { path: "/user/direct", name: "Direct", icon: MessageSquare },
    { path: "/user/profile", name: "Profile", icon: User },
  ];

  function useIsClinet() {
    return useSyncExternalStore(
      () => () => {},
      () => true,
      () => false,
    );
  }

  const isClient = useIsClinet();
  if (!isClient) return null;

  return (
    <div>
      <div className=" flex-col pt-12 fixed left-0 top-0 hidden md:block">
        <div className="pr-8 pl-8" style={{ width: "240px", height: "51px" }}>
          <h1
            onClick={() => router.push("/user/home")}
            className="font-extrabold cursor-pointer font-serif leading-8 tracking-[-0.4px]  text-[24px] bg-linear-to-r from-[#D493FF]  to-[#FF7354] bg-clip-text text-transparent"
          >
            SocialSphere+
          </h1>
          <p className="text-[10px] tracking-[2px] leading-3.75 font-normal text-[#71717A]">
            PREMIUM CURATOR
          </p>
        </div>

        <div className="w-60 h-77 mt-10 pr-8 pl-8">
          <Collapsible defaultOpen>
            <CollapsibleContent>
              {sidebarMenu.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    href={item.path}
                    key={item.name}
                    className={`flex gap-6 p-2 transition-all hover:scale-105 rounded-md duration-300 ease-in-out hover:bg-[#090909] w-56 h-12   items-center  ${isActive ? "text-white border-l-2 border-r-2 border-[#D493FF]" : "text-[#71717A]"}`}
                  >
                    <item.icon className="w-4.5 h-4.5" />
                    <span className="text-[16px] leading-6 font-bold tracking-[-0.4px] ">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="w-full">
          <Button
            onClick={() => logoutUser()}
            className="md:ml-5  absolute md:-bottom-64 lg:-bottom-64 cursor-pointer rounded-lg bg-linear-to-r from-[#D493FF] to-[#FF7354] text-black font-bold h-8 p-5 w-full  flex items-center justify-center hover:shadow-lg hover:shadow-[#D493FF]/50 transition-all duration-300"
          >
            <LogOut /> Logout
          </Button>
        </div>

       
      </div>

      {/* mobile sidebar */}

      <div className="fixed bottom-0 left-0 right-0 bg-[#121111] border-t border-[#262626] z-100 md:hidden">
        <div className="flex items-center justify-around px-2 py-3">
          {sidebarMenu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                href={item.path}
                key={item.name}
                className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 hover:bg-[#262626] ${
                  isActive
                    ? "text-[#D493FF]"
                    : "text-[#71717A] hover:text-white"
                }`}
              >
                <item.icon className="w-6 h-6" />
              </Link>
            );
          })}

         
         
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
