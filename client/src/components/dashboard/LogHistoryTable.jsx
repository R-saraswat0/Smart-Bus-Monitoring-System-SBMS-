import { useState } from "react";
import { Download, Filter } from "lucide-react";
import { useData } from "../../context/DataContext";

export function LogHistoryTable({ logs }) {
  const [filterType, setFilterType] = useState("all");
  const [searchBus, setSearchBus] = useState("");
  const [searchGuard, setSearchGuard] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "on-time":    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "late":       return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "overcrowded":return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      default:           return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type) => {
    return type === "entry"
      ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
      : "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400";
  };

  const { searchQuery } = useData();

  const filteredLogs = logs.filter((log) => {
    const matchesType = filterType === "all" || log.type === filterType;
    const matchesBus = searchBus === "" || log.busNumber.toLowerCase().includes(searchBus.toLowerCase());
    const matchesGuard = searchGuard === "" || log.guard.toLowerCase().includes(searchGuard.toLowerCase());
    const matchesGlobal = !searchQuery ||
      log.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.guard.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesBus && matchesGuard && matchesGlobal;
  });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Log History</h3>
          <p className="mt-1 text-sm text-muted-foreground">Filterable entry and exit records for operational review.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-slate-900 transition hover:bg-slate-700 dark:hover:bg-slate-200">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 rounded-2xl bg-muted p-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filters</span>
        </div>

        <select
          value={filterType}
          onChange={(event) => setFilterType(event.target.value)}
          className="rounded-lg border border-border bg-background text-foreground px-3 py-1.5 text-sm outline-none focus:border-teal-500"
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
          className="w-36 rounded-lg border border-border bg-background text-foreground px-3 py-1.5 text-sm outline-none focus:border-teal-500"
        />

        <input
          type="text"
          placeholder="Guard Name"
          value={searchGuard}
          onChange={(event) => setSearchGuard(event.target.value)}
          className="w-44 rounded-lg border border-border bg-background text-foreground px-3 py-1.5 text-sm outline-none focus:border-teal-500"
        />

        {(filterType !== "all" || searchBus || searchGuard) && (
          <button
            onClick={() => { setFilterType("all"); setSearchBus(""); setSearchGuard(""); }}
            className="rounded-lg px-3 py-1.5 text-sm text-teal-700 dark:text-teal-400 transition hover:bg-teal-50 dark:hover:bg-teal-900/30"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Log ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Bus Number</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Guard Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Gate</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Occupancy</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className={`border-b border-border transition hover:bg-muted/50 ${
                  log.status === "late" || log.status === "overcrowded" ? "bg-rose-50/30 dark:bg-rose-900/10" : ""
                }`}
              >
                <td className="px-4 py-4 text-sm font-medium text-foreground">{log.id}</td>
                <td className="px-4 py-4 text-sm font-semibold text-sky-600 dark:text-sky-400">{log.busNumber}</td>
                <td className="px-4 py-4 text-sm text-foreground">{log.guard}</td>
                <td className="px-4 py-4">
                  <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${getTypeColor(log.type)}`}>
                    {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-foreground">{log.time}</div>
                  <div className="text-xs text-muted-foreground">{log.date}</div>
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">{log.gate}</td>
                <td className="px-4 py-4 text-sm font-medium text-foreground">{log.occupancy}/{log.capacity}</td>
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

      {filteredLogs.length === 0 && <div className="py-8 text-center text-muted-foreground">No logs found for the current filters.</div>}
    </div>
  );
}
