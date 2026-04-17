import { BarChart3, Download, FileSpreadsheet, TrendingUp } from "lucide-react";
import { DailyTripChart, PeakHourChart } from "../components/dashboard/Charts";
import { dailyTripData, reportCards, routePerformance } from "../data/sbmsData";
import { useMemo } from "react";

export default function AdminReports() {
  const peakHourData = useMemo(() => {
    const hours = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
    return hours.map((h, i) => {
      const baseArrivals = [12, 20, 28, 25, 18, 12, 15, 18, 22, 26, 30, 24];
      const arrivals = baseArrivals[i] ?? 15;
      const late = (i === 4 || i === 7) ? 2 : 0; 
      return { hour: h, arrivals, late };
    });
  }, []);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Route,Punctuality,Average Occupancy,Incidents\n" 
      + routePerformance.map(r => `${r.route},${r.punctuality},${r.averageOccupancy},${r.incidents}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "route_performance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Reports and Analytics</h2>
          <p className="mt-2 text-gray-400">Operational summaries, route performance, and export-ready reporting views.</p>
        </div>
        <button className="glass-button flex items-center gap-2 px-6 py-3 shadow-lg" onClick={handleExport}>
          <Download className="h-5 w-5" />
          Export report pack
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {reportCards.map((card) => {
          // Replace "Trips" with "Total Buses" in the title
          let title = card.title;
          let value = card.value;
          if (title.toLowerCase() === "daily summary") { // or wherever 'trips' is
             value = value.replace(/trips/i, "buses");
          }
          return (
            <div key={card.title} className="glass-card interactive-card flex flex-col justify-center border-white/10 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-300">{title}</p>
              <p className="mt-4 text-4xl font-bold text-white">{value}</p>
              <p className="mt-3 text-sm font-medium text-gray-400">{card.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PeakHourChart data={peakHourData} />
        <DailyTripChart data={dailyTripData} />
      </div>

      <div className="glass-panel p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-6">
          <div className="rounded-2xl bg-teal-500/10 p-3">
            <BarChart3 className="h-6 w-6 text-teal-300" />
          </div>
          <h3 className="text-2xl font-bold text-white">Route performance table</h3>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-4 text-sm font-bold uppercase tracking-wider text-gray-400">Route</th>
                <th className="px-4 py-4 text-sm font-bold uppercase tracking-wider text-gray-400">Punctuality</th>
                <th className="px-4 py-4 text-sm font-bold uppercase tracking-wider text-gray-400">Average Occupancy</th>
                <th className="px-4 py-4 text-sm font-bold uppercase tracking-wider text-gray-400">Incidents</th>
                <th className="px-4 py-4 text-sm font-bold uppercase tracking-wider text-gray-400">Trend</th>
              </tr>
            </thead>
            <tbody>
              {routePerformance.map((route, idx) => (
                <tr key={route.route} className={`border-b border-white/5 transition-colors hover:bg-white/[0.04] ${idx === routePerformance.length -1 ? 'border-none' : ''}`}>
                  <td className="px-4 py-5 text-sm font-bold text-white">{route.route}</td>
                  <td className="px-4 py-5 text-sm font-medium text-gray-300">{route.punctuality}</td>
                  <td className="px-4 py-5 text-sm font-medium text-gray-300">{route.averageOccupancy}</td>
                  <td className="px-4 py-5 text-sm font-medium text-gray-300">{route.incidents}</td>
                  <td className="px-4 py-5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                      route.incidents > 1 
                      ? "border border-amber-500/30 bg-amber-500/10 text-amber-300" 
                      : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
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
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-inner">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Available exports</p>
            <div className="mt-5 space-y-4 text-sm font-medium text-gray-200">
              <p className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3 transition hover:bg-white/[0.04]"><FileSpreadsheet className="h-5 w-5 text-blue-400" /> Daily bus register</p>
              <p className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3 transition hover:bg-white/[0.04]"><FileSpreadsheet className="h-5 w-5 text-rose-400" /> Delay exception list</p>
              <p className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3 transition hover:bg-white/[0.04]"><FileSpreadsheet className="h-5 w-5 text-emerald-400" /> Route occupancy summary</p>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 p-6 shadow-inner">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-300">Recommended next report</p>
            <p className="mt-4 text-2xl font-bold text-white">Goverdhan Chauraha route overload review</p>
            <p className="mt-3 font-medium leading-relaxed text-gray-300">This route has the highest occupancy pressure and the most incident activity based on recent sensor data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
