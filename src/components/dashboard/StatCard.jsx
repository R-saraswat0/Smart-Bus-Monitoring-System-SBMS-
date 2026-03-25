export function StatCard({ title, value, icon: Icon, gradient }) {
  return (
    <div className="glass-card interactive-card p-6 flex flex-col justify-between gap-6 relative group overflow-visible">
      <div className="hover-glow z-0"></div>
      <div className={`absolute -inset-0.5 ${gradient} rounded-[2rem] opacity-0 group-hover:opacity-30 transition duration-700 blur-xl pointer-events-none`}></div>
      <div className="flex items-center justify-between relative z-10 w-full">
        <div>
          <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{title}</p>
          <h3 className="mt-2 text-5xl font-extrabold bg-gradient-to-br from-slate-900 to-slate-500 bg-clip-text text-transparent dark:from-white dark:to-slate-300 drop-shadow-sm">{value}</h3>
        </div>
        <div className={`flex h-20 w-20 items-center justify-center rounded-[2rem] ${gradient} shadow-[0_15px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:-translate-y-2`}>
          {Icon && <Icon className="h-10 w-10 text-white drop-shadow-lg" />}
        </div>
      </div>
    </div>
  );
}
