import { CheckCircle2, ClipboardList, Shield, TimerReset } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { guardProfile, guards, quickActions } from "../data/sbmsData";

export default function GuardOverview() {
  const currentGuard = guards.find((guard) => guard.id === guardProfile.id) ?? guards[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Guard Overview</h2>
          <p className="mt-2 text-slate-600">Shift details, quick actions, and the most important gate-side tasks.</p>
        </div>
        <Button asChild className="bg-slate-900 text-white hover:bg-slate-800">
          <Link to="/guard/log-entry">Create a new log</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-800">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Current guard</p>
              <h3 className="text-2xl font-semibold text-slate-950">{guardProfile.name}</h3>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Assigned gate</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{guardProfile.gate}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Shift</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{guardProfile.shift}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Logs today</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{currentGuard.logsToday}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Supervisor</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{guardProfile.supervisor}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {quickActions.map((action) => (
            <div key={action.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ClipboardList className="h-5 w-5 text-teal-700" />
              <h3 className="mt-4 text-xl font-semibold text-slate-950">{action.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{action.description}</p>
              <Button asChild variant="outline" className="mt-5 border-slate-300 text-slate-800 hover:bg-slate-50">
                <Link to={action.href}>Open</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <p className="mt-4 text-sm text-slate-500">Recent compliance</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">98%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <TimerReset className="h-5 w-5 text-amber-600" />
          <p className="mt-4 text-sm text-slate-500">Average entry time</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">24 sec</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Shield className="h-5 w-5 text-sky-600" />
          <p className="mt-4 text-sm text-slate-500">Escalations this shift</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">1</p>
        </div>
      </div>
    </div>
  );
}
