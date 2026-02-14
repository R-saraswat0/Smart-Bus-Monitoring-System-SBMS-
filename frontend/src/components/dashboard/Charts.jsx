import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const peakHourData = [
  { hour: '6 AM', trips: 8 },
  { hour: '7 AM', trips: 15 },
  { hour: '8 AM', trips: 28 },
  { hour: '9 AM', trips: 35 },
  { hour: '10 AM', trips: 22 },
  { hour: '11 AM', trips: 18 },
  { hour: '12 PM', trips: 20 },
  { hour: '1 PM', trips: 24 },
  { hour: '2 PM', trips: 19 },
  { hour: '3 PM', trips: 26 },
  { hour: '4 PM', trips: 32 },
  { hour: '5 PM', trips: 38 },
  { hour: '6 PM', trips: 30 },
  { hour: '7 PM', trips: 12 },
];

const dailyTripData = [
  { day: 'Mon', trips: 145, onTime: 132, late: 13 },
  { day: 'Tue', trips: 152, onTime: 138, late: 14 },
  { day: 'Wed', trips: 148, onTime: 142, late: 6 },
  { day: 'Thu', trips: 158, onTime: 145, late: 13 },
  { day: 'Fri', trips: 162, onTime: 150, late: 12 },
  { day: 'Sat', trips: 98, onTime: 92, late: 6 },
  { day: 'Sun', trips: 85, onTime: 81, late: 4 },
];

export function PeakHourChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Peak Hour Analysis</h3>
          <p className="text-sm text-gray-500 mt-1">Trips per hour distribution</p>
        </div>
        <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Today</option>
          <option>Yesterday</option>
          <option>This Week</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={peakHourData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Bar dataKey="trips" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DailyTripChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Daily Trip Trends</h3>
          <p className="text-sm text-gray-500 mt-1">Weekly trip analysis with punctuality</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dailyTripData}>
          <defs>
            <linearGradient id="colorOnTime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="onTime"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorOnTime)"
          />
          <Area
            type="monotone"
            dataKey="late"
            stroke="#ef4444"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorLate)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
