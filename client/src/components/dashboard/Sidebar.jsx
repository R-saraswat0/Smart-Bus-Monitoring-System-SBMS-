import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils"; // Assuming utils for joining classes

export function Sidebar({ brandLabel, brandTitle, brandIcon: BrandIcon, items }) {
  const location = useLocation();
  const isAdmin = brandTitle.toLowerCase().includes("admin");

  return (
    <aside className="hidden w-72 flex-col border-r border-white/10 bg-[#050505] xl:flex">
      {/* Brand Header */}
      <div className="flex h-24 items-center px-8 border-b border-white/5">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl text-black shadow-lg transition-transform hover:scale-105",
          isAdmin ? "bg-amber-400 gold-glow" : "bg-teal-400 teal-glow"
        )}>
          {BrandIcon && <BrandIcon className="h-6 w-6" />}
        </div>
        <div className="ml-4">
          <p className={cn(
            "text-[11px] font-semibold tracking-[0.2em]",
            isAdmin ? "text-amber-400" : "text-teal-400"
          )}>{brandLabel}</p>
          <p className="text-lg font-bold leading-tight text-white">{brandTitle}</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-8 overflow-y-auto">
        <ul className="space-y-3">
          {items.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={cn(
                    "group flex items-center rounded-2xl px-5 py-4 transition-all duration-300",
                    isActive
                      ? (isAdmin ? "bg-amber-400 text-black font-black" : "bg-teal-400 text-black font-black")
                      : "text-gray-400 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-black" : "group-hover:text-white"
                  )} />
                  <span className="ml-4 text-sm tracking-wide">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 bg-black rounded-full"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 p-6 bg-black/40">
        <p className="text-[10px] text-gray-600 text-center font-black uppercase tracking-widest">
          SBMS Premium • 2026
        </p>
      </div>
    </aside>
  );
}
