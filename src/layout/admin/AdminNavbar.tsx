"use client";

import TextType from "@/components/TextType";
import { useAuthStore } from "@/store/useAuthStore";
import {  ChevronDown, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const AdminNavbar = () => {
  const { user, logoutUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
 

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
      {isClient && user && (
        <div className="relative ">
          <h1 className="pt-5 text-2xl pl-10  font-bold">
            <TextType
              className=" bg-linear-to-r from-[#D493FF]  to-[#bb2b0b] bg-clip-text text-transparent"
              text={[`Welcome ${user?.fullname} To SocialSphere+ Dashboard`]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
            />
          </h1>

          <div className="absolute top-4 right-3 flex flex-row gap-3 items-center">
            <div className="flex items-center gap-3 sm:gap-5 relative z-50">
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-[#FF7354] group-hover:scale-105 transition-transform duration-200">
                  {user?.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt="User Avatar"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>
                <ChevronDown
                  size={14}
                  className={`text-[#A1A1AA] transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>

              {/* Desktop Dropdown */}
              {isOpen && (
                <div className="absolute right-0 top-12 w-56 sm:w-64 bg-[#18181B] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="p-4 border-b border-white/10 bg-white/5">
                    <p className="text-sm font-bold text-white truncate">
                      {user?.fullname}
                    </p>
                    <p className="text-xs text-[#A1A1AA] truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/user/profile"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#ee2856] hover:text-white rounded-lg transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <User size={16} />
                      View Profile
                    </Link>
                    <hr className="my-2 border-white/5" />
                    <button
                      onClick={async () => {
                        await logoutUser();
                        setIsOpen(false);
                      }}
                      className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
