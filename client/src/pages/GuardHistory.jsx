import { LogHistoryTable } from "../components/dashboard/LogHistoryTable";
import { busLogs, guardProfile } from "../data/sbmsData";

export default function GuardHistory() {
  const guardLogs = busLogs.filter((log) => log.guard === guardProfile.name);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Guard History</h2>
        <p className="mt-2 text-muted-foreground">Review logs submitted by the active guard for the current workflow simulation.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Current guard</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{guardProfile.name}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Assigned gate</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{guardProfile.gate}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Visible records</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{guardLogs.length}</p>
        </div>
      </div>

      <LogHistoryTable logs={guardLogs} />
    </div>
  );
}
