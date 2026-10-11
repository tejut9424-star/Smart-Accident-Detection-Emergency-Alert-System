import React, { useState } from 'react';
import { 
  Smartphone, 
  Siren, 
  Car, 
  ShieldAlert, 
  MapPin, 
  PhoneCall, 
  Bell, 
  User, 
  Activity, 
  Flame,
  Zap
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const SmartphonePreview = () => {
  const { 
    vehicle, 
    systemStatus, 
    triggerSimulation, 
    addNotification, 
    emergencyActive,
    contacts,
    victimProfile
  } = useSimulation();

  const [mobileTab, setMobileTab] = useState('home'); // 'home', 'contacts', 'notifications', 'profile'
  const [sosTriggered, setSosTriggered] = useState(false);

  const handleManualSOS = () => {
    setSosTriggered(true);
    triggerSimulation('SEVERE');
    addNotification('🚨 Manual SOS Triggered from Mobile App', 'Driver initiated instant emergency broadcast.', 'emergency');
    setTimeout(() => setSosTriggered(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Smartphone className="w-6 h-6 text-brand-cyan" />
            COMPANION SMARTPHONE APPLICATION (FUTURE SCOPE PREVIEW)
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Driver companion mobile interface with one-touch SOS beacon, Bluetooth BLE telemetry pairing & live responder tracking
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
          MOBILE BLE PROTOCOL v1.4
        </span>
      </div>

      {/* Centered Realistic Phone Bezel Frame */}
      <div className="flex items-center justify-center py-4">
        <div className="relative w-[360px] h-[720px] rounded-[48px] bg-slate-950 border-[10px] border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between">
          {/* Top Speaker / Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-700 mr-2"></div>
            <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
          </div>

          {/* Mobile Screen Header */}
          <div className="pt-8 px-5 pb-3 bg-dark-900 border-b border-slate-800 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <span className="text-base">🚗</span>
              <span className="text-xs font-bold text-white font-display">SmartSafe Mobile</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              BLE PAIRED
            </span>
          </div>

          {/* Mobile Screen Content Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-950 text-xs">
            {mobileTab === 'home' && (
              <div className="space-y-4">
                {/* Vehicle Quick Card */}
                <div className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{vehicle.vehicleId}</span>
                    <span className="text-[10px] font-mono text-brand-cyan">{vehicle.speed} km/h</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Battery: <strong className="text-emerald-400">{systemStatus.battery}%</strong></span>
                    <span>Status: <strong className="text-white">{vehicle.speed > 0 ? 'Driving' : 'Parked'}</strong></span>
                  </div>
                </div>

                {/* Giant Red Interactive SOS Button */}
                <div className="p-4 rounded-3xl bg-dark-900 border border-emergency-red/30 flex flex-col items-center justify-center text-center space-y-3 shadow-lg shadow-emergency-red/10">
                  <button
                    onClick={handleManualSOS}
                    className={`w-32 h-32 rounded-full border-4 border-emergency-red flex flex-col items-center justify-center transition-all active:scale-95 shadow-2xl ${
                      sosTriggered || emergencyActive 
                        ? 'bg-emergency-red text-white animate-pulse shadow-emergency-red/50' 
                        : 'bg-gradient-to-tr from-emergency-red to-red-600 hover:brightness-110 text-white shadow-emergency-red/30'
                    }`}
                  >
                    <Siren className="w-8 h-8 mb-1 animate-bounce" />
                    <span className="text-base font-black font-display tracking-wider">SOS</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest">TAP FOR HELP</span>
                  </button>
                  <p className="text-[10px] text-slate-400">
                    Pressing SOS triggers instant 108 CAD dispatch and family live GPS broadcast.
                  </p>
                </div>

                {/* Live Location Snippet */}
                <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-cyan" />
                    <span className="text-[11px] text-slate-300 font-mono">Outer Ring Road, HYD</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold font-mono">GPS FIXED</span>
                </div>
              </div>
            )}

            {mobileTab === 'contacts' && (
              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs mb-2">Emergency Contacts</h4>
                {contacts.map(c => (
                  <div key={c.id} className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <strong className="text-white text-xs block">{c.name}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{c.phone}</span>
                    </div>
                    <span className="text-[9px] text-brand-cyan font-mono">{c.relation}</span>
                  </div>
                ))}
              </div>
            )}

            {mobileTab === 'notifications' && (
              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs mb-2">System Notifications</h4>
                <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-[10px] text-brand-cyan font-mono">
                    <span>ESP32 Sync</span>
                    <span>Just now</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Sensor baseline calibrated. Zero packet drop.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-[10px] text-emerald-400 font-mono">
                    <span>GPS Lock</span>
                    <span>5m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-300">NEO-6M satellite fix acquired with 11 sats.</p>
                </div>
              </div>
            )}

            {mobileTab === 'profile' && (
              <div className="space-y-2.5">
                <h4 className="font-bold text-white text-xs mb-1">Driver Medical Card</h4>
                <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                  <div>Name: <strong className="text-white">{victimProfile.fullName}</strong></div>
                  <div>Blood: <strong className="text-emergency-red">{victimProfile.bloodGroup}</strong></div>
                  <div>Allergies: <strong className="text-amber-400">{victimProfile.allergies}</strong></div>
                  <div>Policy: <strong className="text-slate-300">{victimProfile.policyNumber}</strong></div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <div className="px-4 py-3 bg-dark-900 border-t border-slate-800 flex items-center justify-around z-20">
            <button
              onClick={() => setMobileTab('home')}
              className={`flex flex-col items-center gap-1 ${mobileTab === 'home' ? 'text-brand-cyan' : 'text-slate-500'}`}
            >
              <Car className="w-4 h-4" />
              <span className="text-[9px]">Home</span>
            </button>
            <button
              onClick={() => setMobileTab('contacts')}
              className={`flex flex-col items-center gap-1 ${mobileTab === 'contacts' ? 'text-brand-cyan' : 'text-slate-500'}`}
            >
              <PhoneCall className="w-4 h-4" />
              <span className="text-[9px]">Contacts</span>
            </button>
            <button
              onClick={() => setMobileTab('notifications')}
              className={`flex flex-col items-center gap-1 ${mobileTab === 'notifications' ? 'text-brand-cyan' : 'text-slate-500'}`}
            >
              <Bell className="w-4 h-4" />
              <span className="text-[9px]">Alerts</span>
            </button>
            <button
              onClick={() => setMobileTab('profile')}
              className={`flex flex-col items-center gap-1 ${mobileTab === 'profile' ? 'text-brand-cyan' : 'text-slate-500'}`}
            >
              <User className="w-4 h-4" />
              <span className="text-[9px]">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
