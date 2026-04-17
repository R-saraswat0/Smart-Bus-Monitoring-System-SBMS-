import { Link } from "react-router-dom";
import { Bus, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pb-10 pt-16 text-gray-400">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4 lg:px-10">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-black shadow-[0_0_20px_-5px_rgba(251,191,36,0.4)]">
              <Bus className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">SBMS</h3>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Digitally transforming campus transit through real-time monitoring and advanced operational analytics.
          </p>
          <div className="flex gap-4 pt-4">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-all hover:bg-amber-400 hover:text-black">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-6 text-xs font-semibold tracking-[0.18em] text-white/70">Navigation</h4>
          <ul className="space-y-4 text-sm">
            {["Home", "Guard Module", "Admin Panel", "System Analytics"].map((link, i) => (
              <li key={i}>
                <Link to="/" className="hover:text-amber-400 transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="mb-6 text-xs font-semibold tracking-[0.18em] text-white/70">Contact Support</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-amber-400" />
              <span>support@sbms.local</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-amber-400" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-amber-400" />
              <span>Campus Management Office</span>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-6 text-xs font-semibold tracking-[0.18em] text-white/70">Platform</h4>
          <ul className="space-y-4 text-sm">
            {["Privacy Policy", "Terms of Service", "Status Dashboard", "Documentation"].map((link, i) => (
              <li key={i}>
                <a href="#" className="text-sm transition-colors hover:text-amber-400">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/10 px-6 pt-8 md:flex-row lg:px-10">
        <p className="text-[11px] tracking-wide text-gray-500">
          © {new Date().getFullYear()} Campus Mobility Platform v1.0
        </p>
        <div className="flex gap-10">
          {["System Status: Operational", "Gate 1: Active"].map((s, i) => (
            <span key={i} className="text-[11px] font-semibold tracking-wide text-emerald-300/70">
              {s}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
