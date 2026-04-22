import { AlertTriangle, Bus, Clock, Users, ArrowRightLeft, MapPin } from "lucide-react";
import { DailyTripChart, PeakHourChart } from "../components/dashboard/Charts";
import { StatCard } from "../components/dashboard/StatCard";
import { dailyTripData } from "../data/sbmsData";
import { useData } from "../context/DataContext";
import { useMemo } from "react";

export default function AdminOverview() {
  const { buses, logs } = useData();

  const stats = useMemo(() => {
    let onCampus = 0;
    let departed = 0;
    let incoming = 0;
    let late = 0;
    let capacityAlert = 0;

    buses.forEach(bus => {
      // Assign exact categories to sum up to total
      if (bus.status === 'overcrowded' || bus.health === 'warning') {
        capacityAlert++;
      } else if (bus.status === 'late') {
        late++;
      } else if (bus.status === 'departed') {
        departed++;
      } else if (bus.status === 'incoming' || bus.status === 'standby') {
        incoming++;
      } else {
        onCampus++;
      }
    });

    return [
      { title: "Total Buses", value: buses.length, icon: Bus, gradient: "bg-gradient-to-r from-teal-500 via-emerald-500 to-green-600 animate-bg-pan" },
      { title: "Buses On Campus", value: onCampus, icon: Users, gradient: "bg-gradient-to-bl from-fuchsia-600 via-purple-500 to-pink-500 animate-bg-pan" },
      { title: "Departed Buses", value: departed, icon: ArrowRightLeft, gradient: "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 animate-bg-pan" },
      { title: "Incoming Buses", value: incoming, icon: MapPin, gradient: "bg-gradient-to-tl from-amber-400 via-orange-500 to-red-500 animate-bg-pan" },
      { title: "Late Arrival", value: late, icon: Clock, gradient: "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 animate-bg-pan" },
      { title: "Capacity Alert", value: capacityAlert, icon: AlertTriangle, gradient: "bg-gradient-to-tr from-rose-600 via-red-600 to-orange-500 animate-bg-pan" },
    ];
  }, [buses]);

  const peakHourData = useMemo(() => {
    // Custom data to handle specific lateness color changes and arrival/departure split
    return [
      { hour: "6 AM", count: 12, fill: "url(#colorArrival)", type: "Arrival" },
      { hour: "7 AM", count: 24, fill: "url(#colorArrival)", type: "Arrival" },
      { hour: "8 AM", count: 32, fill: "url(#colorArrival)", type: "Arrival" },
      { hour: "9 AM", count: 28, fill: "url(#colorArrival)", type: "Arrival" },
      { hour: "10 AM", count: 15, fill: "url(#colorArrival)", type: "Arrival" },
      { hour: "11 AM", count: 8, fill: "#fca5a5", type: "Late Arrival" }, // light red
      { hour: "12 PM", count: 10, fill: "#ef4444", type: "Late Arrival" }, // some red
      { hour: "1 PM", count: 6, fill: "#991b1b", type: "Late Arrival" },   // dark red
      { hour: "2 PM", count: 18, fill: "url(#colorDeparture)", type: "Departure" },
      { hour: "3 PM", count: 26, fill: "url(#colorDeparture)", type: "Departure" },
      { hour: "4 PM", count: 34, fill: "url(#colorDeparture)", type: "Departure" },
      { hour: "5 PM", count: 22, fill: "url(#colorDeparture)", type: "Departure" }
    ];
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">Overview</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Central summary of active trips, delays, occupancy pressure, and gate movement.</p>
        </div>
        <div className="glass-panel px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">148</span> Routes Done
          </div>
          <div className="w-px h-8 bg-slate-300 dark:bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{logs.length}</span> Tracked Logs
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            gradient={stat.gradient}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <PeakHourChart data={peakHourData} />
        <DailyTripChart data={dailyTripData} />
      </div>
    </div>
  );
}
