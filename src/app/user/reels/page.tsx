"use client";
import { ReelsVideo } from "@/components/ReelsVideo";
import { useInifinityPost } from "@/hooks/usePost";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Reels = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInifinityPost("video", true);
  const posts = data?.pages.flatMap((page) => page.getScrollData);
  // console.log(posts)
  const filteredPost = posts?.filter((post) => post.media_type === "video");
  console.log("filteredPost", filteredPost);
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;
      if (bottom && hasNextPage) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <>
      <main className="h-screen isolate relative  w-full  snap-y snap-mandatory bg-black scrollbar-hide">
        {/* Hide scrollbar */}
        {filteredPost?.map((reel, index) => (
          <div key={`${reel.id}-${index}`} className="snap-start h-screen">
            <ReelsVideo
              id={reel.id}
              username={reel.username}
              caption={reel.caption}
              likes={reel.like_count}
              videoSrc={reel.media_url}
              authorName={reel.author.username}
              avatar_url={reel.author.avatar_url}
              userId={reel.user_id}
              // comments={reel.comments}
            />
          </div>
        ))}

        <div className="w-full flex justify-center py-10">
          {isFetchingNextPage && (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin w-8 h-8 text-zinc-500" />
            </div>
          
          // ) : !hasNextPage && posts && posts.length > 0 ? (
          //   <p className="text-zinc-500 text-sm font-medium">
          //     No more posts to show
          //   </p>
          // ) : null}
          )}
        </div>
        <div className="h-20 md:hidden" />
      </main>
    </>
  );
};

export default Reels;
