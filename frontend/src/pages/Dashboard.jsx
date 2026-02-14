import { Bus, Clock, AlertTriangle, Users } from 'lucide-react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { TopNav } from '../components/dashboard/TopNav';
import { StatCard } from '../components/dashboard/StatCard';
import { PeakHourChart, DailyTripChart } from '../components/dashboard/Charts';
import { LogHistoryTable } from '../components/dashboard/LogHistoryTable';
import { LiveBusStatus } from '../components/dashboard/LiveBusStatus';

export default function Dashboard() {
  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-[1800px] mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Smart Bus Monitoring System</h1>
              <p className="text-gray-600">Real-time campus bus tracking and analytics dashboard</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Trips Today"
                value="148"
                change="8.3%"
                trend="up"
                icon={Bus}
                gradient="bg-gradient-to-br from-blue-500 to-blue-600"
              />
              <StatCard
                title="Buses On Campus"
                value="4"
                change="2"
                trend="up"
                icon={Users}
                gradient="bg-gradient-to-br from-green-500 to-green-600"
              />
              <StatCard
                title="Late Arrivals"
                value="12"
                change="3.2%"
                trend="down"
                icon={Clock}
                gradient="bg-gradient-to-br from-orange-500 to-orange-600"
              />
              <StatCard
                title="Capacity Alerts"
                value="3"
                change="1"
                trend="up"
                icon={AlertTriangle}
                gradient="bg-gradient-to-br from-red-500 to-red-600"
              />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              <div className="xl:col-span-1">
                <LiveBusStatus />
              </div>
              <div className="xl:col-span-2 space-y-6">
                <PeakHourChart />
                <DailyTripChart />
              </div>
            </div>
            <LogHistoryTable />
          </div>
        </main>
      </div>
    </div>
  );
}
