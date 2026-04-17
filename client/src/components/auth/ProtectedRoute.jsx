import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ role }) {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to={`/login/${role}`} replace state={{ from: location.pathname }} />;
  }

  if (session.role !== role) {
    return <Navigate to={`/${session.role}`} replace />;
  }

  return <Outlet />;
}
