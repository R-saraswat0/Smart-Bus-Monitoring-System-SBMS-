export function StatCard({ title, value, icon: Icon, gradient }) {
  return (
    <div className="glass-card interactive-card relative flex flex-col justify-between gap-6 overflow-visible p-6 group">
      <div className="hover-glow z-0"></div>
      <div className={`absolute -inset-0.5 ${gradient} rounded-[2rem] opacity-0 group-hover:opacity-30 transition duration-700 blur-xl pointer-events-none`}></div>
      <div className="relative z-10 flex w-full items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">{title}</p>
          <h3 className="mt-2 text-5xl font-extrabold text-white drop-shadow-sm">{value}</h3>
        </div>
        <div className={`flex h-20 w-20 items-center justify-center rounded-[2rem] ${gradient} shadow-[0_15px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[15deg] group-hover:scale-110`}>
          {Icon && <Icon className="h-10 w-10 text-white drop-shadow-lg" />}
        </div>
      </div>
    </div>
  );
}
