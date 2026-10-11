import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Flame, 
  Layers,
  Sparkles,
  HelpCircle,
  Play
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const FalseAlarmView = () => {
  const { falseAlarmScenarios, addNotification, soundEnabled } = useSimulation();
  const [activeScenario, setActiveScenario] = useState(falseAlarmScenarios[0]);
  const [testResult, setTestResult] = useState(null);

  const runTestScenario = (scen) => {
    setActiveScenario(scen);
    setTestResult('ANALYZING...');
    setTimeout(() => {
      setTestResult(scen);
      addNotification(
        scen.isAccident ? '🚨 ACCIDENT CONFIRMED' : '✓ Road Anomaly Rejected',
        `Scenario: ${scen.title}. ML Probability: ${scen.mlProbability}. Result: ${scen.classification}`,
        scen.isAccident ? 'emergency' : 'success'
      );
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            FALSE POSITIVE REJECTION & SENSOR FUSION ENGINE
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Demonstrating why naive thresholding fails and how ML sensor fusion rejects speed bumps, potholes, and hard braking
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Rejection Rate: <strong>99.1% Non-Crash Immunity</strong>
          </span>
        </div>
      </div>

      {/* Rationale Card */}
      <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 flex items-start gap-4">
        <Sparkles className="w-6 h-6 text-brand-cyan shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <h4 className="font-bold text-white text-sm">Why Simple G-Force Thresholds Cause Catastrophic False Alarms:</h4>
          <p className="leading-relaxed">
            A simple accelerometer threshold would trigger an ambulance whenever a driver hits a severe speed bump or performs emergency braking. Our <strong>Sensor Fusion ML Engine</strong> correlates tri-axial deceleration, high-frequency transient duration, and gyroscope rollover angles to eliminate 99.1% of false alarms.
          </p>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {falseAlarmScenarios.map((scen) => {
          const isSelected = activeScenario.id === scen.id;

          return (
            <div
              key={scen.id}
              className={`p-5 rounded-2xl glass-panel border transition-all flex flex-col justify-between space-y-4 ${
                isSelected 
                  ? 'border-brand-cyan/80 bg-dark-850 shadow-xl shadow-brand-cyan/10' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-white text-sm">{scen.title}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    scen.isAccident ? 'bg-emergency-red/20 text-emergency-red border border-emergency-red/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {scen.isAccident ? 'REAL CRASH' : 'NON-CRASH'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">{scen.subtitle}</p>

                <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Peak Accel:</span>
                    <span className="font-bold text-white">{scen.accelPeak}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gyro Rate:</span>
                    <span className="font-bold text-purple-400">{scen.gyroPeak}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ML Crash Prob:</span>
                    <span className={`font-bold ${scen.isAccident ? 'text-emergency-red' : 'text-emerald-400'}`}>
                      {scen.mlProbability}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => runTestScenario(scen)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                  scen.isAccident
                    ? 'bg-emergency-red/20 hover:bg-emergency-red/30 text-emergency-red border border-emergency-red/50'
                    : 'bg-dark-800 hover:bg-dark-700 text-brand-cyan border border-slate-700'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Sensor Pattern</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Test Verdict Output Box */}
      {testResult && (
        <div className="p-6 rounded-2xl glass-panel border border-brand-cyan/40 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-cyan" />
              Machine Learning Fusion Verdict: {activeScenario.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              activeScenario.isAccident ? 'bg-emergency-red text-white' : 'bg-emerald-500 text-dark-950'
            }`}>
              {activeScenario.classification}
            </span>
          </div>

          <p className="text-xs text-slate-300 font-mono leading-relaxed italic bg-dark-900 p-4 rounded-xl border border-slate-800">
            "{activeScenario.explanation}"
          </p>
        </div>
      )}
    </div>
  );
};
