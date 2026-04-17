import { useMemo, useState } from "react";
import { Bus, Clock3, Users, LogIn, LogOut, ArrowRight } from "lucide-react";
import { useData } from "../context/DataContext";
import { guardProfile } from "../data/sbmsData";

function getCurrentClock() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getCurrentDate() {
  return new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

export default function GuardLogEntry() {
  const { buses, addLog, addAlert, logs, updateBus } = useData();
  const [mode, setMode] = useState("arrival"); // 'arrival' or 'departure'
  const [form, setForm] = useState({
    busNumber: buses[0]?.busNumber ?? "",
    occupancy: "0",
    time: getCurrentClock(),
    isLate: false,
  });

  const selectedBus = useMemo(
    () => buses.find((bus) => bus.busNumber === form.busNumber) ?? buses[0],
    [buses, form.busNumber],
  );

  const recentLogs = logs.slice(0, 5);
  const occupancy = Number(form.occupancy || 0);
  const capacity = selectedBus?.capacity ?? 0;
  const isOverCapacity = occupancy > capacity;

  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedBus) return;

    // Capacity Logic: Guard cannot manually exceed capacity without alert.
    // If student count > capacity -> Auto-trigger capacity alert. The system handles validation automatically.
    if (isOverCapacity) {
      const newAlert = {
        id: `ALT-${Math.floor(Math.random() * 900) + 100}`,
        title: `Capacity exceeded on ${selectedBus.busNumber}`,
        severity: "high",
        busNumber: selectedBus.busNumber,
        time: form.time,
        owner: guardProfile.name,
        description: `Occupancy reached ${occupancy} against a capacity of ${capacity} on the ${selectedBus.route} route during ${mode}.`,
      };
      addAlert(newAlert);
    }

    const logStatus = isOverCapacity ? "overcrowded" : form.isLate ? "late" : "on-time";
    const busStatus = isOverCapacity ? "overcrowded" : mode === "arrival" ? (form.isLate ? "late" : "on-campus") : "departed";

    const newLog = {
      id: `LOG-${1000 + logs.length + 1}`,
      busNumber: selectedBus.busNumber,
      guard: guardProfile.name,
      type: mode === "arrival" ? "entry" : "exit",
      time: form.time,
      date: getCurrentDate(),
      gate: guardProfile.gate,
      occupancy,
      capacity: selectedBus.capacity,
      status: logStatus,
    };

    addLog(newLog);
    updateBus(selectedBus.busNumber, { status: busStatus });

    setForm((current) => ({
      ...current,
      occupancy: "0",
      time: getCurrentClock(),
      isLate: false,
    }));
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_1fr] animate-in fade-in duration-500">
      <div className="space-y-6">
        <div className="glass-card border border-white/10 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Gate Operations</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Record Log</h2>
              <p className="mt-3 text-sm text-gray-400">Select arrival or departure flow to update campus transport status.</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-300">
              <Bus className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-8 flex rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMode("arrival")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                mode === "arrival"
                  ? "bg-teal-500/15 text-teal-300 shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LogIn className="h-4 w-4" /> Bus Arrival
            </button>
            <button
              type="button"
              onClick={() => setMode("departure")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                mode === "departure"
                  ? "bg-blue-500/15 text-blue-300 shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LogOut className="h-4 w-4" /> Bus Departure
            </button>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Select Bus</label>
              <select
                value={form.busNumber}
                onChange={(event) => setForm((current) => ({ ...current, busNumber: event.target.value }))}
                className="glass-input w-full appearance-none font-semibold text-white"
              >
                {buses.map((bus) => (
                  <option key={bus.busNumber} value={bus.busNumber} className="text-white bg-slate-900">
                    {bus.busNumber} - {bus.route}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Number of Students</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={form.occupancy}
                    onChange={(event) => setForm((current) => ({ ...current, occupancy: event.target.value }))}
                    className="glass-input w-full pl-11 font-semibold text-white"
                  />
                  <Users className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Log Time</label>
                <div className="relative">
                  <input
                    type="time"
                    value={form.time}
                    onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))}
                    className="glass-input w-full pl-11 font-semibold text-white"
                  />
                  <Clock3 className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <input 
                id="isLate" 
                type="checkbox" 
                checked={form.isLate}
                onChange={(e) => setForm(c => ({ ...c, isLate: e.target.checked }))}
                className="h-5 w-5 rounded border-white/20 bg-black/40 text-teal-400 focus:ring-teal-500"
              />
              <label htmlFor="isLate" className="cursor-pointer select-none font-semibold text-gray-200">
                Mark as Late {mode === "arrival" ? "Arrival" : "Departure"}
              </label>
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Capacity</p>
                <p className="mt-2 text-2xl font-bold text-white">{capacity || "--"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Timestamp</p>
                <p className="mt-2 text-2xl font-bold text-white">{form.time || getCurrentClock()}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Status</p>
                <p className={`mt-2 inline-block rounded-md px-2 py-1 text-sm font-bold uppercase tracking-wide ${isOverCapacity ? "bg-rose-500/10 text-rose-300" : "bg-emerald-500/10 text-emerald-300"}`}>
                  {isOverCapacity ? "Capacity Alert" : "Clear"}
                </p>
              </div>
            </div>

            <button type="submit" className="glass-button w-full flex items-center justify-center gap-2 py-3.5 text-lg shadow-lg">
              Confirm {mode === "arrival" ? "Arrival" : "Departure"} <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card border border-white/10 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Recent Log History</h2>
              <p className="mt-1 text-sm text-gray-400">Your latest entries at the gate.</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-bold text-gray-300">
              {recentLogs.length} logs
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-sm backdrop-blur-md transition-colors hover:bg-white/[0.07]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl p-2 ${log.type === "entry" ? "bg-teal-500/10 text-teal-300" : "bg-blue-500/10 text-blue-300"}`}>
                      {log.type === "entry" ? <LogIn className="h-5 w-5" /> : <LogOut className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">{log.busNumber} <span className="text-sm font-medium text-gray-400 opacity-80">({log.type === "entry" ? "Arrival" : "Departure"})</span></p>
                      <p className="mt-0.5 text-sm font-medium text-gray-400">{log.gate} • {log.date} @ {log.time}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        log.status === "overcrowded"
                          ? "border border-rose-500/30 bg-rose-500/10 text-rose-300"
                          : log.status === "late"
                          ? "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                          : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      }`}
                    >
                      {log.status === "overcrowded" ? "Alert" : log.status}
                    </span>
                    <span className="text-xs font-bold text-gray-300">
                      <Users className="inline h-3 w-3 mr-1" />{log.occupancy}/{log.capacity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {recentLogs.length === 0 && (
              <p className="py-4 text-center text-sm text-gray-400">No recent logs recorded by you.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
