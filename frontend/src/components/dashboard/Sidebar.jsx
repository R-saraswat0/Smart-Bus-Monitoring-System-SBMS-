import { LayoutDashboard, Bus, MapPin, Clock, Users, AlertTriangle, BarChart3, Settings } from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Bus, label: 'Fleet Status', active: false },
    { icon: MapPin, label: 'Live Tracking', active: false },
    { icon: Clock, label: 'Schedule', active: false },
    { icon: Users, label: 'Guards', active: false },
    { icon: AlertTriangle, label: 'Alerts', active: false },
    { icon: BarChart3, label: 'Reports', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-200">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
          <Bus className="w-5 h-5 text-white" />
        </div>
        <span className="hidden lg:block ml-3 font-semibold text-gray-800 text-lg">SBMS</span>
      </div>

      <nav className="flex-1 py-6 px-3 lg:px-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded-xl transition-all duration-200 ${
                  item.active
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="hidden lg:block ml-3 font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
