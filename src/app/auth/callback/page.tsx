"use client";

import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Lottie from 'lottie-react'
import loginLoading from '@/services/json/lottie/Login.json'

const CallbackPage = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("user goole authinticate", user);
      if (!user || !session) {
        router.push("/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profile")
        .select("*")
        .eq("auth_user_id", user.id)
        .single();
      setCookie("token", session.access_token);
      if (profileData) {
        setCookie("role", profileData.role);
        setCookie("user", JSON.stringify(profileData));
        setCookie("status", profileData.status)
        setAuth({
          token: session.access_token,
          user: profileData,
          role: profileData.role,
          status: profileData.status
        });
        router.push("/user/home");
      } else {
        router.push("/userProfile");
      }
    };
    handleAuth();
  }, []);
  return (
    <>
    <div className="flex justify-center items-center flex-col ">
         <Lottie loop animationData={loginLoading} width={30} height={30}/>
         <p className="text-2xl    text-gray-300">Login in.....</p>
    </div>
   
    </>
  )
};

export default CallbackPage;
