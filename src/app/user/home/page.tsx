"use client";
import FeedCard from "@/components/FeedCard";
import { Plus } from "lucide-react";
export default function Home() {
  interface Story {
    id: number;
    username: string;
    initials: string;
    backgroundColor: string;
    hasStory: boolean;
  }

  interface Post {
    id: number;
    authorName: string;
    authorInitials: string;
    location: string;
    timeAgo: string;
    mediaUrl: string;
    mediaType: "image" | "video";
    likes: number;
    comments: number;
    description: string;
  }
  const stories: Story[] = [
    {
      id: 1,
      username: "Your Story",
      initials: "+",
      backgroundColor: "from-[#D493FF] to-[#FF7354]",
      hasStory: false,
    },
    {
      id: 2,
      username: "john_doe",
      initials: "JD",
      backgroundColor: "from-[#FF7354] to-[#D493FF]",
      hasStory: true,
    },
    {
      id: 3,
      username: "sarah_art",
      initials: "SA",
      backgroundColor: "from-[#D493FF] to-[#9D4EDD]",
      hasStory: true,
    },
    {
      id: 4,
      username: "alex_photo",
      initials: "AP",
      backgroundColor: "from-[#FF7354] to-[#FF6B6B]",
      hasStory: true,
    },
    {
      id: 5,
      username: "emma_creative",
      initials: "EC",
      backgroundColor: "from-[#9D4EDD] to-[#D493FF]",
      hasStory: true,
    },
    {
      id: 6,
      username: "mike_travel",
      initials: "MT",
      backgroundColor: "from-[#FF6B6B] to-[#FF7354]",
      hasStory: true,
    },
  ];

   const posts: Post[] = [
    {
      id: 1,
      authorName: "Sarah Creative",
      authorInitials: "SC",
      location: "New York, NY",
      timeAgo: "2h ago",
      mediaUrl: "/images/image1.png",
      mediaType: "image",
      likes: 2543,
      comments: 342,
      description:
        "Just launched my new design collection! 🎨✨ So excited to share this with everyone",
    },
    {
      id: 2,
      authorName: "John Photography",
      authorInitials: "JP",
      location: "California, USA",
      timeAgo: "4h ago",
      mediaUrl:
        "https://www.pexels.com/download/video/28769580/",
      mediaType: "video",
      likes: 1876,
      comments: 256,
      description:
        "Golden hour magic 🌅 Nothing beats nature&apos;s beauty at sunset",
    },
    {
      id: 3,
      authorName: "Emma Travel",
      authorInitials: "ET",
      location: "Bali, Indonesia",
      timeAgo: "6h ago",
      mediaUrl:
        "/images/image1.png",
      mediaType: "image",
      likes: 3421,
      comments: 512,
      description:
        "Paradise found! 🏝️ The beaches here are absolutely breathtaking",
    },
    {
      id: 4,
      authorName: "Alex Designer",
      authorInitials: "AD",
      location: "London, UK",
      timeAgo: "8h ago",
      mediaUrl:
        "https://www.pexels.com/download/video/8449545/",
      mediaType: "video",
      likes: 2156,
      comments: 389,
      description:
        "New branding project complete! Really proud of how this turned out 💫",
    },
    {
      id: 5,
      authorName: "Mike Innovation",
      authorInitials: "MI",
      location: "San Francisco, CA",
      timeAgo: "10h ago",
      mediaUrl:
        "/images/image1.png",
      mediaType: "image",
      likes: 1923,
      comments: 267,
      description:
        "Working on something revolutionary... stay tuned! 🚀 #TechLife",
    },
    {
      id: 6,
      authorName: "Lisa Wellness",
      authorInitials: "LW",
      location: "Miami, FL",
      timeAgo: "12h ago",
      mediaUrl:
        "https://www.pexels.com/download/video/4671951/",
      mediaType: "video",
      likes: 2789,
      comments: 445,
      description:
        "Morning vibes 🌞 Starting the day right with a beach workout",
    },
  ];
  return (
    <>
      <div className="bg-[#121111] border-b border-[#262626] px-4 py-4 overflow-x-auto overflow-y-hidden scrollbar-hide w-full touch-pan-y">
        <div className="flex gap-3 w-max flex-nowrap">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              {/* Story Avatar */}
              <div
                className={`relative w-16 h-16 rounded-full bg-linear-to-br ${story.backgroundColor} p-0.5 group-hover:scale-110 transition-transform duration-200 ${
                  story.hasStory ? "ring-2 ring-[#D493FF]" : ""
                }`}
              >
                <div className="w-full h-full rounded-full bg-[#121111] flex items-center justify-center">
                  {story.id === 1 ? (
                    <Plus className="w-6 h-6 text-white" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#71717A] to-[#51515A] flex items-center justify-center text-white font-bold text-sm">
                      {story.initials}
                    </div>
                  )}
                </div>
              </div>

              {/* Username */}
              <span className="text-xs text-[#A1A1AA] font-medium max-w-15 text-center truncate">
                {story.username}
              </span>
            </div>
          ))}
        </div>
      </div>

     <div className="flex flex-col items-center w-full max-w-2xl mx-auto mt-11">
        {posts.map((post) => (
          <FeedCard
            key={post.id}
            id={post.id}
            authorName={post.authorName}
            authorInitials={post.authorInitials}
            location={post.location}
            timeAgo={post.timeAgo}
            mediaUrl={post.mediaUrl}
            mediaType={post.mediaType}
            likes={post.likes}
            comments={post.comments}
            description={post.description}
          />
        ))}
      </div>
    </>
  );
}
