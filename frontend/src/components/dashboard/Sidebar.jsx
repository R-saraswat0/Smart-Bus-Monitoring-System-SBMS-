import { Link, useLocation } from "react-router-dom";

export function Sidebar({ brandLabel, brandTitle, brandIcon: BrandIcon, items }) {
  const location = useLocation();

  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white xl:flex">
      <Link 
        to="/"
        className="flex h-20 items-center border-b border-slate-200 px-6 transition hover:bg-slate-50 cursor-pointer"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
          <BrandIcon className="h-5 w-5" />
        </div>
        <div className="ml-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">{brandLabel}</p>
          <p className="text-lg font-semibold text-slate-950">{brandTitle}</p>
        </div>
      </Link>

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
  );
}
