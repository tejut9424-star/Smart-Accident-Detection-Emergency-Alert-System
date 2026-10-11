import React from 'react';
import { 
  BrainCircuit, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Layers, 
  Activity, 
  HelpCircle, 
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const AiPredictionView = () => {
  const { aiState, sensors, vehicle } = useSimulation();

  const severityTiers = [
    { level: 'MINOR', color: 'emerald', label: '🟢 MINOR (Low Risk)', force: '< 3.0 g', speed: '< 30 km/h', rotation: '< 45°/s', damage: '5-15%', priority: 'LOW' },
    { level: 'MODERATE', color: 'yellow', label: '🟡 MODERATE (Advisory)', force: '3.0 - 6.0 g', speed: '30-60 km/h', rotation: '45-90°/s', damage: '20-50%', priority: 'MEDIUM' },
    { level: 'SEVERE', color: 'orange', label: '🔴 SEVERE (High Priority)', force: '6.0 - 10.0 g', speed: '60-100 km/h', rotation: '90-180°/s', damage: '50-85%', priority: 'HIGH' },
    { level: 'CRITICAL', color: 'red', label: '⚫️ CRITICAL (Life-Threatening)', force: '> 10.0 g', speed: '> 100 km/h', rotation: '> 180°/s', damage: '> 85%', priority: 'MAXIMUM CAD DISPATCH' },
  ];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <BrainCircuit className="w-6 h-6 text-brand-cyan" />
            AI ACCIDENT DETECTION & SENSOR FUSION ENGINE
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Edge ML inference running 1D-CNN and Random Forest classifiers on streaming MPU6050 6-DoF telemetry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            MODEL: 1D-CNN SENSOR FUSION
          </span>
        </div>
      </div>

      {/* Model Spec & Training Target Banner */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 flex items-start gap-3">
        <Info className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <p>
            <strong>Research & Training Benchmark Specification:</strong> The proposed edge architecture utilizes sensor fusion and ML classification to detect multi-axis vehicle collisions. The training target is <strong>10,000+ simulated accident scenarios</strong> across diverse road geometries, speeds, and rollover conditions.
          </p>
          <p className="text-[11px] text-slate-400 font-mono">
            *Performance figures (84ms detection, 98.2% confidence) reflect simulated target benchmarks on ESP32 dual-core Xtensa 240MHz hardware.
          </p>
        </div>
      </div>

      {/* Main AI Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Circular Confidence Meter & Probability (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col items-center justify-between space-y-6">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">ML INFERENCE ENGINE</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              ● MODEL ACTIVE
            </span>
          </div>

          {/* Animated Circular Meter */}
          <div className="relative w-52 h-52 rounded-full border-8 border-dark-800 flex flex-col items-center justify-center shadow-2xl bg-dark-900/80">
            <div 
              className="absolute inset-0 rounded-full border-8 border-brand-cyan border-t-transparent border-l-transparent transition-all duration-700"
              style={{ transform: `rotate(${Math.min(aiState.confidenceScore * 3.6 - 90, 270)}deg)` }}
            ></div>
            <span className="text-4xl font-black font-display text-white tracking-tight glow-text-cyan">
              {aiState.confidenceScore}%
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1">AI CONFIDENCE</span>
            <span className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Latency: {aiState.detectionLatency} ms
            </span>
          </div>

          {/* Accident Probability Bar */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Accident Probability</span>
              <span className={`font-bold ${aiState.accidentProbability > 50 ? 'text-emergency-red' : 'text-emerald-400'}`}>
                {aiState.accidentProbability}%
              </span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-3 border border-slate-700/60 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  aiState.accidentProbability > 50 ? 'bg-gradient-to-r from-orange-500 to-emergency-red' : 'bg-gradient-to-r from-teal-500 to-emerald-400'
                }`}
                style={{ width: `${aiState.accidentProbability}%` }}
              ></div>
            </div>
          </div>

          {/* Sensor Confidence Scores */}
          <div className="w-full grid grid-cols-2 gap-2 text-xs font-mono text-center">
            <div className="p-2.5 rounded-xl bg-dark-850 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">IMU QUALITY</span>
              <span className="font-bold text-white">99.8% Calibrated</span>
            </div>
            <div className="p-2.5 rounded-xl bg-dark-850 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">FUSION WEIGHT</span>
              <span className="font-bold text-brand-cyan">0.82 Acc / 0.18 Gyro</span>
            </div>
          </div>
        </div>

        {/* Right: Decision Explanation & Matrix (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Decision Explanation Box */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-cyan" />
                AI Decision & Kinematic Rationale
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Explainable AI (XAI)</span>
            </div>

            <div className="p-4 rounded-xl bg-dark-900 border border-brand-cyan/30 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono">Current Verdict:</span>
                <span className="font-bold text-brand-cyan uppercase font-mono">{aiState.classification}</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed italic">
                "{aiState.decisionExplanation}"
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-dark-850 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">ESTIMATED DAMAGE</span>
                <span className="font-bold text-white">{aiState.estimatedDamage}</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-850 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">INJURY RISK</span>
                <span className="font-bold text-white">{aiState.injuryRisk}</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-850 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">PRIORITY TIER</span>
                <span className="font-bold text-brand-cyan">{aiState.emergencyPriority}</span>
              </div>
            </div>
          </div>

          {/* Severity Matrix Table */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-cyan" />
              Machine Learning Severity Classification Matrix
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 font-mono text-[10px] text-slate-400 uppercase">
                    <th className="pb-2">Severity Tier</th>
                    <th className="pb-2">Impact (g)</th>
                    <th className="pb-2">Rotation (°/s)</th>
                    <th className="pb-2">Damage</th>
                    <th className="pb-2">CAD Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {severityTiers.map((tier) => (
                    <tr key={tier.level} className={aiState.severity === tier.level ? 'bg-brand-cyan/10 font-bold text-white' : 'text-slate-400'}>
                      <td className="py-2.5">{tier.label}</td>
                      <td className="py-2.5">{tier.force}</td>
                      <td className="py-2.5">{tier.rotation}</td>
                      <td className="py-2.5">{tier.damage}</td>
                      <td className="py-2.5 text-slate-300">{tier.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
