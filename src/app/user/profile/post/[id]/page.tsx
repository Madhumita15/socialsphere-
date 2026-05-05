
"use client";

import PostDialog from "@/components/profile/PostDialog";
import { useDeletePost, useGetPostById } from "@/hooks/usePost";
import { Edit2, Trash, ArrowLeft, MapPin } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import loadingAnimation from "@/services/json/lottie/Loading animation.json";
import Lottie from "lottie-react";


const SinglePost = () => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { data, isLoading, isError, error } = useGetPostById(id as string);
  const { mutate: deleteMutate, isError: deleteError } = useDeletePost();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <Lottie width={70} height={70} loop animationData={loadingAnimation} />
      </div>
    );
  }

  const item = data?.formattedData?.[0]
  console.log("item", item)

  return (
    <div className="min-h-screen pb-16 pt-5   z-0 bg-black text-white">
      {/* Header */}
      <div className="  z-0 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-[#FF7354] transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-lg font-semibold">{item.media_type === "image" ? "Posts" : "Reels"}</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Error Messages */}
      {isError && (
        <div className="max-w-6xl mx-auto px-4 py-4 mt-4">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-300 font-medium text-sm">{error?.message}</p>
          </div>
        </div>
      )}
      {deleteError && (
        <div className="max-w-6xl mx-auto px-4 py-4 mt-4">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-300 font-medium text-sm">{deleteError}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {item && (
        <div className="max-w-6xl mx-auto px-4 py-6  md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Media Container */}
            <div className="lg:col-span-2 flex items-center justify-center bg-linear-to-br from-gray-900 to-black rounded-xl overflow-hidden group border border-gray-800 aspect-square lg:aspect-auto lg:h-[600px]">
              {item.media_type === "image" ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.media_url}
                    alt="Post"
                    fill
                    className="cursor-pointer object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 600px"
                    priority
                  />
                </div>
              ) : (
                <video
                  src={item.media_url}
                  autoPlay
                  playsInline
                  controls
                  loop
                  className="w-full h-full cursor-pointer object-cover group-hover:scale-100 transition-transform duration-500"
                />
              )}
            </div>

            {/* Post Info Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Caption & Hashtags */}
              <div className="space-y-4">
                <div className="space-y-2">
                  {item.caption && (
                    <p className="text-sm md:text-base text-gray-100 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                  {item.hashtags && item.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.hashtags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs md:text-sm text-[#FF7354] hover:text-[#D493FF] transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent" />

              {/* Location */}
              {item.location && (
                <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                  <MapPin className="w-5 h-5 text-[#D493FF] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      Location
                    </p>
                    <p className="text-sm md:text-base text-white mt-1">
                      {item.location}
                    </p>
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2 p-2 rounded bg-gray-900/30">
                  <span className="text-[#FF7354]">📅</span>
                  <span>
                    Posted {new Date(item.created_at).toLocaleDateString()} at{" "}
                    {new Date(item.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {item.created_at !== item.updated_at && (
                  <div className="flex items-center gap-2 p-2 rounded bg-gray-900/30">
                    <span className="text-[#D493FF]">✏️</span>
                    <span>
                      Updated {new Date(item.updated_at).toLocaleDateString()} at{" "}
                      {new Date(item.updated_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent" />

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setOpen(true)}
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-[#FF7354] to-orange-500 hover:from-[#FF7354] hover:to-orange-400 text-white rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#FF7354]/30 active:scale-95"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="hidden sm:inline ">Edit</span>
                </button>
                <button
                  onClick={() => {
                    const confirmMessage = window.confirm(
                      "Are you sure you want to delete this post? This action cannot be undone."
                    );
                    if (!confirmMessage) return;
                    deleteMutate(item.id);
                  }}
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-red-900/30 hover:bg-red-900/50 text-red-300 hover:text-red-200 border border-red-700/50 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30 active:scale-95"
                >
                  <Trash className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>

              {/* PostDialog */}
              <PostDialog
                mode="post"
                action="edit"
                open={open}
                setOpen={setOpen}
                initialdata={data?.formattedData?.[0]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
