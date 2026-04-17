import { Clock, MapPin, Users } from "lucide-react";

export function LiveBusStatus({ buses }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "on-campus":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
      case "overcrowded":
        return "bg-rose-500/10 text-rose-300 border-rose-500/30";
      default:
        return "bg-white/10 text-gray-200 border-white/20";
    }
  };

  const getOccupancyColor = (occupancy, capacity) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage > 100) return "text-rose-300";
    if (percentage > 80) return "text-amber-300";
    return "text-emerald-300";
  };

  return (
    <div className="glass-panel p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Live Bus Status</h3>
          <p className="mt-1 text-sm text-gray-400">Buses currently tracked inside the campus perimeter.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium text-gray-300">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {buses.map((bus) => (
          <div
            key={bus.busNumber}
            className={`rounded-2xl border p-4 transition hover:shadow-md ${
              bus.status === "overcrowded" ? "border-rose-500/20 bg-rose-500/[0.08]" : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-white">{bus.busNumber}</h4>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusColor(bus.status)}`}>
                    {bus.status === "overcrowded" ? "Overcrowded" : "Active"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-400">{bus.route}</p>
              </div>
              <span className={`text-sm font-semibold ${getOccupancyColor(bus.occupancy, bus.capacity)}`}>
                {bus.occupancy}/{bus.capacity}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 text-sm text-gray-300 sm:grid-cols-3">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{bus.guard}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{bus.entryTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{bus.location}</span>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full ${
                  bus.occupancy > bus.capacity
                    ? "bg-rose-500"
                    : bus.occupancy / bus.capacity > 0.8
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min((bus.occupancy / bus.capacity) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
