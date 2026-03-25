export function StatCard({ title, value, change, trend, icon: Icon, gradient }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mb-2 text-3xl font-semibold text-slate-950">{value}</h3>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-semibold ${trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
              {trend === "up" ? "Up" : "Down"} {change}
            </span>
            <span className="text-sm text-slate-500">compared with the previous period</span>
          </div>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${gradient} shadow-lg`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
    </div>
  );
}
