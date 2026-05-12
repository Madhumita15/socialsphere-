// import MessageBubble from "@/components/MessageBubble";
// import MessageSidebarItem from "@/components/MessageSidebarItem";
// import {
  // BellOff,
  // Info,
  // Paperclip,
  // Phone,
  // Search,
  // Send,
  // ShieldAlert,
  // Smile,
  // User,
  // Video,
// } from "lucide-react";
// import Image from "next/image";

const Direct = () => {
  return (
    <>

      <div className="flex items-center justify-center h-screen pb-20 md:pb-0 bg-[#0D0D0D] text-white overflow-hidden  selection:bg-purple-500/30">
      <div>
        <h1 className="text-gray-400 text-lg">Under The Maintanance</h1>
      </div>
        {/* 1. LEFT SIDEBAR (25%) - Hidden on mobile if chat is open */}
        {/* <aside className="hidden lg:flex flex-col w-full md:w-[25%] border-r border-white/5 bg-[#0D0D0D]">
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent mb-6">
              Messages
            </h1>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
            <MessageSidebarItem active />
            {[...Array(6)].map((_, i) => <MessageSidebarItem key={i} active={false} />)}
          </div>
        </aside> */}

        {/* 2. CENTER CHAT AREA (50% on Desktop, 75% on Tablet, 100% on Mobile) */}
        {/* <main className="flex flex-col flex-1 bg-[#0D0D0D] relative">
          {/* Chat Header */}
          {/* <header className="flex items-center justify-between p-4 border-b border-white/5 backdrop-blur-md bg-black/40 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#1A1A1A]">
                <Image
                  src="/images/profile.png"
                  alt="User"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold">Alex Rivera</h3>
                <p className="text-[10px] text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
                  Active now
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <Phone className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Video className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Info className="w-5 h-5 cursor-pointer hover:text-white transition-colors md:hidden" />
            </div>
          </header> */}

          {/* Messages List */}
          {/* <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <MessageBubble
              isSender={false}
              text="Hey! Have you seen the updated SocialSphere+ wireframes?"
              time="12:40 PM"
            />
            <MessageBubble
              isSender={true}
              text="Just checked them out. The dark mode looks incredibly premium!"
              time="12:42 PM"
            />
            <MessageBubble
              isSender={false}
              text="Exactly. I think we should go with the purple to orange gradient for the buttons."
              time="12:45 PM"
            />

            {/* Typing Indicator */}
            {/* <div className="flex items-center gap-2 text-gray-500 ml-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div> */}

          {/* Input Area */}
          {/* <footer className="p-4 bg-[#0D0D0D]">
            <div className="flex items-center gap-3 bg-[#1A1A1A] p-2 rounded-2xl border border-white/5 focus-within:border-purple-500/50 transition-all shadow-2xl">
              <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                <Smile className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                <Paperclip className="w-6 h-6" />
              </button>
              <input
                placeholder="Message..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
              />
              <button className="bg-linear-to-r from-purple-600 to-orange-500 p-2.5 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95 transition-all">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </footer>
        </main>  */}

        {/* 3. RIGHT SIDEBAR (25%) - Hidden on Tablet & Mobile */}
        {/* <aside className="hidden lg:flex flex-col w-[25%] border-l border-white/5 bg-[#0D0D0D] p-6 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="w-24 h-24 rounded-full p-1 bg-linear-to-tr from-purple-500 via-pink-500 to-orange-500">
              <div className="w-full h-full rounded-full bg-black overflow-hidden border-4 border-black">
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">Alex Rivera</h2>
              <p className="text-sm text-gray-500">@arivera_design</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-8">
            <button className="flex flex-col items-center gap-2 p-3 bg-[#1A1A1A] rounded-xl hover:bg-[#252525] transition-colors group">
              <User className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
              <span className="text-[10px] text-gray-400">Profile</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 bg-[#1A1A1A] rounded-xl hover:bg-[#252525] transition-colors group">
              <BellOff className="w-5 h-5 text-gray-400 group-hover:text-pink-400" />
              <span className="text-[10px] text-gray-400">Mute</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 bg-[#1A1A1A] rounded-xl hover:bg-[#252525] transition-colors group">
              <ShieldAlert className="w-5 h-5 text-gray-400 group-hover:text-orange-400" />
              <span className="text-[10px] text-gray-400">Block</span>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-300">
                Shared Media
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-[#1A1A1A] rounded-lg overflow-hidden border border-white/5 hover:opacity-80 cursor-pointer transition-opacity"
                  >
                    <Image
                      src={`/images/profile.png/${i + 20}/200`}
                      width={100}
                      height={100}
                      alt="shared"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-300">
                Settings
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between items-center p-2 hover:bg-[#1A1A1A] rounded-lg cursor-pointer transition-colors">
                  <span className="text-xs text-gray-400">Notifications</span>
                  <div className="w-8 h-4 bg-purple-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-[#1A1A1A] rounded-lg cursor-pointer transition-colors text-red-400">
                  <span className="text-xs">Report Account</span>
                </div>
              </div>
            </div>
          </div>
        </aside> */}
      </div>
    </>
  );
};

export default Direct;
