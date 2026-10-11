import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Activity, 
  BrainCircuit, 
  ShieldAlert, 
  FileText, 
  Building2, 
  CheckCircle2, 
  Printer 
} from 'lucide-react';

export const AccidentDetailModal = ({ accident, onClose, onOpenReport }) => {
  if (!accident) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel border border-slate-700 p-6 md:p-8 space-y-6 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-display text-white">
                Accident Incident #{accident.id}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emergency-red/20 text-emergency-red border border-emergency-red/40">
                {accident.severity.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Logged on {accident.date} at {accident.time} • Vehicle: {accident.vehicleId}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">IMPACT FORCE</span>
            <span className="text-base font-black text-emergency-red">{accident.impactForce}</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">GYROSCOPE PEAK</span>
            <span className="text-base font-black text-purple-400">{accident.gyroMax || '142°/s'}</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">AI CONFIDENCE</span>
            <span className="text-base font-black text-brand-cyan">{accident.aiConfidence}</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">RESPONSE TIME</span>
            <span className="text-base font-black text-emerald-400">{accident.responseTime}</span>
          </div>
        </div>

        {/* Location & Summary */}
        <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-brand-cyan font-mono font-bold">
            <MapPin className="w-4 h-4" />
            <span>{accident.location} ({accident.coordinates})</span>
          </div>
          <p className="text-slate-300 italic">
            "{accident.summary}"
          </p>
        </div>

        {/* High-Precision Chronological Timeline */}
        <div className="p-4 rounded-2xl bg-dark-900/60 border border-slate-800 space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-cyan" />
            Sensor & Response Chronological Timeline
          </h3>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2">
            {(accident.timeline || []).map((t, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-dark-850 border border-slate-800/80 text-xs font-mono flex items-start gap-3">
                <span className="text-brand-cyan font-bold shrink-0">{t.time}</span>
                <div>
                  <strong className="text-white block font-sans text-xs">{t.title}</strong>
                  <span className="text-[11px] text-slate-400">{t.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responders Handled */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Hospital Receiving:</span>
            <span className="font-bold text-white">{accident.hospital}</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Police Unit:</span>
            <span className="font-bold text-white">{accident.policeUnit}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <span className="text-xs font-mono text-slate-400">Cloud Sync ID: <strong className="text-brand-cyan">FB-REC-{accident.id}</strong></span>
          <div className="flex gap-2">
            <button
              onClick={() => onOpenReport(accident)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-dark-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Full Printable Report</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
