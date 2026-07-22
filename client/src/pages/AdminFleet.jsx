import { Bus, Plus, Trash2, User, Phone, MapPin, Users, Activity } from "lucide-react";
import { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";

const statusBadge = {
  "on-campus":       "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "departed":        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  "overcrowded":     "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  "late":            "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "maintenance-due": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "standby":         "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  "active":          "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

export default function AdminFleet() {
  const { buses, addBus, removeBus, searchQuery } = useData();

  const filteredBuses = useMemo(() => {
    if (!searchQuery) return buses;
    const q = searchQuery.toLowerCase();
    return buses.filter(b =>
      b.busNumber.toLowerCase().includes(q) ||
      b.route.toLowerCase().includes(q) ||
      (b.driver || "").toLowerCase().includes(q)
    );
  }, [buses, searchQuery]);

  const [isAdding, setIsAdding] = useState(false);
  const [newBus, setNewBus] = useState({ routeStart: "", capacity: "", driverName: "", mobileNumber: "" });
  const [busError, setBusError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddBus = async (e) => {
    e.preventDefault();
    setBusError("");
    setSubmitting(true);
    const maxNum = buses.reduce((max, b) => {
      const n = parseInt(b.busNumber.replace(/\D/g, "")) || 0;
      return n > max ? n : max;
    }, 0);
    const nextId = `BUS-${String(maxNum + 1).padStart(3, "0")}`;
    try {
      await addBus({
        busNumber: nextId,
        route: `${newBus.routeStart} → GLA`,
        capacity: parseInt(newBus.capacity) || 0,
        driver: newBus.driverName,
        mobileNumber: newBus.mobileNumber,
        status: "active",
        health: "good",
      });
      setNewBus({ routeStart: "", capacity: "", driverName: "", mobileNumber: "" });
      setIsAdding(false);
    } catch (err) {
      setBusError(err.message || "Failed to add bus");
    } finally {
      setSubmitting(false);
    }
  };

  const onCampus = buses.filter(b => b.status === "on-campus").length;
  const departed = buses.filter(b => b.status === "departed").length;
  const attention = buses.filter(b => b.status === "overcrowded" || b.status === "maintenance-due" || b.health === "warning").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">
            Fleet Management
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Manage your fleet, driver assignments, and routes.</p>
        </div>
        <button onClick={() => { setIsAdding(!isAdding); setBusError(""); }} className="glass-button flex items-center gap-2 px-5 py-2.5 w-fit">
          <Plus className="h-5 w-5" />
          {isAdding ? "Cancel" : "Add New Bus"}
        </button>
      </div>

      {/* Fleet summary */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {[
          { label: "Total Buses", value: buses.length, color: "text-slate-900 dark:text-white" },
          { label: "On Campus", value: onCampus, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Departed", value: departed, color: "text-slate-500 dark:text-slate-400" },
          { label: "Need Attention", value: attention, color: "text-rose-600 dark:text-rose-400" },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 text-center border border-white/20 dark:border-white/10">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{s.label}</p>
            <p className={`mt-2 text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0, y: -20 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -20 }} className="overflow-hidden">
            <form onSubmit={handleAddBus} className="glass-panel p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Add Bus Details</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Route Start Location</label>
                  <input required type="text" placeholder="e.g. Mathura City" value={newBus.routeStart} onChange={(e) => setNewBus({ ...newBus, routeStart: e.target.value })} className="glass-input w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Capacity</label>
                  <input required type="number" min="1" placeholder="e.g. 50" value={newBus.capacity} onChange={(e) => setNewBus({ ...newBus, capacity: e.target.value })} className="glass-input w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Driver Name</label>
                  <input required type="text" placeholder="Driver Name" value={newBus.driverName} onChange={(e) => setNewBus({ ...newBus, driverName: e.target.value })} className="glass-input w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mobile Number</label>
                  <input required type="tel" placeholder="Mobile Number" value={newBus.mobileNumber} onChange={(e) => setNewBus({ ...newBus, mobileNumber: e.target.value })} className="glass-input w-full" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3 items-center">
                {busError && <p className="text-sm text-rose-600">{busError}</p>}
                <button type="submit" disabled={submitting} className="glass-button px-6 py-2.5 disabled:opacity-60">
                  {submitting ? "Saving…" : "Save Bus"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 xl:grid-cols-2">
        <AnimatePresence>
          {filteredBuses.map((bus) => (
            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }} key={bus.busNumber} className="glass-card interactive-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-2xl">
                    <Bus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{bus.busNumber}</h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${statusBadge[bus.status] || statusBadge.active}`}>
                        {bus.status?.replace("-", " ")}
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <MapPin className="h-4 w-4 text-emerald-500" />{bus.route}
                    </p>
                  </div>
                </div>
                <button onClick={() => removeBus(bus.busNumber)} className="glass-button-danger flex items-center gap-2 px-3 py-1.5 text-sm">
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>

              <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-4">
                <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/20 dark:border-slate-700/50">
                  <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide"><Users className="h-3.5 w-3.5" /> Capacity</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{bus.capacity}</p>
                </div>
                <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/20 dark:border-slate-700/50">
                  <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide"><User className="h-3.5 w-3.5" /> Driver</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white truncate">{bus.driver || "Unassigned"}</p>
                </div>
                <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/20 dark:border-slate-700/50">
                  <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide"><Phone className="h-3.5 w-3.5" /> Mobile</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white truncate">{bus.mobileNumber || "N/A"}</p>
                </div>
                <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/20 dark:border-slate-700/50">
                  <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide"><Activity className="h-3.5 w-3.5" /> Health</p>
                  <p className={`mt-2 text-sm font-bold ${bus.health === "warning" ? "text-amber-600 dark:text-amber-400" : bus.health === "critical" ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {bus.health || "good"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredBuses.length === 0 && (
          <div className="col-span-2 p-12 text-center glass-panel">
            <Bus className="h-12 w-12 mx-auto text-slate-400 mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300">No buses in fleet</h3>
            <p className="mt-2 text-muted-foreground">Add a new bus to see it listed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
