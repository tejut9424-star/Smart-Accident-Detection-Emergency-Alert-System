import React from 'react';
import { 
  Sliders, 
  ShieldCheck, 
  Volume2, 
  Mic, 
  Cloud, 
  MapPin, 
  Clock, 
  Zap, 
  Radio, 
  CheckCircle2, 
  RotateCcw 
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const AdminSettingsView = () => {
  const { 
    systemStatus, 
    setSystemStatus, 
    soundEnabled, 
    setSoundEnabled, 
    voiceVoiceEnabled, 
    setVoiceEnabled, 
    resetSimulation,
    addNotification 
  } = useSimulation();

  const handleSensitivityChange = (val) => {
    setSystemStatus(prev => ({ ...prev, detectionSensitivity: val }));
    addNotification('Sensitivity Updated', `AI Detection Sensitivity set to ${val}.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-brand-cyan" />
            ADMIN CONFIGURATION & SYSTEM THRESHOLDS
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Fine-tune edge ML sensitivity, voice confirmation countdown timers, GPS NMEA sampling rates, and dispatch webhooks
          </p>
        </div>

        <button
          onClick={resetSimulation}
          className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Admin Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detection & ML Sensitivity */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Zap className="w-5 h-5 text-brand-cyan" />
            <h3 className="font-bold text-white text-base">ML Inference & Impact Sensitivity</h3>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="block text-slate-400 mb-1">Impact Sensitivity Profile</label>
              <select
                value={systemStatus.detectionSensitivity}
                onChange={e => handleSensitivityChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white font-sans text-xs focus:outline-none focus:border-brand-cyan"
              >
                <option>High Sensitivity (Strict 2.0g impact trigger)</option>
                <option>Balanced (High Accuracy) (4.0g with ML confirmation)</option>
                <option>Conservative (Logistics / Heavy vehicle calibration)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Confirmation Countdown (Seconds)</label>
              <select className="w-full px-3 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white font-sans text-xs focus:outline-none focus:border-brand-cyan">
                <option>10 Seconds (Standard EMS Protocol)</option>
                <option>5 Seconds (Rapid CAD Dispatch)</option>
                <option>15 Seconds (Extended Driver Response)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">SIM800L CAD Broadcast Delay</label>
              <select className="w-full px-3 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white font-sans text-xs focus:outline-none focus:border-brand-cyan">
                <option>Instantaneous (0 ms Edge Transmit)</option>
                <option>500 ms (Buffered Multi-Sample Verification)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audio & Audio Synthesis Engine */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Volume2 className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-base">Audio Synthesizer & Speech Synthesis</h3>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white text-sm block">Web Audio Sirens & Beeps</strong>
                <span className="text-[11px] text-slate-400">Emergency acoustic sirens & telemetry clicks</span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  soundEnabled ? 'bg-brand-cyan text-dark-950' : 'bg-dark-800 text-slate-500 border border-slate-700'
                }`}
              >
                {soundEnabled ? 'ENABLED' : 'MUTED'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white text-sm block">Web Speech Voice Prompts</strong>
                <span className="text-[11px] text-slate-400">Automated "Are you safe?" spoken voice guidance</span>
              </div>
              <button
                onClick={() => setVoiceEnabled(!voiceVoiceEnabled)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  voiceVoiceEnabled ? 'bg-purple-500 text-white' : 'bg-dark-800 text-slate-500 border border-slate-700'
                }`}
              >
                {voiceVoiceEnabled ? 'ACTIVE' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
