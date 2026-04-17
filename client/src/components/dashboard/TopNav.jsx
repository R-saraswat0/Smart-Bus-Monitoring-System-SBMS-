import { Bell, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";

export function TopNav({ title, subtitle }) {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = title.toLowerCase().includes("admin");

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 px-6 backdrop-blur-xl transition-all duration-300 lg:px-10">
      <div className="flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Title Section */}
        <div className="min-w-0 flex-1 py-3 lg:py-4">
          <div className="flex items-center gap-3 mb-1">
            <div className={cn(
              "h-1.5 w-1.5 rounded-full animate-pulse",
              isAdmin ? "bg-amber-400" : "bg-teal-400"
            )}></div>
            <p className={cn(
              "text-[11px] font-semibold tracking-[0.18em]",
              isAdmin ? "text-amber-400" : "text-teal-400"
            )}>{title}</p>
          </div>
          <h1 className="max-w-[280px] truncate text-lg font-bold tracking-tight text-white sm:max-w-xl sm:text-2xl">
            {subtitle}
          </h1>
        </div>

        {/* Global Search */}
        <div className="group relative hidden max-w-2xl flex-[1.5] lg:block">
          <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-amber-400" />
          <input
            type="text"
            placeholder="Search records, buses, or alerts..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.05] py-2 pl-14 pr-6 text-sm text-white outline-none transition-all focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/20"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="group relative rounded-xl border border-white/10 bg-white/[0.06] p-2.5 text-gray-400 transition-all hover:border-white/20 hover:text-white active:scale-95">
            <Bell className="h-5 w-5" />
            <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-amber-400 border-2 border-black"></span>
          </button>

          <div className="hidden h-8 w-[1px] bg-white/10 sm:block"></div>

          {/* User Profile */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="hidden text-right md:block">
              <p className="text-sm font-black text-white">{session?.name || "Operations"}</p>
              <p className="mt-0.5 text-[11px] font-medium capitalize tracking-wide text-gray-400">
                {session?.role || "Manager"}
              </p>
            </div>
            <div className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center text-sm font-black text-black shadow-lg",
              isAdmin ? "bg-amber-400" : "bg-teal-400"
            )}>
              {session?.name?.slice(0, 1).toUpperCase() || "O"}
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="rounded-xl border border-white/10 bg-white/[0.06] p-2.5 text-red-400 transition-all hover:border-red-500/30 hover:bg-red-500/10 active:scale-95"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
