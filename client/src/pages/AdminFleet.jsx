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
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Fleet Management
          </h2>
          <p className="mt-2 text-gray-400">
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
              <h3 className="mb-4 text-xl font-semibold text-white">Add Bus Details</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Route Start Location</label>
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
                  <label className="text-sm font-medium text-gray-300">Capacity</label>
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
                  <label className="text-sm font-medium text-gray-300">Driver Name</label>
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
                  <label className="text-sm font-medium text-gray-300">Mobile Number</label>
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
                  <div className="rounded-2xl bg-blue-500/10 p-3">
                    <Bus className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">ID: {bus.busNumber}</h3>
                    <p className="mt-1 flex items-center gap-2 text-gray-300">
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
                <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="h-4 w-4" /> Capacity
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {bus.capacity} seats
                  </p>
                </div>
                <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="h-4 w-4" /> Driver
                  </p>
                  <p className="mt-2 truncate text-lg font-semibold text-white">
                    {bus.driver || "Unassigned"}
                  </p>
                </div>
                <div className="col-span-2 flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:col-span-1">
                  <p className="flex items-center gap-2 text-sm text-gray-400">
                    <Phone className="h-4 w-4" /> Mobile
                  </p>
                  <p className="mt-2 truncate text-lg font-semibold text-white">
                    {bus.mobileNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        {buses.length === 0 && (
          <div className="col-span-2 p-12 text-center glass-panel">
            <Bus className="mx-auto mb-4 h-12 w-12 text-gray-500 opacity-60" />
            <h3 className="text-xl font-medium text-gray-200">No buses in fleet</h3>
            <p className="mt-2 text-gray-400">Add a new bus to see it listed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
