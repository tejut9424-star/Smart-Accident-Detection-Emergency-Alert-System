import React from 'react';
import { 
  Activity, 
  Wifi, 
  Cpu, 
  Radio, 
  Database, 
  BatteryCharging, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Play, 
  RotateCcw, 
  AlertTriangle,
  Flame,
  ShieldCheck,
  ExternalLink,
  Layers
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const Header = () => {
  const { 
    systemStatus, 
    vehicle, 
    pipelineStep, 
    emergencyActive, 
    soundEnabled, 
    setSoundEnabled,
    voiceVoiceEnabled,
    setVoiceEnabled,
    triggerSimulation,
    resetSimulation,
    runAutoDemo,
    isAutoDemoRunning,
    autoDemoStep,
    setActiveTab
  } = useSimulation();

  return (
    <header className="sticky top-0 z-40 bg-dark-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Disclaimer Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-dark-900 to-amber-950/80 border-b border-amber-500/30 px-4 py-1 text-center text-xs font-mono text-amber-300 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        <span className="font-semibold tracking-wider uppercase">Simulation / Demonstration Mode:</span>
        <span className="text-amber-200/80 hidden sm:inline">Browser-based testbed for ESP32, MPU6050 & Machine Learning research specifications</span>
        <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/30">Target: 10k+ Scenarios</span>
      </div>

      <div className="px-4 lg:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-cyan/20 via-brand-blue/30 to-emergency-red/20 border border-brand-cyan/40 shadow-lg shadow-brand-cyan/10">
            <span className="text-2xl animate-float">🚗</span>
            {emergencyActive && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emergency-red border border-white"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-cyan bg-clip-text text-transparent">
                SMART ACCIDENT DETECTION
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
                v2.6 IoT ML
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
              Real-Time Vehicle Accident Detection Using IoT & Machine Learning
            </p>
          </div>
        </div>

        {/* Live Hardware Telemetry Badges */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-800 border border-slate-700/60 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-brand-cyan" />
            <span>ESP32:</span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-800 border border-slate-700/60 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-brand-blue" />
            <span>MPU6050:</span>
            <span className="text-emerald-400 font-bold">200Hz</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-800 border border-slate-700/60 text-slate-300">
            <Radio className="w-3.5 h-3.5 text-brand-teal" />
            <span>GPS:</span>
            <span className="text-emerald-400 font-bold">LOCKED</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-800 border border-slate-700/60 text-slate-300">
            <Wifi className="w-3.5 h-3.5 text-indigo-400" />
            <span>GSM/4G:</span>
            <span className="text-emerald-400 font-bold">CSQ 28</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-800 border border-slate-700/60 text-slate-300">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>FIREBASE:</span>
            <span className="text-emerald-400 font-bold">SYNC</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-800 border border-slate-700/60 text-slate-300">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            <span>BATTERY:</span>
            <span className="text-emerald-400 font-bold">{systemStatus.battery}%</span>
          </div>
        </div>

        {/* Global Action & Control Buttons */}
        <div className="flex items-center gap-2">
          {/* Sound & Speech Synthesizer Toggles */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1 ${
              soundEnabled 
                ? 'bg-brand-cyan/10 border-brand-cyan/40 text-brand-cyan shadow-sm shadow-brand-cyan/20' 
                : 'bg-dark-800 border-slate-700 text-slate-500'
            }`}
            title={soundEnabled ? 'Siren & Audio Effects Enabled' : 'Audio Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setVoiceEnabled(!voiceVoiceEnabled)}
            className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1 ${
              voiceVoiceEnabled 
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-400 shadow-sm shadow-purple-500/20' 
                : 'bg-dark-800 border-slate-700 text-slate-500'
            }`}
            title={voiceVoiceEnabled ? 'Voice Synthesis Alerts Active' : 'Voice Synthesis Off'}
          >
            {voiceVoiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* AUTO DEMO Presentation Mode */}
          <button
            onClick={runAutoDemo}
            disabled={isAutoDemoRunning}
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all flex items-center gap-1.5 shadow-lg ${
              isAutoDemoRunning 
                ? 'bg-amber-600 text-white animate-pulse border border-amber-400' 
                : 'bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-teal text-dark-950 hover:brightness-110 font-bold'
            }`}
            title="Automated Multi-Stage Crash Scenario for Presentations"
          >
            <Play className={`w-3.5 h-3.5 ${isAutoDemoRunning ? 'animate-spin' : ''}`} />
            <span>{isAutoDemoRunning ? `AUTO DEMO (Step ${autoDemoStep}/8)` : 'RUN AUTO DEMO'}</span>
          </button>

          {/* Quick Crash Simulation Trigger */}
          <button
            onClick={() => triggerSimulation('SEVERE')}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-emergency-red hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all active:scale-95"
            title="Instant Severe Crash Simulation"
          >
            <Flame className="w-3.5 h-3.5 animate-bounce" />
            <span className="hidden sm:inline">SIMULATE</span> CRASH
          </button>

          {/* Reset button */}
          <button
            onClick={resetSimulation}
            className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-xs"
            title="Reset Simulation State"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
