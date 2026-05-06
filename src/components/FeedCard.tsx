import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useCreateFollow, useGetFollow } from "@/hooks/useFollow";
import { useToggleLike } from "@/hooks/useLike";
import { FeedCardProps } from "@/typescript/interface/post.interface";
import { useShare } from "@/hooks/useShare";
import { useBookMark } from "@/hooks/useBookMark";


const FeedCard: React.FC<FeedCardProps> = ({
  authorInitials,
  location,
  timeAgo,
  mediaUrl,
  mediaType,
  likes,
  description,
  authorName,
  userId,
  comments,
  user_has_liked,
  id,
  isSaved
}) => {
  const { user } = useAuthStore();
  const { mutate: followMutate, isPending } = useCreateFollow();
  const { data } = useGetFollow(userId);
  const {mutate: mutateToggle} = useToggleLike()
  const {handleShare} = useShare()
  const {mutate:bookmarkMutate} = useBookMark()



 
  

  

  return (
    <>
      <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] overflow-hidden mb-4 w-full max-w-md mx-auto">
        {/* Post Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#D493FF] to-[#FF7354] p-0.5">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-800">
                <Image
                  src={authorInitials}
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
              <p className="text-[#71717A] text-xs">
                {location} • {timeAgo}
              </p>
            </div>
          </div>

          {/* More Options */}
          {/* <button className="text-[#71717A] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 11-4 0 2 2 0 014 0zM10 12a2 2 0 11-4 0 2 2 0 014 0zM10 18a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button> */}
        </div>

        {/* Post Image/Video */}
        <div className="relative w-full aspect-square bg-[#262626] overflow-hidden group">
          {mediaType === "image" ? (
            <Image
              src={mediaUrl}
              alt="Post content"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 500px"
              priority={false}
            />
          ) : (
            <>
              <video
                src={mediaUrl}
                className="w-full h-full object-cover"
                controls={false}
                muted
                loop
                autoPlay
                playsInline
              />
            </>
          )}
        </div>

        {/* Engagement Buttons */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626]">
          <div className="flex items-center gap-2">
            {/* Like Button */}
            <button
              onClick={()=> mutateToggle(id)}
              className="p-2 cursor-pointer hover:bg-[#262626] rounded-full transition-colors group"
            >
              <Heart
                className={`w-6 h-6 transition-all duration-200 ${
                  user_has_liked
                    ? "fill-[#FF7354] text-[#FF7354]"
                    : "text-[#A1A1AA] group-hover:text-white"
                }`}
              />
            </button>

            {/* Comment Button */}
            <button className="p-2 hover:bg-[#262626] rounded-full transition-colors group">
              <MessageCircle className="w-6 h-6 text-[#A1A1AA] group-hover:text-white" />
            </button>

            {/* Share Button */}
            <button className="cursor-pointer p-2 hover:bg-[#262626] rounded-full transition-colors group" onClick={(e)=> handleShare(e,{id:id, authorName:authorName, type: mediaType})}>
              <Share2 className="w-6 h-6 text-[#A1A1AA] group-hover:text-white" />
            </button>
          </div>

          {/* Save/Bookmark Button */}
          <button
          onClick={()=> bookmarkMutate(id)}
            
            className="p-2 hover:bg-[#262626] rounded-full transition-colors group"
          >
            <Bookmark
              className={`w-6 h-6 transition-all duration-200 ${
                isSaved
                  ? "fill-[#D493FF] text-[#D493FF]"
                  : "text-[#A1A1AA] group-hover:text-white"
              }`}
            />
          </button>
        </div>

        {/* Engagement Stats & Description */}
        <div className="px-4 py-3 space-y-2">
          {/* Likes Count */}
          <div className="flex gap-4 items-center">
            <p className="text-white font-semibold text-sm">
              {likes} likes
            </p>
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

          {/* Description */}
          <div>
            <p className="text-white text-sm leading-relaxed">
              <span className="text-[#A1A1AA]">{description}</span>
            </p>
          </div>

          {/* Comments Count */}
          <button className="text-[#71717A] text-xs hover:text-[#A1A1AA] transition-colors">
            View all {comments} comments
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedCard;
