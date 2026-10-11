import React from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Award
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const AboutView = () => {
  const { setActiveTab } = useSimulation();

  const futureScopes = [
    { title: 'Deep Learning & Edge Neural Accelerators', desc: 'Transitioning to TinyML CNN quantization on ESP32-S3 vector extensions for sub-50ms inference.' },
    { title: 'Native Smartphone BLE Sensor Pairing', desc: 'Direct wireless telemetry sync with driver smartphones for automated crash verification and biometric heart rate monitoring.' },
    { title: '5G Low-Latency C-V2X Telematics', desc: 'Cellular Vehicle-to-Everything (C-V2X) broadcasting to warn trailing vehicles within a 500m radius of an active crash site.' },
    { title: 'Wearable Biometric Sensor Integration', desc: 'Smartwatch pulse oximeter integration to stream victim vital signs directly to trauma ICU teams prior to ambulance arrival.' },
    { title: 'Smart City Traffic Signal Preemption', desc: 'Green corridor automation that clears traffic signals ahead of dispatched 108 ALS ambulances.' },
    { title: 'Predictive Accident Prevention AI', desc: 'Real-time road curvature and weather analysis to issue proactive collision warnings before an impact occurs.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-brand-cyan" />
            PROJECT VIVA SPECIFICATIONS & ACADEMIC DOCUMENTATION
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Core hardware specs, edge sensor fusion theory, machine learning validation benchmarks & future development scope
          </p>
        </div>

        <button
          onClick={() => setActiveTab('landing')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:brightness-110 text-dark-950 font-bold text-xs shadow-lg shadow-brand-cyan/20"
        >
          View Public Landing Page
        </button>
      </div>

      {/* Project Overview Card */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-brand-cyan font-mono text-xs uppercase tracking-wider font-bold">
          <Award className="w-4 h-4" />
          <span>Capstone Embedded System & AI Research Project</span>
        </div>
        <h3 className="text-xl md:text-2xl font-black font-display text-white">
          Smart Accident Detection & Emergency Alert System Using IoT & Machine Learning
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          This system bridges the critical "Golden Hour" gap in vehicular emergencies by automating the accident detection and CAD dispatch process. Utilizing tri-axial accelerometer and gyroscope data from an MPU6050, the ESP32 microcontroller executes edge sensor fusion and machine learning classification to differentiate genuine severe crashes from normal road anomalies (potholes, speed bumps, hard braking).
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
          <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">TARGET ML LATENCY</span>
            <span className="font-bold text-emerald-400 text-sm">84 ms (Edge Inference)</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">TRAINING BENCHMARK</span>
            <span className="font-bold text-brand-cyan text-sm">10,000+ Crash Scenarios</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">GPS CEP PRECISION</span>
            <span className="font-bold text-purple-400 text-sm">±2.5m (NEO-6M Lock)</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">SAMPLING RATE</span>
            <span className="font-bold text-white text-sm">200 Hz High-Speed</span>
          </div>
        </div>
      </div>

      {/* Future Scope Section */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-cyan" />
          Future Technology & Research Scope
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {futureScopes.map((scope, i) => (
            <div key={i} className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-xs font-display flex items-center gap-1.5 text-brand-cyan">
                <span>0{i + 1}.</span> {scope.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                {scope.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
