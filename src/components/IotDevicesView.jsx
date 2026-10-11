import React from 'react';
import { 
  Cpu, 
  Activity, 
  Radio, 
  Wifi, 
  BatteryCharging, 
  CheckCircle2, 
  Zap, 
  Layers,
  Sparkles
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const IotDevicesView = () => {
  const { iotDevices } = useSimulation();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'Activity': return Activity;
      case 'MapPin': return Radio;
      case 'Radio': return Wifi;
      case 'BatteryCharging': return BatteryCharging;
      default: return Cpu;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-brand-cyan" />
            EMBEDDED HARDWARE ARCHITECTURE & IOT NODES
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Physical edge controller nodes: ESP32 DevKit, MPU6050 IMU, NEO-6M GPS, SIM800L GSM & Li-ion BMS
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>System Topology: <strong className="text-emerald-400">5 Hardware Nodes Active</strong></span>
        </div>
      </div>

      {/* Hardware Node Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {iotDevices.map((device, idx) => {
          const Icon = getIcon(device.icon);

          return (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4 hover:border-slate-700 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{device.name}</h3>
                    <span className="text-[11px] text-brand-cyan font-mono">{device.role}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {device.status}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Chipset Spec:</span>
                  <span className="font-bold text-white text-right truncate max-w-[180px]">{device.chipset}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Latency / Rate:</span>
                  <span className="font-bold text-emerald-400">{device.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sampling Mode:</span>
                  <span className="font-bold text-brand-cyan text-right truncate max-w-[180px]">{device.samplingRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Link Health:</span>
                  <span className="font-bold text-slate-200">{device.signal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Node Uptime:</span>
                  <span className="font-bold text-purple-400">{device.uptime}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
