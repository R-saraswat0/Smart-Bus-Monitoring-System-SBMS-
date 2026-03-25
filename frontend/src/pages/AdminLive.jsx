import { Clock3, MapPin, Radio, ShieldCheck } from "lucide-react";
import { LiveBusStatus } from "../components/dashboard/LiveBusStatus";
import { activeBuses, gateActivity } from "../data/sbmsData";

export default function AdminLive() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Live Monitoring</h2>
        <p className="mt-2 text-slate-600">Track bus presence, gate coverage, and real-time movement across campus.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <LiveBusStatus buses={activeBuses} />

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-800">
                <Radio className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Control feed</h3>
                <p className="text-sm text-slate-500">Key live notes from the monitoring screen.</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <p className="rounded-2xl bg-slate-50 p-4">BUS-205 exceeded seat capacity near Central Square and is flagged for intervention.</p>
              <p className="rounded-2xl bg-slate-50 p-4">Main Gate has processed the highest movement volume in the last 90 minutes.</p>
              <p className="rounded-2xl bg-slate-50 p-4">Medical Center route remains the most punctual service window for today.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">Gate readiness</h3>
            <div className="mt-5 space-y-4">
              {gateActivity.map((gate) => (
                <div key={gate.gate} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950">{gate.gate}</p>
                      <p className="mt-1 text-sm text-slate-500">Guard: {gate.activeGuard}</p>
                    </div>
                    <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Online</div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1"><Clock3 className="h-4 w-4" /> {gate.entries + gate.exits} events</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Shift active</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Campus perimeter</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
