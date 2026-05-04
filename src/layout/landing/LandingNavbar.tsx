import { useAuthStore } from "@/store/useAuthStore";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {  useState, useSyncExternalStore } from "react";

const LandingNavbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { token, logoutUser } = useAuthStore();

function useIsClinet (){
    return useSyncExternalStore(
      ()=> ()=> {},
      ()=> true,
      ()=> false

    )
  }

  const isClient = useIsClinet()
  if(!isClient) return null


  

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 bg-[#0D0D0D]/70 ">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer font-extrabold font-serif leading-8 tracking-[-0.4px]  text-[24px] bg-linear-to-r from-[#D493FF]  to-[#FF7354] bg-clip-text text-transparent"
        >
          SocialSphere+
        </div>
        <div className="hidden md:flex items-center gap-8">
          {isClient &&
            (token ? (
              <button
                className="text-gray-400 cursor-pointer hover:text-[#D493FF] transition-colors"
                onClick={() => logoutUser()}
              >
                Logout
              </button>
            ) : (
              <button
                className="text-gray-400 hover:text-[#D493FF] cursor-pointer transition-colors"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            ))}

          <button
            className="px-6 py-2.5 cursor-pointer rounded-xl bg-linear-to-r from-[#D493FF] to-[#FF7354] font-bold text-black hover:shadow-[0_0_20px_rgba(212,147,255,0.4)] transition-all active:scale-95"
            onClick={() => {
              if (!token) {
                router.push("/login");
              } else {
                router.push("/user/home");
              }
            }}
          >
            Get Started
          </button>
        </div>

        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute bg-gray-300 top-20 left-0 w-full md:hidden transition-all duration-300 ease-in-out">
            <ul className="flex flex-col gap-4 p-6 bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-in slide-in-from-top-5">
              <li>
                <button
                  className="w-full cursor-pointer border-2 text-left py-3 px-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  onClick={() => {
                    router.push("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="w-full cursor-pointer py-4 rounded-xl bg-linear-to-r from-[#D493FF] to-[#FF7354] font-bold text-black active:scale-95 transition-transform shadow-[0_0_15px_rgba(212,147,255,0.3)]"
                  onClick={() => {
                    if (!token) {
                      router.push("/register");
                    } else {
                      router.push("/user/home");
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavbar;
