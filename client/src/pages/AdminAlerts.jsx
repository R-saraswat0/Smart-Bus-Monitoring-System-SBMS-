import { AlertTriangle, Clock3, ShieldAlert, CheckCircle2, Trash2 } from "lucide-react";
import { useData } from "../context/DataContext";
import { useMemo } from "react";

function getSeverityTone(severity) {
  if (severity === "high") return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
  if (severity === "medium") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
}

export default function AdminAlerts() {
  const { alerts: allAlerts, searchQuery, resolveAlert, removeAlert } = useData();

  // Remove Fuel Alert option
  const alerts = useMemo(() => {
    let filtered = allAlerts.filter(a => !a.title.toLowerCase().includes("fuel"));
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(lowerQuery) ||
        a.description.toLowerCase().includes(lowerQuery) ||
        a.busNumber.toLowerCase().includes(lowerQuery)
      );
    }
    return filtered;
  }, [allAlerts, searchQuery]);

  const highSeverityCount = alerts.filter((alert) => alert.severity === "high").length;
  const newestAlertTime = alerts.length > 0 ? alerts[0].time : "N/A";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">Alert Center</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Overcrowding, late arrival, and operational exceptions that need review.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card interactive-card p-6 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-rose-100 dark:bg-rose-900/50 rounded-2xl mb-4">
            <AlertTriangle className="h-8 w-8 text-rose-600 dark:text-rose-400" />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Open alerts</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">{alerts.length}</p>
        </div>
        <div className="glass-card interactive-card p-6 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-amber-100 dark:bg-amber-900/50 rounded-2xl mb-4">
            <ShieldAlert className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">High severity</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">{highSeverityCount}</p>
        </div>
        <div className="glass-card interactive-card p-6 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-sky-100 dark:bg-sky-900/50 rounded-2xl mb-4">
            <Clock3 className="h-8 w-8 text-sky-600 dark:text-sky-400" />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Newest alert</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">{newestAlertTime}</p>
        </div>
      </div>

      <div className="space-y-5">
        {alerts.map((alert) => (
          <div key={alert.id} className="glass-panel p-6 interactive-card border border-white/20 dark:border-white/10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{alert.title}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${getSeverityTone(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300 font-medium">{alert.description}</p>
              </div>
              <div className="glass-card px-5 py-4 text-sm text-slate-600 dark:text-slate-400 min-w-[200px]">
                <p className="flex justify-between"><span>Alert ID:</span> <span className="font-semibold text-slate-900 dark:text-white">{alert.id}</span></p>
                <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
                <p className="flex justify-between"><span>Time:</span> <span className="font-semibold text-slate-900 dark:text-white">{alert.time}</span></p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="rounded-full bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-1.5 border border-white/40 dark:border-white/5 shadow-sm">
                <span className="font-semibold text-slate-500 dark:text-slate-400">Bus:</span> <span className="text-slate-900 dark:text-white font-medium">{alert.busNumber}</span>
              </span>
              <span className="rounded-full bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-1.5 border border-white/40 dark:border-white/5 shadow-sm">
                <span className="font-semibold text-slate-500 dark:text-slate-400">Owner:</span> <span className="text-slate-900 dark:text-white font-medium">{alert.owner}</span>
              </span>
              {alert.resolved ? (
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                  ✓ Resolved
                </span>
              ) : (
                <button
                  onClick={() => resolveAlert(alert.id || alert._id)}
                  className="flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1.5 font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 transition"
                >
                  <CheckCircle2 className="h-4 w-4" /> Mark Resolved
                </button>
              )}
              <button
                onClick={() => removeAlert(alert.id || alert._id)}
                className="flex items-center gap-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 px-4 py-1.5 font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-200 transition ml-auto"
              >
                <Trash2 className="h-4 w-4" /> Dismiss
              </button>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="p-12 text-center glass-panel">
            <ShieldAlert className="h-12 w-12 mx-auto text-emerald-500 mb-4 opacity-80" />
            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300">All clear</h3>
            <p className="mt-2 text-muted-foreground">No active alerts require attention right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
