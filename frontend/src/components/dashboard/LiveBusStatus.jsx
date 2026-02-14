import { Clock, Users, MapPin } from 'lucide-react';

export function LiveBusStatus() {
  const activeBuses = [
    {
      busNumber: 'BUS-101',
      route: 'Main Gate → Engineering Block',
      guard: 'Rajesh Kumar',
      capacity: 45,
      occupancy: 38,
      status: 'on-campus',
      entryTime: '09:15 AM',
      location: 'Engineering Block',
    },
    {
      busNumber: 'BUS-205',
      route: 'North Gate → Library',
      guard: 'Amit Sharma',
      capacity: 50,
      occupancy: 52,
      status: 'overcrowded',
      entryTime: '09:22 AM',
      location: 'Central Square',
    },
    {
      busNumber: 'BUS-308',
      route: 'Main Gate → Medical Center',
      guard: 'Suresh Patil',
      capacity: 40,
      occupancy: 28,
      status: 'on-campus',
      entryTime: '09:30 AM',
      location: 'Medical Center',
    },
    {
      busNumber: 'BUS-412',
      route: 'East Gate → Sports Complex',
      guard: 'Vikram Singh',
      capacity: 45,
      occupancy: 41,
      status: 'on-campus',
      entryTime: '09:18 AM',
      location: 'Sports Complex',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-campus':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'overcrowded':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getOccupancyColor = (occupancy, capacity) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage > 100) return 'text-red-600';
    if (percentage > 80) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Live Bus Status</h3>
          <p className="text-sm text-gray-500 mt-1">Buses currently inside campus</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {activeBuses.map((bus) => (
          <div
            key={bus.busNumber}
            className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
              bus.status === 'overcrowded' ? 'border-red-200 bg-red-50/50' : 'border-gray-200 bg-gray-50/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-800">{bus.busNumber}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(bus.status)}`}>
                    {bus.status === 'overcrowded' ? 'Overcrowded' : 'Active'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{bus.route}</p>
              </div>
              <span className={`text-sm font-bold ${getOccupancyColor(bus.occupancy, bus.capacity)}`}>
                {bus.occupancy}/{bus.capacity}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{bus.guard}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{bus.entryTime}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{bus.location}</span>
              </div>
            </div>

            <div className="mt-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    bus.occupancy > bus.capacity
                      ? 'bg-red-500'
                      : bus.occupancy / bus.capacity > 0.8
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((bus.occupancy / bus.capacity) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
