"use client";

import { Eye } from "lucide-react";
import Image from "next/image";

interface PostCardProps {
  id: string;
  type: "image" | "video";
  src: string;
 
}

export function PostCard({ type, src }: PostCardProps) {
  return (
    <div className="relative  aspect-square bg-black rounded-lg overflow-hidden group cursor-pointer">
      {/* Post Content */}
      {type === "image" ? (
        <Image
          src={src}
          alt="Post"
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <video
          src={src}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          controls={false}
          muted
          loop
          autoPlay
          playsInline
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

      {/* Views Count - Bottom Right */}
      <div className="absolute bottom-0 right-0 flex items-center gap-1 p-2 sm:p-3 bg-linear-to-l from-black via-black/60 to-transparent">
        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        
      </div>

      {/* Video Badge */}
      {type === "video" && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/20 backdrop-blur px-2 sm:px-3 py-1 rounded-full">
          <span className="text-white text-xs font-semibold">VIDEO</span>
        </div>
      )}
    </div>
  );
}
