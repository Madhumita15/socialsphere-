"use client";
import FeedCard from "@/components/FeedCard";
import { useInifinityPost } from "@/hooks/usePost";
import { Loader2, Plus, User } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { formatDistanceToNow } from "date-fns";
import { useRecentSignUps } from "@/hooks/useAdminStats";
import Image from "next/image";
export default function Home() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInifinityPost();
  const posts = data?.pages.flatMap((page) => page.formattedData) || [];
  console.log("posts", posts)
  const {
    data: recentSignupDataMain,
    isLoading,
    isError,
    error,
  } = useRecentSignUps();

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (bottom && hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage]);
  console.log("recentSignupDataMain", recentSignupDataMain)


const recentSignupData = recentSignupDataMain?.filter((user)=> (user.role !== "moderator") && (user.role !== "admin"))
console.log("recentSignup", recentSignupData)

function useIsClient() {
    return useSyncExternalStore(
      () => () => {}, // Empty subscribe function
      () => true, // Client-side value
      () => false, // Server-side/Hydration value
    );
  }

  const isClient = useIsClient();
  if (!isClient) return null;

  

  return (
    <>
      <div className="bg-[#121111] border-b border-[#262626] px-4 py-4 overflow-x-auto overflow-y-hidden scrollbar-hide w-full touch-pan-x">
      <div className="flex gap-4 w-max flex-nowrap">
        {recentSignupData?.map((user) => (
          <div
            key={user.id}
            className="flex flex-col items-center gap-1.5 cursor-pointer group min-w-17.5"
          >
            {/* Story Avatar Ring */}
            <div className="relative p-0.5 rounded-full bg-linear-to-tr from-[#f97316] via-[#d946ef] to-[#a855f7] group-hover:scale-105 transition-transform duration-200">
              <div className="bg-[#121111] p-0.5 rounded-full">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#262626] flex items-center justify-center border border-[#262626]">
                  {isClient && user.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={user.fullname || "User"}
                      fill // Fills the container
                      sizes="56px"
                      className="object-cover"
                      priority={false}
                    />
                  ) : (
                    <span className="text-white font-bold text-sm uppercase">
                      { user.fullname?.slice(0, 2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Username */}
            <span className="text-[11px] text-[#A1A1AA] font-medium w-16 text-center truncate group-hover:text-white transition-colors">
              {user.username}
            </span>
          </div>
        ))}
      </div>
    </div>

      <div className="flex flex-col items-center w-full max-w-2xl mx-auto mt-11">
      {posts.map((post) => {
          const name = post.author?.username || "Anonymous";
          return (
            <FeedCard
              key={post.id}
              id={post.id}
              authorName={name}
              authorInitials={post.author.avatar_url}
              location={post.location}
              timeAgo={formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
              mediaUrl={post.media_url}
              mediaType={post.media_type}
              likes={post.like_count}
              comments={post.comment_count}
              description={post.caption}
              userId={post.user_id}
              user_has_liked={post.user_has_liked}
              isSaved={post.isSaved}
              report_count={post.report_count}
            />
          );
        })} 
      </div>

      <div className="flex justify-center py-8">
        {isFetchingNextPage ? (
          <Loader2 className="animate-spin w-10 h-10 text-zinc-500" />
        ) : !hasNextPage && posts.length > 0 ? (
          <p className="text-zinc-500 text-sm">No more posts to show</p>
        ) : null}
      </div>
    </>
  );
}
