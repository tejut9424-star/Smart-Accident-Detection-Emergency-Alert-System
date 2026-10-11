import React from 'react';
import { 
  Car, 
  Play, 
  Square, 
  Zap, 
  AlertTriangle, 
  RotateCcw, 
  Gauge, 
  Compass, 
  MapPin, 
  BatteryCharging, 
  ShieldCheck, 
  Key, 
  Flame,
  Truck,
  Bus,
  Bike
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const LiveVehicleView = () => {
  const { 
    vehicle, 
    setVehicle, 
    systemStatus, 
    sensors, 
    startVehicle, 
    stopVehicle, 
    accelerateVehicle, 
    brakeVehicle, 
    triggerSimulation, 
    resetSimulation 
  } = useSimulation();

  const vehicleTypes = [
    { id: 'Car (Sedan EV)', label: 'Private Sedan EV', icon: Car },
    { id: 'Two-Wheeler / Bike', label: 'Commuter Motorcycle', icon: Bike },
    { id: 'Commercial Truck', label: 'Heavy Logistics Truck', icon: Truck },
    { id: 'Public Transport Bus', label: 'City Transit Bus', icon: Bus },
  ];

  return (
    <div className="space-y-6">
      {/* View Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Car className="w-6 h-6 text-brand-cyan" />
            LIVE VEHICLE TELEMETRY & SIMULATION PANEL
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Real-time IoT vehicle controller, powertrain kinematics, GPS vector tracking & dynamic accident triggering
          </p>
        </div>

        {/* Vehicle Type Switcher */}
        <div className="flex flex-wrap gap-2">
          {vehicleTypes.map((v) => {
            const Icon = v.icon;
            const isSelected = vehicle.vehicleType.includes(v.id.split(' ')[0]);
            return (
              <button
                key={v.id}
                onClick={() => setVehicle(prev => ({ ...prev, vehicleType: v.id }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-brand-cyan/20 border border-brand-cyan text-brand-cyan shadow-sm shadow-brand-cyan/20'
                    : 'bg-dark-800 border border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Vehicle Simulation Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Speedometer & Cabin Status (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">TELEMETRY ID</span>
              <h3 className="text-lg font-black font-mono text-white">{vehicle.vehicleId}</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              vehicle.speed > 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse' : 'bg-slate-800 text-slate-400'
            }`}>
              {vehicle.speed > 0 ? '● ACTIVE DRIVING' : '○ ENGINE IDLE'}
            </span>
          </div>

          {/* Glowing Speedometer Ring */}
          <div className="flex flex-col items-center justify-center my-4">
            <div className="relative w-56 h-56 rounded-full border-8 border-dark-800 flex flex-col items-center justify-center shadow-2xl bg-dark-900/60">
              <div 
                className="absolute inset-0 rounded-full border-8 border-brand-cyan border-t-transparent border-l-transparent transition-all duration-300"
                style={{ transform: `rotate(${Math.min(vehicle.speed * 1.8 - 90, 180)}deg)` }}
              ></div>
              <span className="text-5xl font-black font-display text-white tracking-tighter glow-text-cyan">
                {vehicle.speed}
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1">KM / HOUR</span>
              <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-emerald-400">
                <Compass className="w-3.5 h-3.5 animate-spin" />
                <span>Heading: {vehicle.heading}° NE</span>
              </div>
            </div>
          </div>

          {/* Cabin Telemetry Badges */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-dark-850 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Driver</span>
              <span className="font-bold text-white">{vehicle.driverName.split(' ')[0]}</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-850 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Engine State</span>
              <span className="font-bold text-emerald-400">{vehicle.isEngineOn ? 'ON' : 'OFF'}</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-850 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Seat Belt</span>
              <span className="font-bold text-emerald-400">FASTENED</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-850 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Battery</span>
              <span className="font-bold text-brand-cyan">{systemStatus.battery}%</span>
            </div>
          </div>

          {/* GPS Coordinates Badge */}
          <div className="p-3 rounded-xl bg-dark-900 border border-brand-cyan/20 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-brand-cyan" />
              <span>{vehicle.lat.toFixed(4)}° N, {vehicle.lng.toFixed(4)}° E</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">11 SATS LOCKED</span>
          </div>
        </div>

        {/* Right: Driving Simulation Controls & Crash Scenarios (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Real-time Kinematics Driving Controls */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-brand-cyan" />
                <h3 className="font-bold text-sm text-white">Interactive Vehicle Dynamics Controls</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Simulate Driver Actions</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={startVehicle}
                className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex flex-col items-center gap-2 transition-all active:scale-95"
              >
                <Play className="w-5 h-5" />
                <span>Start Vehicle</span>
              </button>

              <button
                onClick={stopVehicle}
                className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-xs flex flex-col items-center gap-2 transition-all active:scale-95"
              >
                <Square className="w-5 h-5" />
                <span>Stop Vehicle</span>
              </button>

              <button
                onClick={accelerateVehicle}
                className="p-3 rounded-xl bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan font-bold text-xs flex flex-col items-center gap-2 transition-all active:scale-95"
              >
                <Zap className="w-5 h-5" />
                <span>Accelerate (+15)</span>
              </button>

              <button
                onClick={brakeVehicle}
                className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-xs flex flex-col items-center gap-2 transition-all active:scale-95"
              >
                <Gauge className="w-5 h-5" />
                <span>Brake (-20)</span>
              </button>
            </div>
          </div>

          {/* Accident Scenario Trigger Engine */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-emergency-red" />
                <h3 className="font-bold text-sm text-white">Simulate Crash & Road Impact Scenarios</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Trigger Edge ML Pipeline</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => triggerSimulation('NORMAL')}
                className="p-4 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-left transition-all active:scale-95"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-400">🟢 Normal Highway Cruising</span>
                  <span className="text-[10px] font-mono text-slate-400">1.02 g</span>
                </div>
                <p className="text-[11px] text-slate-400">Stable 68 km/h driving, nominal MPU6050 vibrations, zero alert.</p>
              </button>

              <button
                onClick={() => triggerSimulation('MINOR')}
                className="p-4 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-left transition-all active:scale-95"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-yellow-300">🟡 Minor Fender / Curb Impact</span>
                  <span className="text-[10px] font-mono text-yellow-300">2.32 g</span>
                </div>
                <p className="text-[11px] text-slate-400">Low speed curb collision, slight angular tilt, advisory warning.</p>
              </button>

              <button
                onClick={() => triggerSimulation('MODERATE')}
                className="p-4 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-left transition-all active:scale-95"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-orange-300">🟠 Moderate Lateral Collision</span>
                  <span className="text-[10px] font-mono text-orange-300">5.22 g</span>
                </div>
                <p className="text-[11px] text-slate-400">Noticeable impact spike, abnormal gyroscope yaw, emergency prepped.</p>
              </button>

              <button
                onClick={() => triggerSimulation('SEVERE')}
                className="p-4 rounded-xl bg-emergency-red/20 hover:bg-emergency-red/30 border border-emergency-red/50 text-left transition-all active:scale-95 shadow-lg shadow-emergency-red/20"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emergency-red flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 animate-bounce" /> 🔴 Severe Rollover Crash
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emergency-red">8.84 g</span>
                </div>
                <p className="text-[11px] text-slate-300">Extreme G-force, velocity null, automated voice confirmation & CAD alert.</p>
              </button>
            </div>

            {/* Reset */}
            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={resetSimulation}
                className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset System Simulation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
