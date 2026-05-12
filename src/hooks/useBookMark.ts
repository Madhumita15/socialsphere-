import {
  createAndDeleteBookmark,
  getBookMarkPost,
} from "@/services/helper/apiFunction/bookmark.function";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBookMark = () => {
  const { user } = useAuthStore();
  const user_id = user?.auth_user_id;
  return useQuery({
    queryKey: ["getSaveData", user?.auth_user_id],
    queryFn: () => getBookMarkPost(user_id),
    enabled: !!user_id,
  });
};

export const useBookMark = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createBookmark"],
    mutationFn: (post_id: string) =>
      createAndDeleteBookmark({ user: user!, post_id: post_id }),
    onSuccess: (_data, post_id) => {
      queryClient.invalidateQueries({
        queryKey: ["getpost", user?.auth_user_id],
      });
      queryClient.invalidateQueries({ queryKey: ["inifinitypost"] });
      queryClient.invalidateQueries({ queryKey: ["getpostbyid", post_id] });
      queryClient.invalidateQueries({
        queryKey: ["getSaveData", user?.auth_user_id],
      });
    },
  });
};
