import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

export function Sidebar({ brandLabel, brandTitle, brandIcon: BrandIcon, items, isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm xl:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 xl:static xl:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6 transition hover:bg-slate-50">
          <div 
            className="flex items-center gap-3 cursor-default"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
              <BrandIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">{brandLabel}</p>
              <p className="text-lg font-semibold text-slate-950">{brandTitle}</p>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 xl:hidden cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={`flex items-center rounded-2xl px-4 py-3 transition ${
                    isActive
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-900/15"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3 font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      </aside>
    </>
  );
}
