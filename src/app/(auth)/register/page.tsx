"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormType } from "@/typescript/type/auth.type";
import { registerSchema } from "@/services/validation/auth.validation";
import DynamicInput from "@/components/DynamicInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { registerInputFields } from "@/services/json/inputsData/auth.inputs";
import { useAuthStore } from "@/store/useAuthStore";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const Register = () => {
  const { loading, error, registerUser, googleLogin } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    console.log("data", data);
    try {
      const response = await registerUser(data);
      console.log("response", response)
      if (response.success === true) {
        toast.success(response.message);
        router.push("/userProfile");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] p-8">
        <Card className="w-full max-w-sm bg-black border-zinc-800 shadow-2xl  overflow-hidden">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-bold tracking-tighter text-white uppercase">
              BEGIN YOUR STORY
            </CardTitle>
            <h1 className="text-[#ADAAAA] text-sm font-medium">
              Join the collective at{" "}
              <span className="bg-linear-to-r from-[#D493FF] to-[#FF7354] text-transparent bg-clip-text">
                SocialSphere+
              </span>
            </h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-3">
                {registerInputFields.map((input) => (
                  <DynamicInput
                    key={input.name}
                    label={input.label}
                    name={input.name}
                    required={input.required}
                    type={input.type}
                    error={
                      errors[input.name as keyof RegisterFormType]?.message
                    }
                    register={register}
                    loading={loading}
                  />
                ))}
              </div>
              <CardFooter className="px-0 pt-4 flex-col gap-4 bg-gray-950">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-50 h-12 rounded-full font-bold text-black transition-transform active:scale-95 shadow-lg shadow-purple-500/20"
                  style={{
                    background:
                      "linear-gradient(90deg, #D493FF 0%, #FF7354 100%)",
                  }}
                >
                  {loading ? <Spinner /> : "Create Account"}
                </Button>

                <div className="relative w-full flex items-center py-2">
                  <div className="grow border-t border-zinc-800"></div>
                  <span className="shrink mx-4 text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
                    OR JOIN WITH
                  </span>
                  <div className="grow border-t border-zinc-800"></div>
                </div>

                <Button
                onClick={()=> googleLogin()}
                  variant="outline"
                  className="w-full bg-transparent border-zinc-700 text-white hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  Google
                </Button>

                <p className="text-center text-sm text-zinc-500 mt-2">
                  Already have an account?{"   "}
                  <Link
                    href="/login"
                    className="text-white font-semibold hover:underline decoration-purple-500 underline-offset-4"
                  >
                    Log In
                  </Link>
                </p>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;
