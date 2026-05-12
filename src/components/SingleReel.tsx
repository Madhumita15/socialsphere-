"use client";

import { Button } from "@/components/ui/button";
import { useGetPostById } from "@/hooks/usePost";
import Lottie from "lottie-react";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import loadingAnimation from "@/services/json/lottie/Loading animation.json";
import { useToggleLike } from "@/hooks/useLike";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useShare } from "@/hooks/useShare";
import { useBookMark } from "@/hooks/useBookMark";



const SingleReel = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError, error } = useGetPostById(id);
  const { user } = useAuthStore();
    console.log("data", data?.formattedData);
    const singleReelData = data?.formattedData?.[0]
  const { mutate: mutateLike } = useToggleLike();
  const {handleShare} = useShare()
  const {mutate:bookMarkMutate} = useBookMark()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <Lottie width={70} height={70} loop animationData={loadingAnimation} />
      </div>
    );
  }
  return (
    <>
      {/* Error Messages */}
      {isError && (
        <div className="max-w-6xl mx-auto px-4 py-4 mt-4">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-300 font-medium text-sm">{error?.message}</p>
          </div>
        </div>
      )}
      {singleReelData && (
        <div className="relative h-screen w-full snap-start overflow-hidden cursor-pointer bg-black">
          {/* Video Background */}
          {singleReelData.media_type === "video" ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={singleReelData.media_url}
              loop
              muted
              autoPlay
              controls
              playsInline
            />
          ) : (
            <Image
              src={singleReelData.media_url}
              alt="img"
              fill
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

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
                    src={singleReelData.author.avatar_url}
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
                  {singleReelData.author.authorName}{" "}
                </p>
              </div>

              <div>
                <p className="text-white font-semibold text-xs sm:text-sm">
                  {singleReelData.author.username}
                </p>
              </div>
            </div>

            <p className="text-white text-xs sm:text-sm line-clamp-2 mt-1 opacity-90">
              {singleReelData.caption}
            </p>
          </div>

          {/* Right Side: Vertical Action Icons Overlay */}
          <div className="absolute right-0 bottom-20 sm:bottom-20 md:bottom-24 z-10 flex flex-col gap-4 sm:gap-5 md:gap-6 pr-2 sm:pr-3 md:pr-4 pb-2 sm:pb-3 md:pb-4">
            {/* Like Button */}
            <div className="flex flex-col items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (!user){
                    toast.success("Please Login first to like this post!")
                    return
                  };
                  mutateLike(id);
                }}
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 hover:scale-110 transition-transform bg-black/40 hover:bg-black/60"
              >
                <Heart
                  className={`h-5 w-5 sm:h-6 sm:w-6 md:h-9 md:w-9 text-white ${singleReelData.user_has_liked ? "fill-red-600" : "fill-white"} `}
                />
              </Button>
              <span className="text-white text-xs sm:text-sm font-semibold">
                {singleReelData.like_count}
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
              <span className="text-white text-xs sm:text-sm font-semibold">
                {singleReelData.comment_count}
              </span>
            </div>

            {/* Share Button */}
            <div className="cursor-pointer flex flex-col items-center gap-1.5">
              <Button
              onClick={(e)=>{
                if(!user) {
                  toast.success("Please Login first to share")
                  return
                }
                handleShare(e, {id: singleReelData.id, authorName: singleReelData.author.fullname, type: singleReelData.media_type})
              }}
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 hover:scale-110 transition-transform bg-black/40 hover:bg-black/60"
              >
                <Share2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
              </Button>
            </div>

            {/* Save/Bookmark Button */}
            <div className="flex flex-col items-center gap-1.5">
              <Button
              onClick={()=>{
                 if(!user) {
                  toast.success("Please Login first to save")
                  return
                }
                bookMarkMutate(singleReelData.id)
              }}
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 hover:scale-110 transition-transform bg-black/40 hover:bg-black/60"
              >
                <Bookmark className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white ${singleReelData.isSaved ? "fill-red-600" :  "fill-white"}`} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleReel;
