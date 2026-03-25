import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bus,
  CheckCircle2,
  Lock,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import MainHeader from "../components/common/MainHeader";
import Footer from "../components/common/Footer";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

const features = [
  {
    icon: Shield,
    title: "Guard-first logging",
    description: "Fast arrival and departure capture with gate, passenger count, and timestamp in one flow.",
  },
  {
    icon: BarChart3,
    title: "Admin analytics",
    description: "Track trips, delays, crowding, and guard activity from a single operations view.",
  },
  {
    icon: AlertTriangle,
    title: "Capacity alerts",
    description: "Flag overloaded buses immediately so transport and security teams can respond.",
  },
  {
    icon: Lock,
    title: "Role-based access",
    description: "Separate guard workflows from administrative reporting and oversight.",
  },
];

export default function Homepage() {
  const { session } = useAuth();
  const { buses, logs, alerts } = useData();
  const latestLogs = logs.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      <MainHeader />
      <main>
        <section id="overview" className="px-6 pb-18 pt-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex rounded-full border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-2 text-sm font-medium text-cyan-700 dark:border-cyan-400/30 dark:bg-cyan-900/20 dark:text-cyan-300">
                Smart Bus Monitoring System
              </div>
              <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                Next-Generation Campus Transit Security & Tracking.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                The Smart Bus Monitoring System digitizes essential transit workflows: security guards can log arrivals and
                departures instantly, while administrators track fleet status, monitor overcrowding, and generate reports from a central dashboard.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="glass-button">
                  <Link to={session?.role === "guard" ? "/guard/log-entry" : "/login/guard"}>
                    Launch guard workflow
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="glass-button-secondary">
                  <Link to={session?.role === "admin" ? "/admin" : "/login/admin"}>See admin analytics</Link>
                </Button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <Card className="gap-3 glass-card p-5">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Registered buses</p>
                  <p className="text-3xl font-semibold text-slate-900 dark:text-white">{buses.length}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total in system</p>
                </Card>
                <Card className="gap-3 glass-card p-5">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Trips logged</p>
                  <p className="text-3xl font-semibold text-slate-900 dark:text-white">{logs.length}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Across all gates</p>
                </Card>
                <Card className="gap-3 glass-card p-5">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active alerts</p>
                  <p className="text-3xl font-semibold text-slate-900 dark:text-white">{alerts?.length || 0}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Triggered cases</p>
                </Card>
              </div>
            </div>

            <Card className="overflow-hidden glass-card text-slate-900 dark:text-white shadow-2xl dark:shadow-cyan-400/10">
              <div className="border-b border-slate-200/30 dark:border-cyan-400/10 px-6 py-5 bg-gradient-to-r from-white/60 to-blue-50/40 dark:from-slate-900/70 dark:to-slate-900/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">Operations snapshot</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Today at the campus gates</h2>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    Real-time status
                  </div>
                </div>
              </div>

              <div className="grid gap-4 px-6 py-6">
                {buses.slice(0, 3).map((bus) => (
                  <div key={bus.busNumber} className="rounded-2xl border border-slate-200/30 dark:border-cyan-400/10 bg-white/40 dark:bg-slate-800/40 p-4 transition-all hover:bg-white/60 dark:hover:bg-slate-800/60">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">{bus.busNumber}</p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{bus.route}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          bus.health === "warning" || bus.status === "maintenance-due"
                            ? "bg-rose-500/20 text-rose-700 dark:text-rose-300"
                            : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                        }`}
                      >
                        {bus.health === "warning" || bus.status === "maintenance-due" ? "Attention Needed" : "Active Status"}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700 dark:text-slate-300">
                      <span className="flex items-center gap-1">Driver: {bus.driver || "Unassigned"}</span>
                      <span className="flex items-center gap-1">Capacity: {bus.capacity}</span>
                      <span className="flex items-center gap-1">Condition: {bus.health || "Good"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="modules" className="px-6 py-18 bg-gradient-to-b from-transparent via-blue-50/50 to-cyan-50/50 dark:via-slate-900/30 dark:to-slate-950/30">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-400">Core modules</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">Architecture built for security & scale</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                The system delivers immediate value through secure, gate-side logging for guards and comprehensive, real-time analytics for transport administration.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="glass-card p-6 transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 dark:from-cyan-400 dark:to-emerald-500 text-white shadow-lg shadow-cyan-500/30">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-4">{feature.title}</h3>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-400 mt-2">{feature.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Card className="glass-card bg-gradient-to-br from-cyan-50/80 to-blue-50/60 dark:from-cyan-900/20 dark:to-teal-900/20 p-8">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">Security Guard Panel</h3>
                </div>
                <p className="mt-4 text-slate-700 dark:text-slate-300">
                  Designed for quick gate-side use with bus selection, arrival or departure entry, occupancy tracking, and instant recent-history feedback.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-400">
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" /> Auto timestamp behavior</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" /> Capacity validation</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" /> Last five logs visible immediately</p>
                </div>
              </Card>

              <Card className="glass-card bg-gradient-to-br from-slate-900/80 to-slate-800/80 dark:from-slate-800/90 dark:to-slate-900/90 p-8 text-white">
                <div className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-cyan-300" />
                  <h3 className="text-2xl font-semibold">Admin Module</h3>
                </div>
                <p className="mt-4 text-slate-300">
                  Real-time style metrics, crowding flags, trip history, and chart-based visibility into peak traffic and late arrivals.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Live bus status cards</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Trip trend and peak hour charts</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Filterable history table</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="activity" className="px-6 pb-20 bg-gradient-to-b from-white via-blue-50/40 to-white dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Card className="glass-card p-8">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">System Objectives</h3>
                </div>
                <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-400">
                  <p>The Smart Bus Monitoring System provides an end-to-end framework for securing campus transit.</p>
                  <p>This project introduces real-time guard logging, live operational dashboards, and automated capacity monitoring to replace outdated manual entry methods.</p>
                  <p>Built with scalability and modern user experience in mind, ensuring safety and punctuality for all university routes.</p>
                </div>
              </Card>

              <Card className="glass-card p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">Recent activity sample</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Live operational log history from campus gates.</p>
                  </div>
                  <Button asChild className="glass-button-secondary hidden sm:inline-flex">
                    <Link to="/admin/reports">Open reports</Link>
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  {latestLogs.map((log) => (
                    <div key={log.id} className="rounded-2xl border border-slate-200/30 dark:border-cyan-400/10 bg-gradient-to-r from-white/60 to-blue-50/40 dark:from-slate-800/40 dark:to-slate-800/20 p-4 transition-all hover:shadow-md">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{log.busNumber}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{log.guard} at {log.gate}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="rounded-full bg-slate-200/60 dark:bg-slate-700/60 px-3 py-1 font-medium text-slate-700 dark:text-slate-300">{log.type}</span>
                          <span className="rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-teal-900/40 px-3 py-1 font-medium text-cyan-800 dark:text-cyan-300">{log.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="mt-12 rounded-3xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-600 dark:from-cyan-600 dark:via-teal-600 dark:to-emerald-700 p-10 text-white shadow-2xl shadow-cyan-500/30 dark:shadow-cyan-400/20">
              <h3 className="text-2xl font-bold">How SBMS works</h3>
              <p className="mt-2 max-w-2xl text-white/90">From guard check-in at the gate, to live bus status maps and admin analytics, everything is actionable in one system. This section gives your team a modern command center UI to manage daily operations confidently.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/90">Step 1</p>
                  <p className="mt-2 text-base font-bold">Guard logs arrival</p>
                </div>
                <div className="rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/90">Step 2</p>
                  <p className="mt-2 text-base font-bold">System checks capacity & delay</p>
                </div>
                <div className="rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/90">Step 3</p>
                  <p className="mt-2 text-base font-bold">Admin monitors dashboards</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Live Alerts</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Top issues from the last 15 minutes.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {alerts.slice(0, 3).map((alert) => (
                  <Card key={alert.id} className="glass-card p-4 border-slate-200/40 dark:border-cyan-400/10">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{alert.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{alert.time} • {alert.severity.toUpperCase()}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{alert.description}</p>
                  </Card>
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
