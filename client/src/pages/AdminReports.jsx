import { BarChart3, Download, FileSpreadsheet, TrendingUp } from "lucide-react";
import { DailyTripChart, PeakHourChart } from "../components/dashboard/Charts";
import { LogHistoryTable } from "../components/dashboard/LogHistoryTable";
import { dailyTripData, reportCards, routePerformance } from "../data/sbmsData";
import { useData } from "../context/DataContext";
import { useMemo } from "react";

export default function AdminReports() {
  const { logs } = useData();

  // Assuming peakHourData logic is similar locally if we want, or we just keep it simple locally.
  const peakHourData = useMemo(() => [
    { hour: "6 AM",  arrivals: 8,  late: 0 },
    { hour: "7 AM",  arrivals: 15, late: 0 },
    { hour: "8 AM",  arrivals: 22, late: 0 },
    { hour: "9 AM",  arrivals: 18, late: 0 },
    { hour: "10 AM", arrivals: 12, late: 3 },
    { hour: "11 AM", arrivals: 9,  late: 0 },
    { hour: "12 PM", arrivals: 11, late: 0 },
    { hour: "1 PM",  arrivals: 7,  late: 2 },
    { hour: "2 PM",  arrivals: 14, late: 0 },
    { hour: "3 PM",  arrivals: 19, late: 0 },
    { hour: "4 PM",  arrivals: 24, late: 0 },
    { hour: "5 PM",  arrivals: 16, late: 0 },
  ], []);

  const handleExport = (filename = "route_performance.csv") => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Route,Punctuality,Average Occupancy,Incidents\n" 
      + routePerformance.map(r => `${r.route},${r.punctuality},${r.averageOccupancy},${r.incidents}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">Reports and Analytics</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Operational summaries, route performance, and export-ready reporting views.</p>
        </div>
        <button className="glass-button flex items-center gap-2 px-6 py-3 shadow-lg" onClick={handleExport}>
          <Download className="h-5 w-5" />
          Export report pack
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {reportCards.map((card) => (
          <div key={card.title} className="glass-card interactive-card p-6 border border-white/20 dark:border-white/10 flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">{card.title}</p>
            <p className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
              {card.title === "Daily summary" ? `${logs.length} logs` : card.value}
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 font-medium">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PeakHourChart data={peakHourData} />
        <DailyTripChart data={dailyTripData} />
      </div>

      <div className="glass-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
          <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-2xl">
            <BarChart3 className="h-6 w-6 text-teal-700 dark:text-teal-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Route performance table</h3>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="px-4 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Route</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Punctuality</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Average Occupancy</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Incidents</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody>
              {routePerformance.map((route, idx) => (
                <tr key={route.route} className={`border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors ${idx === routePerformance.length -1 ? 'border-none' : ''}`}>
                  <td className="px-4 py-5 text-sm font-bold text-slate-900 dark:text-white">{route.route}</td>
                  <td className="px-4 py-5 text-sm font-medium text-slate-700 dark:text-slate-300">{route.punctuality}</td>
                  <td className="px-4 py-5 text-sm font-medium text-slate-700 dark:text-slate-300">{route.averageOccupancy}</td>
                  <td className="px-4 py-5 text-sm font-medium text-slate-700 dark:text-slate-300">{route.incidents}</td>
                  <td className="px-4 py-5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                      route.incidents > 1 
                      ? "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-900/50 dark:text-amber-400" 
                      : "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-900/50 dark:text-emerald-400"
                    }`}>
                      <TrendingUp className="h-3.5 w-3.5" />
                      {route.incidents > 1 ? "Watch Closely" : "Stable"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/5 rounded-3xl p-6 shadow-inner">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Available exports</p>
            <div className="mt-5 space-y-4 text-sm font-medium text-slate-800 dark:text-slate-200">
              <p onClick={() => handleExport("daily_bus_register.csv")} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-900/50 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm"><FileSpreadsheet className="h-5 w-5 text-blue-500" /> Daily bus register</p>
              <p onClick={() => handleExport("delay_exception_list.csv")} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-900/50 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm"><FileSpreadsheet className="h-5 w-5 text-rose-500" /> Delay exception list</p>
              <p onClick={() => handleExport("route_occupancy_summary.csv")} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-900/50 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm"><FileSpreadsheet className="h-5 w-5 text-emerald-500" /> Route occupancy summary</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800/60 dark:to-indigo-900/20 border border-indigo-100 dark:border-indigo-500/10 rounded-3xl p-6 flex flex-col justify-center shadow-inner">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">Recommended next report</p>
            <p className="mt-4 text-2xl font-bold bg-gradient-to-r from-indigo-900 to-blue-800 bg-clip-text text-transparent dark:from-indigo-300 dark:to-blue-200">Goverdhan Chauraha route overload review</p>
            <p className="mt-3 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">This route has the highest occupancy pressure and the most incident activity based on recent sensor data.</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <LogHistoryTable logs={logs} />
      </div>
    </div>
  );
}
