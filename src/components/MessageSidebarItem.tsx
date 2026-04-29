import Image from "next/image";

const MessageSidebarItem = ({ active }: {active: boolean}) => (
  <div className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-300 ${active ? 'bg-[#1A1A1A] border-l-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'hover:bg-[#1A1A1A]'}`}>
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-linear-to-tr from-purple-500 to-orange-500 p-0.5">
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
          <Image src="/images/profile.png" alt="avatar" width={100} height={100} />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
    </div>
    <div className="flex-1 overflow-hidden">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-white text-sm">Alex Rivera</h4>
        <span className="text-[10px] text-gray-500">12:45 PM</span>
      </div>
      <p className="text-xs text-gray-400 truncate">The design looks incredible!</p>
    </div>
  </div>
);

export default MessageSidebarItem