import { useState } from "react";
import { Download, Filter } from "lucide-react";

export function LogHistoryTable({ logs }) {
  const [filterType, setFilterType] = useState("all");
  const [searchBus, setSearchBus] = useState("");
  const [searchGuard, setSearchGuard] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "on-time":
        return "bg-emerald-100 text-emerald-700";
      case "late":
        return "bg-amber-100 text-amber-700";
      case "overcrowded":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getTypeColor = (type) => {
    return type === "entry" ? "bg-sky-100 text-sky-700" : "bg-violet-100 text-violet-700";
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
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Log History</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Filterable entry and exit records for operational review.</p>
        </div>
        <button className="glass-button flex items-center gap-2 px-4 py-2 text-sm">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 p-4 border border-white/30 dark:border-white/5">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filters</span>
        </div>

        <select
          value={filterType}
          onChange={(event) => setFilterType(event.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm outline-none focus:border-teal-500 text-slate-900 dark:text-white"
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
          className="w-36 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm outline-none focus:border-teal-500 text-slate-900 dark:text-white"
        />

        <input
          type="text"
          placeholder="Guard Name"
          value={searchGuard}
          onChange={(event) => setSearchGuard(event.target.value)}
          className="w-44 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm outline-none focus:border-teal-500 text-slate-900 dark:text-white"
        />

        {(filterType !== "all" || searchBus || searchGuard) && (
          <button
            onClick={() => {
              setFilterType("all");
              setSearchBus("");
              setSearchGuard("");
            }}
            className="rounded-lg px-3 py-1.5 text-sm text-teal-700 dark:text-teal-400 transition hover:bg-teal-50 dark:hover:bg-teal-900/20"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Log ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Bus Number</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Guard Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Gate</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Occupancy</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className={`border-b border-slate-100 dark:border-slate-800 transition hover:bg-slate-50/50 dark:hover:bg-slate-800/30 ${
                  log.status === "late" || log.status === "overcrowded" ? "bg-rose-50/30 dark:bg-rose-900/10" : ""
                }`}
              >
                <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-white">{log.id}</td>
                <td className="px-4 py-4 text-sm font-semibold text-sky-700 dark:text-sky-400">{log.busNumber}</td>
                <td className="px-4 py-4 text-sm text-slate-800 dark:text-slate-300">{log.guard}</td>
                <td className="px-4 py-4">
                  <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${getTypeColor(log.type)}`}>
                    {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{log.time}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{log.date}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{log.gate}</td>
                <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-white">
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

      {filteredLogs.length === 0 && <div className="py-8 text-center text-slate-500 dark:text-slate-400">No logs found for the current filters.</div>}
    </div>
  );
}
