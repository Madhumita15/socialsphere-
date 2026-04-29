

const LandingFooter = () => {
  return (
    <footer className="py-12 border-t border-white/10 px-6 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-extrabold font-serif leading-8 tracking-[-0.4px]  text-[24px] bg-linear-to-r from-[#D493FF]  to-[#FF7354] bg-clip-text text-transparent">
          SocialSphere+
        </div>
        <div className="flex gap-8 text-sm text-gray-500">
          <a href="#" className="hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
        </div>
        <p className="text-gray-600 text-sm">
          © 2026 SocialSphere. Built for the future.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
