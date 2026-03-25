import { LogHistoryTable } from "../components/dashboard/LogHistoryTable";
import { busLogs, guardProfile } from "../data/sbmsData";

export default function GuardHistory() {
  const guardLogs = busLogs.filter((log) => log.guard === guardProfile.name);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Guard History</h2>
        <p className="mt-2 text-slate-600">Review logs submitted by the active guard for the current workflow simulation.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Current guard</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{guardProfile.name}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Assigned gate</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{guardProfile.gate}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Visible records</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{guardLogs.length}</p>
        </div>
      </div>

      <LogHistoryTable logs={guardLogs} />
    </div>
  );
}
