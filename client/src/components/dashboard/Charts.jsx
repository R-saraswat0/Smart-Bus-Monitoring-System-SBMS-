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

export function PeakHourChart({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-white/20 dark:border-white/10 p-3 rounded-xl shadow-lg">
          <p className="font-bold text-slate-900 dark:text-white mb-1">{label}</p>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: dataPoint.fill.includes('url') ? (dataPoint.type === 'Arrival' ? '#3b82f6' : '#14b8a6') : dataPoint.fill }}></span>
            {dataPoint.count} {dataPoint.type}s
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Peak Hour Analysis</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Time-based volume scaling with late arrival warnings.</p>
        </div>
        <div className="rounded-full bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-md px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">Today</div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
            <XAxis dataKey="hour" stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
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
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Daily Trip Trends</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Weekly volume with on-time versus late service.</p>
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
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
            <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
                color: "var(--foreground)",
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
