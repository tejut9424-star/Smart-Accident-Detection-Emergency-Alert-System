import React, { useState } from 'react';
import { 
  UserCheck, 
  Heart, 
  ShieldAlert, 
  Car, 
  FileText, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2 
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const VictimProfileView = () => {
  const { victimProfile } = useSimulation();
  const [showFullDetails, setShowFullDetails] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-brand-cyan" />
            DRIVER MEDICAL PROFILE & RESPONDER HUD
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Encrypted personal health record (PHR), critical allergies, blood group & motor insurance data
          </p>
        </div>

        <button
          onClick={() => setShowFullDetails(!showFullDetails)}
          className="px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5"
        >
          {showFullDetails ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4 text-brand-cyan" />}
          <span>{showFullDetails ? 'Hide Sensitive Fields' : 'Decrypt Full Profile'}</span>
        </button>
      </div>

      {/* Privacy Notice Card */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
        <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
        <p>
          <strong>HIPAA / Privacy Compliant:</strong> Sensitive non-critical data remains encrypted. Only essential paramedic metrics (Blood Group, Allergies, Emergency Contacts) are transmitted to CAD units upon severe crash confirmation.
        </p>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paramedic Critical Medical Card */}
        <div className="p-6 rounded-2xl glass-panel border border-emergency-red/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Heart className="w-5 h-5 text-emergency-red" />
              Paramedic Emergency Medical Triage
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emergency-red/20 text-emergency-red">
              CRITICAL FOR RESCUE
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Blood Group:</span>
              <span className="text-xl font-black text-emergency-red">{victimProfile.bloodGroup}</span>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Driver Name:</span>
              <span className="font-bold text-white text-sm">{victimProfile.fullName}</span>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Age / Gender:</span>
              <span className="font-bold text-white">{victimProfile.age} yrs / {victimProfile.gender}</span>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Known Allergies:</span>
              <span className="font-bold text-amber-400">{victimProfile.allergies}</span>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Emergency Medical Notes:</span>
              <span className="text-slate-200">{victimProfile.emergencyMedicalNotes}</span>
            </div>
          </div>
        </div>

        {/* Vehicle & Insurance Card */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Car className="w-5 h-5 text-brand-cyan" />
              Vehicle Registration & Motor Policy
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-cyan/20 text-brand-cyan">
              TELEMETRY LINKED
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Vehicle Plate:</span>
              <span className="text-base font-black text-brand-cyan">{victimProfile.vehicleNumber}</span>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Model:</span>
              <span className="font-bold text-white">{victimProfile.vehicleModel}</span>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Chassis VIN:</span>
              <span className="font-bold text-slate-300">
                {showFullDetails ? victimProfile.chassisNo : '••••••••••9021'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Insurance Provider:</span>
              <span className="font-bold text-white">{victimProfile.insuranceProvider}</span>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Policy Number:</span>
              <span className="font-bold text-slate-300">
                {showFullDetails ? victimProfile.policyNumber : 'POL-•••••-2026'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Primary Next of Kin:</span>
              <span className="font-bold text-purple-400">{victimProfile.primaryContact}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
