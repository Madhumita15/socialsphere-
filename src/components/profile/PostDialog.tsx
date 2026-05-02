// "use client";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { Button } from "../ui/button";
// import { PostInput } from "@/services/json/inputsData/post.input";
// import DynamicInput from "@/components/DynamicInput";
// import { PostFormType } from "@/typescript/type/post.type";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { postSchema } from "@/services/validation/post.validation";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import Image from "next/image";
// import { toast } from "sonner";
// import { useCreatePost, useUpdatePost } from "@/hooks/usePost";
// import { Spinner } from "../ui/spinner";
// import { PostItem } from "@/typescript/interface/post.interface";

// interface PostDialogProps {
//   mode: "post" | "reel";
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   action: "edit" | "create";
//   initialdata: PostItem | null;
// }

// const PostDialog = ({
//   mode,
//   open,
//   setOpen,
//   action,
//   initialdata,
// }: PostDialogProps) => {
//   const [preview, setPreview] = useState("");
//   const {
//     mutate: addPostMutate,
//     isPending: creatingPending,
//     isError: creatingError,
//   } = useCreatePost();
//   const {
//     mutate: updatePostMutate,
//     isPending: updatingPending,
//     isError: updatingError,
//   } = useUpdatePost();
  

//   const {
//     register,
//     setValue,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<PostFormType>({
//     resolver: yupResolver(postSchema),
//     defaultValues: {
//       location: "",
//       caption: "",
     
//     },
//   });

//   useEffect(() => {
//     if (initialdata) {
//       reset({
//         location: initialdata.location,
//         caption: initialdata.caption,
//       });
      
//     }
//   }, [initialdata, reset]);

//   const onSubmit = async (data: PostFormType) => {
//     console.log("data", data);
//     if (action === "edit" && initialdata) {
//       updatePostMutate(
//         { data, id: initialdata?.id },
//         {
//           onSuccess: (response) => {
//             console.log("response");
//             if (response.success === true) {
//               toast.success(response.message);
//               setOpen(false);
//               reset();
//             }
//           },
//         },
//       );
//     } else {
//       addPostMutate(
//         { data, mode },
//         {
//           onSuccess: (response) => {
//             console.log("post data", response);
//             if (response.success === true) {
//               toast.success(response.message);
//               setOpen(false);
//               reset();
//             }
//           },
//         },
//       );
//     }
//   };
//   return (
//     <>
//       <Dialog open={open} onOpenChange={() => setOpen(false)}>
//         <DialogContent className="sm:max-w-sm">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <DialogHeader>
//               <DialogTitle>
//                 {action === "create" ? "Create" : "Update"}
//               </DialogTitle>
//             </DialogHeader>
//             {PostInput.map((post) => (
//               <DynamicInput<PostFormType>
//                 key={post.name}
//                 label={post.label}
//                 name={post.name}
//                 required={post.required}
//                 type={post.type}
//                 error={errors[post.name as keyof PostFormType]?.message}
//                 register={register}
//                 loading={creatingPending || updatingPending}
//               />
//             ))}
//             <div>
//               <div>
//                 {preview &&
//                   (mode === "post" ? (
//                     <Image
//                       src={preview}
//                       alt={preview}
//                       height={50}
//                       width={50}
//                       className="w-32 h-32 object-cover"
//                     />
//                   ) : (
//                     <video
//                       src={preview}
//                       className="w-32 h-32"
//                       controls
//                       autoPlay
//                     />
//                   ))}
//               </div>
//             </div>
//             <div className="mt-3">
//               <Label>{mode === "post" ? "Select Post" : "Select Video"}</Label>
//               <Input
//                 disabled={action === "edit"}
//                 className="mt-3"
//                 accept={mode === "post" ? "image/*" : "video/*"}
//                 type="file"
//                 onChange={(e) => {
//                   const file = e.target?.files?.[0];
//                   if (file && file.size > 10 * 1024 * 1024) {
//                     toast.error("Max 10MB allowed");
//                     return;
//                   }
//                   if (file) {
//                     setValue("mediaurl", file, { shouldValidate: true });
//                     setPreview(URL.createObjectURL(file));
//                   }
//                 }}
//               />
//             </div>
//             {creatingError && <p>{creatingError}</p>}
//             {updatingError && <p>{updatingError}</p>}

//             <DialogFooter>
//               <DialogClose>
//                 <Button variant="outline">Cancel</Button>
//               </DialogClose>
//               <Button type="submit" disabled={updatingPending || creatingPending}>
//                 {creatingPending || updatingPending ? (
//                   <Spinner />
//                 ) : action === "create" ? (
//                   "Add"
//                 ) : (
//                   "Edit"
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default PostDialog;



"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PostInput } from "@/services/json/inputsData/post.input";
import DynamicInput from "@/components/DynamicInput";
import { PostFormType } from "@/typescript/type/post.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "@/services/validation/post.validation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {  useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useCreatePost, useUpdatePost } from "@/hooks/usePost";
import { Spinner } from "../ui/spinner";
import { PostDialogProps } from "@/typescript/interface/post.interface";



const PostDialog = ({
  mode,
  open,
  setOpen,
  action,
  initialdata,
}: PostDialogProps) => {
  const [preview, setPreview] = useState("");
  const {
    mutate: addPostMutate,
    isPending: creatingPending,
    isError: creatingError,
  } = useCreatePost();
  const {
    mutate: updatePostMutate,
    isPending: updatingPending,
    isError: updatingError,
  } = useUpdatePost();
  

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormType>({
    resolver: yupResolver(postSchema),
    defaultValues: {
      location: "",
      caption: "",
     
    },
  });

  useEffect(() => {
    if (initialdata) {
      reset({
        location: initialdata.location,
        caption: initialdata.caption,
      });
      
    }
  }, [initialdata, reset]);

  const onSubmit = async (data: PostFormType) => {
    console.log("data", data);
    if (action === "edit" && initialdata) {
      updatePostMutate(
        { data, id: initialdata?.id },
        {
          onSuccess: (response) => {
            console.log("response");
            if (response.success === true) {
              toast.success(response.message);
              setOpen(false);
              reset();
            }
          },
        },
      );
    } else {
      addPostMutate(
        { data, mode },
        {
          onSuccess: (response) => {
            console.log("post data", response);
            if (response.success === true) {
              toast.success(response.message);
              setOpen(false);
              reset();
            }
          },
        },
      );
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-sm bg-gray-950 border border-gray-800 text-white shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                {action === "create" ? "Create New Post" : "Update Post"}
              </DialogTitle>
            </DialogHeader>

            {/* Form Inputs */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {PostInput.map((post) => (
                <DynamicInput<PostFormType>
                  key={post.name}
                  label={post.label}
                  name={post.name}
                  required={post.required}
                  type={post.type}
                  error={errors[post.name as keyof PostFormType]?.message}
                  register={register}
                  loading={creatingPending || updatingPending}
                  placeholder={post.placeholder}
                />
              ))}
            </div>

            {/* Media Preview */}
            {preview && (
              <div className="space-y-2">
                
                <div className=" rounded-full flex items-center justify-center overflow-hidden  border-gray-800 p-3">
                  {mode === "post" ? (
                    <Image
                      src={preview}
                      alt={preview}
                      height={128}
                      width={128}
                      className="w-40 h-40 object-cover rounded-full"
                    />
                  ) : (
                    <video
                      src={preview}
                      className="w-40 h-40 rounded-full object-cover"
                      controls
                      autoPlay
                    />
                  )}
                </div>
              </div>
            )}

            {/* File Input Section */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-200">
                {mode === "post" ? "Select Post Image" : "Select Video"}
              </Label>
              <Input
                disabled={action === "edit"}
                className="mt-2   bg-zinc-900 border-zinc-700 text-white cursor-pointer file:bg-linear-to-r file:from-[#29211f] file:to-orange-900 file:text-white file:border-0 file:px-3  file:rounded file:cursor-pointer  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                accept={mode === "post" ? "image/*" : "video/*"}
                type="file"
                onChange={(e) => {
                  const file = e.target?.files?.[0];
                  if (file && file.size > 10 * 1024 * 1024) {
                    toast.error("Max 10MB allowed");
                    return;
                  }
                  if (file) {
                    setValue("mediaurl", file, { shouldValidate: true });
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              {action === "edit" && (
                <p className="text-xs text-gray-400 italic">
                  File selection disabled when editing
                </p>
              )}
            </div>

            {/* Error Messages */}
            {creatingError && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                <p className="text-sm text-red-300">{creatingError}</p>
              </div>
            )}
            {updatingError && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                <p className="text-sm text-red-300">{updatingError}</p>
              </div>
            )}

            {/* Action Buttons */}
            <DialogFooter className="flex gap-3 pt-4 bg-slate-900 border-t border-gray-900">
              <DialogClose >
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={updatingPending || creatingPending}
                className="bg-linear-to-r from-[#3a170c] to-orange-500 hover:from-[#FF7354] hover:to-orange-950 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {creatingPending || updatingPending ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Processing...
                  </>
                ) : action === "create" ? (
                  "Create "
                ) : (
                  "Edit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDialog;
