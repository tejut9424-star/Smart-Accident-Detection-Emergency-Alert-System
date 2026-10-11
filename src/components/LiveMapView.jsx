import React, { useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  ShieldAlert, 
  Building2, 
  PhoneCall, 
  Layers, 
  Radio, 
  Compass, 
  Flame,
  AlertTriangle,
  Clock,
  Car
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

// Custom Leaflet Icons using SVG Data URIs
const createIcon = (emoji, color) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: ${color}; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid white; box-shadow: 0 0 15px ${color};">${emoji}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
};

const vehicleIcon = createIcon('🚗', '#00f2fe');
const accidentIcon = createIcon('💥', '#ff1744');
const ambulanceIcon = createIcon('🚑', '#ff6d00');
const hospitalIcon = createIcon('🏥', '#00e676');
const policeIcon = createIcon('👮', '#3b82f6');

export const LiveMapView = () => {
  const { 
    vehicle, 
    emergencyActive, 
    dispatchStatus, 
    hospitals, 
    roadSafetyHotspots 
  } = useSimulation();

  // Positions
  const vehiclePos = [vehicle.lat, vehicle.lng];
  const ambulancePos = [vehicle.lat + 0.012, vehicle.lng - 0.015];
  const hospitalPos = [17.3912, 78.4795];
  const policePos = [vehicle.lat - 0.009, vehicle.lng + 0.011];

  // Route polylines
  const ambulanceRoute = [ambulancePos, vehiclePos];
  const hospitalRoute = [vehiclePos, hospitalPos];

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-brand-cyan" />
            LIVE GPS SATELLITE & CAD ROUTING RADAR
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            U-Blox NEO-6M real-time coordinate latching & automatic emergency vector routing
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-dark-800 border border-slate-700 text-slate-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>LAT: {vehicle.lat.toFixed(4)}° N, LNG: {vehicle.lng.toFixed(4)}° E</span>
          </span>
        </div>
      </div>

      {/* Distance Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Nearest Ambulance */}
        <div className="p-3.5 rounded-xl glass-panel border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🚑</span>
            <div>
              <span className="text-[10px] text-slate-400 font-mono block">NEAREST AMBULANCE</span>
              <strong className="text-xs text-white">Apollo Trauma ALS Unit</strong>
            </div>
          </div>
          <div className="text-right font-mono">
            <span className="text-xs font-bold text-brand-cyan block">2.4 km</span>
            <span className="text-[10px] text-emerald-400">ETA: 4 min</span>
          </div>
        </div>

        {/* Nearest Hospital */}
        <div className="p-3.5 rounded-xl glass-panel border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🏥</span>
            <div>
              <span className="text-[10px] text-slate-400 font-mono block">NEAREST HOSPITAL</span>
              <strong className="text-xs text-white">Apollo Trauma Centre</strong>
            </div>
          </div>
          <div className="text-right font-mono">
            <span className="text-xs font-bold text-emerald-400 block">3.1 km</span>
            <span className="text-[10px] text-emerald-400">ICU Beds: 6 Ready</span>
          </div>
        </div>

        {/* Nearest Police */}
        <div className="p-3.5 rounded-xl glass-panel border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">👮</span>
            <div>
              <span className="text-[10px] text-slate-400 font-mono block">POLICE CAD SECTOR</span>
              <strong className="text-xs text-white">Cyberabad Patrol 04</strong>
            </div>
          </div>
          <div className="text-right font-mono">
            <span className="text-xs font-bold text-indigo-400 block">1.8 km</span>
            <span className="text-[10px] text-emerald-400">ETA: 3 min</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Leaflet Map Container */}
      <div className="relative h-[540px] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl glass-panel">
        <MapContainer
          center={vehiclePos}
          zoom={14}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', background: '#070a12' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Vehicle / Accident Marker */}
          <Marker position={vehiclePos} icon={emergencyActive ? accidentIcon : vehicleIcon}>
            <Popup>
              <div className="text-xs font-sans text-slate-900">
                <strong className="block font-bold text-sm">
                  {emergencyActive ? '🚨 ACCIDENT DETECTED' : '🚗 Vehicle TS09AB1234'}
                </strong>
                <p>Speed: {vehicle.speed} km/h</p>
                <p>Driver: {vehicle.driverName}</p>
                <p>GPS: {vehicle.lat.toFixed(4)}° N, {vehicle.lng.toFixed(4)}° E</p>
              </div>
            </Popup>
          </Marker>

          {/* Ambulance Marker */}
          <Marker position={ambulancePos} icon={ambulanceIcon}>
            <Popup>
              <div className="text-xs font-sans text-slate-900">
                <strong>🚑 Ambulance Unit 108-A4</strong>
                <p>Status: {dispatchStatus.ambulance.status}</p>
                <p>ETA: 4 mins (Vector routing active)</p>
              </div>
            </Popup>
          </Marker>

          {/* Hospital Marker */}
          <Marker position={hospitalPos} icon={hospitalIcon}>
            <Popup>
              <div className="text-xs font-sans text-slate-900">
                <strong>🏥 Apollo Trauma Centre</strong>
                <p>Emergency ICU: 6 Beds</p>
                <p>Distance: 3.1 km</p>
              </div>
            </Popup>
          </Marker>

          {/* Police Marker */}
          <Marker position={policePos} icon={policeIcon}>
            <Popup>
              <div className="text-xs font-sans text-slate-900">
                <strong>👮 Cyberabad Traffic Police</strong>
                <p>Distance: 1.8 km</p>
              </div>
            </Popup>
          </Marker>

          {/* Polylines for routes */}
          <Polyline positions={ambulanceRoute} color="#ff6d00" weight={4} dashArray="8, 8" />
          <Polyline positions={hospitalRoute} color="#00e676" weight={3} />
        </MapContainer>

        {/* Floating Map HUD */}
        <div className="absolute top-4 left-4 z-[1000] p-3 rounded-xl bg-dark-900/90 backdrop-blur-md border border-slate-700 text-xs font-mono space-y-1.5 shadow-xl max-w-xs">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span>TACTICAL DISPATCH HUD</span>
            <span className="text-emerald-400">GPS LIVE</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Outer Ring Road, Sector 14, Hyderabad. Vector routing calculations active.
          </p>
          <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Orange = Ambulance Vector
            <span className="w-2 h-2 rounded-full bg-emerald-500 ml-2"></span> Green = Hospital Route
          </div>
        </div>
      </div>
    </div>
  );
};
