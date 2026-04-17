import { useState } from "react";
import { Download, Filter } from "lucide-react";

export function LogHistoryTable({ logs }) {
  const [filterType, setFilterType] = useState("all");
  const [searchBus, setSearchBus] = useState("");
  const [searchGuard, setSearchGuard] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "on-time":
        return "bg-emerald-500/10 text-emerald-300";
      case "late":
        return "bg-amber-500/10 text-amber-300";
      case "overcrowded":
        return "bg-rose-500/10 text-rose-300";
      default:
        return "bg-white/10 text-gray-300";
    }
  };

  const getTypeColor = (type) => {
    return type === "entry" ? "bg-cyan-500/10 text-cyan-300" : "bg-violet-500/10 text-violet-300";
  };

  const filteredLogs = logs.filter((log) => {
    const matchesType = filterType === "all" || log.type === filterType;
    const matchesBus = searchBus === "" || log.busNumber.toLowerCase().includes(searchBus.toLowerCase());
    const matchesGuard = searchGuard === "" || log.guard.toLowerCase().includes(searchGuard.toLowerCase());
    return matchesType && matchesBus && matchesGuard;
  });

  return (
    <div className="glass-panel p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Log History</h3>
          <p className="mt-1 text-sm text-gray-400">Filterable entry and exit records for operational review.</p>
        </div>
        <button className="glass-button flex items-center gap-2 px-4 py-2 text-sm">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Filters</span>
        </div>

        <select
          value={filterType}
          onChange={(event) => setFilterType(event.target.value)}
          className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-sm text-white outline-none focus:border-teal-400"
        >
          <option value="all">All Types</option>
          <option value="entry">Entry Only</option>
          <option value="exit">Exit Only</option>
        </select>

        <input
          type="text"
          placeholder="Bus Number"
          value={searchBus}
          onChange={(event) => setSearchBus(event.target.value)}
          className="w-36 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-sm text-white outline-none focus:border-teal-400"
        />

        <input
          type="text"
          placeholder="Guard Name"
          value={searchGuard}
          onChange={(event) => setSearchGuard(event.target.value)}
          className="w-44 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-sm text-white outline-none focus:border-teal-400"
        />

        {(filterType !== "all" || searchBus || searchGuard) && (
          <button
            onClick={() => {
              setFilterType("all");
              setSearchBus("");
              setSearchGuard("");
            }}
            className="rounded-lg px-3 py-1.5 text-sm text-teal-300 transition hover:bg-teal-500/10"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Log ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Bus Number</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Guard Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Gate</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Occupancy</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className={`border-b border-slate-100 dark:border-slate-800 transition hover:bg-slate-50/50 dark:hover:bg-slate-800/30 ${
                  log.status === "late" || log.status === "overcrowded" ? "bg-rose-500/[0.06]" : ""
                }`}
              >
                <td className="px-4 py-4 text-sm font-medium text-white">{log.id}</td>
                <td className="px-4 py-4 text-sm font-semibold text-cyan-300">{log.busNumber}</td>
                <td className="px-4 py-4 text-sm text-gray-200">{log.guard}</td>
                <td className="px-4 py-4">
                  <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${getTypeColor(log.type)}`}>
                    {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="text-sm font-medium text-white">{log.time}</div>
                    <div className="text-xs text-gray-400">{log.date}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">{log.gate}</td>
                <td className="px-4 py-4 text-sm font-medium text-white">
                  {log.occupancy}/{log.capacity}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${getStatusColor(log.status)}`}>
                    {log.status === "on-time" ? "On Time" : log.status === "late" ? "Late" : "Overcrowded"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLogs.length === 0 && <div className="py-8 text-center text-gray-400">No logs found for the current filters.</div>}
    </div>
  );
}
