import React from 'react';
import { 
  GitFork, 
  Cpu, 
  Activity, 
  BrainCircuit, 
  MapPin, 
  Radio, 
  ShieldAlert, 
  Cloud, 
  BarChart3,
  ArrowDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const SystemArchView = () => {
  const archNodes = [
    {
      title: 'MPU6050 6-DoF IMU Sensor',
      sub: 'Physical Hardware',
      desc: 'Samples tri-axial acceleration (X, Y, Z) and angular velocity (Roll, Pitch, Yaw) at 200Hz over I2C.',
      icon: Activity,
      color: 'brand-cyan'
    },
    {
      title: 'ESP32 Dual-Core MCU (240MHz)',
      sub: 'Edge Controller',
      desc: 'Buffers kinematic stream, executes high-frequency shockwave filtering, and manages sensor fusion.',
      icon: Cpu,
      color: 'brand-blue'
    },
    {
      title: 'Sensor Fusion & Preprocessing',
      sub: 'Signal Processing',
      desc: 'Calculates vector magnitudes, removes road noise, and separates transient bumps from sustained deceleration.',
      icon: Layers,
      color: 'purple-400'
    },
    {
      title: '1D-CNN + Random Forest AI Model',
      sub: 'Edge Machine Learning',
      desc: 'Classifies crash patterns in 84ms with 98.2% benchmark accuracy against 10,000+ crash scenarios.',
      icon: BrainCircuit,
      color: 'emergency-red'
    },
    {
      title: 'U-Blox NEO-6M GPS Module',
      sub: 'Satellite Positioning',
      desc: 'Captures precise latitude, longitude, and altitude with ±2.5m CEP accuracy upon impact detection.',
      icon: MapPin,
      color: 'emerald-400'
    },
    {
      title: 'SIM800L GSM / 4G Modem',
      sub: 'Cellular Telemetry',
      desc: 'Dispatches automated SMS alerts, emergency voice synthesized calls, and CAD telemetry payloads.',
      icon: Radio,
      color: 'amber-400'
    },
    {
      title: 'Emergency Response CAD Network',
      sub: 'Dispatch Command',
      desc: 'Routes vector coordinates to 108 Ambulance ALS fleet, 112 State Police Patrol, and Trauma ICU hubs.',
      icon: ShieldAlert,
      color: 'emergency-red'
    },
    {
      title: 'Google Firebase Cloud / Firestore',
      sub: 'Cloud Layer',
      desc: 'Stores real-time telemetry logs, accident records, and responder audit trails in persistent cloud DB.',
      icon: Cloud,
      color: 'indigo-400'
    },
    {
      title: 'Analytics & Road Safety Dashboard',
      sub: 'Platform Interface',
      desc: 'Provides real-time fleet monitoring, accident hotspot heatmaps, and municipal safety policy insights.',
      icon: BarChart3,
      color: 'brand-cyan'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <GitFork className="w-6 h-6 text-brand-cyan" />
            END-TO-END SYSTEM ARCHITECTURE & DATA PIPELINE
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Complete physical hardware layer to edge AI classification, CAD emergency dispatch, and cloud analytics
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="px-3 py-1 rounded-full bg-dark-800 border border-slate-700 text-slate-300">
            Pipeline Latency: <strong className="text-emerald-400">&lt; 1.2 Seconds Total</strong>
          </span>
        </div>
      </div>

      {/* Interactive Animated Architecture Flow */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {archNodes.map((node, idx) => {
            const Icon = node.icon;

            return (
              <div
                key={idx}
                className="relative p-5 rounded-2xl bg-dark-900/90 border border-slate-700/80 hover:border-brand-cyan/60 transition-all group flex flex-col justify-between space-y-3"
              >
                {/* Node Step Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-dark-800 border border-slate-700 text-slate-400">
                    STAGE {idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-brand-cyan uppercase font-bold">{node.sub}</span>
                </div>

                {/* Node Icon & Title */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-dark-800 border border-slate-700 text-brand-cyan group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-brand-cyan transition-colors">
                      {node.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  {node.desc}
                </p>

                {/* Animated Packet indicator */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Packet Stream</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    200 SPS
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
