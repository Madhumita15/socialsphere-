'use client'

import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ReelsVideoProps {
  id: string
  username: string
  caption: string
  likes: number
  comments: number
  videoSrc?: string
}

export function ReelsVideo({
  username,
  caption,
  likes,
  comments,
  videoSrc = 'https://www.pexels.com/download/video/28769580/',
}: ReelsVideoProps) {
  return (
    <div className="relative h-screen w-full snap-start overflow-hidden bg-black">
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
        <p className="text-white font-semibold text-xs sm:text-sm">{username}</p>
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
            className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 hover:scale-110 transition-transform bg-black/40 hover:bg-black/60"
          >
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white fill-white" />
          </Button>
          <span className="text-white text-xs sm:text-sm font-semibold">{likes}</span>
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
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 hover:scale-110 transition-transform bg-black/40 hover:bg-black/60"
          >
            <Bookmark className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
          </Button>
        </div>
        </div>
    </div>
  )
}
