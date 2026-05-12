"use client"

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useAuthStore } from "@/store/useAuthStore";
import { ChartNoAxesCombined,  LayoutDashboard,  MessageCircleWarning, User,  Workflow } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

const AdminSidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { role} = useAuthStore()
  const adminSidebarMenu = [
    {path: "/admin/dashboard", name: "Dasboard", icon: LayoutDashboard},
    {path: "/admin/userManagement", name: "User Management", icon: User},
    {path: "/admin/contentModeration", name: "Content Control", icon: Workflow},
    {path: "/admin/analytics", name: "Platform Analytics", icon: ChartNoAxesCombined}
  ]

  const moderatorSidebarMenu = [
     {path: "/admin/dashboard", name: "Dashboard", icon: LayoutDashboard},
     {path: "/admin/reports", name: "Reports", icon: MessageCircleWarning},
     {path: "/admin/moderatorContentModeration", name: "Content Moderation", icon: Workflow}
  ]

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
    <>
    <div className=" flex-col pt-12 fixed left-0 top-0 ">
        <div className="pr-2 pl-8" style={{ width: "240px", height: "51px" }}>
                  <h1
                    onClick={() => router.push("/user/home")}
                    className="font-extrabold flex items-center gap-1 cursor-pointer font-serif leading-8 tracking-[-0.4px]  text-[24px] bg-linear-to-r from-[#D493FF]  to-[#FF7354] bg-clip-text text-transparent"
                  >
                   <Image src={"/images/logo.png"} alt="logo" width={25} height={25} /> SocialSphere+
                  </h1>
          <p className="text-[10px] pl-7 tracking-[2px] leading-3.75 font-normal text-[#71717A]">
            ADMIN CONSOLE
          </p>
        </div>

        <div className="w-60 h-77 mt-10 pr-8 pl-8">
          <Collapsible defaultOpen>
            <CollapsibleContent>

              {isClient && role === "admin" && adminSidebarMenu.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    href={item.path}
                    key={item.name}
                    className={`flex gap-6 p-2 transition-all hover:scale-105 rounded-md duration-300 ease-in-out hover:bg-[#090909] w-56 h-12   items-center  ${isActive ? "text-white  border-r-2  border-[#D493FF]" : "text-[#71717A]"}`}
                  >
                    <item.icon className="w-4.5 h-4.5" />
                    <span className="text-[16px] leading-6 font-bold tracking-[-0.4px] ">
                      {item.name}
                    </span>
                  </Link>
                );
              })}

               {isClient && role === "moderator" && moderatorSidebarMenu.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    href={item.path}
                    key={item.name}
                    className={`flex gap-6 p-2 transition-all hover:scale-105 rounded-md duration-300 ease-in-out hover:bg-[#090909] w-56 h-12   items-center  ${isActive ? "text-white  border-r-2  border-[#D493FF]" : "text-[#71717A]"}`}
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

       

       
      </div>
    </>
  )
}

export default AdminSidebar