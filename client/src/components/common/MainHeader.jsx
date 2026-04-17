import { Bus, Globe, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MainHeader() {
  const { session } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 shadow-2xl backdrop-blur-xl transition-all duration-500">
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[76px] lg:px-10">
        
        {/* Logo Section */}
        <Link to="/" className="group flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-black shadow-[0_0_28px_-5px_rgba(251,191,36,0.75)] transition-transform duration-300 group-hover:scale-105">
            <Bus className="h-7 w-7" />
          </div>
          <div className="hidden flex-col -gap-1 sm:flex">
            <span className="text-[11px] font-semibold tracking-[0.3em] text-amber-400">
              Campus Mobility
            </span>
            <span className="text-xl font-black tracking-tight text-white leading-none">
              SBMS
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-10 lg:flex">
          {["Overview", "Modules", "Activity"].map((item) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              className="group relative text-sm font-medium tracking-wide text-gray-400 transition-all hover:text-white"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden md:flex items-center gap-2 text-gray-500 hover:text-white transition-colors cursor-pointer group">
            <Globe className="h-4 w-4" />
            <span className="text-[11px] font-semibold tracking-wide">English</span>
            <ChevronDown className="h-3 w-3 group-hover:translate-y-0.5 transition-transform" />
          </div>

          <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>

          <Link
            to={session?.role === "guard" ? "/guard" : "/login/guard"}
            className="hidden h-10 items-center rounded-xl border border-white/10 bg-white/[0.03] px-5 text-[12px] font-medium tracking-wide text-white transition-all hover:bg-white/[0.08] sm:inline-flex"
          >
            Guard module
          </Link>
          
          <Link
            to={session?.role === "admin" ? "/admin" : "/login/admin"}
            className="inline-flex h-9 items-center rounded-xl bg-amber-400 px-4 text-[11px] font-semibold tracking-wide text-black shadow-lg transition-all hover:bg-amber-500 hover:shadow-[0_0_20px_-7px_rgba(251,191,36,0.8)] sm:h-10 sm:px-5 sm:text-[12px]"
          >
            Open admin module
          </Link>
        </div>
      </div>
    </header>
  );
}
