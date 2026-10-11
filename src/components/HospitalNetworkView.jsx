import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Send, 
  Star, 
  Bed, 
  Activity, 
  Sparkles 
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const HospitalNetworkView = () => {
  const { hospitals, addNotification, soundEnabled } = useSimulation();
  const [selectedHospitalId, setSelectedHospitalId] = useState('hosp-1');
  const [transmittingId, setTransmittingId] = useState(null);

  const handleTransmitCAD = (hosp) => {
    setTransmittingId(hosp.id);
    setSelectedHospitalId(hosp.id);
    setTimeout(() => {
      setTransmittingId(null);
      addNotification(
        'CAD Telemetry Transmitted', 
        `Accident telemetry, MPU6050 shockwave, and victim medical log dispatched to ${hosp.name}. Trauma ICU prepped.`,
        'success'
      );
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-brand-cyan" />
            TRAUMA HOSPITAL NETWORK & ICU CAPACITY
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Real-time emergency department bed availability, ICU trauma bays, and automated patient data handover
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>Active Hubs: <strong className="text-emerald-400">4 Connected</strong></span>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hospitals.map((hosp) => {
          const isSelected = selectedHospitalId === hosp.id;
          const isTransmitting = transmittingId === hosp.id;

          return (
            <div
              key={hosp.id}
              className={`p-6 rounded-2xl glass-panel border transition-all ${
                isSelected 
                  ? 'border-brand-cyan/60 bg-dark-850/90 shadow-xl shadow-brand-cyan/10' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">{hosp.name}</h3>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40">
                        PRIMARY CAD HUB
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-amber-400 font-mono flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {hosp.rating}
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-sm font-bold text-brand-cyan block">{hosp.distance} km</span>
                  <span className="text-[10px] text-slate-400">ETA: {hosp.eta}</span>
                </div>
              </div>

              {/* Bed & Capacity Metrics */}
              <div className="grid grid-cols-3 gap-2.5 my-4 text-xs font-mono text-center">
                <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">TRAUMA ICU</span>
                  <span className="font-bold text-emerald-400 text-sm">{hosp.icuAvailable} Beds</span>
                </div>
                <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">EMERGENCY BEDS</span>
                  <span className="font-bold text-white text-sm">{hosp.emergencyBeds} Total</span>
                </div>
                <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">AMBULANCE</span>
                  <span className="font-bold text-brand-cyan text-sm">{hosp.ambulanceAvailable} Active</span>
                </div>
              </div>

              {/* Contact & Status */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {hosp.phone}
                </span>
                <span className="text-emerald-400 font-bold">STATUS: {hosp.status}</span>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={() => handleTransmitCAD(hosp)}
                  disabled={isTransmitting}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-dark-950 shadow-lg shadow-brand-cyan/20'
                      : 'bg-dark-800 hover:bg-dark-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <Send className={`w-3.5 h-3.5 ${isTransmitting ? 'animate-spin' : ''}`} />
                  <span>{isTransmitting ? 'Transmitting CAD Telemetry...' : 'SELECT & TRANSMIT PATIENT DATA'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
