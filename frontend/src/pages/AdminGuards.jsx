import { BadgeCheck, Clock3, Shield, Users } from "lucide-react";
import { guards } from "../data/sbmsData";

export default function AdminGuards() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Guard Management</h2>
        <p className="mt-2 text-slate-600">Shift coverage, recent logging activity, and guard assignment visibility.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Users className="h-5 w-5 text-teal-700" />
          <p className="mt-4 text-sm text-slate-500">Active guards</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{guards.filter((guard) => guard.status === "active").length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Clock3 className="h-5 w-5 text-teal-700" />
          <p className="mt-4 text-sm text-slate-500">Morning shift</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{guards.filter((guard) => guard.shift === "Morning Shift").length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <BadgeCheck className="h-5 w-5 text-teal-700" />
          <p className="mt-4 text-sm text-slate-500">Logs submitted today</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{guards.reduce((sum, guard) => sum + guard.logsToday, 0)}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {guards.map((guard) => (
          <div key={guard.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-950">{guard.name}</h3>
                <p className="mt-1 text-slate-600">{guard.gate}</p>
                <p className="mt-1 text-sm text-slate-500">{guard.id}</p>
              </div>
              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${guard.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                {guard.status}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Shift</p>
                <p className="mt-2 font-semibold text-slate-950">{guard.shift}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Logs today</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">{guard.logsToday}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Last activity</p>
                <p className="mt-2 font-semibold text-slate-950">{guard.lastActivity}</p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-teal-50 p-4 text-sm text-teal-800">
              <Shield className="h-4 w-4" />
              Guard is assigned to monitored campus transport operations.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
