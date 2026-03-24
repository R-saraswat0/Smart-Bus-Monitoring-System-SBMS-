import { AlertTriangle, Clock3, ShieldAlert } from "lucide-react";
import { alerts } from "../data/sbmsData";

function getSeverityTone(severity) {
  if (severity === "high") return "bg-rose-100 text-rose-700";
  if (severity === "medium") return "bg-amber-100 text-amber-700";
  return "bg-slate-100 text-slate-700";
}

export default function AdminAlerts() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Alert Center</h2>
        <p className="mt-2 text-slate-600">Overcrowding, late arrival, and operational exceptions that need review.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
          <p className="mt-4 text-sm text-slate-500">Open alerts</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{alerts.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ShieldAlert className="h-5 w-5 text-amber-600" />
          <p className="mt-4 text-sm text-slate-500">High severity</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{alerts.filter((alert) => alert.severity === "high").length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Clock3 className="h-5 w-5 text-sky-600" />
          <p className="mt-4 text-sm text-slate-500">Newest alert</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{alerts[0].time}</p>
        </div>
      </div>

      <div className="space-y-5">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-slate-950">{alert.title}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityTone(alert.severity)}`}>{alert.severity}</span>
                </div>
                <p className="mt-3 max-w-3xl text-slate-600">{alert.description}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <p>Alert ID: {alert.id}</p>
                <p className="mt-1">Time: {alert.time}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">Bus: {alert.busNumber}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Owner: {alert.owner}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Status: pending review</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
