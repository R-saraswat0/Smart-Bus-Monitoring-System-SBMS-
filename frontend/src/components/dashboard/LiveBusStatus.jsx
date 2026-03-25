import { Clock, MapPin, Users } from "lucide-react";

export function LiveBusStatus({ buses }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "on-campus":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "overcrowded":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getOccupancyColor = (occupancy, capacity) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage > 100) return "text-rose-600";
    if (percentage > 80) return "text-amber-600";
    return "text-emerald-600";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">Live Bus Status</h3>
          <p className="mt-1 text-sm text-slate-500">Buses currently tracked inside the campus perimeter.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium text-slate-600">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {buses.map((bus) => (
          <div
            key={bus.busNumber}
            className={`rounded-2xl border p-4 transition hover:shadow-md ${
              bus.status === "overcrowded" ? "border-rose-200 bg-rose-50/50" : "border-slate-200 bg-slate-50/70"
            }`}
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-950">{bus.busNumber}</h4>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusColor(bus.status)}`}>
                    {bus.status === "overcrowded" ? "Overcrowded" : "Active"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{bus.route}</p>
              </div>
              <span className={`text-sm font-semibold ${getOccupancyColor(bus.occupancy, bus.capacity)}`}>
                {bus.occupancy}/{bus.capacity}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-3">
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

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
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
