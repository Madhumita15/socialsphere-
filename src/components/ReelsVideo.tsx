"use client";

import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { useCreateFollow, useGetFollow } from "@/hooks/useFollow";
import { useToggleLike } from "@/hooks/useLike";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ReelsVideoProps {
  username: string;
  caption: string;
  likes: number;
  comments: number
  videoSrc: string;
  authorName: string;
  avatar_url: string;
  userId: string;
  user_has_liked: boolean;
  id: string
}

export function ReelsVideo({
  id,
  username,
  caption,
  likes,
  comments,
  authorName,
  avatar_url,
  videoSrc,
  userId,
  user_has_liked
}: ReelsVideoProps) {
  const { user } = useAuthStore();
  const { mutate: followMutate, isPending } = useCreateFollow();
  const { data } = useGetFollow(userId);
  const {mutate:mutateLike} = useToggleLike()
  const router = useRouter()


  const handleShare = async (e: React.MouseEvent) => {
  // 1. Stop Propagation so the "Background Click" doesn't trigger
  e.stopPropagation(); 
  // 2. The Link we are sending to the world
  const shareUrl = `${window.location.origin}/user/reels/${id}`;
  if (navigator.share) {
    // Mobile Flow
    try {
      await navigator.share({
        title: `Check out ${authorName}'s reel`,
        url: shareUrl,
      });
    } catch (err:unknown) { console.log("User cancelled share"); }
  } else {
    // PC/Window Flow
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied! Paste it anywhere.");
  }
};
  return (
    <div className="relative h-screen w-full snap-start overflow-hidden cursor-pointer bg-black" onClick={()=> router.push(`reels/${id}`)}>
      {/* Video Background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        loop
        muted
        autoPlay
        controls
        playsInline
      />

      {/* Dark Gradient Overlay (Bottom) */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

      {/* Header - Back Button */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-2 sm:p-3 md:p-4 h-12 sm:h-14">
        <div className="w-9 sm:w-10 shrink-0" />
      </div>

      {/* Bottom-Left: Username & Caption Overlay */}
      <div className="absolute bottom-24 left-0 z-10 p-4 max-w-xs sm:bottom-20">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#D493FF] to-[#FF7354] p-[2px]">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-800">
              <Image
                src={avatar_url}
                alt="author profile"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          </div>

          {/* Author Info */}
          <div className="flex flex-col">
            <p className="text-white font-semibold text-sm leading-none">
              {authorName}
            </p>
          </div>

          <div>
            {user?.auth_user_id !== userId && (
              <Button
                variant={data ? "destructive" : "outline"}
                className={`cursor-pointer px-3 transition-all ${data ? "bg-[#262626] text-white" : "bg-black text-white"}`}
                onClick={() => followMutate(userId)}
                disabled={isPending}
              >
                {isPending ? "..." : data ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
        </div>
        <p className="text-white font-semibold text-xs sm:text-sm">
          {username}
        </p>
        <p className="text-white text-xs sm:text-sm line-clamp-2 mt-1 opacity-90">
          {caption}
        </p>
      </div>

      {/* Right Side: Vertical Action Icons Overlay */}
      <div className="absolute right-0 bottom-20 sm:bottom-20 md:bottom-24 z-10 flex flex-col gap-4 sm:gap-5 md:gap-6 pr-2 sm:pr-3 md:pr-4 pb-2 sm:pb-3 md:pb-4">
        {/* Like Button */}
        <div className="flex flex-col items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={()=> {
              if(!user) return
              mutateLike(id)
            }}
            className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 hover:scale-110 transition-transform bg-black/40 hover:bg-black/60"
          >
            <Heart className={`h-5 w-5 sm:h-6 sm:w-6 md:h-9 md:w-9 text-white ${user_has_liked ? "fill-red-600" :  "fill-white"} `} />
          </Button>
          <span className="text-white text-xs sm:text-sm font-semibold">
            {likes}
          </span>
        </div>

        {/* Comment Button */}
        <div className="flex flex-col items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 hover:scale-110 transition-transform bg-black/40 hover:bg-black/60"
          >
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
          </Button>
          <span className="text-white text-xs sm:text-sm font-semibold">{comments}</span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center gap-1.5">
          <Button
          onClick={handleShare}
            variant="ghost"
            size="icon"
            className="cursor-pointer rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 hover:scale-110 transition-transform bg-black/40 hover:bg-black/60"
          >
            <Share2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
          </Button>
        </div>

        {/* Save/Bookmark Button */}
        <div className="flex flex-col items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 hover:scale-110 transition-transform bg-black/40 hover:bg-black/60"
          >
            <Bookmark className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
