import { AlertTriangle, BarChart3, Bus, LayoutDashboard, MapPin, Users } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard/Sidebar";
import { TopNav } from "../components/dashboard/TopNav";
import Footer from "../components/common/Footer";

const adminItems = [
  { icon: LayoutDashboard, label: "Overview", to: "/admin" },
  { icon: Bus, label: "Fleet", to: "/admin/fleet" },
  { icon: Users, label: "Guards", to: "/admin/guards" },
  { icon: AlertTriangle, label: "Alerts", to: "/admin/alerts" },
  { icon: MapPin, label: "Live", to: "/admin/live" },
  { icon: BarChart3, label: "Reports", to: "/admin/reports" },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#000000]">
      <Sidebar brandLabel="SBMS" brandTitle="Admin Module" brandIcon={Bus} items={adminItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav title="Admin module" subtitle="Campus transport operations and analytics" />
        <main className="flex-1 overflow-y-auto bg-black/40">
          <div className="mx-auto max-w-[1800px] p-4 sm:p-6 lg:p-10 xl:p-12">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
