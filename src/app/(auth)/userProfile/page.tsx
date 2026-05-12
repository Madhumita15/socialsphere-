"use client";


import { Spinner } from "@/components/ui/spinner";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowLeft, Camera } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const UserProfile = () => {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const { loading, error, userProfile } = useAuthStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await userProfile({ bio: bio, image: file });
      if (response.success === true) {
        toast.success(response.message);
        const {data: {user}} = await supabase.auth.getUser()
        const provider = user?.app_metadata.provider
        if(provider === "google"){
           router.push("/user/home");

        }else{
           router.push("/login");

        }
       
        setBio("");
        setFile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        {/* Main Card */}
        <div className="relative w-full max-w-112.5 bg-[#121212] border border-gray-800 rounded-3xl p-8 shadow-2xl transition-all hover:shadow-[0_0_30px_rgba(212,147,255,0.1)]">
          {/* Back Icon */}
          <button
            className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors"
            onClick={() => router.back()}
          >
            <ArrowLeft size={24} />
          </button>

          <div className="text-center mb-8 mt-4">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Setup Your Profile
            </h1>
            <p className="text-gray-400 mt-2">Let the world know who you are</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-8"
          >
            {/* Circular Image Upload */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden bg-[#1a1a1a] group-hover:border-[#D493FF] transition-all">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Camera
                    className="text-gray-500 group-hover:text-[#D493FF]"
                    size={32}
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="absolute bottom-0 right-1 bg-[#D493FF] p-2 rounded-full text-black shadow-lg">
                <Camera size={16} />
              </div>
            </div>

            {/* Bio Section */}
            <div className="w-full space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Biography
              </label>
              <textarea
                placeholder="Tell Your Story..."
                disabled={loading}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D493FF] focus:border-transparent transition-all resize-none h-32"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              style={{
                background: "linear-gradient(90deg, #D493FF 0%, #FF7354 100%)",
                width: "100%",
                maxWidth: "342px",
              }}
              className="h-13 flex items-center justify-center rounded-full text-black font-bold text-lg shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all"
            >
              {loading ? <Spinner  /> : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
