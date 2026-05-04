import { supabase } from "@/lib/supabaseClient";
import { create } from "zustand";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
  AuthStore,
  LoginFormType,
  ProfileFormType,
  RegisterFormType,
} from "@/typescript/type/auth.type";

export const useAuthStore = create<AuthStore>((set, get) => ({
  loading: false,
  error: null,
  tempAuthData: null,
  token: (getCookie("token") as string) || null,
  role: (getCookie("role") as string) || null,
  user: getCookie("user") ? JSON.parse(getCookie("user") as string) : null,
  registerUser: async (data: RegisterFormType) => {
    set({ loading: true, error: null });
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
            full_name: data.fullname,
            phone: data.phone,
          },
        },
      });
      if (authError) throw authError;
      console.log("authData", authData);
      set({
        loading: false,
        error: null,
      });

      return {
        success: true,
        message: "User Registered Successfully!",
      };
    } catch {
      set({ loading: false, error: "Something went wrong" });
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },
  loginUser: async (data: LoginFormType) => {
    set({ loading: true, error: null });
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      if (authError) throw authError;
      console.log("authError", authError);
      console.log("authData", authData);

      const { data: profileData } = await supabase
        .from("profile")
        .select("*")
        .eq("auth_user_id", authData.user.id)
        .single();
      console.log("profileData", profileData);
      setCookie("token", authData.session.access_token, {
        maxAge: 60 * 60 * 14 * 7,
      });
      if (profileData) {
        setCookie("role", profileData.role, {
          maxAge: 60 * 60 * 14 * 7,
        });
        setCookie("user", JSON.stringify(profileData), {
          maxAge: 60 * 60 * 14 * 7,
        });
        set({
          loading: false,
          error: null,
          role: profileData.role,
          token: authData.session.access_token,
          user: profileData,
        });

        return {
          success: true,
          message: "User Login successfully!",
          redirect: "/user/home",
          user: profileData,
        };
      } else {
        set({
          loading: false,
          token: authData.session.access_token,
          error: null,
        });
        return {
          success: true,
          message: "Please set up your profile first",
          redirect: "/userProfile",
        };
      }
    } catch (err) {
      if (err instanceof Error) {
        set({
          loading: false,
          error: err.message,
        });

        return {
          success: false,
          error: err.message,
        };
      }

      set({
        loading: false,
        error: "Something went wrong",
      });

      return {
        success: false,
        error: "Something went wrong",
      };
    }
  },

  userProfile: async ({ bio, image }) => {
    set({ loading: true, error: null });
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData) throw "User Not found";
      console.log("user", userData);
      console.log("id", userData?.user?.id);
      const metadata = userData.user?.user_metadata;
      console.log("metadata", metadata);

      let imageurl = null;
      if (image) {
        const filename = `${crypto.randomUUID()}.${image.name}`;
        const { data: uploadImageData, error: uploadImageError } =
          await supabase.storage.from("profile_image").upload(filename, image);
        if (uploadImageError) throw uploadImageError;
        console.log("uploadImageData", uploadImageData);
        const { data: imageViewData } = supabase.storage
          .from("profile_image")
          .getPublicUrl(filename);
        console.log("imageviewData", imageViewData);
        imageurl = imageViewData.publicUrl;
      }
      console.log("imageurl", imageurl);

      const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .insert({
          username: metadata?.username || metadata?.full_name,
          fullname: metadata?.full_name,
          email: userData.user?.email,
          phone: metadata?.phone,
          bio: bio,
          avatar_url: imageurl || metadata?.avatar_url || "",
          role: "user",
          auth_user_id: userData?.user?.id,
        })
        .select("*")
        .single();
      if (profileError) throw profileError;
      if (profileData) {
        setCookie("user", JSON.stringify(profileData), {
          maxAge: 60 * 60 * 14 * 7,
        });
        setCookie("role", profileData.role, {
          maxAge: 60 * 60 * 14 * 7,
        });
        set({
          loading: false,
          error: null,
          role: profileData.role,
          user: profileData,
        });
      }

      console.log("profileData", profileData);
      return {
        success: true,
        message: "User Set profile Successfully!",
      };
    } catch {
      set({ loading: false, error: "Something went wrong" });
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },

  refreshUser: async () => {
    const currentUser = get().user;
    if (!currentUser) return;

    try {
      const { data: latestProfile, error } = await supabase
        .from("profile")
        .select("*")
        .eq("auth_user_id", currentUser.auth_user_id)
        .single();

      if (error) throw error;

      if (latestProfile) {
        set({ user: latestProfile });
        setCookie("user", JSON.stringify(latestProfile), {
          maxAge: 60 * 60 * 14 * 7,
        });
      }
    } catch (err) {
      console.error("Error refreshing profile:", err);
    }
  },

  editUserProfile: async (data: ProfileFormType) => {
    set({ loading: true, error: null });
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData) throw "User Not found";
      const id = userData.user?.id;
      const currentUser = get().user;

      let imageurl = currentUser?.avatar_url;
      if (data.avatar_url instanceof File) {
        if (currentUser?.avatar_url) {
          const oldPath = currentUser.avatar_url.split("/profile_image/")[1];
          if (oldPath) {
            await supabase.storage.from("profile_image").remove([oldPath]);
          }

          const filename = `${crypto.randomUUID()}.${data.avatar_url.name}`;
          const { data: imageUploadData, error: imageUploadError } =
            await supabase.storage
              .from("profile_image")
              .upload(filename, data.avatar_url);
          if (imageUploadError) throw imageUploadError;
          console.log("imageuploadData", imageUploadData);
          const { data: imageviewData } = supabase.storage
            .from("profile_image")
            .getPublicUrl(filename);
          imageurl = imageviewData.publicUrl;
        }
      }

      const updatePayload: {
        fullname: string;
        username: string;
        bio: string;
        phone: string;
        avatar_url?: string;
      } = {
        fullname: data.fullname,
        username: data.username,
        bio: data.bio,
        phone: data.phone,
      };

      if (data.avatar_url instanceof File) {
        updatePayload.avatar_url = imageurl;
      }

      const { data: updateProfileData, error: updatedProfileError } =
        await supabase
          .from("profile")
          .update(updatePayload)
          .eq("auth_user_id", id)
          .select()
          .single();
      if (updatedProfileError) throw updatedProfileError;
      console.log("updatedProfileData", updateProfileData);
      set({
        loading: false,
        error: null,
        user: {
          ...currentUser,
          ...updateProfileData,
        },
      });
      return {
        success: true,
        message: "User update profile Successfully!",
      };
    } catch {
      set({ loading: false, error: "Failed to Edit Profile" });
      return {
        success: false,
        message: "Failed to edit Profile",
      };
    }
  },

  googleLogin: async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      return {
        success: true,
        message: "Google Login successfully!",
      };
    } catch {
      return {
        success: false,
        message: "Google Login Failed",
      };
    }
  },

  setAuth: ({ token, user, role }) => {
    set({
      token: token,
      user: user,
      role: role,
    });
  },

  logoutUser: async () => {
    await supabase.auth.signOut();
    set({ token: null, role: null, user: null });
    deleteCookie("role");
    deleteCookie("token");
    deleteCookie("user");
    window.location.href = "/login";
  },
}));
