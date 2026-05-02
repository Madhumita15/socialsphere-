"use client";

import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  updatePost,
} from "@/services/helper/apiFunction/post.function";
import { useAuthStore } from "@/store/useAuthStore";
import { PostFormType } from "@/typescript/type/post.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGetPost = () => {
  return useQuery({
    queryKey: ["getpost"],
    queryFn: getAllPost,
  });
};

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ["getpostbyid", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createpost"],
    mutationFn: ({
      data,
      mode,
    }: {
      data: PostFormType;
      mode: "post" | "reel" | "edit";
    }) => {
      if (!user) throw new Error("User Not Found!");
      return createPost({ data, mode, user });
    },
    onSuccess: (res) => {
      console.log("res", res);
      queryClient.invalidateQueries({
        queryKey: ["getpost"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updatepost"],
    mutationFn: ({ data, id }: { data: PostFormType; id: string }) =>
      updatePost({ data, id }),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: ["getpost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getpostbyid"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useDeletePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletepost"],
    mutationFn: (id: string) => deletePost(id),
    onSuccess: (res) => {
      console.log(res);
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ["getpost"],
        });
        // queryClient.invalidateQueries({
        //   queryKey: ["getpostbyid"],
        // });
        toast.success(res.message);
        router.back();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
