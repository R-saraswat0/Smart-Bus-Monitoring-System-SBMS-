import { useState } from "react";
import { ArrowLeft, LockKeyhole, User, Shield } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleContent = {
  admin: {
    title: "Admin login",
    subtitle: "Access analytics, fleet operations, alert review, and reporting.",
    icon: Shield,
    color: "amber",
    accent: "text-amber-400",
    bg: "bg-amber-400/10",
    target: "/admin",
    formIconColor: "text-amber-400",
  },
  guard: {
    title: "Guard login",
    subtitle: "Access gate-side logging, shift overview, and movement history.",
    icon: User,
    color: "teal",
    accent: "text-teal-400",
    bg: "bg-teal-400/10",
    target: "/guard",
    formIconColor: "text-teal-400",
  },
};

export default function Login() {
  const { role = "guard" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, demoUsers, session } = useAuth();
  const config = roleContent[role] ?? roleContent.guard;
  const [email, setEmail] = useState(demoUsers[role]?.email ?? demoUsers.guard.email);
  const [password, setPassword] = useState(demoUsers[role]?.password ?? demoUsers.guard.password);
  const [error, setError] = useState("");

  if (session?.role === role) {
    return <Navigate to={config.target} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await login(role, email, password);
    if (!result.ok) {
      setError(result.message || "Login failed");
      return;
    }
    const destination = location.state?.from || config.target;
    navigate(destination, { replace: true });
  }

  const Icon = config.icon;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-5 text-white lg:p-6">
      <div className="w-full max-w-[1180px]">
        {/* Back Link */}
        <Link 
          to="/" 
          className="group mb-6 flex items-center gap-2 text-gray-500 transition-colors hover:text-white md:mb-8"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to home</span>
        </Link>

        {/* Login Container */}
        <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
          
          {/* Left Info Card */}
          <div className="premium-card flex min-h-[560px] flex-col justify-between border-white/10 p-6 sm:p-8 lg:min-h-[620px] lg:p-9">
            <div>
              <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border ${role === "admin" ? "border-amber-400/30" : "border-teal-400/30"} ${config.bg}`}>
                <Icon className={`h-8 w-8 ${config.accent}`} />
              </div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {config.title}
              </h1>
              <p className="mb-8 text-base leading-relaxed text-gray-400 sm:text-lg">
                {config.subtitle}
              </p>
            </div>

            {/* Demo Credentials Box */}
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 sm:rounded-[2rem] sm:p-8">
              <h3 className={`mb-4 text-[11px] font-semibold tracking-[0.22em] ${config.accent}`}>
                Demo Credentials
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Use the preset credentials below or change them manually for quick frontend testing.
              </p>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm font-medium text-white/85">Email: {demoUsers[role]?.email}</p>
                <p className="mt-2 text-sm font-medium text-white/85">Password: {demoUsers[role]?.password}</p>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="premium-card min-h-[560px] border-white/10 p-6 sm:p-8 lg:min-h-[620px] lg:p-9">
            <div className="mb-10 flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-inner">
                <LockKeyhole className={`h-8 w-8 ${config.formIconColor}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Sign in to continue</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Frontend-only mock auth for the selected role.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="ml-1 text-xs font-semibold tracking-[0.18em] text-gray-400">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 w-full rounded-xl border bg-white/[0.04] px-4 text-white outline-none transition-all ${role === "admin" ? "border-white/10 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20" : "border-white/10 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/20"}`}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="ml-1 text-xs font-semibold tracking-[0.18em] text-gray-400">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-12 w-full rounded-xl border bg-white/[0.04] px-4 text-white outline-none transition-all ${role === "admin" ? "border-white/10 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20" : "border-white/10 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/20"}`}
                  required
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className={`h-12 w-full rounded-xl text-sm font-semibold text-black transition-all active:scale-[0.98] ${
                  role === "admin" ? "bg-amber-400 hover:bg-amber-500 gold-glow" : "bg-teal-400 hover:bg-teal-500 teal-glow"
                }`}
              >
                Continue as {role}
              </button>
            </form>

            {/* Role Toggles */}
            <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6 sm:pt-8">
              <Link 
                to="/login/guard"
                className={`rounded-full px-5 py-2.5 text-xs font-medium transition-all sm:px-6 sm:py-3 ${
                  role === 'guard' ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30' : 'text-gray-400 border border-white/10 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                Guard access
              </Link>
              <Link 
                to="/login/admin"
                className={`rounded-full px-5 py-2.5 text-xs font-medium transition-all sm:px-6 sm:py-3 ${
                  role === 'admin' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-gray-400 border border-white/10 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                Admin access
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
