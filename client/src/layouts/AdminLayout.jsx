import { AlertTriangle, BarChart3, Bus, LayoutDashboard, Shield, Users, MessageSquare, Globe } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { TopNav } from "../components/dashboard/TopNav";

const adminItems = [
  { icon: Globe, label: "Main Dashboard", to: "/" },
  { icon: LayoutDashboard, label: "Overview", to: "/admin" },
  { icon: Bus, label: "Fleet", to: "/admin/fleet" },
  { icon: Users, label: "Guards", to: "/admin/guards" },
  { icon: AlertTriangle, label: "Alerts", to: "/admin/alerts" },
  { icon: MessageSquare, label: "Messages", to: "/admin/messages" },
  { icon: BarChart3, label: "Reports", to: "/admin/reports" },
];

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        brandLabel="SBMS" 
        brandTitle="Admin Module" 
        brandIcon={Bus} 
        items={adminItems} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav 
          title="Admin module" 
          subtitle="Campus transport operations and analytics" 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1800px] p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
