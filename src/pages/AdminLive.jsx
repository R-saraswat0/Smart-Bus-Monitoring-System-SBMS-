import { MapPin, Bus, ShieldAlert } from "lucide-react";
import { useData } from "../context/DataContext";

const statusStyles = {
  "on-campus": "bg-emerald-100 text-emerald-700",
  departed: "bg-slate-100 text-slate-700",
  late: "bg-amber-100 text-amber-700",
  overcrowded: "bg-rose-100 text-rose-700",
  "maintenance-due": "bg-rose-100 text-rose-700",
  standby: "bg-blue-100 text-blue-700",
  active: "bg-teal-100 text-teal-700",
};

export default function AdminLive() {
  const { buses, logs, alerts } = useData();

  const busLatestInfo = buses.map((bus) => {
    const busLog = logs.find((log) => log.busNumber === bus.busNumber);
    return {
      ...bus,
      occupancy: busLog?.occupancy ?? Math.max(1, Math.min(bus.capacity - 1, Math.floor(bus.capacity * 0.7))),
      status: bus.status || (busLog?.status ?? "active"),
      lastUpdate: busLog?.time ?? "--",
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">Live Bus Tracker</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Real-time view of active buses with overcrowding and delay insights.</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-amber-50 px-4 py-2 text-sm text-amber-700">
          {alerts.length} active alerts in the system
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {busLatestInfo.map((bus) => (
          <article key={bus.busNumber} className="glass-card interactive-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">{bus.busNumber}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[bus.status] ?? "bg-slate-100 text-slate-700"}`}>
                {bus.status.replace(/-/g, " ")}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">{bus.route}</p>
            <div className="mt-4 grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Driver</span>
                <span>{bus.driver || "unassigned"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Occupancy</span>
                <span>{bus.occupancy}/{bus.capacity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Last log</span>
                <span>{bus.lastUpdate}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                {bus.location ?? "Gate area"}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
              <ShieldAlert className="h-4 w-4" />
              {bus.status === "overcrowded" ? "Capacity breach requires immediate supervision" : "No critical exceptions"}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
