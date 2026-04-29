"use client";

import {
  MessageSquare,
  Globe,
  Shield,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LandingFooter from "@/layout/landing/LandingFooter";
import LandingNavbar from "@/layout/landing/LandingNavbar";
import TextType from "@/components/TextType";
import Particles from "@/components/Particles";
import { useAuthStore } from "@/store/useAuthStore";

const MOCK_POSTS = [
  {
    id: 1,
    username: "alex_tech",
    avatar: "/images/profile.png",
    image: "/images/image1.png",
    likes: "1.2k",
    caption:
      "The future of social networking is finally here. #SocialSphere #Web3",
  },
  {
    id: 2,
    username: "creative_mia",
    avatar: "/images/profile.png",
    image: "/images/image1.png",
    likes: "850",
    caption: "Exploring new digital horizons. The UI is just ",
  },
];

const MOCK_MESSAGES = [
  {
    id: 1,
    text: "Yo! Did you see the new trend?",
    sender: "Jordan",
    isMe: false,
  },
  {
    id: 2,
    text: "Just posted about it. The reach is insane! ",
    sender: "Me",
    isMe: true,
  },
];

const LandingPage = () => {
  const router = useRouter();
  const {token} = useAuthStore()

  const scrollToDemo = () => {
    const section = document.getElementById("demo");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen  bg-[#0D0D0D] text-white  selection:bg-[#D493FF] selection:text-black">
      <LandingNavbar />
      <main className="flex-1 relative">
        <div className="absolute inset-0 z-0 ">
          <Particles
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
        </div>

        {/*  HERO SECTION  */}
        <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden min-h-[90vh] flex flex-col justify-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-linear-to-b from-[#D493FF]/10 to-transparent blur-[120px] pointer-events-none" />

          <h1 className="relative z-10 text-5xl md:text-8xl font-black mb-6 tracking-tight">
            Connect. Share. <br />
            <span className="bg-linear-to-r tracking-wider text-5xl from-[#D493FF] via-[#FF7354] to-[#EAC96F] bg-clip-text text-transparent">
              <TextType
                text={[
                  "Chat in Real-Time.",
                  "Discover Content.",
                  "Build Community.",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="_"
                deletingSpeed={50}
              />
            </span>
          </h1>
          <p className="relative z-10 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience next-gen social networking. Join a community where your
            voice matters and discovery is instant.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-10 py-4 rounded-xl bg-linear-to-r from-[#D493FF] via-[#FF7354] to-[#EAC96F] text-black font-black text-lg hover:scale-105 transition-transform shadow-xl"
              onClick={() => {
                if(!token){
                    router.push("/login")
                }else{
                router.push("/user/home");
                }
              }}
            >
              Get Started Free
            </button>
            <button
              onClick={scrollToDemo}
              className="px-10 py-4 rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/5 transition-all font-bold"
            >
              Watch Demo
            </button>
          </div>
        </section>

        {/*  PREVIEW SECTION (MOCK FEED & CHAT)  */}
        <section
          className="py-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
          id="demo"
        >
          {/* Mock Feed Component */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Globe className="text-[#FF7354]" /> Global Discovery
            </h2>
            {MOCK_POSTS.map((post) => (
              <div
                key={post.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#D493FF]/30 transition-all"
              >
                <div className="p-4 flex items-center gap-3">
                  <Image
                    src={post.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-white/10"
                    width={100}
                    height={100}
                  />
                  <span className="font-bold text-sm">{post.username}</span>
                </div>
                <Image
                  src={post.image}
                  alt="post"
                  className="w-full h-64 object-cover"
                  width={100}
                  height={100}
                />
                <div className="p-4">
                  <div className="flex gap-4 mb-3">
                    <Heart
                      size={22}
                      className="text-[#FF7354] cursor-pointer"
                    />
                    <MessageCircle size={22} className="cursor-pointer" />
                    <Send size={22} className="cursor-pointer" />
                  </div>
                  <p className="text-xs font-bold mb-1">{post.likes} likes</p>
                  <p className="text-sm text-gray-300">
                    <span className="font-bold mr-2 text-white">
                      {post.username}
                    </span>
                    {post.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mock Chat Component */}
          <div className="relative">
            <div className="absolute -inset-4 bg-linear-to-r from-[#D493FF]/20 to-[#FF7354]/20 blur-3xl -z-10" />
            <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-white/5 p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-bold">Real-time Chat</span>
                </div>
              </div>
              <div className="p-6 h-100 flex flex-col gap-4 overflow-y-auto">
                {MOCK_MESSAGES.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${msg.isMe ? "bg-linear-to-r from-[#D493FF] to-[#FF7354] text-black font-medium rounded-tr-none" : "bg-white/10 rounded-tl-none"}`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-auto flex items-center gap-2 text-gray-500 text-xs">
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  Someone is typing...
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  FEATURES SECTION  */}
        <section className="py-24 px-6 bg-linear-to-b from-transparent to-[#050505]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare size={32} className="text-[#D493FF]" />,
                title: "Real-Time Messaging",
                desc: "Latency-free conversations with end-to-end encryption.",
              },
              {
                icon: <Globe size={32} className="text-[#FF7354]" />,
                title: "Discover Content",
                desc: "Personalized feed based on your interests and creators.",
              },
              {
                icon: <Shield size={32} className="text-[#EAC96F]" />,
                title: "Secure Platform",
                desc: "Advanced moderation to keep the community safe and clean.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D493FF]/40 transition-all group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/*  CTA  */}
        <section className="py-32 px-6 text-center">
          <div className="max-w-4xl mx-auto p-16 rounded-[3rem] bg-linear-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#D493FF]/5 blur-3xl" />
            <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10">
              Join SocialSphere Today
            </h2>
            <p className="text-gray-400 mb-10 relative z-10">
              Your next favorite community is just one click away.
            </p>
            <button
              onClick={() => router.push("/register")}
              className="relative z-10 px-12 py-4 rounded-2xl bg-white text-black font-black text-xl hover:bg-[#EAC96F] transition-colors"
            >
              Create Account
            </button>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
