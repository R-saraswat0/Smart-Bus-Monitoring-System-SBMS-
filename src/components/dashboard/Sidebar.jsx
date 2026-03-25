import { Link, useLocation } from "react-router-dom";

export function Sidebar({ brandLabel, brandTitle, brandIcon: BrandIcon, items }) {
  const location = useLocation();

  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200/30 bg-gradient-to-b from-white/90 via-blue-50/40 to-cyan-50/30 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950/95 dark:border-cyan-400/10 xl:flex shadow-xl dark:shadow-cyan-400/5 transition-all duration-300">
      <div className="flex h-20 items-center border-b border-slate-200/30 dark:border-cyan-400/10 px-6 bg-gradient-to-r from-white/80 via-blue-50/50 to-cyan-50/40 dark:from-slate-900/90 dark:to-slate-900/70">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 dark:from-cyan-400 dark:to-emerald-500 text-white shadow-lg shadow-cyan-500/30 dark:shadow-cyan-400/20 transform transition-transform hover:scale-105">
          {BrandIcon && <BrandIcon className="h-5 w-5" />}
        </div>
        <div className="ml-3">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600 dark:text-cyan-400">{brandLabel}</p>
          <p className="text-lg font-bold text-slate-950 dark:text-slate-100">{brandTitle}</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-3">
          {items.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={`flex items-center rounded-2xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-600 dark:from-cyan-500 dark:to-emerald-600 text-white shadow-lg shadow-cyan-500/30 dark:shadow-cyan-400/25 transform scale-105"
                      : "text-slate-600 dark:text-slate-400 hover:bg-blue-100/50 dark:hover:bg-cyan-900/20 hover:text-slate-950 dark:hover:text-cyan-300 hover:translate-x-1 hover:shadow-sm"
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3 font-semibold text-sm">{item.label}</span>
                  {isActive && <div className="ml-auto h-2 w-2 bg-white rounded-full shadow-lg shadow-white/50"></div>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-200/30 dark:border-cyan-400/10 p-4 bg-gradient-to-t from-cyan-50/40 via-white/60 to-white/90 dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-900/70">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center font-semibold uppercase tracking-wider">v1.0 • SBMS</p>
      </div>
    </aside>
  );
}
