import { MapPin, Bus, ShieldAlert } from "lucide-react";
import { useData } from "../context/DataContext";

const statusStyles = {
  "on-campus": "bg-emerald-500/10 text-emerald-300",
  departed: "bg-white/10 text-gray-300",
  late: "bg-amber-500/10 text-amber-300",
  overcrowded: "bg-rose-500/10 text-rose-300",
  "maintenance-due": "bg-rose-500/10 text-rose-300",
  standby: "bg-blue-500/10 text-blue-300",
  active: "bg-teal-500/10 text-teal-300",
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
          <h2 className="text-3xl font-bold text-white">Live Bus Tracker</h2>
          <p className="mt-2 text-gray-400">Real-time view of active buses with overcrowding and delay insights.</p>
        </div>
        <div className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
          {alerts.length} active alerts in the system
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {busLatestInfo.map((bus) => (
          <article key={bus.busNumber} className="glass-card interactive-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{bus.busNumber}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[bus.status] ?? "bg-white/10 text-gray-300"}`}>
                {bus.status.replace(/-/g, " ")}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">{bus.route}</p>
            <div className="mt-4 grid gap-2 text-sm text-gray-300">
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
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin className="h-3.5 w-3.5" />
                {bus.location ?? "Gate area"}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-300">
              <ShieldAlert className="h-4 w-4" />
              {bus.status === "overcrowded" ? "Capacity breach requires immediate supervision" : "No critical exceptions"}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
