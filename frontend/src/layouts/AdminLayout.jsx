import { AlertTriangle, BarChart3, Bus, LayoutDashboard, Shield, Users } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard/Sidebar";
import { TopNav } from "../components/dashboard/TopNav";

const adminItems = [
  { icon: LayoutDashboard, label: "Overview", to: "/admin" },
  { icon: Shield, label: "Live Monitor", to: "/admin/live" },
  { icon: Bus, label: "Fleet", to: "/admin/fleet" },
  { icon: Users, label: "Guards", to: "/admin/guards" },
  { icon: AlertTriangle, label: "Alerts", to: "/admin/alerts" },
  { icon: BarChart3, label: "Reports", to: "/admin/reports" },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar brandLabel="SBMS" brandTitle="Admin Module" brandIcon={Bus} items={adminItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav title="Admin module" subtitle="Campus transport operations and analytics" />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1800px] p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
