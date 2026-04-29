"use client"

import { PostCard } from "@/components/PostCard";
// import LiquidEther from "@/components/LiquidEther";
// import Particles from "@/components/Particles";

const MOCK_POSTS = [
  {
    id: "1",
    type: "image" as const,
    src: "/images/image1.png",
    views: 2500,
  },
  {
    id: "2",
    type: "video" as const,
    src: "https://www.pexels.com/download/video/8449545/",
    views: 5200,
  },
  {
    id: "3",
    type: "image" as const,
    src: "/images/image1.png",
    views: 1850,
  },
  {
    id: "4",
    type: "image" as const,
    src: "/images/image1.png",
    views: 3400,
  },
  {
    id: "5",
    type: "video" as const,
    src: "https://www.pexels.com/download/video/8449545/",
    views: 7800,
  },
  {
    id: "6",
    type: "image" as const,
    src: "/images/image1.png",
    views: 2100,
  },
  {
    id: "7",
    type: "image" as const,
    src: "/images/image1.png",
    views: 4300,
  },
  {
    id: "8",
    type: "video" as const,
    src: "https://www.pexels.com/download/video/8449545/",
    views: 6100,
  },
  {
    id: "9",
    type: "image" as const,
    src: "/images/image1.png",
    views: 3900,
  },
  {
    id: "10",
    type: "image" as const,
    src: "/images/image1.png",
    views: 2750,
  },
  {
    id: "11",
    type: "video" as const,
    src: "https://www.pexels.com/download/video/8449545/",
    views: 5500,
  },
  {
    id: "12",
    type: "image" as const,
    src: "/images/image1.png",
    views: 3200,
  },
];

const Discovery = () => {
  return (
    <>
      <main className=" h-screen sm:pb-0 relative   pb-24  ">
        {/* <div className="absolute inset-0 z-0 "> */}
          {/* <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          /> */}

           {/* <Particles
            particleColors={["#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
          />
        </div> */}

        <div className="absolute z-10 ">
          {/* Header */}
          <div className="sticky top-0   ">
            <div className="max-w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4">
              <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#D493FF] to-[#FF7354] bg-clip-text text-transparent">
                Discover
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Explore trending posts
              </p>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="max-w-full px-2 sm:px-4 md:px-6 py-4 sm:py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {MOCK_POSTS.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  type={post.type}
                  src={post.src}
                  views={post.views}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Discovery;
