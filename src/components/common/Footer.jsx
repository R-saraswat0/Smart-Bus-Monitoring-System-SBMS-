import { Link } from "react-router-dom";
import { Bus, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/30 dark:border-cyan-400/10 bg-gradient-to-b from-white/80 via-blue-50/40 to-cyan-50/30 dark:from-slate-900/90 dark:via-slate-900/85 dark:to-slate-950/90 py-12 text-slate-700 dark:text-slate-300 transition-all duration-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 dark:from-cyan-400 dark:to-emerald-500 text-white shadow-lg shadow-cyan-500/30">
              <Bus className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">SBMS</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Smart Bus Monitoring System for modern campus security and transport logistics.</p>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">© {new Date().getFullYear()} SBMS. All rights reserved.</p>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-cyan-300 mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition font-medium" to="/">Home</Link></li>
            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition font-medium" to="/login/guard">Guard Login</Link></li>
            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition font-medium" to="/login/admin">Admin Panel</Link></li>
            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition font-medium" to="/admin/reports">Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-cyan-300 mb-4 uppercase tracking-wider text-sm">Support</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-slate-600 dark:text-slate-400">support@sbms.local</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-slate-600 dark:text-slate-400">+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-slate-600 dark:text-slate-400">Campus Operations</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-cyan-300 mb-4 uppercase tracking-wider text-sm">Features</h4>
          <ul className="space-y-3 text-sm">
            <li className="text-slate-600 dark:text-slate-400 font-medium">Real-time Tracking</li>
            <li className="text-slate-600 dark:text-slate-400 font-medium">Live Analytics</li>
            <li className="text-slate-600 dark:text-slate-400 font-medium">Instant Alerts</li>
            <li className="text-slate-600 dark:text-slate-400 font-medium">Fleet Management</li>
          </ul>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 mt-12 pt-8 border-t border-slate-200/30 dark:border-cyan-400/10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>Campus Mobility Platform v1.0 — Secure, Fast, Reliable</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">Privacy</Link>
            <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">Terms</Link>
            <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
