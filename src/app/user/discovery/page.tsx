"use client"



import { PostCard } from "@/components/PostCard";
import { useInifinityPost } from "@/hooks/usePost";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Discovery = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInifinityPost();
  const posts = data?.pages.flatMap((page) => page.formattedData);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (bottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
   
    <main className="min-h-screen bg-black text-white relative pt-5 pb-5">
      
     
      <div className="relative z-10 w-full">
        <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl items-center flex flex-col mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
            <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#D493FF] to-[#FF7354] bg-clip-text text-transparent">
              Discover
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Explore trending posts
            </p>
          </div>
        </div>

       
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  gap-3 sm:gap-4 md:gap-6">
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                type={post.media_type}
                src={post.media_url}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center py-10">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin w-8 h-8 text-zinc-500" />
            </div>
          ) : !hasNextPage && (posts && posts.length > 0) ? (
            <p className="text-zinc-500 text-sm font-medium">No more posts to show</p>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Discovery;