import React from 'react';
import { 
  ShieldAlert, 
  Siren, 
  Building2, 
  PhoneCall, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Navigation, 
  Activity,
  Send,
  RotateCcw
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const EmergencyResponseView = () => {
  const { 
    dispatchStatus, 
    responseTimers, 
    emergencyActive, 
    vehicle, 
    hospitals, 
    resetSimulation 
  } = useSimulation();

  const timelineMilestones = [
    { label: 'Detection Triggered', time: '00:00:084', desc: 'MPU6050 & 1D-CNN classified severe collision', done: true },
    { label: 'GSM / CAD Alert Sent', time: '00:01:200', desc: 'SIM800L transmitted coordinates to CAD server', done: true },
    { label: 'Voice Confirmation', time: '00:06:400', desc: 'Interactive driver check executed', done: emergencyActive },
    { label: 'Ambulance Dispatched', time: '00:08:120', desc: 'Unit 108-A4 dispatched with vector route', done: dispatchStatus.ambulance.status.includes('DISPATCHED') },
    { label: 'Hospital ICU Prepped', time: '00:09:500', desc: 'Apollo Emergency Department locked trauma bay', done: dispatchStatus.hospital.status.includes('READY') },
    { label: 'Paramedic On-Scene ETA', time: '04:50:000', desc: 'Estimated vehicle arrival at coordinates', done: false }
  ];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-brand-cyan" />
            EMERGENCY CAD RESPONSE COMMAND CENTER
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Coordinated dispatch telemetry for 108 Ambulance, State Police, Level-1 Trauma Hospital & Family Contacts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-dark-800 border border-slate-700 text-slate-300">
            CAD INCIDENT: <strong className="text-brand-cyan">#CAD-9021-HYD</strong>
          </span>
        </div>
      </div>

      {/* 4 Responder Command Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ambulance Card */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 text-xl font-bold">
              🚑
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              dispatchStatus.ambulance.status.includes('DISPATCHED') ? 'bg-emergency-red/20 text-emergency-red border border-emergency-red/50 animate-pulse' : 'bg-dark-800 text-slate-400'
            }`}>
              {dispatchStatus.ambulance.status}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Emergency Ambulance 108</h3>
            <span className="text-xs text-slate-400 font-mono block mt-0.5">{dispatchStatus.ambulance.unit}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Distance:</span>
              <span className="font-bold text-brand-cyan">{dispatchStatus.ambulance.distance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ETA to Scene:</span>
              <span className="font-bold text-emerald-400">{dispatchStatus.ambulance.eta}</span>
            </div>
          </div>
        </div>

        {/* Police Card */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl font-bold">
              👮
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              dispatchStatus.police.status.includes('EN ROUTE') ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50' : 'bg-dark-800 text-slate-400'
            }`}>
              {dispatchStatus.police.status}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">State Police Dispatch 112</h3>
            <span className="text-xs text-slate-400 font-mono block mt-0.5">{dispatchStatus.police.unit}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Distance:</span>
              <span className="font-bold text-brand-cyan">{dispatchStatus.police.distance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ETA to Scene:</span>
              <span className="font-bold text-emerald-400">{dispatchStatus.police.eta}</span>
            </div>
          </div>
        </div>

        {/* Hospital Card */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-bold">
              🏥
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
              {dispatchStatus.hospital.status}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{dispatchStatus.hospital.name}</h3>
            <span className="text-xs text-slate-400 font-mono block mt-0.5">Level-1 Trauma & Burn Unit</span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Trauma ICU Beds:</span>
              <span className="font-bold text-emerald-400">{dispatchStatus.hospital.icu}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">General Beds:</span>
              <span className="font-bold text-brand-cyan">{dispatchStatus.hospital.beds}</span>
            </div>
          </div>
        </div>

        {/* Family Card */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl font-bold">
              👨‍👩‍👧
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300">
              {dispatchStatus.family.status}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Emergency Family Contact</h3>
            <span className="text-xs text-slate-400 font-mono block mt-0.5">{dispatchStatus.family.contact}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Delivery Channel:</span>
              <span className="font-bold text-white">Voice Call & SMS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">GPS Link Sent:</span>
              <span className="font-bold text-emerald-400">YES (Live Pin)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Response Timeline Milestones */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-cyan" />
          Real-Time Emergency CAD Chronology Timeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {timelineMilestones.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                item.done 
                  ? 'bg-dark-850 border-emerald-500/40 text-slate-200' 
                  : 'bg-dark-900/60 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1 text-xs font-mono">
                <span className="font-bold text-white">{item.label}</span>
                <span className={item.done ? 'text-emerald-400 font-bold' : 'text-slate-500'}>{item.time}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {item.desc}
              </p>
              <div className="mt-2 text-[10px] font-mono">
                {item.done ? <span className="text-emerald-400">✓ Completed</span> : <span className="text-slate-600">Pending</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
