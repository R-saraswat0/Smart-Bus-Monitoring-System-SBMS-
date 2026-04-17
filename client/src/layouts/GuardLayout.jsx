import { ClipboardList, History, House, Shield, User } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard/Sidebar";
import { TopNav } from "../components/dashboard/TopNav";
import Footer from "../components/common/Footer";

const guardItems = [
  { icon: House, label: "Overview", to: "/guard" },
  { icon: ClipboardList, label: "Log Entry", to: "/guard/log-entry" },
  { icon: History, label: "History", to: "/guard/history" },
];

export default function GuardLayout() {
  return (
    <div className="flex min-h-screen bg-[#000000]">
      <Sidebar brandLabel="SBMS" brandTitle="Guard Module" brandIcon={User} items={guardItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav title="Guard module" subtitle="Gate-side logging and shift activity" />
        <main className="flex-1 overflow-y-auto bg-black/40">
          <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-10 xl:p-12">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
