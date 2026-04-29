'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostUploadSection from '@/components/PostUploadSection';
import ReelUploadSection from '@/components/ReelsUploadSection';
import PostsGrid from '@/components/PostGrid';

interface ProfileTabsProps {
  isOwnProfile?: boolean;
}

export default function ProfileTabs({ isOwnProfile = true }: ProfileTabsProps) {
  const [posts, setPosts] = useState<Array<{ id: string; type: 'post' | 'reel'; url: string }>>([
    { id: '1', type: 'post', url: "/images/image1.png" },
    { id: '2', type: 'reel', url: 'https://video-cdn.example.com/reel-1.mp4' },
    { id: '3', type: 'post', url: "/images/image1.png" },
    { id: '4', type: 'post', url: "/images/image1.png" },
    { id: '5', type: 'reel', url: 'https://video-cdn.example.com/reel-2.mp4' },
    { id: '6', type: 'post', url: "/images/image1.png" },
  ]);

  const postsOnly = posts.filter(p => p.type === 'post');
  const reelsOnly = posts.filter(p => p.type === 'reel');

  return (
    <div className="w-full bg-[#121111]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="bg-[#262626] border-b border-[#262626] p-0 h-auto w-full flex justify-start md:justify-center">
            <TabsTrigger
              value="posts"
              className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#D493FF] data-[state=active]:bg-transparent text-[#A1A1AA] data-[state=active]:text-white rounded-none px-4 md:px-6 py-4 font-semibold text-sm md:text-base"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="reels"
              className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#D493FF] data-[state=active]:bg-transparent text-[#A1A1AA] data-[state=active]:text-white rounded-none px-4 md:px-6 py-4 font-semibold text-sm md:text-base"
            >
              Reels
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#D493FF] data-[state=active]:bg-transparent text-[#A1A1AA] data-[state=active]:text-white rounded-none px-4 md:px-6 py-4 font-semibold text-sm md:text-base"
            >
              Saved
            </TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="mt-8">
            {isOwnProfile && <PostUploadSection onUpload={(file) => setPosts([...posts, { id: Date.now().toString(), type: 'post', url: URL.createObjectURL(file) }])} />}
            <PostsGrid items={postsOnly} />
          </TabsContent>

          {/* Reels Tab */}
          <TabsContent value="reels" className="mt-8">
            {isOwnProfile && <ReelUploadSection onUpload={(file) => setPosts([...posts, { id: Date.now().toString(), type: 'reel', url: URL.createObjectURL(file) }])} />}
            <PostsGrid items={reelsOnly} isReels />
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="mt-8">
            <PostsGrid items={[]} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}