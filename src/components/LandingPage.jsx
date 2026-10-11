import React from 'react';
import { 
  ArrowRight, 
  Play, 
  Cpu, 
  Activity, 
  Radio, 
  Wifi, 
  Cloud, 
  ShieldCheck, 
  Flame, 
  Siren, 
  CheckCircle2, 
  Sparkles, 
  Zap,
  MapPin,
  Building2
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const LandingPage = () => {
  const { setActiveTab, runAutoDemo } = useSimulation();

  return (
    <div className="space-y-16 py-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-3xl p-8 md:p-14 overflow-hidden glass-panel border border-slate-700/80 bg-gradient-to-b from-dark-900 via-dark-850 to-dark-950 text-center space-y-6 shadow-2xl">
        {/* Glow Spheres */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emergency-red/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-mono font-bold tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>NEXT-GEN IOT & MACHINE LEARNING VEHICLE SAFETY PLATFORM</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Detect Faster. Alert Smarter. <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-emergency-red bg-clip-text text-transparent">Save Lives.</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
            An intelligent IoT and machine-learning based accident detection platform that automatically detects vehicle accidents, identifies severity, captures GPS location and coordinates emergency response within milliseconds.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-teal text-dark-950 font-black text-sm shadow-xl shadow-brand-cyan/20 hover:brightness-110 flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Launch Simulation Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveTab('dashboard');
                setTimeout(() => runAutoDemo(), 300);
              }}
              className="px-6 py-3.5 rounded-2xl bg-emergency-red/20 hover:bg-emergency-red/30 border border-emergency-red/60 text-white font-bold text-sm shadow-xl shadow-emergency-red/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Flame className="w-4 h-4 text-emergency-red" />
              <span>Run Live Accident Demo</span>
            </button>

            <button
              onClick={() => setActiveTab('system-arch')}
              className="px-5 py-3.5 rounded-2xl bg-dark-800 hover:bg-dark-700 border border-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all"
            >
              View System Architecture
            </button>
          </div>
        </div>

        {/* Live Simulation Highlight Metrics */}
        <div className="relative z-10 pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-dark-900/90 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Detection Latency</span>
            <div className="text-2xl font-black font-display text-emerald-400">84 ms</div>
            <span className="text-[10px] text-slate-400 font-mono">Edge ESP32 inference</span>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900/90 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Crash Classification</span>
            <div className="text-2xl font-black font-display text-brand-cyan">98.2%</div>
            <span className="text-[10px] text-slate-400 font-mono">10,000+ benchmark</span>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900/90 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">GPS Precision</span>
            <div className="text-2xl font-black font-display text-purple-400">±2.5 m</div>
            <span className="text-[10px] text-slate-400 font-mono">NEO-6M Satellite Lock</span>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900/90 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">CAD Dispatch</span>
            <div className="text-2xl font-black font-display text-emergency-red">&lt; 2 Sec</div>
            <span className="text-[10px] text-slate-400 font-mono">108 / 112 / Hospital</span>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-black font-display text-white">
            How The Smart Accident Detection System Works
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            From physical IMU sensor impact to machine learning verification and coordinated ambulance routing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-bold text-xl">
              1
            </div>
            <h3 className="font-bold text-white text-base">Vehicle Kinematics & Edge Sensing</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              MPU6050 continuously streams tri-axial acceleration and gyroscope roll rates at 200Hz to the onboard ESP32 DevKit.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue font-bold text-xl">
              2
            </div>
            <h3 className="font-bold text-white text-base">Sensor Fusion & ML Classification</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              1D-CNN separates road potholes/speed bumps from real collisions, assessing kinetic damage in 84ms.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emergency-red/10 border border-emergency-red/30 flex items-center justify-center text-emergency-red font-bold text-xl">
              3
            </div>
            <h3 className="font-bold text-white text-base">Automated CAD & Trauma Response</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              SIM800L dispatches GPS coordinates to 108 ALS Ambulances, Police Patrol, Trauma Hospitals, and Family Contacts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
