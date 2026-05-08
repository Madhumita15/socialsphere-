"use client"


import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, Mail, ShieldAlert } from "lucide-react";

const BannedPage = () => {
    const {logoutUser} = useAuthStore()
  return (
    <>
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 selection:bg-[#D493FF]/30">
        <div className="relative group max-w-md w-full">
          {/* Animated Gradient Glow */}
          <div className="absolute -inset-1 bg-linear-to-r from-[#D493FF] to-[#FF7354] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-[#111111] border border-white/5 rounded-2xl p-8 shadow-2xl text-center">
            {/* Icon Section */}
            <div className="mx-auto w-20 h-20 bg-linear-to-tr from-[#D493FF] to-[#FF7354] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#FF7354]/20">
              <ShieldAlert className="w-10 h-10 text-white" />
            </div>

            {/* Text Content */}
            <h1 className="text-3xl font-black text-white tracking-tight mb-3">
              ACCESS <span className="text-[#FACC15]">REVOKED</span>
            </h1>

            <div className="space-y-4">
              <p className="text-gray-400 leading-relaxed">
                Your account has been flagged and{" "}
                <span className="text-white font-medium">
                  permanently blocked
                </span>{" "}
                by the administration for violating community guidelines.
              </p>

              <div className="bg-[#1A1A1A] border border-white/5 rounded-lg p-4 inline-block w-full">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">
                  Status
                </p>
                <p className="text-[#FF7354] font-mono font-bold">
                  RESTRICTED_USER_MODE
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3">
             

              <Button 
              onClick={()=> logoutUser()}
               className="cursor-pointer flex items-center justify-center gap-2 w-full py-3 px-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>

            <p className="mt-6 text-[10px] text-gray-600 uppercase tracking-tighter">
              SocialSphere Security Protocol v4.0.1
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannedPage;
