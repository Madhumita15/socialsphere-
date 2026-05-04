import {
  createFollow,
  fetchUserProfile,
  getFollow,
  getFollowersList,
  getFollowingList,
  removeFollowerApi,
} from "@/services/helper/apiFunction/follow.function";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


// hooks/useProfile.ts
export const useProfile = (profileId: string | undefined) => {
  return useQuery({
    queryKey: ["profile", profileId],
    queryFn: ()=> fetchUserProfile(profileId),
    enabled: !!profileId,
  });
};

export const useGetFollow = (targetId: string) => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["isFollowing", targetId, user?.auth_user_id],
    queryFn: async () => {
      if (!user || !targetId) return false;
      const result = await getFollow(targetId, user);
      return result ?? false;
    },
    enabled: !!targetId && !!user,
  });
};

export const useCreateFollow = () => {
  const { user, refreshUser } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createfollow"],
    mutationFn: (followingId: string) =>
      createFollow({ user: user!, followingId: followingId }),
    onSuccess: (res, followingId) => {
      console.log("res", res);
      queryClient.invalidateQueries({ queryKey: ["getpost"] });
      queryClient.invalidateQueries({queryKey: ["profile", followingId]})
      queryClient.invalidateQueries({queryKey: ["isFollowing", followingId]})
      queryClient.invalidateQueries({ queryKey: ["profile", user?.auth_user_id] });
      queryClient.invalidateQueries({queryKey: ["allfollowing"]})
      refreshUser();
      toast.success(res.message === "Followed" ? "Followed" : "Unfollowed");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};


export const useGetFollowersList = (target_id: string)=>{
  return useQuery({
    queryKey: ["allfollowers"],
    queryFn: ()=> getFollowersList(target_id),
    enabled: !!target_id
  })
}


export const useGetFollowingList = (target_id: string)=>{
  return useQuery({
    queryKey: ["allfollowing"],
    queryFn: ()=> getFollowingList(target_id),
    enabled: !!target_id
  })
}


export const useRemoveFollower = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removeFollower"],
    mutationFn: (followerId: string) => 
      removeFollowerApi({ user: user!, followerId }), 
    onSuccess: (res, followerId) => {
      // 1. Refetch your profile to update YOUR "Followers" count
      queryClient.invalidateQueries({ queryKey: ["profile", user?.auth_user_id] });

      // 2. Refetch your  profile to update THEIR "Following" count
      queryClient.invalidateQueries({ queryKey: ["profile", followerId] });

      // 3. Refetch myour followers list so the user disappears from the modal
      queryClient.invalidateQueries({ queryKey: ["allfollowers"] });

      toast.success("Follower removed");
    },
  });
};