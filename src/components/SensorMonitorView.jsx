import React from 'react';
import { 
  Activity, 
  Compass, 
  Radio, 
  Zap, 
  Thermometer, 
  Clock, 
  Layers,
  Sparkles,
  AlertOctagon,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { useSimulation } from '../context/SimulationContext';

export const SensorMonitorView = () => {
  const { 
    sensors, 
    sensorHistory, 
    triggerSimulation, 
    resetSimulation, 
    aiState,
    pipelineStep 
  } = useSimulation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-brand-cyan" />
            MPU6050 SENSOR FUSION & HIGH-SPEED TELEMETRY
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Tri-axial 6-DoF Accelerometer, Gyroscope angular rate, and impact shockwave frequency analysis (200Hz sampling)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            SAMPLING: 200 SPS (I2C 400kHz)
          </span>
        </div>
      </div>

      {/* Top 6-Card Sensor Ingest Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Accel X */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">ACCEL X-AXIS</span>
          <div className="text-2xl font-black font-mono text-brand-cyan">
            {sensors.accelX > 0 ? `+${sensors.accelX}` : sensors.accelX} <span className="text-xs font-normal text-slate-400">g</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 block font-mono">Lateral surge</span>
        </div>

        {/* Accel Y */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">ACCEL Y-AXIS</span>
          <div className="text-2xl font-black font-mono text-brand-cyan">
            {sensors.accelY > 0 ? `+${sensors.accelY}` : sensors.accelY} <span className="text-xs font-normal text-slate-400">g</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 block font-mono">Longitudinal sway</span>
        </div>

        {/* Accel Z */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">ACCEL Z-AXIS</span>
          <div className="text-2xl font-black font-mono text-brand-cyan">
            {sensors.accelZ} <span className="text-xs font-normal text-slate-400">g</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 block font-mono">Gravity Vector (1g)</span>
        </div>

        {/* Total G Force */}
        <div className={`p-4 rounded-2xl glass-panel border text-center transition-all ${
          sensors.totalG > 4 ? 'border-emergency-red/80 bg-emergency-red/10 animate-pulse' : 'border-slate-800'
        }`}>
          <span className="text-[10px] font-mono text-slate-400 block mb-1">TOTAL IMPACT (G)</span>
          <div className={`text-2xl font-black font-mono ${sensors.totalG > 4 ? 'text-emergency-red' : 'text-emerald-400'}`}>
            {sensors.totalG} <span className="text-xs font-normal text-slate-400">g</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 block font-mono">Vector Magnitude</span>
        </div>

        {/* Gyroscope Total */}
        <div className={`p-4 rounded-2xl glass-panel border text-center transition-all ${
          sensors.totalGyro > 80 ? 'border-emergency-red/80 bg-emergency-red/10' : 'border-slate-800'
        }`}>
          <span className="text-[10px] font-mono text-slate-400 block mb-1">GYROSCOPE RATE</span>
          <div className={`text-2xl font-black font-mono ${sensors.totalGyro > 80 ? 'text-emergency-red' : 'text-purple-400'}`}>
            {sensors.totalGyro} <span className="text-xs font-normal text-slate-400">°/s</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 block font-mono">Angular Rotation</span>
        </div>

        {/* Sensor Temp */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">DIE TEMP</span>
          <div className="text-2xl font-black font-mono text-amber-400">
            {sensors.temperature}° <span className="text-xs font-normal text-slate-400">C</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 block font-mono">Optimal Thermal</span>
        </div>
      </div>

      {/* Real-time Multi-Axis Waveform Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Tri-Axial Accelerometer (X, Y, Z) */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-cyan" />
              MPU6050 Tri-Axial Acceleration Waveform
            </h3>
            <span className="text-xs font-mono text-slate-400">g vs Time</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} domain={[-2, 10]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="accelX" name="Accel X (g)" stroke="#00f2fe" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="accelY" name="Accel Y (g)" stroke="#38bdf8" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="accelZ" name="Accel Z (g)" stroke="#a855f7" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Total G vs Angular Rate (Gyroscope) */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-emergency-red" />
              Impact Force Vector vs Angular Rollover Rate
            </h3>
            <span className="text-xs font-mono text-slate-400">Total G & Gyro (°/s)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sensorHistory}>
                <defs>
                  <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="areaGyro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff1744" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ff1744" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} domain={[0, 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="totalG" name="Total Impact Force (g)" stroke="#00f2fe" strokeWidth={2} fillOpacity={1} fill="url(#areaG)" />
                <Area type="monotone" dataKey="gyro" name="Gyroscope (°/s)" stroke="#ff1744" strokeWidth={2} fillOpacity={1} fill="url(#areaGyro)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gyroscope Breakdown Sub-Card */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-brand-teal" />
          Tri-Axial Angular Velocity (Gyroscope Breakdown)
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-dark-850 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>ROLL (X-AXIS ROTATION)</span>
              <span className="text-white font-bold">{sensors.gyroX} °/s</span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2">
              <div 
                className="bg-brand-cyan h-2 rounded-full transition-all"
                style={{ width: `${Math.min(Math.abs(sensors.gyroX) * 1.5, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-850 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>PITCH (Y-AXIS ROTATION)</span>
              <span className="text-white font-bold">{sensors.gyroY} °/s</span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2">
              <div 
                className="bg-brand-blue h-2 rounded-full transition-all"
                style={{ width: `${Math.min(Math.abs(sensors.gyroY) * 1.5, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-850 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>YAW (Z-AXIS ROTATION)</span>
              <span className="text-white font-bold">{sensors.gyroZ} °/s</span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(Math.abs(sensors.gyroZ) * 1.5, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
