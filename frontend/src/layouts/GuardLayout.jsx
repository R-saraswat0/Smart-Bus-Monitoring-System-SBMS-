import { ClipboardList, History, House, Shield } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard/Sidebar";
import { TopNav } from "../components/dashboard/TopNav";

const guardItems = [
  { icon: House, label: "Overview", to: "/guard" },
  { icon: ClipboardList, label: "Log Entry", to: "/guard/log-entry" },
  { icon: History, label: "History", to: "/guard/history" },
];

export default function GuardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar brandLabel="SBMS" brandTitle="Guard Module" brandIcon={Shield} items={guardItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav title="Guard module" subtitle="Gate-side logging and shift activity" />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1600px] p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
