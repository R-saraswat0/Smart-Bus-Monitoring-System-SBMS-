import { Shield, BarChart3, Bell, Lock, Users, Activity, Github, Mail, ArrowRight, CheckCircle2, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#1E3A8A]" />
            <span className="font-bold text-xl text-[#1E3A8A]">SBMS</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-gray-600 hover:text-[#1E3A8A] transition-colors">Features</a>
            <a href="#about" className="text-gray-600 hover:text-[#1E3A8A] transition-colors">About</a>
            <Button variant="outline" size="sm" className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white">
              Contact
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-[#14B8A6]/10 text-[#14B8A6] rounded-full text-sm font-medium mb-6">
              Campus Security & Transport
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#1E3A8A] mb-6 leading-tight">
              Smart Bus Monitoring System
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Digitizing Campus Security & Transport Logistics with real-time tracking, automated reporting, and intelligent capacity management.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white shadow-lg shadow-[#1E3A8A]/20"
              >
                <Shield className="w-5 h-5 mr-2" />
                Login as Guard
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white"
                onClick={() => navigate('/dashboard')}
              >
                <Activity className="w-5 h-5 mr-2" />
                Admin Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="flex items-center gap-8 mt-12">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                <span className="text-gray-600">Real-Time Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                <span className="text-gray-600">Zero Paper Usage</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1E3A8A]/10 border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzcwOTI3NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Dashboard Interface"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1E3A8A]/20 to-transparent"></div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#14B8A6]/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#14B8A6]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1E3A8A]">98%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-6">
              From Paper Chaos to Digital Clarity
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg">
                <span className="font-semibold text-[#EF4444]">The Problem:</span> Manual bus logs, delayed reports, capacity miscounts, and scattered security data lead to inefficiency and safety risks.
              </p>
              <p className="text-lg">
                <span className="font-semibold text-[#22C55E]">The Solution:</span> SBMS consolidates everything into one intelligent platform—real-time tracking, automated logging, instant alerts, and comprehensive analytics.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                🚫 Manual Entry
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                🚫 Delayed Reports
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                🚫 Human Error
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-gradient-to-br from-[#1E3A8A]/5 to-[#14B8A6]/5 border-[#1E3A8A]/20 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1724343025504-3afb6d67566b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG1vbml0b3JpbmclMjBjb250cm9sJTIwcm9vbXxlbnwxfHx8fDE3NzA5Njg2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Security Control Room"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-medium text-[#1E3A8A]">Live Monitoring Dashboard</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                  <span className="text-sm text-gray-600">Active</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">
              Powerful Features Built for Campus Safety
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage campus transport and security in one intelligent system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Activity,
                title: 'Real-Time Tracking',
                description: 'Monitor bus locations, passenger counts, and entry/exit logs as they happen',
                color: '#14B8A6',
                delay: 0
              },
              {
                icon: BarChart3,
                title: 'Automated Reports',
                description: 'Generate detailed analytics and reports with one click—no manual work required',
                color: '#1E3A8A',
                delay: 0.1
              },
              {
                icon: Bell,
                title: 'Capacity Alerts',
                description: 'Get instant notifications when buses reach capacity limits for safety compliance',
                color: '#F59E0B',
                delay: 0.2
              },
              {
                icon: Lock,
                title: 'Secure Authentication',
                description: 'Role-based access control with encrypted data storage and audit trails',
                color: '#EF4444',
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="p-6 h-full bg-white hover:shadow-xl transition-shadow duration-300 border-gray-200">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">
              Built for Every Stakeholder
            </h2>
            <p className="text-lg text-gray-600">
              Tailored interfaces for guards and administrators
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-br from-[#14B8A6]/10 to-transparent border-[#14B8A6]/30 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[#14B8A6] flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1E3A8A]">Security Guard Panel</h3>
                    <p className="text-gray-600">Quick entry, simple interface</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'Log passenger entries/exits in seconds',
                    'Quick bus capacity check',
                    'Submit reports via mobile or desktop',
                    'Receive instant capacity alerts'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-br from-[#1E3A8A]/10 to-transparent border-[#1E3A8A]/30 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[#1E3A8A] flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1E3A8A]">Admin Dashboard</h3>
                    <p className="text-gray-600">Full control, deep insights</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'View real-time analytics & trends',
                    'Generate custom reports by date/route',
                    'Manage users and permissions',
                    'Export data for compliance audits'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-[#1E3A8A]/5 via-[#14B8A6]/5 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#1E3A8A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#14B8A6] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">
              Measurable Impact, Real Results
            </h2>
            <p className="text-lg text-gray-600">
              See how SBMS transforms campus operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                metric: '80%', 
                label: 'Faster Reporting', 
                icon: Zap,
                color: '#F59E0B'
              },
              { 
                metric: '100%', 
                label: 'Digital Logs', 
                icon: BarChart3,
                color: '#14B8A6'
              },
              { 
                metric: '24/7', 
                label: 'Real-Time Updates', 
                icon: Activity,
                color: '#1E3A8A'
              },
              { 
                metric: '0', 
                label: 'Paper Usage', 
                icon: CheckCircle2,
                color: '#22C55E'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 border-gray-200">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                  </div>
                  <div className="text-5xl font-bold text-[#1E3A8A] mb-2">
                    {stat.metric}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6">
              Built with Modern Technology
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'JWT Auth'].map((tech, index) => (
                <div 
                  key={index}
                  className="px-5 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-[#1E3A8A] hover:text-white transition-colors duration-300 cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
            <img 
              src="https://images.unsplash.com/photo-1590147997350-b91605079d59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYnVzJTIwdHJhbnNwb3J0JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzEwMDIzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Technology"
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#1E3A8A] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8" />
                <span className="font-bold text-xl">SBMS</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Smart Bus Monitoring System - Revolutionizing campus security and transport management.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Tech Stack</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>React + Vite</li>
                <li>Node.js + Express</li>
                <li>MongoDB Atlas</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-300">
            <p>© 2026 SBMS. Built for academic excellence and campus safety.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
