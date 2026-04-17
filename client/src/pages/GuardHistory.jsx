import { LogHistoryTable } from "../components/dashboard/LogHistoryTable";
import { guardProfile } from "../data/sbmsData";
import { useData } from "../context/DataContext";

export default function GuardHistory() {
  const { logs } = useData();
  const guardLogs = logs.filter((log) => log.guard === guardProfile.name);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Guard History</h2>
        <p className="mt-2 text-gray-400">Review logs submitted by the active guard for the current workflow simulation.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card interactive-card p-6 text-center flex flex-col items-center justify-center">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">Current guard</p>
          <p className="mt-2 text-2xl font-bold text-white">{guardProfile.name}</p>
        </div>
        <div className="glass-card interactive-card p-6 text-center flex flex-col items-center justify-center">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">Assigned gate</p>
          <p className="mt-2 text-2xl font-bold text-white">{guardProfile.gate}</p>
        </div>
        <div className="glass-card interactive-card p-6 text-center flex flex-col items-center justify-center">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">Visible records</p>
          <p className="mt-2 text-2xl font-bold text-white">{guardLogs.length}</p>
        </div>
      </div>

      <LogHistoryTable logs={guardLogs} />
    </div>
  );
}
