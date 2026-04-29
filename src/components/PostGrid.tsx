'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';

interface PostsGridProps {
  items: Array<{ id: string; type: 'post' | 'reel'; url: string }>;
  isReels?: boolean;
}

export default function PostsGrid({ items, isReels = false }: PostsGridProps) {
  if (items.length === 0) {
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
      {items.map((item) => (
        <div key={item.id} className="relative aspect-square bg-[#262626] overflow-hidden group">
          {item.type === 'post' ? (
            <Image
              src={item.url}
              alt="Post"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
            />
          ) : (
            <>
              <video
                src={item.url}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
                <Play className="w-10 h-10 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}