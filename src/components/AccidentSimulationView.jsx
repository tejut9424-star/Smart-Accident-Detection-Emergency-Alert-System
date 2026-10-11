import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  MapPin, 
  Radio, 
  UserCheck, 
  Cloud, 
  RotateCcw,
  CheckCircle2,
  Bug,
  Sliders,
  Terminal,
  Play,
  Layers,
  ArrowRight,
  Activity,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const AccidentSimulationView = () => {
  const { 
    triggerSimulation, 
    resetSimulation, 
    pipelineStep, 
    aiState, 
    sensors, 
    vehicle,
    emergencyActive,
    runAutoDemo,
    isAutoDemoRunning,
    addNotification
  } = useSimulation();

  // Debugger Local State
  const [debugTab, setDebugTab] = useState('pipeline'); // 'pipeline', 'registers', 'features', 'diagnostics'
  const [accelThreshold, setAccelThreshold] = useState(4.0); // g
  const [gyroThreshold, setGyroThreshold] = useState(90); // deg/s
  const [samplingFrequency, setSamplingFrequency] = useState(200); // Hz
  const [runningDiagnostics, setRunningDiagnostics] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState(null);

  const stages = [
    { id: 'MONITORING', title: '1. SENSOR MONITORING', icon: Cpu, desc: 'MPU6050 sampling at 200Hz nominal kinematics.' },
    { id: 'IMPACT_DETECTED', title: '2. IMPACT SPIKE DETECTED', icon: Zap, desc: 'Tri-axial deceleration exceeds safety threshold.' },
    { id: 'SENSOR_FUSION', title: '3. MULTI-SENSOR FUSION', desc: 'Accelerations, angular velocity & speed combined.' },
    { id: 'AI_CLASSIFICATION', title: '4. AI ML CLASSIFICATION', desc: '1D-CNN + Random Forest evaluates crash pattern.' },
    { id: 'SEVERITY_ASSESSMENT', title: '5. SEVERITY ASSESSMENT', desc: 'Classifies Minor / Moderate / Severe / Critical.' },
    { id: 'GPS_LOCATION', title: '6. GPS GEO-LOCKING', desc: 'NEO-6M tags latitude, longitude & altitude.' },
    { id: 'EMERGENCY_ALERT', title: '7. GSM/4G EMERGENCY ALERT', desc: 'SIM800L transmits SMS & CAD data packets.' },
    { id: 'VICTIM_CONFIRMATION', title: '8. VICTIM CONFIRMATION', desc: 'Interactive 10s voice dialogue check.' },
    { id: 'DISPATCH_COMMITTED', title: '9. EMERGENCY CAD DISPATCH', desc: '108 Ambulance, Police & Hospital activated.' },
    { id: 'CLOUD_LOGGED', title: '10. CLOUD & FIREBASE LOG', desc: 'Realtime database record stored for analytics.' }
  ];

  // Self-Diagnostic Test Suite
  const runSelfDiagnostics = () => {
    setRunningDiagnostics(true);
    setDiagnosticResults(null);
    addNotification('Running Diagnostics', 'Initiating sub-system integrity checks across ESP32, MPU6050, GPS & Cloud.', 'info');

    setTimeout(() => {
      setDiagnosticResults([
        { name: 'MPU6050 I2C ACK & Calibration', status: 'PASSED', latency: '2.1 ms', detail: '0x68 Address Verified. Zero Offset Drift (±0.01g)' },
        { name: 'ESP32 Dual-Core ML Tensor Core', status: 'PASSED', latency: '84 ms', detail: '1D-CNN Quantized Weights L2 Cached' },
        { name: 'NEO-6M NMEA-0183 $GPRMC Lock', status: 'PASSED', latency: '0.8s update', detail: '11 Satellites in View, HDOP: 0.9, CEP: ±2.5m' },
        { name: 'SIM800L AT+CMGS GSM CAD Buffer', status: 'PASSED', latency: '85 ms', detail: 'Carrier Registered, CSQ: 28/31 (Strong Link)' },
        { name: 'Firebase Firestore Telemetry Ingest', status: 'PASSED', latency: '38 ms', detail: 'Socket Open to /emergency_events collection' },
      ]);
      setRunningDiagnostics(false);
      addNotification('Diagnostics Completed', 'All 5 hardware & ML subsystems passed with 100% integrity.', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <AlertOctagon className="w-6 h-6 text-emergency-red" />
            ACCIDENT DETECTION ENGINE & TELEMETRY DEBUGGER
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Real-time I2C frame buffer inspection, edge ML feature weights, threshold calibrator & 10-stage crash pipeline
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runSelfDiagnostics}
            disabled={runningDiagnostics}
            className="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Bug className={`w-4 h-4 ${runningDiagnostics ? 'animate-spin' : ''}`} />
            <span>{runningDiagnostics ? 'Testing...' : 'Run Diagnostics Self-Test'}</span>
          </button>

          <button
            onClick={runAutoDemo}
            disabled={isAutoDemoRunning}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:brightness-110 text-dark-950 font-bold text-xs shadow-lg shadow-brand-cyan/20 flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>{isAutoDemoRunning ? 'Running Demo...' : 'Run Auto Demo'}</span>
          </button>
        </div>
      </div>

      {/* 4 Interactive Simulation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Normal */}
        <button
          onClick={() => triggerSimulation('NORMAL')}
          className="p-5 rounded-2xl glass-panel border border-slate-700/60 hover:border-emerald-500/50 text-left transition-all active:scale-95 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl">
              🟢
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">NORMAL</span>
          </div>
          <h4 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">Normal Driving</h4>
          <p className="text-xs text-slate-400 mt-1">
            Nominal 1.02g acceleration, steady 68 km/h speed. ML model classifies zero collision.
          </p>
        </button>

        {/* Minor */}
        <button
          onClick={() => triggerSimulation('MINOR')}
          className="p-5 rounded-2xl glass-panel border border-slate-700/60 hover:border-yellow-500/50 text-left transition-all active:scale-95 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-xl">
              🟡
            </div>
            <span className="text-xs font-mono font-bold text-yellow-400">MINOR</span>
          </div>
          <h4 className="font-bold text-white text-sm group-hover:text-yellow-400 transition-colors">Minor Fender / Curb</h4>
          <p className="text-xs text-slate-400 mt-1">
            2.32g spike with small vehicle rotation. Generates advisory warning without CAD dispatch.
          </p>
        </button>

        {/* Moderate */}
        <button
          onClick={() => triggerSimulation('MODERATE')}
          className="p-5 rounded-2xl glass-panel border border-slate-700/60 hover:border-orange-500/50 text-left transition-all active:scale-95 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xl">
              🟠
            </div>
            <span className="text-xs font-mono font-bold text-orange-400">MODERATE</span>
          </div>
          <h4 className="font-bold text-white text-sm group-hover:text-orange-400 transition-colors">Moderate Impact</h4>
          <p className="text-xs text-slate-400 mt-1">
            5.22g spike, abnormal gyroscope reading. Emergency protocol prepared and pre-armed.
          </p>
        </button>

        {/* Severe */}
        <button
          onClick={() => triggerSimulation('SEVERE')}
          className="p-5 rounded-2xl glass-panel border border-emergency-red/60 bg-emergency-red/10 hover:bg-emergency-red/20 text-left transition-all active:scale-95 group shadow-lg shadow-emergency-red/20"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emergency-red/20 border border-emergency-red/50 flex items-center justify-center text-emergency-red font-bold text-xl">
              🔴
            </div>
            <span className="text-xs font-mono font-bold text-emergency-red animate-pulse">SEVERE CRASH</span>
          </div>
          <h4 className="font-bold text-white text-sm group-hover:text-emergency-red transition-colors">Severe Rollover Collision</h4>
          <p className="text-xs text-slate-300 mt-1">
            8.84g multi-axis shock, sudden speed null, 168°/s yaw roll, automated CAD dispatch & voice check.
          </p>
        </button>
      </div>

      {/* Detection Workflow Pipeline Visualization */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-cyan" />
            10-Stage Automated Detection & Emergency Response Flow
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Active Status: <strong className="text-brand-cyan font-bold">{pipelineStep.replace('_', ' ')}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = stage.id === pipelineStep;
            const isDone = stages.findIndex(s => s.id === pipelineStep) > idx || pipelineStep === 'CLOUD_LOGGED';

            return (
              <div
                key={stage.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'bg-emergency-red/20 border-emergency-red text-white shadow-lg shadow-emergency-red/30 scale-105 ring-2 ring-emergency-red/40'
                    : isDone
                    ? 'bg-dark-850 border-emerald-500/40 text-emerald-400'
                    : 'bg-dark-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold">{stage.title}</span>
                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-emergency-red animate-bounce' : isDone ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {stage.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] font-mono flex items-center justify-between">
                  <span>Stage {idx + 1}/10</span>
                  <span>{isCurrent ? '⚡ ACTIVE' : isDone ? '✓ DONE' : '○ PENDING'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Debugger & Inspector Suite */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-brand-cyan" />
            <h3 className="font-bold text-sm text-white">Detection Engine Low-Level Hardware & Tensor Debugger</h3>
          </div>

          <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setDebugTab('pipeline')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${debugTab === 'pipeline' ? 'bg-brand-cyan text-dark-950' : 'text-slate-400 hover:text-white'}`}
            >
              Threshold Calibrator
            </button>
            <button
              onClick={() => setDebugTab('registers')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${debugTab === 'registers' ? 'bg-brand-cyan text-dark-950' : 'text-slate-400 hover:text-white'}`}
            >
              I2C Register Map
            </button>
            <button
              onClick={() => setDebugTab('features')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${debugTab === 'features' ? 'bg-brand-cyan text-dark-950' : 'text-slate-400 hover:text-white'}`}
            >
              Feature Importance
            </button>
          </div>
        </div>

        {/* Tab 1: Live Threshold Calibrator */}
        {debugTab === 'pipeline' && (
          <div className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Deceleration Threshold ($g$)</span>
                  <strong className="text-brand-cyan font-bold">{accelThreshold} g</strong>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="12.0"
                  step="0.2"
                  value={accelThreshold}
                  onChange={e => setAccelThreshold(parseFloat(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">Triggers impact window if total $G &gt; {accelThreshold}g$</span>
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Rollover Yaw Limit ($^\circ/s$)</span>
                  <strong className="text-purple-400 font-bold">{gyroThreshold} °/s</strong>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={gyroThreshold}
                  onChange={e => setGyroThreshold(parseInt(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">Rollover flagged if angular rate exceeds limit</span>
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>IMU Sampling Rate (Hz)</span>
                  <strong className="text-emerald-400 font-bold">{samplingFrequency} Hz</strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="400"
                  step="50"
                  value={samplingFrequency}
                  onChange={e => setSamplingFrequency(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">I2C continuous buffer sample window</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Current Sensor Vector Status:</span>
              <span className="font-bold text-white">
                Impact: <strong className={sensors.totalG >= accelThreshold ? 'text-emergency-red' : 'text-emerald-400'}>{sensors.totalG}g</strong> | 
                Gyro: <strong className={sensors.totalGyro >= gyroThreshold ? 'text-emergency-red' : 'text-brand-cyan'}>{sensors.totalGyro}°/s</strong> | 
                Model: <strong className="text-emerald-400">NORMAL</strong>
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: I2C Register Dump */}
        {debugTab === 'registers' && (
          <div className="space-y-3 font-mono text-xs">
            <p className="text-slate-400 text-[11px]">
              Live register byte stream from MPU6050 I2C slave address 0x68 (High-byte / Low-byte pairs):
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-lg bg-dark-900 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">0x3B-0x3C (ACCEL_X)</span>
                <span className="text-brand-cyan font-bold">0x{Math.abs(Math.floor(sensors.accelX * 16384)).toString(16).padStart(4, '0').toUpperCase()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{sensors.accelX} g</span>
              </div>
              <div className="p-2.5 rounded-lg bg-dark-900 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">0x3D-0x3E (ACCEL_Y)</span>
                <span className="text-brand-cyan font-bold">0x{Math.abs(Math.floor(sensors.accelY * 16384)).toString(16).padStart(4, '0').toUpperCase()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{sensors.accelY} g</span>
              </div>
              <div className="p-2.5 rounded-lg bg-dark-900 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">0x3F-0x40 (ACCEL_Z)</span>
                <span className="text-brand-cyan font-bold">0x{Math.abs(Math.floor(sensors.accelZ * 16384)).toString(16).padStart(4, '0').toUpperCase()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{sensors.accelZ} g</span>
              </div>
              <div className="p-2.5 rounded-lg bg-dark-900 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">0x43-0x44 (GYRO_X)</span>
                <span className="text-purple-400 font-bold">0x{Math.abs(Math.floor(sensors.gyroX * 131)).toString(16).padStart(4, '0').toUpperCase()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{sensors.gyroX} °/s</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Feature Weights */}
        {debugTab === 'features' && (
          <div className="space-y-3 font-mono text-xs">
            <p className="text-slate-400 text-[11px]">
              1D-CNN + Random Forest ensemble feature importance distribution for crash classification:
            </p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>1. Linear Kinetic Impulse Vector Magnitude</span>
                  <span className="text-brand-cyan font-bold">38% Weight</span>
                </div>
                <div className="w-full bg-dark-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-brand-cyan h-full w-[38%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>2. Gyroscopic Rollover & Angular Velocity Divergence</span>
                  <span className="text-purple-400 font-bold">27% Weight</span>
                </div>
                <div className="w-full bg-dark-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full w-[27%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>3. Deceleration Rate of Change ($dG/dt$ shock slope)</span>
                  <span className="text-emergency-red font-bold">22% Weight</span>
                </div>
                <div className="w-full bg-dark-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-emergency-red h-full w-[22%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>4. Velocity Delta ($v_0 \rightarrow v_{final}$)</span>
                  <span className="text-emerald-400 font-bold">13% Weight</span>
                </div>
                <div className="w-full bg-dark-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[13%]"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Diagnostic Results Report */}
        {diagnosticResults && (
          <div className="p-4 rounded-xl bg-dark-950 border border-purple-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-purple-300 font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Subsystem Integrity Verification Report (5/5 Tests Passed)
              </h4>
              <span className="text-[10px] font-mono text-slate-400">Timestamp: {new Date().toLocaleTimeString()}</span>
            </div>

            <div className="divide-y divide-slate-800/80 font-mono text-xs">
              {diagnosticResults.map((r, i) => (
                <div key={i} className="py-2 flex items-center justify-between text-slate-300">
                  <div>
                    <strong className="text-white block">{r.name}</strong>
                    <span className="text-[10px] text-slate-400">{r.detail}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold">{r.status}</span>
                    <span className="text-[10px] text-slate-500 block">{r.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
