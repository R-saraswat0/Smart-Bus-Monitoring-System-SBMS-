import { AlertTriangle, Clock3, ShieldAlert } from "lucide-react";
import { useData } from "../context/DataContext";
import { useMemo } from "react";

function getSeverityTone(severity) {
  if (severity === "high") return "bg-rose-500/10 text-rose-300";
  if (severity === "medium") return "bg-amber-500/10 text-amber-300";
  return "bg-white/10 text-gray-300";
}

export default function AdminAlerts() {
  const { alerts: allAlerts } = useData();

  // Remove Fuel Alert option
  const alerts = useMemo(() => {
    return allAlerts.filter(a => !a.title.toLowerCase().includes("fuel"));
  }, [allAlerts]);

  const highSeverityCount = alerts.filter((alert) => alert.severity === "high").length;
  const newestAlertTime = alerts.length > 0 ? alerts[0].time : "N/A";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Alert Center</h2>
        <p className="mt-2 text-gray-400">Overcrowding, late arrival, and operational exceptions that need review.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card interactive-card p-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-2xl bg-rose-500/10 p-4">
            <AlertTriangle className="h-8 w-8 text-rose-300" />
          </div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">Open alerts</p>
          <p className="mt-2 text-4xl font-bold text-white">{alerts.length}</p>
        </div>
        <div className="glass-card interactive-card p-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-2xl bg-amber-500/10 p-4">
            <ShieldAlert className="h-8 w-8 text-amber-300" />
          </div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">High severity</p>
          <p className="mt-2 text-4xl font-bold text-white">{highSeverityCount}</p>
        </div>
        <div className="glass-card interactive-card p-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-2xl bg-cyan-500/10 p-4">
            <Clock3 className="h-8 w-8 text-cyan-300" />
          </div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">Newest alert</p>
          <p className="mt-2 text-4xl font-bold text-white">{newestAlertTime}</p>
        </div>
      </div>

      <div className="space-y-5">
        {alerts.map((alert) => (
          <div key={alert.id} className="glass-panel p-6 interactive-card border border-white/20 dark:border-white/10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">{alert.title}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${getSeverityTone(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl font-medium text-gray-300">{alert.description}</p>
              </div>
              <div className="glass-card min-w-[200px] px-5 py-4 text-sm text-gray-400">
                <p className="flex justify-between"><span>Alert ID:</span> <span className="font-semibold text-white">{alert.id}</span></p>
                <div className="my-2 h-px w-full bg-white/10"></div>
                <p className="flex justify-between"><span>Time:</span> <span className="font-semibold text-white">{alert.time}</span></p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-4 text-sm text-gray-300">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 shadow-sm">
                <span className="font-semibold text-gray-400">Bus:</span> <span className="font-medium text-white">{alert.busNumber}</span>
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 shadow-sm">
                <span className="font-semibold text-gray-400">Owner:</span> <span className="font-medium text-white">{alert.owner}</span>
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 font-semibold text-amber-300 shadow-sm">
                Status: pending review
              </span>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="p-12 text-center glass-panel">
            <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-emerald-400 opacity-80" />
            <h3 className="text-xl font-medium text-gray-200">All clear</h3>
            <p className="mt-2 text-gray-400">No active alerts require attention right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
