import { AlertTriangle, Bus, Clock, Users } from "lucide-react";
import { DailyTripChart, PeakHourChart } from "../components/dashboard/Charts";
import { LiveBusStatus } from "../components/dashboard/LiveBusStatus";
import { StatCard } from "../components/dashboard/StatCard";
import { activeBuses, busLogs, dailyTripData, gateActivity, peakHourData, summaryStats } from "../data/sbmsData";

const iconMap = {
  bus: Bus,
  users: Users,
  clock: Clock,
  alert: AlertTriangle,
};

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Overview</h2>
          <p className="mt-2 text-slate-600">Central summary of active trips, delays, occupancy pressure, and gate movement.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          {activeBuses.length} live buses - {busLogs.length} tracked logs
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {summaryStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={iconMap[stat.icon]}
            gradient={stat.gradient}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <LiveBusStatus buses={activeBuses} />
        </div>
        <div className="space-y-6 xl:col-span-2">
          <PeakHourChart data={peakHourData} />
          <DailyTripChart data={dailyTripData} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {gateActivity.map((gate) => (
          <div key={gate.gate} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">{gate.gate}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500">Entries</p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">{gate.entries}</p>
              </div>
              <div>
                <p className="text-slate-500">Exits</p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">{gate.exits}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Active guard: {gate.activeGuard}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
