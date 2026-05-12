"use client";

import { loginSchema } from "@/services/validation/auth.validation";
import { LoginFormType } from "@/typescript/type/auth.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DynamicInput from "@/components/DynamicInput";
import { loginInputFields } from "@/services/json/inputsData/auth.inputs";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const { loading, error, loginUser, googleLogin } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await loginUser(data);
      if (response.success) {
        toast.success(response.message);
        if (response?.user?.role === "admin") {
          router.push("/admin/dashboard");
        } else if (response?.user?.role === "moderator") {
          router.push("/admin/dashboard");
        } else {
          router.push(response.redirect);
        }
        reset();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#050505] p-6 sm:p-10">
      <div className="absolute w-75 h-75 bg-purple-600/10 blur-[120px] rounded-full -z-10" />
      

      <Card className="w-full max-w-100 bg-black border-zinc-800 shadow-[0_0_50px_-12px_rgba(212,147,255,0.1)] overflow-hidden transition-all duration-500 hover:border-zinc-700">
        
        <CardHeader className="space-y-2 pb-8 pt-8 text-center">
          
          <h1 className="font-medium flex flex-col tracking-wide">
            <span
              className="font-bold text-3xl bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #D493FF 0%, #FF7354 100%)",
              }}
            >
              SocialSphere+
            </span>
            <span className="text-[#ADAAAA] text-sm">THE DIGITAL GALLERY </span>
          </h1>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-4">
              {loginInputFields.map((input) => (
                <DynamicInput<LoginFormType>
                  key={input.name}
                  label={input.label}
                  name={input.name}
                  required={input.required}
                  type={input.type}
                  error={errors[input.name as keyof LoginFormType]?.message}
                  register={register}
                  loading={loading}
                  placeholder={input.placeholder}
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex flex-col gap-5 pt-2">
              <Button
                disabled={loading}
                type="submit"
                className="cursor-pointer w-full h-12 font-bold text-white text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                style={{
                  background:
                    "linear-gradient(90deg, #D493FF 0%, #FF7354 100%)",
                }}
              >
                {loading ? <Spinner /> : "Login"}
              </Button>

              <div className="relative w-full flex items-center">
                <div className="grow border-t border-zinc-800/50"></div>
                <span className="shrink mx-4 text-[10px] text-zinc-600 font-black tracking-[0.2em] uppercase">
                  OR JOIN WITH
                </span>
                <div className="grow border-t border-zinc-800/50"></div>
              </div>

              <Button
              onClick={()=> googleLogin()}
                variant="outline"
                className="cursor-pointer w-full h-11 bg-transparent border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-600 transition-all duration-300 flex gap-2"
              >
                Google
              </Button>

              <p className="text-center text-sm text-zinc-500 font-medium">
                Dont have an account?{" "}
                <Link
                  href="/register"
                  className="cursor-pointer font-bold transition-colors hover:opacity-80 underline-offset-8"
                  style={{
                    background:
                      "linear-gradient(90deg, #D493FF 0%, #FF7354 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Register
                </Link>
              </p>
              <Button onClick={()=> router.back()} className={"flex gap-2 cursor-pointer w-25 text-white ml-30"}><ArrowLeft /> Go Back</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
