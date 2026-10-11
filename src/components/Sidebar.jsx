import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  AlertOctagon, 
  Siren, 
  MapPin, 
  UserCheck, 
  PhoneCall, 
  Building2, 
  ShieldAlert, 
  History, 
  BarChart3, 
  Flame, 
  Activity, 
  BrainCircuit, 
  Cloud, 
  Cpu, 
  CheckCircle2, 
  GitFork, 
  Smartphone, 
  Sliders, 
  Info,
  HelpCircle,
  Home
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { activeTab, setActiveTab, emergencyActive } = useSimulation();

  const navSections = [
    {
      title: 'OPERATIONAL COMMAND',
      items: [
        { id: 'dashboard', label: 'Command Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'live-vehicle', label: 'Live Vehicle Simulation', icon: Car, badge: 'Live' },
        { id: 'accident-detection', label: 'Accident Detection Engine', icon: AlertOctagon, badge: emergencyActive ? 'CRITICAL' : null },
        { id: 'emergency-alert', label: 'Emergency Alert Screen', icon: Siren, badge: emergencyActive ? 'ALERT' : null },
        { id: 'live-map', label: 'Live GPS & Dispatch Map', icon: MapPin, badge: null },
      ]
    },
    {
      title: 'TELEMETRY & AI SENSORS',
      items: [
        { id: 'sensor-monitoring', label: 'Sensor Monitoring (MPU6050)', icon: Activity, badge: '200Hz' },
        { id: 'ai-prediction', label: 'AI/ML Prediction Model', icon: BrainCircuit, badge: '98.2%' },
        { id: 'false-positives', label: 'False Alarm Rejector', icon: CheckCircle2, badge: 'Fusion' },
        { id: 'system-arch', label: 'System Architecture Flow', icon: GitFork, badge: 'IoT' },
        { id: 'iot-devices', label: 'IoT Hardware Status', icon: Cpu, badge: '5 Nodes' },
        { id: 'cloud-data', label: 'Cloud / Firebase Sync', icon: Cloud, badge: 'Sync' },
      ]
    },
    {
      title: 'DISPATCH & RESPONDERS',
      items: [
        { id: 'police-ambulance', label: 'Ambulance & Police CAD', icon: ShieldAlert, badge: null },
        { id: 'hospital-network', label: 'Hospital Network & ICU', icon: Building2, badge: '4 Hubs' },
        { id: 'emergency-contacts', label: 'Emergency Contacts', icon: PhoneCall, badge: null },
        { id: 'victim-profile', label: 'Victim Medical Profile', icon: UserCheck, badge: 'Secure' },
      ]
    },
    {
      title: 'ANALYTICS & PLATFORM',
      items: [
        { id: 'accident-history', label: 'Accident History & Logs', icon: History, badge: null },
        { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3, badge: null },
        { id: 'road-heatmap', label: 'Road Safety Heatmap', icon: Flame, badge: 'Hotspots' },
        { id: 'mobile-app', label: 'Smartphone App Preview', icon: Smartphone, badge: 'SOS' },
        { id: 'admin', label: 'Admin Dashboard & Control', icon: Sliders, badge: null },
        { id: 'landing', label: 'Project Landing Page', icon: Home, badge: 'Public' },
        { id: 'about', label: 'Viva & Project Specs', icon: HelpCircle, badge: null },
      ]
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-dark-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
      isMobileOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">COMMAND CENTER</h2>
            <span className="text-[10px] font-mono text-slate-400">ESP32 + ML PROTOCOL</span>
          </div>
        </div>
        {setIsMobileOpen && (
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded"
          >
            ✕
          </button>
        )}
      </div>

      {/* Navigation Links with custom scroll */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx}>
            <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isEmergencyItem = item.id === 'emergency-alert' && emergencyActive;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-brand-blue/15 text-brand-cyan border border-brand-cyan/30 font-semibold shadow-sm shadow-brand-cyan/10'
                        : isEmergencyItem
                        ? 'bg-emergency-red/20 text-emergency-red border border-emergency-red/50 animate-pulse'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/80 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${
                        isActive 
                          ? 'text-brand-cyan' 
                          : isEmergencyItem 
                          ? 'text-emergency-red animate-spin' 
                          : 'text-slate-400'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        item.badge === 'CRITICAL' || item.badge === 'ALERT'
                          ? 'bg-emergency-red text-white animate-bounce'
                          : isActive
                          ? 'bg-brand-cyan/20 text-brand-cyan'
                          : 'bg-dark-800 text-slate-400 border border-slate-700/60'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer Live Status */}
      <div className="p-3 border-t border-slate-800 bg-dark-950/60">
        <div className="p-2.5 rounded-lg bg-dark-800/60 border border-slate-700/40 text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span>Sensor Ingest:</span>
            <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              200 SPS Stream
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Cloud Latency:</span>
            <span className="text-brand-cyan font-mono font-bold">38 ms</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Fleet ID:</span>
            <span className="text-slate-300 font-mono">HYD-ZONE-04</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
