import { Bus, Fuel, ShieldAlert, Wrench } from "lucide-react";
import { fleet } from "../data/sbmsData";

function getHealthTone(health) {
  if (health === "warning") return "bg-amber-100 text-amber-700";
  return "bg-emerald-100 text-emerald-700";
}

function getStatusTone(status) {
  if (status === "maintenance-due") return "bg-rose-100 text-rose-700";
  if (status === "standby") return "bg-slate-100 text-slate-700";
  return "bg-sky-100 text-sky-700";
}

export default function AdminFleet() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Fleet Management</h2>
        <p className="mt-2 text-slate-600">Vehicle assignments, driver information, maintenance health, and route readiness.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {fleet.map((bus) => (
          <div key={bus.busNumber} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Bus className="h-5 w-5 text-teal-700" />
                  <h3 className="text-xl font-semibold text-slate-950">{bus.busNumber}</h3>
                </div>
                <p className="mt-2 text-slate-600">{bus.route}</p>
                <p className="mt-1 text-sm text-slate-500">Driver: {bus.driver}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className={`rounded-full px-3 py-1 ${getStatusTone(bus.status)}`}>{bus.status}</span>
                <span className={`rounded-full px-3 py-1 ${getHealthTone(bus.health)}`}>{bus.health}</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Capacity</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">{bus.capacity}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Plate</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{bus.plate}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Fuel level</p>
                <p className="mt-2 flex items-center gap-2 text-2xl font-semibold text-slate-950">
                  <Fuel className="h-5 w-5 text-amber-600" />
                  {bus.fuelLevel}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Last service</p>
                <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-slate-950">
                  <Wrench className="h-5 w-5 text-slate-600" />
                  {bus.lastService}
                </p>
              </div>
            </div>

            {bus.health === "warning" && (
              <div className="mt-5 flex items-center gap-2 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
                <ShieldAlert className="h-4 w-4" />
                Review this bus before the next heavy-load campus cycle.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
