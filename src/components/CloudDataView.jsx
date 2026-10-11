import React from 'react';
import { 
  Cloud, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  Server, 
  Cpu, 
  Zap, 
  Radio, 
  HardDrive 
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const CloudDataView = () => {
  const { cloudStats, triggerCloudSync, vehicle, sensors, aiState } = useSimulation();

  const mockCollections = [
    {
      collection: '/emergency_events',
      docId: 'EVT_TS09AB1234_9021',
      payload: {
        vehicle_id: vehicle.vehicleId,
        impact_force_g: sensors.impactForce,
        classification: aiState.classification,
        gps_lat: vehicle.lat.toFixed(4),
        gps_lng: vehicle.lng.toFixed(4),
        timestamp: new Date().toISOString()
      }
    },
    {
      collection: '/telemetry_streams',
      docId: 'TEL_TS09AB1234_LIVE',
      payload: {
        speed_kmh: vehicle.speed,
        accel_x: sensors.accelX,
        accel_y: sensors.accelY,
        accel_z: sensors.accelZ,
        gyro_total: sensors.totalGyro,
        battery_pct: 87
      }
    },
    {
      collection: '/cad_dispatches',
      docId: 'DISP_HYD_CAD_04',
      payload: {
        ambulance_unit: 'Unit 108-A4',
        hospital_id: 'Apollo Trauma Centre',
        police_unit: 'Cyberabad Patrol 04',
        status: 'EN ROUTE'
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Cloud className="w-6 h-6 text-brand-cyan" />
            FIREBASE REALTIME CLOUD & FIRESTORE TELEMETRY LAYER
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Simulated cloud ingest endpoint for vehicle edge telemetry, CAD event storage & fleet analytics
          </p>
        </div>

        <button
          onClick={triggerCloudSync}
          disabled={cloudStats.isSyncing}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:brightness-110 text-dark-950 font-bold text-xs shadow-lg shadow-brand-cyan/20 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${cloudStats.isSyncing ? 'animate-spin' : ''}`} />
          <span>{cloudStats.isSyncing ? 'Synchronizing...' : 'SYNC NOW (Push Telemetry)'}</span>
        </button>
      </div>

      {/* Cloud Status KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Cloud Connection</span>
          <div className="text-xl font-black font-display text-emerald-400 mt-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            CONNECTED
          </div>
          <span className="text-[10px] font-mono text-slate-400">Google Cloud Platform</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Database Architecture</span>
          <div className="text-xl font-black font-display text-white mt-1">Firebase RTDB</div>
          <span className="text-[10px] font-mono text-slate-400">+ Firestore Collections</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Total Stored Records</span>
          <div className="text-xl font-black font-display text-brand-cyan mt-1">{cloudStats.recordCount}</div>
          <span className="text-[10px] font-mono text-emerald-400">+1 logged recently</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Network Latency</span>
          <div className="text-xl font-black font-display text-purple-400 mt-1">{cloudStats.latencyMs} ms</div>
          <span className="text-[10px] font-mono text-slate-400">Last sync: {cloudStats.lastSync}</span>
        </div>
      </div>

      {/* Realtime Database Documents Viewer */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" />
            Live Cloud Document Stream (JSON Payloads)
          </h3>
          <span className="text-[11px] font-mono text-emerald-400">● REALTIME LISTENER ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockCollections.map((col, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-brand-cyan font-bold truncate">{col.collection}</span>
                <span className="text-[10px] text-slate-500 truncate">{col.docId}</span>
              </div>
              <pre className="text-[11px] text-slate-300 bg-dark-950 p-3 rounded-lg overflow-x-auto border border-slate-800/80">
                {JSON.stringify(col.payload, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
