import { BadgeCheck, Clock3, Shield, Users, Plus, Trash2, MapPin, Mail } from "lucide-react";
import { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminGuards() {
  const { guards, addGuard, removeGuard, searchQuery } = useData();

  const filteredGuards = useMemo(() => {
    if (!searchQuery) return guards;
    const lowerQuery = searchQuery.toLowerCase();
    return guards.filter(guard =>
      guard.name.toLowerCase().includes(lowerQuery) ||
      guard.id.toLowerCase().includes(lowerQuery) ||
      guard.gate.toLowerCase().includes(lowerQuery)
    );
  }, [guards, searchQuery]);

  const [isAdding, setIsAdding] = useState(false);
  const [newGuard, setNewGuard] = useState({
    name: "",
    email: "",
    password: "",
    dutyTime: "Morning Shift",
    destination: "gate no. 1",
  });
  const [guardError, setGuardError] = useState("");

  const handleAddGuard = async (e) => {
    e.preventDefault();
    setGuardError("");
    try {
      await addGuard({
        name: newGuard.name,
        email: newGuard.email,
        password: newGuard.password,
        shift: newGuard.dutyTime,
        gate: newGuard.destination,
      });
      setNewGuard({ name: "", email: "", password: "", dutyTime: "Morning Shift", destination: "gate no. 1" });
      setIsAdding(false);
    } catch (err) {
      setGuardError(err.message || "Failed to add guard");
    }
  };

  const activeCount = guards.filter((g) => g.status === "active").length;
  const morningCount = guards.filter((g) => g.shift === "Morning Shift").length;
  const totalLogs = guards.reduce((sum, g) => sum + (g.logsToday || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">
            Guard Management
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
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

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddGuard} className="glass-panel p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">New Guard Details</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
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
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="guard@sbms.local"
                    value={newGuard.email}
                    onChange={(e) => setNewGuard({ ...newGuard, email: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                  <input
                    required
                    type="password"
                    placeholder="Min 6 characters"
                    value={newGuard.password}
                    onChange={(e) => setNewGuard({ ...newGuard, password: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duty Time</label>
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
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Gate</label>
                  <select
                    value={newGuard.destination}
                    onChange={(e) => setNewGuard({ ...newGuard, destination: e.target.value })}
                    className="glass-input w-full appearance-none"
                  >
                    <option>gate no. 1</option>
                    <option>gate no. 2</option>
                    <option>gate no. 3</option>
                    <option>parking gate</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                {guardError && <p className="text-sm text-rose-600 self-center">{guardError}</p>}
                <button type="submit" className="glass-button px-6 py-2.5">
                  Save Guard
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card interactive-card p-6 border border-white/20 dark:border-white/10 flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-teal-100 dark:bg-teal-900/50 rounded-2xl mb-4">
            <Users className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Active guards</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">{activeCount}</p>
        </div>
        <div className="glass-card interactive-card p-6 border border-white/20 dark:border-white/10 flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-2xl mb-4">
            <Clock3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Morning shift</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">{morningCount}</p>
        </div>
        <div className="glass-card interactive-card p-6 border border-white/20 dark:border-white/10 flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl mb-4">
            <BadgeCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Logs submitted</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">{totalLogs}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AnimatePresence>
          {filteredGuards.map((guard) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              key={guard._id || guard.id}
              className="glass-card interactive-card p-6 border border-white/20 dark:border-white/10"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <Shield className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{guard.name}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                      <MapPin className="h-4 w-4 text-rose-500" />
                      {guard.gate}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeGuard(guard.id || guard._id)}
                  className="glass-button-danger flex items-center gap-2 px-3 py-1.5 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>

              <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-4">
                <div className="bg-white/40 dark:bg-slate-800/40 p-3 rounded-2xl border border-white/30 dark:border-white/5">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Shift</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white truncate">{guard.shift}</p>
                </div>
                <div className="bg-white/40 dark:bg-slate-800/40 p-3 rounded-2xl border border-white/30 dark:border-white/5">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Duty Hours</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {guard.shift === "Morning Shift" ? "06:00–08:00 AM" : guard.shift === "Day Shift" ? "10:00 AM–12:00 PM" : guard.shift === "Evening Shift" ? "04:00–06:00 PM" : "08:00–10:00 PM"}
                  </p>
                </div>
                <div className="col-span-2 bg-white/40 dark:bg-slate-800/40 p-3 rounded-2xl border border-white/30 dark:border-white/5">
                  <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide"><Mail className="h-3 w-3" /> Login Email</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white truncate">{guard.email || "—"}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredGuards.length === 0 && (
          <div className="col-span-2 p-12 text-center glass-panel">
            <Users className="h-12 w-12 mx-auto text-slate-400 mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300">No guards assigned</h3>
            <p className="mt-2 text-muted-foreground">Add a guard to manage shift coverage.</p>
          </div>
        )}
      </div>
    </div>
  );
}
