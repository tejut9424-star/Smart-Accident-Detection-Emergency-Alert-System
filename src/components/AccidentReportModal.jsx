import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  ShieldCheck, 
  FileText, 
  AlertTriangle,
  Building2,
  PhoneCall
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const AccidentReportModal = ({ accident, onClose }) => {
  const { addNotification } = useSimulation();

  if (!accident) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const reportText = `=====================================================
SMART ACCIDENT DETECTION & EMERGENCY ALERT SYSTEM
OFFICIAL CRASH INCIDENT INVESTIGATION REPORT
=====================================================
INCIDENT ID:      ${accident.id}
DATE & TIME:      ${accident.date} at ${accident.time}
VEHICLE REG:      ${accident.vehicleId}
DRIVER:           ${accident.driver}
LOCATION:         ${accident.location}
GPS COORDINATES:  ${accident.coordinates}

SEVERITY CLASSIFICATION: ${accident.severity.toUpperCase()}
IMPACT FORCE:            ${accident.impactForce}
GYROSCOPE PEAK:          ${accident.gyroMax || '142°/s'}
AI ML CONFIDENCE:        ${accident.aiConfidence}
DETECTION LATENCY:       84 ms (Edge ESP32 inference)

EMERGENCY RESPONSE TELEMETRY:
- 108 Ambulance Unit:    Dispatched (Apollo Trauma ALS Unit)
- Police CAD Unit:       Cyberabad Traffic Patrol 04
- Receiving Hospital:    ${accident.hospital}
- Total Response Time:   ${accident.responseTime}
- Resolution Status:     ${accident.status}

INVESTIGATION SUMMARY:
${accident.summary}

FIREBASE CLOUD RECORD: FB-REC-${accident.id}
AUTHENTICATED SECURE CAD DOCUMENT
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Incident-Report-${accident.id}.txt`;
    a.click();
    addNotification('Report Downloaded', `Investigation report for ${accident.id} saved.`, 'success');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Accident Incident #${accident.id} Report - Severity: ${accident.severity}, Location: ${accident.location}`);
      addNotification('Report Link Copied', 'Incident summary copied to clipboard for emergency sharing.', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md overflow-y-auto print:bg-white print:p-0">
      <div className="relative w-full max-w-2xl rounded-3xl bg-dark-900 border border-slate-700 p-6 md:p-8 space-y-6 shadow-2xl my-8 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-cyan" />
            <h2 className="text-lg font-bold font-display text-white">
              Official Incident Investigation Report
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formal Report Document Body */}
        <div className="space-y-6 text-xs font-mono text-slate-200 print:text-black">
          {/* Header of Report */}
          <div className="text-center pb-4 border-b border-slate-800 space-y-1">
            <h3 className="text-base font-black uppercase tracking-wider text-white print:text-black">
              Smart Accident Detection & Emergency CAD System
            </h3>
            <p className="text-[10px] text-slate-400">
              Department of Transport Telemetry & Emergency Medical Services (EMS) Record
            </p>
            <div className="inline-block px-3 py-1 rounded bg-dark-850 border border-slate-700 font-bold text-brand-cyan print:text-black mt-2">
              INCIDENT ID: #{accident.id} • STATUS: {accident.status.toUpperCase()}
            </div>
          </div>

          {/* Incident Overview Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 p-3 rounded-xl bg-dark-850/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">TIMESTAMP & LOCATION</span>
              <div>Date: <strong>{accident.date}</strong></div>
              <div>Time: <strong>{accident.time}</strong></div>
              <div className="truncate">GPS: <strong>{accident.coordinates}</strong></div>
              <div className="truncate">Sector: <strong>{accident.location}</strong></div>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-dark-850/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">VEHICLE & DRIVER</span>
              <div>Vehicle ID: <strong>{accident.vehicleId}</strong></div>
              <div>Driver: <strong>{accident.driver}</strong></div>
              <div>Severity: <strong className="text-emergency-red">{accident.severity}</strong></div>
              <div>Impact G-Force: <strong>{accident.impactForce}</strong></div>
            </div>
          </div>

          {/* AI Decision Analysis */}
          <div className="p-3 rounded-xl bg-dark-850/60 border border-slate-800 space-y-1.5">
            <span className="text-slate-400 text-[10px] block">EDGE SENSOR FUSION & ML VERDICT</span>
            <div className="flex justify-between">
              <span>ML Classifier Model: <strong>1D-CNN Sensor Fusion</strong></span>
              <span>Confidence: <strong className="text-brand-cyan">{accident.aiConfidence}</strong></span>
            </div>
            <div className="flex justify-between">
              <span>Detection Latency: <strong>84 ms (ESP32 Edge)</strong></span>
              <span>Sampling Rate: <strong>200 SPS</strong></span>
            </div>
            <p className="text-[11px] text-slate-300 italic pt-1">
              "{accident.summary}"
            </p>
          </div>

          {/* CAD Response Actions */}
          <div className="p-3 rounded-xl bg-dark-850/60 border border-slate-800 space-y-1.5">
            <span className="text-slate-400 text-[10px] block">EMERGENCY DISPATCH VERIFICATION</span>
            <div className="flex justify-between">
              <span>Receiving Hospital: <strong>{accident.hospital}</strong></span>
              <span>Total Response: <strong>{accident.responseTime}</strong></span>
            </div>
            <div className="flex justify-between">
              <span>Law Enforcement: <strong>{accident.policeUnit}</strong></span>
              <span>Cloud Sync Hash: <strong>FB-REC-{accident.id}</strong></span>
            </div>
          </div>
        </div>

        {/* Actions (Hidden in Print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 print:hidden">
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Print Report</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download (.txt)</span>
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Share</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-dark-950 font-bold text-xs"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
