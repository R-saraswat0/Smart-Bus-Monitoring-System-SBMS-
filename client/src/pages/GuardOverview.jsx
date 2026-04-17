import { CheckCircle2, ClipboardList, Shield, TimerReset } from "lucide-react";
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
          <h2 className="text-3xl font-bold tracking-tight text-white">Guard Overview</h2>
          <p className="mt-2 text-gray-400">Shift details, quick actions, and the most important gate-side tasks.</p>
        </div>
        <Link 
          to="/guard/log-entry"
          className="glass-button px-6 py-3 flex items-center gap-2"
        >
          Create a new log
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="glass-card border-white/10 p-7 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-500/20 bg-teal-500/10 text-teal-300 shadow-inner">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-300">Current guard</p>
              <h3 className="mt-1 text-3xl font-bold text-white">{currentGuard?.name || guardProfile.name}</h3>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Assigned gate</p>
              <p className="mt-2 text-xl font-bold text-white">{currentGuard?.gate || guardProfile.gate}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Shift</p>
              <p className="mt-2 text-xl font-bold text-white">{currentGuard?.shift || guardProfile.shift}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Logs today</p>
              <p className="mt-2 text-3xl font-bold text-teal-300">{currentGuard?.logsToday || 0}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">ID Status</p>
              <p className={`mt-3 inline-block rounded-lg px-3 py-1 text-sm font-bold uppercase tracking-wider ${currentGuard?.status === 'active' ? "bg-emerald-500/10 text-emerald-300" : "bg-white/10 text-gray-300"}`}>
                {currentGuard?.status || "active"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {quickActions.map((action) => (
            <div key={action.title} className="glass-card interactive-card flex flex-col items-start border-white/10 p-6 shadow-sm">
              <div className="rounded-xl bg-teal-500/10 p-3">
                <ClipboardList className="h-6 w-6 text-teal-300" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{action.title}</h3>
              <p className="mt-2 flex-1 text-sm text-gray-400">{action.description}</p>
              <Link 
                to={action.href}
                className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-center font-semibold text-white transition hover:bg-white/[0.12]"
              >
                Open Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="glass-card interactive-card flex flex-col items-center justify-center border-white/10 p-6 text-center">
          <div className="mb-4 rounded-2xl bg-emerald-500/10 p-3">
            <CheckCircle2 className="h-7 w-7 text-emerald-300" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Recent compliance</p>
          <p className="mt-2 text-4xl font-bold text-white">98%</p>
        </div>
        <div className="glass-card interactive-card flex flex-col items-center justify-center border-white/10 p-6 text-center">
          <div className="mb-4 rounded-2xl bg-amber-500/10 p-3">
            <TimerReset className="h-7 w-7 text-amber-300" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Avg logging time</p>
          <p className="mt-2 text-4xl font-bold text-white">24 sec</p>
        </div>
        <div className="glass-card interactive-card flex flex-col items-center justify-center border-white/10 p-6 text-center">
          <div className="mb-4 rounded-2xl bg-sky-500/10 p-3">
            <Shield className="h-7 w-7 text-sky-300" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Events raised</p>
          <p className="mt-2 text-4xl font-bold text-white">1</p>
        </div>
      </div>
    </div>
  );
}
