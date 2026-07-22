import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Bus } from "lucide-react";

export default function ProtectedRoute({ role }) {
  const { session, loading: authLoading } = useAuth();
  const { loading: dataLoading, error } = useData();
  const location = useLocation();

  if (authLoading) return null;

  if (!session) {
    return <Navigate to={`/login/${role}`} replace state={{ from: location.pathname }} />;
  }

  if (session.role !== role) {
    return <Navigate to={`/${session.role}`} replace />;
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white animate-pulse">
          <Bus className="h-8 w-8" />
        </div>
        <p className="text-sm font-semibold text-muted-foreground">Loading SBMS data…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <p className="text-lg font-semibold text-rose-600">Failed to load data</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <button onClick={() => window.location.reload()} className="rounded-xl bg-slate-900 text-white px-6 py-2.5 text-sm font-semibold hover:bg-slate-700 transition">
          Retry
        </button>
      </div>
    );
  }

  return <Outlet />;
}
