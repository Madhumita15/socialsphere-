"use client";

import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  infinityPost,
  updatePost,
} from "@/services/helper/apiFunction/post.function";
import { useAuthStore } from "@/store/useAuthStore";
import { PostFormType } from "@/typescript/type/post.type";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGetPost = () => {
  const {user} = useAuthStore()
  return useQuery({
    queryKey: ["getpost", user?.auth_user_id],
    queryFn: ()=> getAllPost(user?.auth_user_id),
    enabled: !!user?.auth_user_id
  });
  
};

export const useGetPostById = (id: string) => {
  const {user} = useAuthStore()
  const userId = user?.auth_user_id
  return useQuery({
    queryKey: ["getpostbyid", id, userId],
    queryFn: () => getPostById({id, userId}),
    enabled: !!id && !!userId,
  });
};

export const useInifinityPost = (
  media_type?: "video" | "image",
  loop?: boolean,
) => {
  const {user} = useAuthStore()
  const userId = user?.auth_user_id
  return useInfiniteQuery({
    queryKey: ["inifinitypost", media_type],
    queryFn: ({ pageParam = 1, signal }) =>
      infinityPost({ pageParam, signal, media_type, userId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPageData = lastPage?.formattedData || [];
      if (loop) {
        // If the last page was empty or small, we've run out of new stuff
        if (lastPageData.length < 8) {
          return 1; // 💡 RESTART: Send the user back to page 1
        }
        return allPages.length + 1;
      } else {
        if (lastPageData.length === 0) return undefined;
        return lastPageData.length === 8 ? allPages.length + 1 : undefined;
      }
    },
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
  const { user } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deletepost"],
    mutationFn: (id: string) => {
      if (!user) {
        throw new Error("You must be logged in to delete a post");
      }
      return deletePost(id, user);
    },
    onSuccess: (res) => {
      console.log(res);
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ["getpost"],
        });
        toast.success(res.message);
        router.back();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
