import React from 'react';
import { 
  Activity, 
  Car, 
  AlertTriangle, 
  Siren, 
  Send, 
  Clock, 
  CheckCircle, 
  Flame, 
  ShieldAlert, 
  Radio, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Compass,
  BatteryCharging,
  Layers,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useSimulation } from '../context/SimulationContext';

export const DashboardView = () => {
  const { 
    systemStatus, 
    vehicle, 
    sensors, 
    sensorHistory, 
    aiState, 
    pipelineStep, 
    emergencyActive,
    triggerSimulation,
    resetSimulation,
    runAutoDemo,
    isAutoDemoRunning,
    autoDemoStep,
    setActiveTab,
    dispatchStatus,
    cloudStats
  } = useSimulation();

  const pipelineSteps = [
    { id: 'MONITORING', label: '1. MONITORING', desc: 'Nominal 200Hz IMU stream' },
    { id: 'IMPACT_DETECTED', label: '2. IMPACT SPIKE', desc: 'Deceleration shockwave' },
    { id: 'SENSOR_FUSION', label: '3. SENSOR FUSION', desc: 'MPU6050 + GPS correlation' },
    { id: 'AI_CLASSIFICATION', label: '4. AI ML MODEL', desc: '1D-CNN pattern matching' },
    { id: 'SEVERITY_ASSESSMENT', label: '5. SEVERITY SCORE', desc: 'Kinetic injury evaluation' },
    { id: 'GPS_LOCATION', label: '6. GPS LOCK', desc: 'NEO-6M satellite fix' },
    { id: 'EMERGENCY_ALERT', label: '7. GSM DISPATCH', desc: 'SIM800L SMS & CAD broadcast' },
    { id: 'VICTIM_CONFIRMATION', label: '8. VOICE CONFIRM', desc: '2-way driver check' },
    { id: 'DISPATCH_COMMITTED', label: '9. UNIT DISPATCH', desc: 'Ambulance 108 & Police en route' },
    { id: 'CLOUD_LOGGED', label: '10. CLOUD SYNC', desc: 'Firebase database record' },
  ];

  const currentStepIdx = pipelineSteps.findIndex(s => s.id === pipelineStep);

  const stats = [
    { title: 'Vehicles Monitored', value: '1,428', change: '+12 today', icon: Car, color: 'cyan' },
    { title: 'Accidents Detected', value: emergencyActive ? '4' : '3', change: 'Real-time sync', icon: AlertTriangle, color: 'orange' },
    { title: 'Active Emergencies', value: emergencyActive ? '1 CRITICAL' : '0 NONE', change: emergencyActive ? 'Dispatched' : 'Nominal', icon: Siren, color: emergencyActive ? 'red' : 'green' },
    { title: 'Alerts Dispatched', value: emergencyActive ? '174' : '168', change: 'GSM / CAD / SMS', icon: Send, color: 'purple' },
    { title: 'Avg Response Time', value: '4.2 min', change: '-48% vs standard CAD', icon: Clock, color: 'teal' },
    { title: 'ML Inference Latency', value: '84 ms', change: 'Edge ESP32 target', icon: Cpu, color: 'blue' },
    { title: 'Detection Accuracy', value: '98.4%', change: '10k scenario benchmark', icon: CheckCircle, color: 'emerald' },
    { title: 'Resolved Incidents', value: '99.2%', change: '42 cases closed', icon: ShieldAlert, color: 'indigo' },
  ];

  const getSeverityBadge = () => {
    switch (aiState.severity) {
      case 'CRITICAL':
      case 'SEVERE':
        return <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emergency-red/20 text-emergency-red border border-emergency-red/50 animate-pulse">🔴 SEVERE ACCIDENT (CRITICAL)</span>;
      case 'MODERATE':
        return <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-400 border border-amber-500/50">🟡 MODERATE IMPACT</span>;
      case 'MINOR':
        return <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">🟢 MINOR BUMP / WARNING</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">🟢 NORMAL DRIVING (SAFE)</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Actions Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 glass-panel border border-slate-700/80 bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emergency-red/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IoT & Machine Learning Emergency Response Command Center</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white">
              SMART ACCIDENT DETECTION & CAD DISPATCH
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              "Protecting Every Journey With AI + IoT" — Real-time telemetry ingestion from vehicle ESP32 edge MCU, MPU6050 sensor fusion, 1D-CNN severity classification, and automated emergency CAD dispatch.
            </p>
          </div>

          {/* Quick Scenario Simulator Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => triggerSimulation('NORMAL')}
              className="px-3 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Normal Cruising
            </button>

            <button
              onClick={() => triggerSimulation('MINOR')}
              className="px-3 py-2 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              Minor Impact
            </button>

            <button
              onClick={() => triggerSimulation('MODERATE')}
              className="px-3 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              Moderate Crash
            </button>

            <button
              onClick={() => triggerSimulation('SEVERE')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-emergency-red hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all active:scale-95 animate-pulse"
            >
              <Flame className="w-4 h-4" />
              Simulate Severe Crash
            </button>

            <button
              onClick={runAutoDemo}
              disabled={isAutoDemoRunning}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-teal hover:brightness-110 text-dark-950 font-black text-xs shadow-xl shadow-brand-cyan/30 flex items-center gap-2 transition-all active:scale-95 ring-2 ring-brand-cyan/40"
            >
              <Zap className="w-4 h-4 text-dark-950 animate-bounce" />
              <span>{isAutoDemoRunning ? `RUNNING SEQUENCE (Stage ${autoDemoStep}/8)...` : 'RUN FULL ACCIDENT SIMULATION'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time Detection Workflow Stepper */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Live End-to-End Accident Detection Pipeline
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Current Stage: <span className="text-brand-cyan font-bold">{pipelineStep.replace('_', ' ')}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {pipelineSteps.map((step, idx) => {
            const isCompleted = idx < currentStepIdx || pipelineStep === 'CLOUD_LOGGED';
            const isCurrent = step.id === pipelineStep;

            return (
              <div
                key={step.id}
                className={`p-2 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-emergency-red/20 border-emergency-red text-white shadow-lg shadow-emergency-red/20 scale-105'
                    : isCompleted
                    ? 'bg-dark-800 border-emerald-500/40 text-emerald-400'
                    : 'bg-dark-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono font-bold truncate">
                  {step.label}
                </div>
                <div className="text-[9px] text-slate-400 truncate mt-0.5">
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 Statistic KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition-all group"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">{stat.title}</span>
                <div className="p-2 rounded-lg bg-dark-800 border border-slate-700/60 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-brand-cyan" />
                </div>
              </div>
              <div className="text-2xl font-black font-display text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Panel 1: Live Vehicle Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Vehicle TS09AB1234</h3>
                  <span className="text-xs text-slate-400 font-mono">2025 Smart EV Sedan</span>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                vehicle.speed > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
              }`}>
                {vehicle.speed > 0 ? '● MOVING' : '○ IDLE / STOPPED'}
              </span>
            </div>

            {/* Speedometer Radial Gauge Representation */}
            <div className="my-6 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 rounded-full border-8 border-dark-800 flex flex-col items-center justify-center shadow-inner">
                <div 
                  className="absolute inset-0 rounded-full border-8 border-brand-cyan border-t-transparent border-l-transparent transition-all duration-500"
                  style={{ transform: `rotate(${Math.min(vehicle.speed * 1.8 - 90, 180)}deg)` }}
                ></div>
                <span className="text-4xl font-black font-display text-white tracking-tighter">
                  {vehicle.speed}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1">KM / H</span>
                <span className="text-[10px] font-mono text-emerald-400 mt-1">
                  GPS: {vehicle.lat.toFixed(4)}°N
                </span>
              </div>
            </div>

            {/* Telemetry rows */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-mono pt-4 border-t border-slate-800">
              <div className="p-2 rounded-xl bg-dark-850 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">ENGINE</span>
                <span className="font-bold text-emerald-400">ONLINE</span>
              </div>
              <div className="p-2 rounded-xl bg-dark-850 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">SEATBELT</span>
                <span className="font-bold text-emerald-400">FASTENED</span>
              </div>
              <div className="p-2 rounded-xl bg-dark-850 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">BATTERY</span>
                <span className="font-bold text-brand-cyan">{systemStatus.battery}%</span>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60">
              <span>Driver: <strong className="text-white font-medium">{vehicle.driverName}</strong></span>
              <button 
                onClick={() => setActiveTab('live-vehicle')}
                className="text-brand-cyan hover:underline flex items-center gap-1 font-semibold"
              >
                Full Controls <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* AI Decision & Confidence Card */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-cyan" />
                <h3 className="font-bold text-sm text-white">AI Inference & Sensor Fusion</h3>
              </div>
              {getSeverityBadge()}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-dark-850 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">ACCIDENT PROBABILITY</span>
                <span className={`text-xl font-black font-display ${aiState.accidentProbability > 50 ? 'text-emergency-red' : 'text-emerald-400'}`}>
                  {aiState.accidentProbability}%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-dark-850 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">AI CONFIDENCE</span>
                <span className="text-xl font-black font-display text-brand-cyan">
                  {aiState.confidenceScore}%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-dark-850 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">LATENCY</span>
                <span className="text-xl font-black font-display text-emerald-400">
                  {aiState.detectionLatency} ms
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Reasoning Explanation:
              </span>
              <p className="text-slate-300 italic">
                "{aiState.decisionExplanation}"
              </p>
            </div>
          </div>
        </div>

        {/* Panel 2: Real-Time Sensor Waveforms & Response CAD (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* MPU6050 Live Waveform Chart */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-cyan" />
                <div>
                  <h3 className="font-bold text-sm text-white">MPU6050 Accelerometer & Impact Telemetry</h3>
                  <span className="text-[11px] text-slate-400 font-mono">Live 200 SPS Kinematic Buffer</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1 text-brand-cyan">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan"></span> Total G: {sensors.totalG}g
                </span>
                <span className="flex items-center gap-1 text-emergency-red">
                  <span className="w-2 h-2 rounded-full bg-emergency-red"></span> Gyro: {sensors.totalGyro}°/s
                </span>
              </div>
            </div>

            {/* Waveform Chart */}
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sensorHistory}>
                  <defs>
                    <linearGradient id="colorG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGyro" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff1744" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ff1744" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} domain={[0, 'auto']} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area type="monotone" dataKey="totalG" name="Impact (g)" stroke="#00f2fe" strokeWidth={2} fillOpacity={1} fill="url(#colorG)" />
                  <Area type="monotone" dataKey="gyro" name="Gyro (°/s)" stroke="#ff1744" strokeWidth={1.5} fillOpacity={1} fill="url(#colorGyro)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Instantaneous Sensor Gauges */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-lg bg-dark-850 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">ACCEL X</span>
                <span className="font-bold text-white">{sensors.accelX} g</span>
              </div>
              <div className="p-2 rounded-lg bg-dark-850 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">ACCEL Y</span>
                <span className="font-bold text-white">{sensors.accelY} g</span>
              </div>
              <div className="p-2 rounded-lg bg-dark-850 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">ACCEL Z</span>
                <span className="font-bold text-white">{sensors.accelZ} g</span>
              </div>
              <div className="p-2 rounded-lg bg-dark-850 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">IMPACT FORCE</span>
                <span className={`font-bold ${sensors.impactForce > 4 ? 'text-emergency-red' : 'text-brand-cyan'}`}>
                  {sensors.impactForce} g
                </span>
              </div>
            </div>
          </div>

          {/* Emergency CAD Dispatched Units Preview */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emergency-red" />
                <h3 className="font-bold text-sm text-white">Emergency Services CAD Network</h3>
              </div>
              <button 
                onClick={() => setActiveTab('live-map')}
                className="text-xs text-brand-cyan hover:underline font-semibold flex items-center gap-1"
              >
                Open Full GPS Map <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Ambulance */}
              <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emergency-red/10 border border-emergency-red/30 flex items-center justify-center text-emergency-red font-bold text-lg">
                    🚑
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Ambulance (108 CAD)</h4>
                    <span className="text-[10px] text-slate-400 block font-mono">{dispatchStatus.ambulance.unit}</span>
                    <span className="text-[10px] text-brand-cyan font-mono">Distance: {dispatchStatus.ambulance.distance} (ETA: {dispatchStatus.ambulance.eta})</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  dispatchStatus.ambulance.status.includes('DISPATCHED') ? 'bg-emergency-red/20 text-emergency-red border border-emergency-red/50 animate-pulse' : 'bg-dark-800 text-slate-400'
                }`}>
                  {dispatchStatus.ambulance.status}
                </span>
              </div>

              {/* Police */}
              <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg">
                    👮
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Police Control (112)</h4>
                    <span className="text-[10px] text-slate-400 block font-mono">{dispatchStatus.police.unit}</span>
                    <span className="text-[10px] text-brand-cyan font-mono">Distance: {dispatchStatus.police.distance} (ETA: {dispatchStatus.police.eta})</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  dispatchStatus.police.status.includes('EN ROUTE') ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50' : 'bg-dark-800 text-slate-400'
                }`}>
                  {dispatchStatus.police.status}
                </span>
              </div>

              {/* Hospital */}
              <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
                    🏥
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">{dispatchStatus.hospital.name}</h4>
                    <span className="text-[10px] text-emerald-400 block font-mono">Trauma ICU: {dispatchStatus.hospital.icu}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                  {dispatchStatus.hospital.status}
                </span>
              </div>

              {/* Family */}
              <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-lg">
                    👨‍👩‍👧
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Family Contact</h4>
                    <span className="text-[10px] text-slate-400 block font-mono">{dispatchStatus.family.contact}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300">
                  {dispatchStatus.family.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
