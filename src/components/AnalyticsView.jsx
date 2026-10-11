import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Filter, 
  Car,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';

export const AnalyticsView = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState('ALL');

  const monthlyAccidents = [
    { month: 'May', minor: 14, moderate: 6, severe: 2 },
    { month: 'Jun', minor: 18, moderate: 8, severe: 3 },
    { month: 'Jul', minor: 22, moderate: 11, severe: 4 },
    { month: 'Aug', minor: 19, moderate: 9, severe: 3 },
    { month: 'Sep', minor: 16, moderate: 7, severe: 2 },
    { month: 'Oct', minor: 12, moderate: 5, severe: 1 },
  ];

  const vehicleDistribution = [
    { name: 'Private Cars (EV/ICE)', value: 52, color: '#00f2fe' },
    { name: 'Motorcycles / Two-Wheelers', value: 29, color: '#ff6d00' },
    { name: 'Commercial Trucks', value: 13, color: '#a855f7' },
    { name: 'Public Transit Buses', value: 6, color: '#00e676' },
  ];

  const hourlyTrends = [
    { time: '00:00', crashes: 3 },
    { time: '04:00', crashes: 1 },
    { time: '08:00', crashes: 9 },
    { time: '12:00', crashes: 6 },
    { time: '16:00', crashes: 11 },
    { time: '20:00', crashes: 19 },
    { time: '22:00', crashes: 14 },
  ];

  const responseTrends = [
    { month: 'May', responseTime: 7.8 },
    { month: 'Jun', responseTime: 6.9 },
    { month: 'Jul', responseTime: 5.8 },
    { month: 'Aug', responseTime: 5.1 },
    { month: 'Sep', responseTime: 4.6 },
    { month: 'Oct', responseTime: 4.2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-brand-cyan" />
            AI & CAD TELEMETRY ANALYTICS INTELLIGENCE
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Aggregated statistical accident patterns, diurnal incident curves, and emergency CAD response benchmarks
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-dark-800 border border-slate-700 text-slate-300">
            TOTAL ANALYZED: <strong className="text-brand-cyan">1,248 SESSIONS</strong>
          </span>
        </div>
      </div>

      {/* 4 Summary Analytics KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Avg Response Time</span>
          <div className="text-2xl font-black font-display text-emerald-400 mt-1">4.2 min</div>
          <span className="text-[10px] font-mono text-emerald-400">-46% faster CAD dispatch</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">ML Detection Accuracy</span>
          <div className="text-2xl font-black font-display text-brand-cyan mt-1">98.4%</div>
          <span className="text-[10px] font-mono text-slate-400">10k training target</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">False Alarm Rejection</span>
          <div className="text-2xl font-black font-display text-purple-400 mt-1">99.1%</div>
          <span className="text-[10px] font-mono text-slate-400">Potholes & bumps rejected</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Hospital Handover</span>
          <div className="text-2xl font-black font-display text-white mt-1">100%</div>
          <span className="text-[10px] font-mono text-emerald-400">Zero CAD packet loss</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Incidents by Severity */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-brand-cyan" />
            Accidents by Month & Severity Level
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAccidents}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="minor" name="Minor Warning" fill="#00e676" radius={[4, 4, 0, 0]} />
                <Bar dataKey="moderate" name="Moderate Collision" fill="#ff6d00" radius={[4, 4, 0, 0]} />
                <Bar dataKey="severe" name="Severe Rollover" fill="#ff1744" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Diurnal Hourly Crash Curve */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            Incident Frequency by Time of Day (Peak 8 PM – 10 PM)
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="crashes" name="Incident Count" stroke="#00f2fe" strokeWidth={3} dot={{ fill: '#00f2fe', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Distribution Pie */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-purple-400" />
            Incidents by Vehicle Fleet Class
          </h3>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vehicleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Time Optimization Line */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Emergency CAD Arrival Time Improvement (Minutes)
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 10]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="responseTime" name="Avg Arrival Time (Min)" stroke="#00e676" strokeWidth={3} dot={{ fill: '#00e676', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
