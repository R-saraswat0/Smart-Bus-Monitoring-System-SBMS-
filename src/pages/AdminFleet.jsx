import { Bus, Plus, Trash2, User, Phone, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { useData } from "../context/DataContext";

export default function AdminFleet() {
  const { buses, addBus, removeBus } = useData();

  const [isAdding, setIsAdding] = useState(false);
  const [newBus, setNewBus] = useState({
    routeStart: "",
    capacity: "",
    driverName: "",
    mobileNumber: "",
  });

  const handleAddBus = (e) => {
    e.preventDefault();
    const nextId = String(buses.length + 1).padStart(3, "0");
    
    const busEntry = {
      busNumber: nextId,
      route: `${newBus.routeStart} → GLA`,
      capacity: parseInt(newBus.capacity) || 0,
      driver: newBus.driverName,
      mobileNumber: newBus.mobileNumber,
      status: "active",
      health: "good"
    };

    addBus(busEntry);
    setNewBus({ routeStart: "", capacity: "", driverName: "", mobileNumber: "" });
    setIsAdding(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">
            Fleet Management
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Manage your fleet, driver assignments, and routes.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="glass-button flex items-center gap-2 px-5 py-2.5 w-fit"
        >
          <Plus className="h-5 w-5" />
          {isAdding ? "Cancel" : "Add New Bus"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddBus} className="glass-panel p-6 mb-8 animate-in fade-in duration-300">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Add Bus Details</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Route Start Location</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Mathura City"
                    value={newBus.routeStart}
                    onChange={(e) => setNewBus({ ...newBus, routeStart: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Capacity</label>
                  <input
                    required
                    type="number"
                    min="1"
                    placeholder="e.g. 50"
                    value={newBus.capacity}
                    onChange={(e) => setNewBus({ ...newBus, capacity: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Driver Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Driver Name"
                    value={newBus.driverName}
                    onChange={(e) => setNewBus({ ...newBus, driverName: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mobile Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="Mobile Number"
                    value={newBus.mobileNumber}
                    onChange={(e) => setNewBus({ ...newBus, mobileNumber: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button type="submit" className="glass-button px-6 py-2.5">
                  Save Bus
                </button>
              </div>
            </form>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        {buses.map((bus) => (
            <div
              key={bus.busNumber}
              className="glass-card interactive-card p-6 animate-in fade-in duration-300"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-2xl">
                    <Bus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">ID: {bus.busNumber}</h3>
                    <p className="mt-1 flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <MapPin className="h-4 w-4 text-emerald-500" />
                      {bus.route}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeBus(bus.busNumber)}
                  className="glass-button-danger flex items-center gap-2 px-3 py-1.5 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove Bus
                </button>
              </div>

              <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3">
                <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl flex flex-col justify-center border border-white/20 dark:border-slate-700/50">
                  <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Users className="h-4 w-4" /> Capacity
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                    {bus.capacity} seats
                  </p>
                </div>
                <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl flex flex-col justify-center border border-white/20 dark:border-slate-700/50">
                  <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <User className="h-4 w-4" /> Driver
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white truncate">
                    {bus.driver || "Unassigned"}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl flex flex-col justify-center border border-white/20 dark:border-slate-700/50">
                  <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Phone className="h-4 w-4" /> Mobile
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white truncate">
                    {bus.mobileNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        {buses.length === 0 && (
          <div className="col-span-2 p-12 text-center glass-panel">
            <Bus className="h-12 w-12 mx-auto text-slate-400 mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300">No buses in fleet</h3>
            <p className="mt-2 text-slate-500">Add a new bus to see it listed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
