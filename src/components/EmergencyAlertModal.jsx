import React from 'react';
import { 
  Siren, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  Database, 
  UserCheck, 
  Flame, 
  Volume2,
  X
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const EmergencyAlertModal = () => {
  const { 
    emergencyActive, 
    vehicle, 
    aiState, 
    sensors, 
    confirmationStatus, 
    confirmationSeconds, 
    cancelEmergencyResponse, 
    commitEmergencyDispatch,
    responseTimers,
    dispatchStatus,
    pipelineStep
  } = useSimulation();

  if (!emergencyActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-emergency border-2 border-emergency-red/80 p-6 md:p-8 space-y-6 shadow-2xl shadow-emergency-red/30">
        {/* Pulsing Emergency Header */}
        <div className="flex items-center justify-between border-b border-emergency-red/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emergency-red/20 border border-emergency-red flex items-center justify-center text-emergency-red text-2xl animate-pulse">
              🚨
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emergency-red animate-pulse">
                CRITICAL EMERGENCY PROTOCOL ACTIVATED
              </span>
              <h2 className="text-xl md:text-2xl font-black font-display text-white">
                HIGH IMPACT ACCIDENT CONFIRMED
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emergency-red text-white shadow-lg shadow-emergency-red/40 animate-bounce">
            PRIORITY 1 CAD
          </span>
        </div>

        {/* Telemetry Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-700">
            <span className="text-slate-400 text-[10px] block">VEHICLE ID</span>
            <span className="font-bold text-white text-sm">{vehicle.vehicleId}</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-700">
            <span className="text-slate-400 text-[10px] block">DRIVER</span>
            <span className="font-bold text-white text-sm">{vehicle.driverName.split(' ')[0]}</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-700">
            <span className="text-slate-400 text-[10px] block">IMPACT FORCE</span>
            <span className="font-bold text-emergency-red text-sm">{sensors.impactForce} g</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-700">
            <span className="text-slate-400 text-[10px] block">AI VERDICT</span>
            <span className="font-bold text-orange-400 text-sm">SEVERE (98%)</span>
          </div>
        </div>

        {/* GPS Location Bar */}
        <div className="p-3.5 rounded-xl bg-dark-900/90 border border-brand-cyan/30 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-200">
            <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
            <span>Accident Location: <strong>{vehicle.lat.toFixed(4)}° N, {vehicle.lng.toFixed(4)}° E</strong> (Outer Ring Road)</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">ACCURACY ±2.5m</span>
        </div>

        {/* 2-Way Victim Voice Confirmation Box */}
        {confirmationStatus === 'COUNTING_DOWN' && (
          <div className="p-5 rounded-2xl bg-dark-900/90 border-2 border-amber-500/60 text-center space-y-4 shadow-xl">
            <div className="flex items-center justify-center gap-2 text-amber-400">
              <Volume2 className="w-5 h-5 animate-pulse" />
              <h3 className="text-base font-bold font-display uppercase tracking-wide">
                Driver Safety Voice Confirmation
              </h3>
            </div>

            <p className="text-slate-200 text-sm font-semibold">
              "Are you safe? Press I'M SAFE to cancel CAD dispatch or teams will be sent."
            </p>

            {/* Countdown timer circular badge */}
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-amber-500 flex flex-col items-center justify-center bg-dark-950 shadow-lg shadow-amber-500/20">
                <span className="text-2xl font-black font-display text-amber-400 animate-ping">
                  {confirmationSeconds}
                </span>
                <span className="text-[8px] font-mono text-slate-400">SECONDS</span>
              </div>
            </div>

            {/* Interactive Decision Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={cancelEmergencyResponse}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
              >
                <span>🟢 I'M SAFE — CANCEL ALERT</span>
              </button>

              <button
                onClick={commitEmergencyDispatch}
                className="py-3 px-4 rounded-xl bg-emergency-red hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emergency-red/40 transition-all active:scale-95"
              >
                <span>🔴 NEED HELP — SEND AMBULANCE</span>
              </button>
            </div>
          </div>
        )}

        {/* Real-time Dispatch Delivery Logs */}
        <div className="p-4 rounded-2xl bg-dark-900/70 border border-slate-800 space-y-2 text-xs font-mono">
          <span className="text-[10px] uppercase text-slate-400 tracking-wider block mb-1">
            Real-Time Automated Alert Transmission Checklist
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400">
              <span>✓</span> <span>Family Alert Sent (SMS + Voice Link)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span>✓</span> <span>108 Ambulance Alert Sent (CAD Dispatched)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span>✓</span> <span>Police Control 112 Alert Sent</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span>✓</span> <span>Apollo Trauma Hospital ICU Reserved</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 sm:col-span-2">
              <span>✓</span> <span>Cloud Incident Record Synced to Firebase Firestore</span>
            </div>
          </div>
        </div>

        {/* Footer response timer */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Detection Latency: <strong className="text-white">84 ms</strong></span>
          </div>
          <span>Status: <strong className="text-emerald-400">{confirmationStatus === 'HELP_CONFIRMED' ? 'DISPATCH COMMITTED 🚑' : 'AWAITING DRIVER'}</strong></span>
        </div>
      </div>
    </div>
  );
};
