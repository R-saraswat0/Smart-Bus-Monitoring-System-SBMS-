import { useMemo, useState } from "react";
import { Bus, CheckCircle2, Clock3, ShieldAlert, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { busLogs, fleet, guardProfile } from "../data/sbmsData";

function getCurrentClock() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getCurrentDate() {
  return new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

export default function GuardLogEntry() {
  const [logs, setLogs] = useState(busLogs);
  const [form, setForm] = useState({
    busNumber: fleet[0]?.busNumber ?? "",
    type: "entry",
    occupancy: "0",
  });

  const selectedBus = useMemo(
    () => fleet.find((bus) => bus.busNumber === form.busNumber) ?? fleet[0],
    [form.busNumber],
  );

  const recentLogs = logs.slice(0, 5);
  const occupancy = Number(form.occupancy || 0);
  const isOverCapacity = occupancy > (selectedBus?.capacity ?? 0);

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedBus) return;

    const newLog = {
      id: `LOG-${1000 + logs.length + 1}`,
      busNumber: selectedBus.busNumber,
      guard: guardProfile.name,
      type: form.type,
      time: getCurrentClock(),
      date: getCurrentDate(),
      gate: guardProfile.gate,
      occupancy,
      capacity: selectedBus.capacity,
      status: isOverCapacity ? "overcrowded" : "on-time",
    };

    setLogs((current) => [newLog, ...current]);
    setForm((current) => ({ ...current, occupancy: "0" }));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">New log entry</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Record bus movement</h2>
            <p className="mt-3 text-slate-600">Choose a bus, select arrival or departure, and save the log for the active gate.</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-800">
            <Bus className="h-6 w-6" />
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="busNumber" className="text-sm font-semibold text-slate-700">Bus number</label>
            <select
              id="busNumber"
              value={form.busNumber}
              onChange={(event) => setForm((current) => ({ ...current, busNumber: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white"
            >
              {fleet.map((bus) => (
                <option key={bus.busNumber} value={bus.busNumber}>
                  {bus.busNumber} - {bus.route}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-semibold text-slate-700">Movement type</label>
              <select
                id="type"
                value={form.type}
                onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white"
              >
                <option value="entry">Arrival / Entry</option>
                <option value="exit">Departure / Exit</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="occupancy" className="text-sm font-semibold text-slate-700">Student occupancy</label>
              <input
                id="occupancy"
                type="number"
                min="0"
                value={form.occupancy}
                onChange={(event) => setForm((current) => ({ ...current, occupancy: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Capacity</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{selectedBus?.capacity ?? "--"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Timestamp</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{getCurrentClock()}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Current status</p>
              <p className={`mt-2 text-xl font-semibold ${isOverCapacity ? "text-rose-600" : "text-emerald-600"}`}>
                {isOverCapacity ? "Over capacity" : "Within limit"}
              </p>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full bg-slate-900 text-white hover:bg-slate-800">
            Save log entry
          </Button>
        </form>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">Instant guard feedback</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <Clock3 className="h-5 w-5 text-teal-300" />
              <p className="mt-4 text-sm text-slate-300">Auto timestamp</p>
              <p className="mt-2 text-2xl font-semibold">{getCurrentClock()}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 p-5">
              <Users className="h-5 w-5 text-teal-800" />
              <p className="mt-4 text-sm text-slate-600">Recorded occupancy</p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">{occupancy}</p>
            </div>
            <div className={`rounded-2xl p-5 ${isOverCapacity ? "bg-rose-50" : "bg-emerald-50"}`}>
              <ShieldAlert className={`h-5 w-5 ${isOverCapacity ? "text-rose-700" : "text-emerald-700"}`} />
              <p className="mt-4 text-sm text-slate-600">Safety check</p>
              <p className={`mt-2 text-2xl font-semibold ${isOverCapacity ? "text-rose-700" : "text-emerald-700"}`}>
                {isOverCapacity ? "Alert" : "Clear"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Recent activity</h2>
              <p className="mt-2 text-sm text-slate-600">Latest five logs for quick verification.</p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {recentLogs.length} records
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-950">{log.busNumber}</p>
                    <p className="mt-1 text-sm text-slate-500">{log.gate} - {log.date}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{log.type}</span>
                    <span
                      className={`rounded-full px-3 py-1 ${
                        log.status === "overcrowded"
                          ? "bg-rose-100 text-rose-700"
                          : log.status === "late"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span>{log.time}</span>
                  <span>Guard: {log.guard}</span>
                  <span>Occupancy: {log.occupancy}/{log.capacity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Logs are still frontend-only state for now, but the workflow is separated and ready for backend wiring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
