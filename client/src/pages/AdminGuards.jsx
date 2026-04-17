import { BadgeCheck, Clock3, Shield, Users, Plus, Trash2, MapPin } from "lucide-react";
import { useState } from "react";
import { useData } from "../context/DataContext";


export default function AdminGuards() {
  const { guards, addGuard, removeGuard } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [newGuard, setNewGuard] = useState({
    name: "",
    id: "",
    dutyTime: "Morning Shift",
    destination: "Main Gate",
  });

  const handleAddGuard = (e) => {
    e.preventDefault();
    const guardEntry = {
      id: newGuard.id,
      name: newGuard.name,
      shift: newGuard.dutyTime,
      gate: newGuard.destination,
      status: "active",
      logsToday: 0,
      lastActivity: "Just added"
    };

    addGuard(guardEntry);
    setNewGuard({ name: "", id: "", dutyTime: "Morning Shift", destination: "Main Gate" });
    setIsAdding(false);
  };

  const activeCount = guards.filter((g) => g.status === "active").length;
  const morningCount = guards.filter((g) => g.shift === "Morning Shift").length;
  const totalLogs = guards.reduce((sum, g) => sum + (g.logsToday || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Guard Management
          </h2>
          <p className="mt-2 text-gray-400">
            Shift coverage, assignments, and logging activity.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="glass-button flex items-center gap-2 px-5 py-2.5 w-fit"
        >
          <Plus className="h-5 w-5" />
          {isAdding ? "Cancel" : "Add Guard"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddGuard} className="glass-panel p-6 mb-8 animate-in fade-in duration-300">
              <h3 className="mb-4 text-xl font-semibold text-white">New Guard Details</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={newGuard.name}
                    onChange={(e) => setNewGuard({ ...newGuard, name: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">ID</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. GRD-06"
                    value={newGuard.id}
                    onChange={(e) => setNewGuard({ ...newGuard, id: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Duty Time</label>
                  <select
                    value={newGuard.dutyTime}
                    onChange={(e) => setNewGuard({ ...newGuard, dutyTime: e.target.value })}
                    className="glass-input w-full appearance-none"
                  >
                    <option>Morning Shift</option>
                    <option>Day Shift</option>
                    <option>Evening Shift</option>
                    <option>Night Shift</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Destination</label>
                  <select
                    value={newGuard.destination}
                    onChange={(e) => setNewGuard({ ...newGuard, destination: e.target.value })}
                    className="glass-input w-full appearance-none"
                  >
                    <option>Main Gate</option>
                    <option>North Gate</option>
                    <option>South Gate</option>
                    <option>East Gate</option>
                    <option>West Gate</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button type="submit" className="glass-button px-6 py-2.5">
                  Save Guard
                </button>
              </div>
            </form>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card interactive-card flex flex-col items-center justify-center border-white/10 p-6 text-center">
          <div className="mb-4 rounded-2xl bg-teal-500/10 p-4">
            <Users className="h-8 w-8 text-teal-300" />
          </div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">Active guards</p>
          <p className="mt-2 text-4xl font-bold text-white">{activeCount}</p>
        </div>
        <div className="glass-card interactive-card flex flex-col items-center justify-center border-white/10 p-6 text-center">
          <div className="mb-4 rounded-2xl bg-blue-500/10 p-4">
            <Clock3 className="h-8 w-8 text-blue-300" />
          </div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">Morning shift</p>
          <p className="mt-2 text-4xl font-bold text-white">{morningCount}</p>
        </div>
        <div className="glass-card interactive-card flex flex-col items-center justify-center border-white/10 p-6 text-center">
          <div className="mb-4 rounded-2xl bg-emerald-500/10 p-4">
            <BadgeCheck className="h-8 w-8 text-emerald-300" />
          </div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">Logs submitted</p>
          <p className="mt-2 text-4xl font-bold text-white">{totalLogs}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
          {guards.map((guard) => (
            <div
              key={guard.id}
              className="glass-card interactive-card animate-in border-white/10 p-6 duration-300 fade-in"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-white/10 p-3">
                    <Shield className="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{guard.name}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-300">
                      <MapPin className="h-4 w-4 text-rose-500" />
                      {guard.gate}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeGuard(guard.id)}
                  className="glass-button-danger flex items-center gap-2 px-3 py-1.5 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>

              <div className="mt-8 grid gap-4 grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-400">ID</p>
                  <p className="mt-1 truncate font-semibold text-white">{guard.id}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-400">Shift</p>
                  <p className="mt-1 truncate font-semibold text-white">{guard.shift}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-400">Duty Time</p>
                  <p className="mt-1 truncate font-semibold text-white">{guard.shift === "Morning Shift" ? "06:00 AM - 08:00 AM" : guard.shift === "Day Shift" ? "10:00 AM - 12:00 PM" : guard.shift === "Evening Shift" ? "04:00 PM - 06:00 PM" : "08:00 PM - 10:00 PM"}</p>
                </div>
              </div>
            </div>
          ))}
        
        {guards.length === 0 && (
          <div className="col-span-2 p-12 text-center glass-panel">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-500 opacity-50" />
            <h3 className="text-xl font-medium text-gray-200">No guards assigned</h3>
            <p className="mt-2 text-gray-400">Add a guard to manage shift coverage.</p>
          </div>
        )}
      </div>
    </div>
  );
}
