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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f8fb_0%,#ffffff_42%,#eef6f8_100%)] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/15">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Campus Mobility</p>
              <p className="text-lg font-semibold text-slate-900">SBMS</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#overview" className="transition hover:text-slate-900">Overview</a>
            <a href="#modules" className="transition hover:text-slate-900">Modules</a>
            <a href="#activity" className="transition hover:text-slate-900">Activity</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="hidden border-slate-300 text-slate-800 hover:bg-slate-100 sm:inline-flex">
              <Link to={session?.role === "guard" ? "/guard" : "/login/guard"}>Guard module</Link>
            </Button>
            <Button asChild className="bg-slate-900 text-white hover:bg-slate-800">
              <Link to={session?.role === "admin" ? "/admin" : "/login/admin"}>Open admin module</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section id="overview" className="px-6 pb-18 pt-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
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
                <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800">
                  <Link to={session?.role === "guard" ? "/guard/log-entry" : "/login/guard"}>
                    Launch guard workflow
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-teal-300 text-teal-800 hover:bg-teal-50">
                  <Link to={session?.role === "admin" ? "/admin" : "/login/admin"}>See admin analytics</Link>
                </Button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <Card className="gap-3 border-slate-200 bg-white/85 p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">Registered buses</p>
                  <p className="text-3xl font-semibold text-slate-900">{buses.length}</p>
                  <p className="text-sm text-slate-600">Total in system</p>
                </Card>
                <Card className="gap-3 border-slate-200 bg-white/85 p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">Trips logged</p>
                  <p className="text-3xl font-semibold text-slate-900">{logs.length}</p>
                  <p className="text-sm text-slate-600">Across all gates</p>
                </Card>
                <Card className="gap-3 border-slate-200 bg-white/85 p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">Active alerts</p>
                  <p className="text-3xl font-semibold text-slate-900">{alerts?.length || 0}</p>
                  <p className="text-sm text-slate-600">Triggered cases</p>
                </Card>
              </div>
            </div>

            <Card className="overflow-hidden border-slate-200 bg-slate-950 text-white shadow-2xl shadow-slate-900/20">
              <div className="border-b border-white/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-teal-300">Operations snapshot</p>
                    <h2 className="mt-2 text-2xl font-semibold">Today at the campus gates</h2>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Real-time status
                  </div>
                </div>
              </div>

              <div className="grid gap-4 px-6 py-6">
                {buses.slice(0, 3).map((bus) => (
                  <div key={bus.busNumber} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold">{bus.busNumber}</p>
                        <p className="mt-1 text-sm text-slate-300">{bus.route}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          bus.health === "warning" || bus.status === "maintenance-due"
                            ? "bg-rose-500/20 text-rose-200"
                            : "bg-emerald-500/20 text-emerald-200"
                        }`}
                      >
                        {bus.health === "warning" || bus.status === "maintenance-due" ? "Attention Needed" : "Active Status"}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
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

        <section id="modules" className="px-6 py-18">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">Core modules</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Architecture built for security & scale</h2>
              <p className="mt-4 text-lg text-slate-600">
                The system delivers immediate value through secure, gate-side logging for guards and comprehensive, real-time analytics for transport administration.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{feature.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Card className="border-teal-200 bg-teal-50/80 p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-teal-800" />
                  <h3 className="text-2xl font-semibold text-slate-950">Security Guard Panel</h3>
                </div>
                <p className="mt-4 text-slate-700">
                  Designed for quick gate-side use with bus selection, arrival or departure entry, occupancy tracking, and instant recent-history feedback.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-700" /> Auto timestamp behavior</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-700" /> Capacity validation</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-700" /> Last five logs visible immediately</p>
                </div>
              </Card>

              <Card className="border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <div className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-teal-300" />
                  <h3 className="text-2xl font-semibold">Admin Module</h3>
                </div>
                <p className="mt-4 text-slate-300">
                  Real-time style metrics, crowding flags, trip history, and chart-based visibility into peak traffic and late arrivals.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-300" /> Live bus status cards</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-300" /> Trip trend and peak hour charts</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-300" /> Filterable history table</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="activity" className="px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Card className="border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-slate-900" />
                  <h3 className="text-2xl font-semibold text-slate-950">System Objectives</h3>
                </div>
                <div className="mt-6 space-y-4 text-slate-600">
                  <p>The Smart Bus Monitoring System provides an end-to-end framework for securing campus transit.</p>
                  <p>This project introduces real-time guard logging, live operational dashboards, and automated capacity monitoring to replace outdated manual entry methods.</p>
                  <p>Built with scalability and modern user experience in mind, ensuring safety and punctuality for all university routes.</p>
                </div>
              </Card>

              <Card className="border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-950">Recent activity sample</h3>
                    <p className="mt-2 text-sm text-slate-600">Live operational log history from campus gates.</p>
                  </div>
                  <Button asChild variant="outline" className="border-slate-300 text-slate-800 hover:bg-slate-50">
                    <Link to="/admin/reports">Open reports</Link>
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  {latestLogs.map((log) => (
                    <div key={log.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">{log.busNumber}</p>
                          <p className="text-sm text-slate-500">{log.guard} at {log.gate}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">{log.type}</span>
                          <span className="rounded-full bg-teal-50 px-3 py-1 font-medium text-teal-800">{log.status}</span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">
                        {log.date} at {log.time} - occupancy {log.occupancy}/{log.capacity}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="px-6 py-20 bg-slate-950 text-white shadow-2xl shadow-slate-900/20 rounded-t-[3rem] mt-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-16">Frequently Asked Questions</h2>
            
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-teal-500/20 rounded-2xl">
                    <Shield className="h-6 w-6 text-teal-400" />
                  </div>
                  <h3 className="text-2xl font-semibold">For Security Guards</h3>
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-medium text-lg text-teal-300">How do I log a bus arrival or departure?</h4>
                    <p className="mt-3 text-slate-400 leading-relaxed">Navigate to the Log Entry panel, select the bus ID, your gate, and the passenger count. The system will automatically capture the timestamp and validate the capacity.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-teal-300">How can I see past buses that passed my gate?</h4>
                    <p className="mt-3 text-slate-400 leading-relaxed">Go to the History panel. You can use the search bar filters to see specific bus records and verify their recorded arrival times.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-teal-300">Where do I read messages from the administration?</h4>
                    <p className="mt-3 text-slate-400 leading-relaxed">Click on the Mail icon in the top navigation bar or select 'Messages' from your sidebar to open your inbox.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-teal-300">What happens if a bus arrives overcrowded?</h4>
                    <p className="mt-3 text-slate-400 leading-relaxed">Log the actual number of passengers. If it exceeds the bus capacity, the system will automatically trigger a high-severity alert for the Admin.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-teal-300">How are my shift hours tracked?</h4>
                    <p className="mt-3 text-slate-400 leading-relaxed">Admins assign your shift and gate details. You can view your current status and accumulated logs for the day on your Guard Overview dashboard.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-500/20 rounded-2xl">
                    <Activity className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold">For Administrators</h3>
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-medium text-lg text-blue-300">How do I add a new bus to the system?</h4>
                    <p className="mt-3 text-slate-400 leading-relaxed">Open the Fleet Management module and click "Add New Bus." Fill in the capacity, route, and driver details to deploy it instantly.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-blue-300">Where do I review crowding and delay alerts?</h4>
                    <p className="mt-3 text-slate-400 leading-relaxed">Check the Alerts Center or click the Bell icon in the top navigation. High-severity capacity alerts and medium-severity delays are logged here.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-blue-300">How can I send instructions to guards?</h4>
                    <p className="mt-3 text-slate-400 leading-relaxed">Navigate to the Messages tab. You can compose a memo, select a specific guard or broadcast to all guards simultaneously.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-blue-300">How do I search for a specific bus history?</h4>
                    <p className="mt-3 text-slate-400 leading-relaxed">Use the global search bar at the top of your dashboard, or scroll to the Log History Table on the Reports page to filter by Bus Number.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-blue-300">How are guards assigned to specific gates?</h4>
                    <p className="mt-3 text-slate-400 leading-relaxed">Go to Guard Management to add or edit profiles. You can assign them specifically to "gate no. 1", "parking gate", etc.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 text-center pb-8 border-t border-slate-800 pt-12">
              <h3 className="text-xl font-medium text-slate-300 mb-6">Help us improve Campus Mobility!</h3>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdnw9Kxi1HMHEIm7p4xRAlcN-7ErU1Yp5f6OHUq1G1h1xM6ZQ/viewform?usp=publish-editor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-teal-500 px-8 py-4 text-lg font-bold text-slate-950 shadow-xl transition-all hover:-translate-y-1 hover:bg-teal-400 hover:shadow-teal-500/25"
              >
                Share your feedback after visiting this website
              </a>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
