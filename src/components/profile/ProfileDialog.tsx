"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ProfileInputFields } from "@/services/json/inputsData/auth.inputs";
import DynamicInput from "@/components/DynamicInput";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import {
  ProfileDialogPropsType,
  ProfileFormType,
} from "@/typescript/type/auth.type";
import { profileDialogSchema } from "@/services/validation/auth.validation";

const ProfileDialog: React.FC<ProfileDialogPropsType> = ({
  setOpen,
  open,
  isEdit,
  setIsEdit,
}) => {
  const [preview, setPreview] = useState("");
  const { user, editUserProfile, loading, error } = useAuthStore();
  const imageSrc =
    preview ||
    (user?.avatar_url && user.avatar_url !== "" ? user.avatar_url : null);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormType>({
    resolver: yupResolver(profileDialogSchema),
    defaultValues: {
      fullname: "",
      username: "",
      bio: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ProfileFormType) => {
    // console.log("data", data);
    try {
      if (isEdit) {
        const response = await editUserProfile(data);
        if (response.success === true) {
          toast.success(response.message);
          setOpen(false);
          setIsEdit(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (open && isEdit && user) {
      reset({
        fullname: user.fullname || "",
        username: user.username || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [reset, isEdit, user, open]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
          setPreview("");
          reset({
            fullname: "",
            username: "",
            bio: "",
            phone: "",
          });
        }}
      >
        <DialogContent className="sm:max-w-sm bg-gray-950 border border-gray-800 text-white shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Edit Profile
              </DialogTitle>
            </DialogHeader>

            {/* Form Inputs */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {ProfileInputFields.map((profile) => (
                <DynamicInput<ProfileFormType>
                  key={profile.name}
                  label={profile.label}
                  name={profile.name}
                  required={profile.required}
                  type={profile.type}
                  error={errors[profile.name as keyof ProfileFormType]?.message}
                  register={register}
                  loading={loading}
                  placeholder={profile.placeholder}
                />
              ))}
            </div>

            {/* Media Preview */}
            {imageSrc && (
              <div className="space-y-2">
                <div className=" rounded-full flex items-center justify-center overflow-hidden  border-gray-800 p-3">
                  <Image
                    src={imageSrc}
                    alt={preview}
                    height={50}
                    width={50}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
              </div>
            )}

            {/* File Input Section */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-200">
                Select Profile Image
              </Label>
              <Input
                // disabled={action === "edit"}
                className="mt-2   bg-zinc-900 border-zinc-700 text-white cursor-pointer file:bg-linear-to-r file:from-[#29211f] file:to-orange-900 file:text-white file:border-0 file:px-3  file:rounded file:cursor-pointer  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                accept={"image/*"}
                type="file"
                onChange={(e) => {
                  const file = e.target?.files?.[0];
                  if (file) {
                    setValue("avatar_url", file, { shouldValidate: true });
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>

            {/* Error Messages */}
            {error && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <DialogFooter className="flex gap-3 pt-4 bg-slate-900 border-t border-gray-900">
              <DialogClose className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 hover:text-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                Cancel
              </DialogClose>

              <Button
                type="submit"
                disabled={loading}
                className="bg-linear-to-r from-[#3a170c] to-orange-500 hover:from-[#FF7354] hover:to-orange-950 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Processing...
                  </>
                ) : (
                  `Edit`
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileDialog;
