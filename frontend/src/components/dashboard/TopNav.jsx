import { Bell, Mail, Search, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

export function TopNav({ title, subtitle, onMenuClick }) {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useData();

  const isAdmin = location.pathname.startsWith("/admin");
  const basePath = isAdmin ? "/admin" : "/guard";

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="xl:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">{title}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{subtitle}</h1>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative hidden w-full max-w-xl lg:block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search buses, routes, guards, or alerts"
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
            />
          </div>

          <button 
            onClick={() => navigate(`${basePath}/messages`)}
            className="relative rounded-2xl p-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <Mail className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-sky-500" />
          </button>

          <button 
            onClick={() => isAdmin ? navigate("/admin/alerts") : null}
            className={`relative rounded-2xl p-3 transition ${isAdmin ? "text-slate-600 hover:bg-slate-100 hover:text-slate-950 cursor-pointer" : "text-slate-400 cursor-default"}`}
          >
            <Bell className="h-5 w-5" />
            {isAdmin && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />}
          </button>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold text-slate-950">{session?.name ?? "Campus Operations"}</p>
              <p className="text-xs text-slate-500">{session?.title ?? "Smart Bus Monitoring System"}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-teal-700 text-sm font-semibold text-white shadow-lg shadow-slate-900/15">
              {session?.name?.slice(0, 2).toUpperCase() ?? "SB"}
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
