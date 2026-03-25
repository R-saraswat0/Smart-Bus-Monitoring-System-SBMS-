import { BarChart3, Download, FileSpreadsheet, TrendingUp } from "lucide-react";
import { DailyTripChart, PeakHourChart } from "../components/dashboard/Charts";
import { dailyTripData, peakHourData, reportCards, routePerformance } from "../data/sbmsData";

export default function AdminReports() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Reports and Analytics</h2>
          <p className="mt-2 text-slate-600">Operational summaries, route performance, and export-ready reporting views.</p>
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export report pack
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {reportCards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">{card.title}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">{card.value}</p>
            <p className="mt-3 text-sm text-slate-600">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PeakHourChart data={peakHourData} />
        <DailyTripChart data={dailyTripData} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-5 w-5 text-teal-700" />
          <h3 className="text-lg font-semibold text-slate-950">Route performance table</h3>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Route</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Punctuality</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Average Occupancy</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Incidents</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Trend</th>
              </tr>
            </thead>
            <tbody>
              {routePerformance.map((route) => (
                <tr key={route.route} className="border-b border-slate-100">
                  <td className="px-4 py-4 text-sm font-semibold text-slate-950">{route.route}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{route.punctuality}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{route.averageOccupancy}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{route.incidents}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      route.incidents > 1 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      <TrendingUp className="h-3 w-3" />
                      {route.incidents > 1 ? "Watch closely" : "Stable"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-600">Available exports</p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p className="flex items-center gap-2"><FileSpreadsheet className="h-4 w-4" /> Daily trip register</p>
              <p className="flex items-center gap-2"><FileSpreadsheet className="h-4 w-4" /> Delay exception list</p>
              <p className="flex items-center gap-2"><FileSpreadsheet className="h-4 w-4" /> Route occupancy summary</p>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-600">Recommended next report</p>
            <p className="mt-4 text-lg font-semibold text-slate-950">Library route overload review</p>
            <p className="mt-2 text-sm text-slate-600">This route has the highest occupancy pressure and the most incident activity.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
