import { useState } from "react";
import { ArrowLeft, LockKeyhole, Shield, UserRound } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useAuth } from "../context/AuthContext";

const roleContent = {
  admin: {
    title: "Admin login",
    subtitle: "Access analytics, fleet operations, alert review, and reporting.",
    icon: Shield,
    accent: "text-teal-800",
    bg: "bg-teal-50",
    target: "/admin",
  },
  guard: {
    title: "Guard login",
    subtitle: "Access gate-side logging, shift overview, and movement history.",
    icon: UserRound,
    accent: "text-sky-800",
    bg: "bg-sky-50",
    target: "/guard",
  },
};

export default function Login() {
  const { role = "guard" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, session } = useAuth();
  const config = roleContent[role] ?? roleContent.guard;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (session?.role === role) {
    return <Navigate to={config.target} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.session.role !== role) {
        setError(`This account is not a ${role}. Please use the correct login.`);
        return;
      }
      const destination = location.state?.from || config.target;
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef6f7_0%,#ffffff_45%,#f4f8fb_100%)] dark:bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_45%,#0f172a_100%)] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Button asChild variant="ghost" className="mb-6 px-0 text-slate-600 hover:bg-transparent hover:text-slate-900">
          <Link to="/" className="text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-slate-200 bg-slate-950 p-8 text-white shadow-xl shadow-slate-900/15">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${config.bg} ${config.accent}`}>
              <Icon className="h-7 w-7" />
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight">{config.title}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">{config.subtitle}</p>
          </Card>

          <Card className="border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-foreground">
                <LockKeyhole className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Sign in to continue</h2>
                <p className="mt-1 text-sm text-muted-foreground">Enter your credentials to access the {role} dashboard.</p>
              </div>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border bg-muted text-foreground px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-background"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-foreground">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border bg-muted text-foreground px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-background"
                />
              </div>

              {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

              {loading && (
                <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                  ⏳ Server is waking up, this may take up to 30 seconds on first login…
                </p>
              )}

              <Button type="submit" size="lg" disabled={loading} className="w-full bg-slate-900 text-white hover:bg-slate-800">
                {loading ? "Signing in…" : `Continue as ${role}`}
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link className="rounded-full bg-muted px-4 py-2 font-medium text-foreground transition hover:bg-accent" to="/login/guard">
                Guard access
              </Link>
              <Link className="rounded-full bg-muted px-4 py-2 font-medium text-foreground transition hover:bg-accent" to="/login/admin">
                Admin access
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
