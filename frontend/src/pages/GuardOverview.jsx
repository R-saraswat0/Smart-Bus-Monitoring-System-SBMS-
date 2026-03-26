import { CheckCircle2, ClipboardList, Shield, TimerReset, User } from "lucide-react";
import { Link } from "react-router-dom";
import { guardProfile, quickActions } from "../data/sbmsData";
import { useData } from "../context/DataContext";

export default function GuardOverview() {
  const { guards } = useData();
  const currentGuard = guards.find((guard) => guard.id === guardProfile.id) ?? guards[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">Guard Overview</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Shift details, quick actions, and the most important gate-side tasks.</p>
        </div>
        <Link 
          to="/guard/log-entry"
          className="glass-button px-6 py-3 flex items-center gap-2"
        >
          Create a new log
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass-card p-8 border border-white/20 dark:border-white/10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 shadow-inner border border-teal-200/50 dark:border-teal-800/50">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">Current guard</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{currentGuard?.name || guardProfile.name}</h3>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/40 dark:bg-slate-800/40 p-5 border border-white/30 dark:border-white/5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Assigned gate</p>
              <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{currentGuard?.gate || guardProfile.gate}</p>
            </div>
            <div className="rounded-2xl bg-white/40 dark:bg-slate-800/40 p-5 border border-white/30 dark:border-white/5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Shift</p>
              <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{currentGuard?.shift || guardProfile.shift}</p>
            </div>
            <div className="rounded-2xl bg-white/40 dark:bg-slate-800/40 p-5 border border-white/30 dark:border-white/5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Logs today</p>
              <p className="mt-2 text-3xl font-bold text-teal-600 dark:text-teal-400">{currentGuard?.logsToday || 0}</p>
            </div>
            <div className="rounded-2xl bg-white/40 dark:bg-slate-800/40 p-5 border border-white/30 dark:border-white/5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">ID Status</p>
              <p className={`mt-2 text-sm font-bold uppercase tracking-wider px-3 py-1 inline-block rounded-lg mt-3 ${currentGuard?.status === 'active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-200 text-slate-700"}`}>
                {currentGuard?.status || "active"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {quickActions.map((action) => (
            <div key={action.title} className="glass-card interactive-card p-6 flex flex-col items-start border border-white/20 dark:border-white/10 shadow-sm">
              <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-xl">
                <ClipboardList className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{action.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 flex-1">{action.description}</p>
              <Link 
                to={action.href}
                className="mt-6 w-full text-center px-4 py-2 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 border border-white/40 dark:border-white/10 rounded-xl font-semibold text-slate-800 dark:text-slate-200 transition"
              >
                Open Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card interactive-card p-6 border border-white/20 dark:border-white/10 text-center flex flex-col justify-center items-center">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
            <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Recent compliance</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">98%</p>
        </div>
        <div className="glass-card interactive-card p-6 border border-white/20 dark:border-white/10 text-center flex flex-col justify-center items-center">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl mb-4">
            <TimerReset className="h-7 w-7 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Avg logging time</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">24 sec</p>
        </div>
        <div className="glass-card interactive-card p-6 border border-white/20 dark:border-white/10 text-center flex flex-col justify-center items-center">
          <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-2xl mb-4">
            <Shield className="h-7 w-7 text-sky-600 dark:text-sky-400" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Events raised</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">1</p>
        </div>
      </div>
    </div>
  );
}
