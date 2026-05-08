"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostsGrid from "@/components/profile/PostGrid";
import loadingAnimation from '@/services/json/lottie/Loading animation.json'
import PostDialog from "./PostDialog";
import { useGetPost } from "@/hooks/usePost";
import { Button } from "../ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import Lottie from "lottie-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useGetBookMark } from "@/hooks/useBookMark";


export default function ProfileTabs() {
  const { data, isError:getPostIsError, isLoading:getPostLoading, error:postError } = useGetPost();
  const {user} = useAuthStore()
  const [open, setOpen] = useState(false);
  const {data:saveData, isLoading:getBookMarkLoading, isError:bookMarkIsError, error:bookmarkError} = useGetBookMark()
  console.log("saveData", saveData)

  const postOnly = data?.postsWithLikeStatus?.filter(
    (post) => post.media_type === "image" && post.user_id === user?.auth_user_id,
  );
  const reelsOnly = data?.postsWithLikeStatus?.filter(
    (post) => post.media_type === "video" && post.user_id === user?.auth_user_id,
  );

  if (getBookMarkLoading || getPostLoading) {
    return (
      <div className="flex justify-center items-center pt-28">
        <Lottie width={50} height={50}  loop animationData={loadingAnimation}/>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#121111]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="bg-[#262626] border-b border-[#262626] p-0 h-auto w-full flex justify-start md:justify-center">
            <TabsTrigger
              value="posts"
              className="cursor-pointer bg-transparent border-b-2 border-transparent data-[state=active]:border-[#D493FF] data-[state=active]:bg-transparent text-[#A1A1AA] data-[state=active]:text-white rounded-none px-4 md:px-6 py-4 font-semibold text-sm md:text-base"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="reels"
              className="cursor-pointer bg-transparent border-b-2 border-transparent data-[state=active]:border-[#D493FF] data-[state=active]:bg-transparent text-[#A1A1AA] data-[state=active]:text-white rounded-none px-4 md:px-6 py-4 font-semibold text-sm md:text-base"
            >
              Reels
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="cursor-pointer bg-transparent border-b-2 border-transparent data-[state=active]:border-[#D493FF] data-[state=active]:bg-transparent text-[#A1A1AA] data-[state=active]:text-white rounded-none px-4 md:px-6 py-4 font-semibold text-sm md:text-base"
            >
              Saved
            </TabsTrigger>
          </TabsList>

          <div className="text-center pt-20 pb-20 ">
            <Button
              className={
                "rounded-[12px] cursor-pointer bg-linear-to-r from-[#D493FF] to-[#FF7354] hover:to-[#FF7354] hover:from-[#D493FF] text-black w-30 h-10 font-bold text-[20px] tracking-[-0.4px] leading-6 "
              }
              onClick={() => setOpen(true)}
            >
              create <Plus className="font-bold size-5" />
            </Button>
          </div>
          <div className="flex justify-center items-center">
            {(bookMarkIsError || getPostIsError) && (
              <p className="text-red-200 text-xl font-bold ">
                {bookmarkError?.message || postError?.message}
              </p>
            )}
          </div>

          {/* Posts Tab */}
          <TabsContent value="posts" className="mt-8">
            <PostDialog
              mode="post"
              open={open}
              action="create"
              setOpen={setOpen}
              initialdata={null}
            />
            <PostsGrid items={postOnly || []} />
          </TabsContent>

          {/* Reels Tab */}
          <TabsContent value="reels" className="mt-8">
            <PostDialog
              mode="reel"
              open={open}
              action="create"
              setOpen={setOpen}
              initialdata={null}
            />
            <PostsGrid items={reelsOnly || []} isReels />
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="mt-8">
            <PostsGrid items={saveData || []} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
