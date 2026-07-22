import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider, useData } from "./context/DataContext";
import { ThemeProvider } from "./context/ThemeContext";
import AdminLayout from "./layouts/AdminLayout";
import GuardLayout from "./layouts/GuardLayout";
import AdminAlerts from "./pages/AdminAlerts";
import AdminFleet from "./pages/AdminFleet";
import AdminGuards from "./pages/AdminGuards";
import AdminOverview from "./pages/AdminOverview";
import AdminReports from "./pages/AdminReports";
import AdminMessages from "./pages/AdminMessages";
import GuardHistory from "./pages/GuardHistory";
import GuardLogEntry from "./pages/GuardLogEntry";
import GuardOverview from "./pages/GuardOverview";
import GuardMessages from "./pages/GuardMessages";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

function Toast() {
  const { toast } = useData();
  if (!toast) return null;

  const styles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300",
    info:    "bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-900/30 dark:border-sky-800 dark:text-sky-300",
    error:   "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-300",
  };
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 shrink-0" />,
    info:    <Info className="h-5 w-5 shrink-0" />,
    error:   <AlertTriangle className="h-5 w-5 shrink-0" />,
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300 ${styles[toast.type] || styles.success}`}>
      {icons[toast.type] || icons.success}
      <span className="text-sm font-semibold">{toast.message}</span>
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <Toast />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login/:role" element={<Login />} />

        <Route element={<ProtectedRoute role="guard" />}>
          <Route path="/guard" element={<GuardLayout />}>
            <Route index element={<GuardOverview />} />
            <Route path="log-entry" element={<GuardLogEntry />} />
            <Route path="history" element={<GuardHistory />} />
            <Route path="messages" element={<GuardMessages />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="fleet" element={<AdminFleet />} />
            <Route path="guards" element={<AdminGuards />} />
            <Route path="alerts" element={<AdminAlerts />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground">
            <p className="text-8xl font-black text-slate-200 dark:text-slate-800">404</p>
            <h1 className="text-2xl font-bold">Page not found</h1>
            <a href="/" className="rounded-xl bg-slate-900 text-white px-6 py-2.5 text-sm font-semibold hover:bg-slate-700 transition">Go home</a>
          </div>
        } />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
