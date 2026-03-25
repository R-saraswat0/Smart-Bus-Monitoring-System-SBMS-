import { Bus, Shield, AlertTriangle, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MainHeader() {
  const { session } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/30 bg-gradient-to-r from-white/90 via-blue-50/50 to-cyan-50/30 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950/95 backdrop-blur-xl dark:border-cyan-400/10 shadow-sm transition-all duration-300">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-600 text-white shadow-lg shadow-cyan-500/40 dark:shadow-cyan-400/30 group-hover:shadow-cyan-500/60 transform transition-transform group-hover:scale-110">
            <Bus className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-teal-600 dark:text-cyan-400">Campus Mobility</p>
            <p className="text-lg font-bold bg-gradient-to-r from-slate-900 to-teal-700 dark:from-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">SBMS</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-400 md:flex">
          <Link className="transition hover:text-cyan-600 dark:hover:text-cyan-400 relative group" to="#overview">
            Overview
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link className="transition hover:text-cyan-600 dark:hover:text-cyan-400 relative group" to="#modules">
            Modules
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link className="transition hover:text-cyan-600 dark:hover:text-cyan-400 relative group" to="#activity">
            Activity
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link className="transition hover:text-cyan-600 dark:hover:text-cyan-400 relative group flex items-center gap-1" to="/admin/reports">
            <BarChart3 className="h-4 w-4" />
            Reports
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link className="transition hover:text-rose-600 dark:hover:text-rose-400 relative group flex items-center gap-1" to="/admin/alerts">
            <AlertTriangle className="h-4 w-4" />
            Alerts
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={session?.role === "guard" ? "/guard" : "/login/guard"}
            className="hidden sm:inline-flex items-center rounded-xl border border-slate-300 dark:border-cyan-400/30 px-4 py-2 text-sm font-semibold text-slate-800 dark:text-cyan-300 hover:bg-blue-100/50 dark:hover:bg-cyan-900/20 hover:border-cyan-400 dark:hover:border-cyan-400/60 transition-all hover:shadow-md"
          >
            <Shield className="h-4 w-4 mr-1.5" />
            Guard Panel
          </Link>
          <Link
            to={session?.role === "admin" ? "/admin" : "/login/admin"}
            className="glass-button inline-flex items-center"
          >
            <BarChart3 className="h-4 w-4 mr-1.5" />
            Admin Module
          </Link>
        </div>
      </div>
    </header>
  );
}
