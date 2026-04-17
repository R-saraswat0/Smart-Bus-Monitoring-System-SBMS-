import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts";

const PeakHourCustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="rounded-xl border border-white/10 bg-black/80 p-3 shadow-lg backdrop-blur-md">
        <p className="mb-1 font-bold text-white">{label}</p>
        <p className="flex items-center gap-2 text-sm font-semibold text-gray-300">
          <span className="w-3 h-3 rounded-full" style={{ background: dataPoint.fill.includes('url') ? (dataPoint.type === 'Arrival' ? '#3b82f6' : '#14b8a6') : dataPoint.fill }}></span>
          {dataPoint.count} {dataPoint.type}s
        </p>
      </div>
    );
  }
  return null;
};

export function PeakHourChart({ data }) {

  return (
    <div className="glass-card p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Peak Hour Analysis</h3>
          <p className="mt-1 text-sm text-gray-400">Time-based volume scaling with late arrival warnings.</p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-gray-300">Today</div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.6} />
            <XAxis dataKey="hour" stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <Tooltip content={<PeakHourCustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="count" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
            <defs>
              <linearGradient id="colorArrival" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
              <linearGradient id="colorDeparture" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function DailyTripChart({ data }) {
  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Daily Trip Trends</h3>
        <p className="mt-1 text-sm text-gray-400">Weekly volume with on-time versus late service.</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorOnTime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.6} />
            <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(2, 6, 23, 0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "14px",
                color: "#e2e8f0",
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.6)",
              }}
            />
            <Legend />
            <Area type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorOnTime)" />
            <Area type="monotone" dataKey="late" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorLate)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
