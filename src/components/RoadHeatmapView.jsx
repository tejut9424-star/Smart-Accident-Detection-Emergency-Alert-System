import React, { useState } from 'react';
import { 
  Flame, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  Info 
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const RoadHeatmapView = () => {
  const { roadSafetyHotspots } = useSimulation();
  const [selectedHotspot, setSelectedHotspot] = useState(roadSafetyHotspots[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-emergency-red" />
            URBAN ROAD SAFETY RISK HEATMAP & HOTSPOT CLUSTERING
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Data-driven accident hotspot density, high-risk corridor identification & municipal traffic safety planning
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emergency-red">
            <span className="w-2.5 h-2.5 rounded-full bg-emergency-red animate-pulse"></span>
            High Risk (🔴)
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            Medium Risk (🟠)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            Low Risk (🟢)
          </span>
        </div>
      </div>

      {/* Main Grid: Hotspot List + Selected Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Hotspot Corridor Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="font-bold text-xs font-mono uppercase text-slate-400 mb-2">
            Identified Incident Clusters (Hyderabad Urban Corridors)
          </h3>

          <div className="space-y-3">
            {roadSafetyHotspots.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id;
              const isHigh = spot.riskLevel === 'HIGH';
              const isMed = spot.riskLevel === 'MEDIUM';

              return (
                <div
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  className={`p-5 rounded-2xl glass-panel border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-brand-cyan/80 bg-dark-850 shadow-xl shadow-brand-cyan/10 ring-1 ring-brand-cyan/30'
                      : 'border-slate-800 hover:border-slate-700 hover:bg-dark-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl border mt-0.5 ${
                        isHigh ? 'bg-emergency-red/10 border-emergency-red/40 text-emergency-red' :
                        isMed ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' :
                        'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      }`}>
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{spot.name}</h4>
                        <span className="text-xs text-slate-400 font-mono block mt-0.5">
                          Common Cause: <strong className="text-slate-200">{spot.commonCause}</strong>
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isHigh ? 'bg-emergency-red/20 text-emergency-red border border-emergency-red/40' :
                      isMed ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {spot.riskLevel} RISK
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono mt-4 pt-3 border-t border-slate-800">
                    <div className="p-2 rounded-lg bg-dark-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">TOTAL INCIDENTS</span>
                      <span className="font-bold text-white text-sm">{spot.accidents}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">SEVERE CRASHES</span>
                      <span className="font-bold text-emergency-red text-sm">{spot.severe}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">AVG RESPONSE</span>
                      <span className="font-bold text-emerald-400 text-sm">{spot.avgResponse}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">PEAK WINDOW</span>
                      <span className="font-bold text-brand-cyan text-[11px] truncate">{spot.peakTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Cluster Investigation & Safety Policy (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedHotspot ? (
            <div className="p-6 rounded-2xl glass-panel border border-brand-cyan/40 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">CLUSTER DRILL-DOWN</span>
                  <h3 className="font-bold text-white text-base mt-0.5">{selectedHotspot.name}</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-dark-900 border border-slate-700 text-brand-cyan">
                  {selectedHotspot.lat}° N, {selectedHotspot.lng}° E
                </span>
              </div>

              {/* Statistics Breakdown */}
              <div className="space-y-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Total Recorded Crashes:</span>
                  <span className="font-black text-lg text-white">{selectedHotspot.accidents} Incidents</span>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Severe Rollovers:</span>
                  <span className="font-black text-lg text-emergency-red">{selectedHotspot.severe} Critical</span>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Average EMS Arrival Time:</span>
                  <span className="font-black text-lg text-emerald-400">{selectedHotspot.avgResponse}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Most Common Crash Window:</span>
                  <span className="font-bold text-amber-400">{selectedHotspot.peakTime}</span>
                </div>
              </div>

              {/* Municipal Safety Recommendation */}
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-brand-cyan font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>AI Road-Safety Policy Recommendation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Historical sensor fusion analytics recommend deploying dynamic variable speed limits (VSL) and positioning a pre-staged 108 ALS Ambulance unit near Exit 14 during peak hours (8 PM – 11 PM) to compress arrival times under 4 minutes.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl glass-panel border border-slate-800 text-center text-slate-500 text-xs font-mono">
              Select a cluster to view detailed road safety analytics
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
