import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import AdminLayout from "./layouts/AdminLayout";
import GuardLayout from "./layouts/GuardLayout";
import AdminAlerts from "./pages/AdminAlerts";
import AdminFleet from "./pages/AdminFleet";
import AdminGuards from "./pages/AdminGuards";
import AdminLive from "./pages/AdminLive";
import AdminOverview from "./pages/AdminOverview";
import AdminReports from "./pages/AdminReports";
import GuardHistory from "./pages/GuardHistory";
import GuardLogEntry from "./pages/GuardLogEntry";
import GuardOverview from "./pages/GuardOverview";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login/:role" element={<Login />} />

            <Route element={<ProtectedRoute role="guard" />}>
              <Route path="/guard" element={<GuardLayout />}>
                <Route index element={<GuardOverview />} />
                <Route path="log-entry" element={<GuardLogEntry />} />
                <Route path="history" element={<GuardHistory />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="fleet" element={<AdminFleet />} />
                <Route path="guards" element={<AdminGuards />} />
                <Route path="alerts" element={<AdminAlerts />} />
                <Route path="live" element={<AdminLive />} />
                <Route path="reports" element={<AdminReports />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
