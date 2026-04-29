const MessageBubble = ({ isSender, text, time }: {isSender: boolean, text: string, time: string}) => (
  <div className={`flex flex-col mb-4 ${isSender ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
    <div className={`max-w-[70%] p-4 rounded-2xl shadow-lg ${
      isSender 
        ? 'bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-tr-none' 
        : 'bg-[#1A1A1A] text-gray-200 rounded-tl-none border border-white/5'
    }`}>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
    <span className="text-[10px] text-gray-500 mt-1 px-1">{time}</span>
  </div>
);
export default MessageBubble