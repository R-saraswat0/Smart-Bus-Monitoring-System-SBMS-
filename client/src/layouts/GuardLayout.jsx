import { ClipboardList, History, House, Shield, MessageSquare, Globe } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { TopNav } from "../components/dashboard/TopNav";

const guardItems = [
  { icon: Globe, label: "Main Dashboard", to: "/" },
  { icon: House, label: "Overview", to: "/guard" },
  { icon: ClipboardList, label: "Log Entry", to: "/guard/log-entry" },
  { icon: History, label: "History", to: "/guard/history" },
  { icon: MessageSquare, label: "Messages", to: "/guard/messages" },
];

export default function GuardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        brandLabel="SBMS" 
        brandTitle="Guard Module" 
        brandIcon={Shield} 
        items={guardItems} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav 
          title="Guard module" 
          subtitle="Gate-side logging and shift activity" 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1600px] p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
