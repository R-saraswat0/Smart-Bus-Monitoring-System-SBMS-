import {
  Activity,
  ArrowRight,
  Shield,
  User,
  AlertOctagon,
  Layers,
  CheckCircle2,
  Clock,
  History,
  LayoutDashboard
} from "lucide-react";
import { Link } from "react-router-dom";
import MainHeader from "../components/common/MainHeader";
import Footer from "../components/common/Footer";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { motion } from "framer-motion";

export default function Homepage() {
  const { session } = useAuth();
  const { buses, logs, alerts } = useData();
  const latestLogs = logs.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <MainHeader />
      
      <main>
        {/* --- SECTION 1: HERO & SNAPSHOT --- */}
        <section id="overview" className="overflow-hidden px-6 pb-16 pt-16 lg:px-10">
          <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="gold-glow mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-amber-300">
                Smart Bus Monitoring System
              </div>
              <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl xl:text-7xl">
                Next-Generation Campus
                <br />
                Transit <span className="text-amber-400">Security & Tracking.</span>
              </h1>
              <p className="mb-10 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
                The Smart Bus Monitoring System digitizes essential transit workflows: security
                guards can log arrivals and departures instantly, while administrators track fleet
                status, monitor overcrowding, and generate reports from a central dashboard.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={session?.role === "guard" ? "/guard" : "/login/guard"}
                  className="flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-semibold text-black transition-all hover:bg-amber-500 hover:shadow-[0_0_24px_-6px_rgba(251,191,36,0.6)]"
                >
                  Start Guard Workflow
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={session?.role === "admin" ? "/admin" : "/login/admin"}
                  className="rounded-xl border border-white/15 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/[0.08]"
                >
                  View Admin Reports
                </Link>
              </div>
            </motion.div>

            {/* Right: Operations Snapshot */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="premium-card flex min-h-[500px] flex-col border-white/10 p-8"
            >
              <div className="mb-10 flex items-start justify-between">
                <div>
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-amber-300">
                    Operations Snapshot
                  </p>
                  <h2 className="max-w-[14rem] text-3xl font-bold leading-tight tracking-tight">Today at the campus gates</h2>
                </div>
                <div className="status-badge flex items-center gap-2 whitespace-nowrap border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-emerald-300">
                  <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                  Real-time status
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {buses.slice(0, 3).map((bus) => (
                  <div key={bus.busNumber} className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-white/15 hover:bg-white/[0.06]">
                    <div>
                      <span className="mb-1 block text-sm font-semibold tracking-wide text-white">{bus.busNumber}</span>
                      <span className="text-xs text-gray-400">{bus.route}</span>
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">Active</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SECTION 2: STATS --- */}
        <section className="px-6 py-10 lg:px-10">
          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="premium-card border-white/10 p-8">
              <p className="mb-2 text-xs font-medium tracking-[0.18em] text-gray-400">Registered buses</p>
              <h3 className="mb-1 text-5xl font-bold text-amber-300">{buses.length}</h3>
              <p className="text-sm text-gray-500">Total in system</p>
            </div>
            <div className="premium-card border-white/10 p-8">
              <p className="mb-2 text-xs font-medium tracking-[0.18em] text-gray-400">Trips logged</p>
              <h3 className="mb-1 text-5xl font-bold text-cyan-300">{logs.length}</h3>
              <p className="text-sm text-gray-500">Across all gates</p>
            </div>
            <div className="premium-card border-white/10 p-8">
              <p className="mb-2 text-xs font-medium tracking-[0.18em] text-gray-400">Active alerts</p>
              <h3 className="mb-1 text-5xl font-bold text-rose-300">{alerts.length}</h3>
              <p className="text-sm text-gray-500">Triggered cases</p>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: CORE MODULES --- */}
        <section id="modules" className="px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14">
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-amber-300">Core Modules</p>
              <h2 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                Architecture built for security & scale
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
                The system delivers immediate value through secure, gate-side logging for guards and
                comprehensive, real-time analytics for transport administration.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="mb-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Shield, title: "Guard-first logging", desc: "Fast arrival and departure capture with gate, passenger count, and timestamp in one flow.", color: "text-amber-400", bg: "bg-amber-400/10" },
                { icon: Activity, title: "Admin analytics", desc: "Track trips, delays, crowding, and guard activity from a single operations view.", color: "text-teal-400", bg: "bg-teal-400/10" },
                { icon: AlertOctagon, title: "Capacity alerts", desc: "Flag overloaded buses immediately so transport and security teams can respond.", color: "text-red-400", bg: "bg-red-400/10" },
                { icon: Layers, title: "Role-based access", desc: "Separate guard workflows from administrative reporting and oversight.", color: "text-purple-400", bg: "bg-purple-400/10" }
              ].map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="premium-card group flex h-full cursor-default flex-col border-white/10 p-7 hover:border-white/20"
                >
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${f.bg} transition-transform shadow-lg group-hover:scale-110`}>
                    <f.icon className={`h-8 w-8 ${f.color}`} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Service Panels */}
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="premium-card border-amber-400/20 bg-amber-400/[0.04] p-10 hover:bg-amber-400/[0.06]">
                <div className="mb-8 flex items-center gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10">
                    <Shield className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">Security Guard Panel</h3>
                </div>
                <p className="mb-8 text-base leading-relaxed text-gray-300">
                  Designed for quick gate-side use with bus selection, arrival or departure entry,
                  occupancy tracking, and instant recent-history feedback.
                </p>
                <ul className="space-y-3">
                  {[
                    "Auto timestamp behavior",
                    "Capacity validation",
                    "Last five logs visible immediately"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-amber-300">
                      <CheckCircle2 className="h-5 w-5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card border-teal-400/20 bg-teal-400/[0.04] p-10 hover:bg-teal-400/[0.06]">
                <div className="mb-8 flex items-center gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10">
                    <LayoutDashboard className="h-8 w-8 text-teal-400" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">Admin Module</h3>
                </div>
                <p className="mb-8 text-base leading-relaxed text-gray-300">
                  Real-time style metrics, crowding flags, trip history, and chart-based visibility
                  into peak traffic and late arrivals.
                </p>
                <ul className="space-y-3">
                  {[
                    "Live bus status cards",
                    "Trip trend and peak hour charts",
                    "Filterable history table"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-teal-300">
                      <CheckCircle2 className="h-5 w-5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: ACTIVITY --- */}
        <section id="activity" className="bg-white/[0.03] px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <Layers className="h-8 w-8 text-amber-400" />
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">System Objectives</h3>
              </div>
              <div className="space-y-6 text-base leading-relaxed text-gray-400 md:text-lg">
                <p>The Smart Bus Monitoring System provides an end-to-end framework for securing campus transit.</p>
                <p>This project introduces real-time guard logging, live operational dashboards, and automated capacity monitoring to replace outdated manual entry methods.</p>
                <p>Built with scalability and modern user experience in mind, ensuring safety and punctuality for all university routes.</p>
              </div>
            </div>

            <div>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">Recent activity sample</h3>
                <Link to="/admin" className="rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-xs font-medium text-gray-300 transition-colors hover:text-white">
                  Open reports
                </Link>
              </div>
              <p className="mb-6 text-sm text-gray-400">
                Live operational log history from campus gates.
              </p>
              
              <div className="space-y-4">
                {latestLogs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="premium-card flex items-center justify-between gap-3 border-white/10 p-5 group"
                  >
                    <div>
                      <h4 className="mb-1 text-base font-semibold md:text-lg">{log.busNumber}</h4>
                      <p className="text-xs text-gray-400">
                        {log.guard || "Guard"} at Gate {log.gate || "1"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`status-badge ${log.type === 'entry' ? 'bg-teal-400/10 text-teal-400' : 'bg-orange-400/10 text-orange-400'}`}>
                        {log.type}
                      </span>
                      <span className="text-xs font-semibold text-gray-400">{log.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
