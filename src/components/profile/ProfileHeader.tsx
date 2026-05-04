"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit2, UserPlus } from "lucide-react";
import ProfileDialog from "./ProfileDialog";
import { ProfileHeaderProps } from "@/typescript/interface/post.interface";
import {
  useCreateFollow,
  useGetFollow,
  useGetFollowersList,
  useGetFollowingList,
  useRemoveFollower,
} from "@/hooks/useFollow";
import { ProfileType } from "@/typescript/type/auth.type";

export default function ProfileHeader({
  name,
  bio,
  postsCount,
  followersCount,
  followingCount,
  profileImage,
  isOwnProfile = true,
  isFollowing = false,
  userId,
}: ProfileHeaderProps) {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [following, setFollowing] = useState(isFollowing);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { data: followersList } = useGetFollowersList(userId);
  // console.log("followers data", followersList);
  const { data: followingList } = useGetFollowingList(userId);
  // console.log("following data", followingList);
  const {
    mutate: mutatefollow,
    isPending: mutateisPending,
    variables: unfollowVariables,
  } = useCreateFollow();
  const {
    mutate: mutateRemove,
    isPending: removeIsPending,
    variables: removeVariables,
  } = useRemoveFollower();

  function useIsClient() {
    return useSyncExternalStore(
      () => () => {}, // Empty subscribe function
      () => true, // Client-side value
      () => false, // Server-side/Hydration value
    );
  }

  const isClient = useIsClient();
  if (!isClient) return null;
  // console.log(postsCount, followersCount, followingCount)

  return (
    <>
      {/* Profile Header Container */}
      <div className="w-full bg-[#121111] border-b border-[#262626] px-20 md:px-8 py-6 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Profile Info Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
            {/* Profile Picture */}
            <div className="shrink-0">
              <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#D493FF]">
                {isClient && profileImage ? (
                  <Image
                    src={profileImage}
                    alt={"image"}
                    fill
                    className="object-cover z-0"
                    sizes="(max-width: 768px) 96px, 144px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600" />
                )}
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 w-full md:w-auto text-center md:text-left">
              {/* Name and Edit Button */}
              <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {isClient ? name : ""}
                </h1>
                {isOwnProfile ? (
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setIsEdit(true);
                    }}
                    className=" bg-linear-to-r from-[#D493FF] to-[#FF7354] text-black w-20 md:w-auto font-bold cursor-pointer"
                  >
                    <Edit2 />
                  </Button>
                ) : (
                  <Button
                    className="bg-[#D493FF] text-black hover:bg-[#D493FF]/90 w-full md:w-auto font-semibold flex items-center gap-2"
                    onClick={() => setFollowing(!following)}
                  >
                    <UserPlus className="w-4 h-4" />
                    {following ? "Following" : "Follow"}
                  </Button>
                )}
              </div>

              <ProfileDialog
                open={open}
                setOpen={setOpen}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />

              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-6 md:gap-8 mb-4">
                <div className="flex flex-col items-center md:items-start cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="font-bold text-lg md:text-xl text-white">
                    {postsCount}
                  </span>
                  <span className="text-xs md:text-sm text-[#A1A1AA]">
                    Posts
                  </span>
                </div>
                <div
                  className="flex flex-col items-center md:items-start cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setShowFollowers(true)}
                >
                  <span className="font-bold text-lg md:text-xl text-white">
                    {followersCount}
                  </span>
                  <span className="text-xs md:text-sm text-[#A1A1AA]">
                    Followers
                  </span>
                </div>
                <div
                  className="flex flex-col items-center md:items-start cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setShowFollowing(true)}
                >
                  <span className="font-bold text-lg md:text-xl text-white">
                    {followingCount}
                  </span>
                  <span className="text-xs md:text-sm text-[#A1A1AA]">
                    Following
                  </span>
                </div>
              </div>

              {/* Bio */}
              {bio && (
                <div className="text-center md:text-left">
                  <p className="text-sm md:text-base text-white leading-relaxed">
                    {bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Followers Modal */}
      <Dialog open={showFollowers} onOpenChange={setShowFollowers}>
        <DialogContent className="bg-[#1a1a1a] border-[#262626] text-white max-h-96">
          <DialogHeader>
            <DialogTitle className="text-white">Followers</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {followersList?.length !== 0 ? (
              followersList?.map((follower: ProfileType) => {
                const isThisUserPending =
                  removeIsPending && removeVariables === follower.auth_user_id;
                return (
                  <div
                    key={follower.auth_user_id}
                    className="flex items-center justify-between p-3 hover:bg-[#262626] rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#262626] border border-[#D493FF]/20">
                        {follower.avatar_url ? (
                          <Image
                            src={follower.avatar_url}
                            alt={`${follower.username}'s avatar`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-xs font-bold text-[#D493FF]">
                            {follower.username?.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {follower.username}
                        </span>
                        <span className="text-xs text-gray-400">
                          {follower.fullname}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      disabled={isThisUserPending}
                      size="sm"
                      className="text-black border-[#D493FF]/20 hover:bg-[#D493FF] hover:text-black transition-all"
                      onClick={() => mutateRemove(follower.auth_user_id)}
                    >
                      {
                        isOwnProfile
                          ? isThisUserPending
                            ? "..."
                            : "Remove"
                          : follower.auth_user_id === userId
                            ? "You"
                            : "Follow" // You'd ideally check actual follow status here
                      }
                    </Button>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col gap-1 items-center justify-center pt-3 pb-4">
                <h4>No Followers</h4>
                <p className="text-gray-400">
                  You will see all people who follow you here.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Following Modal */}
      <Dialog open={showFollowing} onOpenChange={setShowFollowing}>
        <DialogContent className="bg-[#1a1a1a] border-[#262626] text-white max-h-96">
          <DialogHeader>
            <DialogTitle className="text-white">Following</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {followingList?.length !== 0 ? (
              followingList?.map((following: ProfileType) => {
                const isThisUserPending =
                  mutateisPending &&
                  unfollowVariables === following.auth_user_id;
                return (
                  <div
                    key={following.id}
                    className="flex items-center justify-between p-3 hover:bg-[#262626] rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#262626] border border-[#D493FF]/20">
                        {following.avatar_url ? (
                          <Image
                            src={following.avatar_url}
                            alt={`${following.username}'s avatar`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-xs font-bold text-[#D493FF]">
                            {following.username?.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {following.username}
                        </span>
                        <span className="text-xs text-gray-400">
                          {following.fullname}
                        </span>
                      </div>
                    </div>
                    <Button
                      disabled={isThisUserPending}
                      variant="ghost"
                      size="sm"
                      className="text-[#A1A1AA] hover:text-red-400"
                      onClick={() => mutatefollow(following.auth_user_id)}
                    >
                      {isOwnProfile
                        ? isThisUserPending
                          ? "..."
                          : "unfollow"
                        : userId === following.auth_user_id
                          ? "You"
                          : "Follow"}
                    </Button>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col gap-1 items-center justify-center pt-3 pb-4">
                <h4>People you follow</h4>
                <p className="text-gray-400">
                  Once you follow people, you will see them here.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
