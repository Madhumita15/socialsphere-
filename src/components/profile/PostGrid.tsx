'use client';

import { PostsGridProps } from '@/typescript/interface/post.interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';




export default function PostsGrid({ items, isReels = false }: PostsGridProps) {
  const router = useRouter()
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-20">
        <div className="text-center">
          <p className="text-lg md:text-xl text-[#A1A1AA] mb-2">
            {isReels ? 'No reels yet' : 'No posts yet'}
          </p>
          <p className="text-sm md:text-base text-[#71717A]">
            {isReels ? 'Share your first reel' : 'Share your first post'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
      {items?.map((item) => (
        <div key={item.id} className="relative aspect-square bg-[#262626] overflow-hidden group">
          {item.media_type === 'image' ? (
            <Image
            onClick={()=> router.push(`profile/post/${item.id}`) }
              src={item.media_url}
              alt="Post"
              // priority
              fill
              className="cursor-pointer object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
            />
          ) : (
            <>
              <video
              onClick={()=> router.push(`profile/post/${item.id}`) }
                src={item.media_url}
                autoPlay
                muted
                playsInline
                loop
                className="w-full cursor-pointer h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            
            </>
          )}
        </div>
      ))}
    </div>
  );
}