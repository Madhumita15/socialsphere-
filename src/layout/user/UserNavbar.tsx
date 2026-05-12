"use client";

import TextType from "@/components/TextType";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

const UserNavbar = () => {
  const router = useRouter();
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
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent cursor-default"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* DESKTOP NAVBAR */}
      <div className="pr-12 pl-12 justify-between flex-row pt-3 hidden md:flex z-50 relative">
        <div className="flex flex-row items-center justify-center">
          <div className="pt-3">
            <button
              onClick={() => router.push("/")}
              className="flex flex-row gap-2 text-[#D493FF] items-center justify-center cursor-pointer"
            >
              <ArrowLeft />
              Back To Landing
            </button>{" "}
          </div>
          <div className="pt-3 relative">
            <h1 className="text-2xl pl-10 font-bold">
              <TextType
                className="bg-linear-to-r from-[#D493FF] to-[#bb2b0b] bg-clip-text text-transparent"
                text={[`Welcome ${user?.fullname || ""}`]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="_"
                deletingSpeed={50}
              />
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 relative z-50">
          {/* <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-[#A1A1AA]" />
          </button> */}

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
                <p className="text-xs text-[#A1A1AA] truncate">{user?.email}</p>
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

      {/* MOBILE NAVBAR */}
      <div className="fixed top-0 left-0 right-0 bg-[#121111] border-b border-[#262626] md:hidden z-50">
        <div className="flex items-center justify-between px-4 py-3 relative">
          <h1
            onClick={() => router.push("/user/home")}
            className="font-extrabold flex flex-row items-center gap-1 cursor-pointer font-serif text-base bg-linear-to-r from-[#D493FF] to-[#FF7354] bg-clip-text text-transparent"
          >
           <Image src={"/images/logo.png"} alt="logo" width={20} height={20} /> SocialSphere+
          </h1>

          <div className="flex items-center gap-3 sm:gap-5 relative z-50">
            {/* <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#A1A1AA]" />
            </button> */}

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

            {/* Mobile Dropdown */}
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
    </>
  );
};

export default UserNavbar;
