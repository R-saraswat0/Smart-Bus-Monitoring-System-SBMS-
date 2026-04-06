import { useMemo, useState } from "react";
import { Bus, CheckCircle2, Clock3, ShieldAlert, Users, LogIn, LogOut, ArrowRight } from "lucide-react";
import { useData } from "../context/DataContext";
import { guardProfile } from "../data/sbmsData";
import StudentVerificationModal from "../components/dashboard/StudentVerificationModal";

function getCurrentClock() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getCurrentDate() {
  return new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

export default function GuardLogEntry() {
  const { buses, addLog, addAlert, logs, updateBus } = useData();
  const [mode, setMode] = useState("arrival");
  const [activeSession, setActiveSession] = useState(null);
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

    if (mode === "arrival") {
      setActiveSession({
        logId: newLog.id,
        busNumber: newLog.busNumber
      });
    }

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
        <div className="glass-card p-6 shadow-sm border border-white/20 dark:border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Gate Operations</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Record Log</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Select arrival or departure flow to update campus transport status.</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400">
              <Bus className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-8 flex rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMode("arrival")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                mode === "arrival"
                  ? "bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              <LogIn className="h-4 w-4" /> Bus Arrival
            </button>
            <button
              type="button"
              onClick={() => setMode("departure")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                mode === "departure"
                  ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              <LogOut className="h-4 w-4" /> Bus Departure
            </button>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Select Bus</label>
              <select
                value={form.busNumber}
                onChange={(event) => setForm((current) => ({ ...current, busNumber: event.target.value }))}
                className="glass-input w-full appearance-none font-semibold text-slate-900 dark:text-white"
              >
                {buses.map((bus) => (
                  <option key={bus.busNumber} value={bus.busNumber} className="text-slate-900">
                    {bus.busNumber} - {bus.route}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Number of Students</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={form.occupancy}
                    onChange={(event) => setForm((current) => ({ ...current, occupancy: event.target.value }))}
                    className="glass-input w-full font-semibold text-slate-900 dark:text-white pl-11"
                  />
                  <Users className="h-5 w-5 absolute left-4 top-3 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Log Time</label>
                <div className="relative">
                  <input
                    type="time"
                    value={form.time}
                    onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))}
                    className="glass-input w-full font-semibold text-slate-900 dark:text-white pl-11"
                  />
                  <Clock3 className="h-5 w-5 absolute left-4 top-3 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-white/20 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30">
              <input 
                id="isLate" 
                type="checkbox" 
                checked={form.isLate}
                onChange={(e) => setForm(c => ({ ...c, isLate: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-600 dark:bg-slate-900 dark:border-slate-700"
              />
              <label htmlFor="isLate" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                Mark as Late {mode === "arrival" ? "Arrival" : "Departure"}
              </label>
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/20 dark:border-white/5 bg-white/40 dark:bg-slate-800/40 p-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Capacity</p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{capacity || "--"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Timestamp</p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{form.time || getCurrentClock()}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Status</p>
                <p className={`mt-2 text-sm font-bold uppercase tracking-wide px-2 py-1 inline-block rounded-md ${isOverCapacity ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`}>
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
        <div className="glass-card p-6 shadow-sm border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Log History</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your latest entries at the gate.</p>
            </div>
            <div className="rounded-full bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 border border-white/40 dark:border-white/5">
              {recentLogs.length} logs
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 p-4 shadow-sm backdrop-blur-md hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${log.type === "entry" ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400" : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"}`}>
                      {log.type === "entry" ? <LogIn className="h-5 w-5" /> : <LogOut className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{log.busNumber} <span className="text-sm font-medium text-slate-500 opacity-80">({log.type === "entry" ? "Arrival" : "Departure"})</span></p>
                      <p className="mt-0.5 text-sm font-medium text-slate-500 dark:text-slate-400">{log.gate} • {log.date} @ {log.time}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        log.status === "overcrowded"
                          ? "bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-900/30 dark:border-rose-900/50 dark:text-rose-400"
                          : log.status === "late"
                          ? "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-900/50 dark:text-amber-400"
                          : "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-900/50 dark:text-emerald-400"
                      }`}
                    >
                      {log.status === "overcrowded" ? "Alert" : log.status}
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      <Users className="inline h-3 w-3 mr-1" />{log.occupancy}/{log.capacity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {recentLogs.length === 0 && (
              <p className="text-center text-sm text-slate-500 py-4">No recent logs recorded by you.</p>
            )}
          </div>
        </div>
      </div>
      {activeSession && (
        <StudentVerificationModal 
          logId={activeSession.logId}
          busNumber={activeSession.busNumber}
          onClose={() => setActiveSession(null)}
        />
      )}
    </div>
  );
}
