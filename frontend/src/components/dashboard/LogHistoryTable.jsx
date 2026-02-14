import { useState } from 'react';
import { Filter, Download } from 'lucide-react';

export function LogHistoryTable() {
  const [filterType, setFilterType] = useState('all');
  const [searchBus, setSearchBus] = useState('');
  const [searchGuard, setSearchGuard] = useState('');

  const logs = [
    {
      id: 'LOG-1234',
      busNumber: 'BUS-101',
      guard: 'Rajesh Kumar',
      type: 'entry',
      time: '09:15 AM',
      date: 'Feb 14, 2026',
      gate: 'Main Gate',
      occupancy: 38,
      capacity: 45,
      status: 'on-time',
    },
    {
      id: 'LOG-1235',
      busNumber: 'BUS-205',
      guard: 'Amit Sharma',
      type: 'entry',
      time: '09:22 AM',
      date: 'Feb 14, 2026',
      gate: 'North Gate',
      occupancy: 52,
      capacity: 50,
      status: 'overcrowded',
    },
    {
      id: 'LOG-1236',
      busNumber: 'BUS-308',
      guard: 'Suresh Patil',
      type: 'exit',
      time: '09:35 AM',
      date: 'Feb 14, 2026',
      gate: 'East Gate',
      occupancy: 28,
      capacity: 40,
      status: 'on-time',
    },
    {
      id: 'LOG-1237',
      busNumber: 'BUS-412',
      guard: 'Vikram Singh',
      type: 'entry',
      time: '09:42 AM',
      date: 'Feb 14, 2026',
      gate: 'Main Gate',
      occupancy: 41,
      capacity: 45,
      status: 'late',
    },
    {
      id: 'LOG-1238',
      busNumber: 'BUS-101',
      guard: 'Rajesh Kumar',
      type: 'exit',
      time: '10:05 AM',
      date: 'Feb 14, 2026',
      gate: 'South Gate',
      occupancy: 35,
      capacity: 45,
      status: 'on-time',
    },
    {
      id: 'LOG-1239',
      busNumber: 'BUS-508',
      guard: 'Manoj Verma',
      type: 'entry',
      time: '10:18 AM',
      date: 'Feb 14, 2026',
      gate: 'North Gate',
      occupancy: 48,
      capacity: 50,
      status: 'late',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'bg-green-100 text-green-700';
      case 'late':
        return 'bg-red-100 text-red-700';
      case 'overcrowded':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type) => {
    return type === 'entry' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
  };

  const filteredLogs = logs.filter((log) => {
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesBus = searchBus === '' || log.busNumber.toLowerCase().includes(searchBus.toLowerCase());
    const matchesGuard = searchGuard === '' || log.guard.toLowerCase().includes(searchGuard.toLowerCase());
    return matchesType && matchesBus && matchesGuard;
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Log History</h3>
          <p className="text-sm text-gray-500 mt-1">Entry and exit records</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors text-sm font-medium">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="entry">Entry Only</option>
          <option value="exit">Exit Only</option>
        </select>

        <input
          type="text"
          placeholder="Bus Number"
          value={searchBus}
          onChange={(e) => setSearchBus(e.target.value)}
          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
        />

        <input
          type="text"
          placeholder="Guard Name"
          value={searchGuard}
          onChange={(e) => setSearchGuard(e.target.value)}
          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
        />

        {(filterType !== 'all' || searchBus || searchGuard) && (
          <button
            onClick={() => {
              setFilterType('all');
              setSearchBus('');
              setSearchGuard('');
            }}
            className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Log ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Bus Number</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Guard Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Time</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Gate</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Occupancy</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  log.status === 'late' || log.status === 'overcrowded' ? 'bg-red-50/30' : ''
                }`}
              >
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-gray-800">{log.id}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-semibold text-blue-600">{log.busNumber}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-800">{log.guard}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${getTypeColor(log.type)}`}>
                    {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{log.time}</div>
                    <div className="text-xs text-gray-500">{log.date}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600">{log.gate}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-gray-800">
                    {log.occupancy}/{log.capacity}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${getStatusColor(log.status)}`}>
                    {log.status === 'on-time' ? 'On Time' : log.status === 'late' ? 'Late' : 'Overcrowded'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No logs found matching the current filters.
        </div>
      )}
    </div>
  );
}
