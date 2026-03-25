import { Bell, Mail, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function TopNav({ title, subtitle }) {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/30 dark:border-cyan-400/10 bg-gradient-to-r from-white/80 via-blue-50/50 to-cyan-50/30 dark:from-slate-900/90 dark:via-slate-900/85 dark:to-slate-950/90 px-6 py-5 shadow-sm backdrop-blur-xl dark:shadow-cyan-400/5 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex-1">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-600 dark:text-cyan-400 animate-pulse">{title}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-teal-700 to-slate-600 dark:from-cyan-300 dark:via-teal-300 dark:to-slate-300 bg-clip-text text-transparent">{subtitle}</h1>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative hidden w-full max-w-lg lg:block group">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition" />
            <input
              type="text"
              placeholder="Search buses, routes, guards, or alerts..."
              className="glass-input w-full"
            />
          </div>

          <button className="relative rounded-2xl p-3 text-slate-600 dark:text-slate-300 transition-all hover:bg-blue-100/60 dark:hover:bg-cyan-900/30 hover:text-slate-950 dark:hover:text-cyan-300 hover:scale-110 group">
            <div className="absolute inset-0 bg-blue-500/0 rounded-2xl group-hover:bg-blue-500/10 transition"></div>
            <Mail className="h-5 w-5 relative" />
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-pulse" />
          </button>

          <button className="relative rounded-2xl p-3 text-slate-600 dark:text-slate-300 transition-all hover:bg-rose-100/60 dark:hover:bg-rose-900/30 hover:text-slate-950 dark:hover:text-rose-400 hover:scale-110 group">
            <div className="absolute inset-0 bg-rose-500/0 rounded-2xl group-hover:bg-rose-500/10 transition"></div>
            <Bell className="h-5 w-5 relative" />
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50 animate-pulse" />
          </button>

          <div className="flex items-center gap-4 border-l border-slate-200/30 dark:border-cyan-400/10 pl-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-950 dark:text-slate-200">{session?.name ?? "Campus Operations"}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{session?.title ?? "Smart Bus Monitoring System"}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 dark:from-cyan-400 dark:to-teal-400 text-sm font-bold text-white shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/60 transform transition-transform hover:scale-110">
              {session?.name?.slice(0, 2).toUpperCase() ?? "SB"}
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="hidden sm:block rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
