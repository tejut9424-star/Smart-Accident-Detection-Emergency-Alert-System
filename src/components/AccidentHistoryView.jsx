import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Eye, 
  FileText, 
  AlertTriangle,
  Flame,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { AccidentDetailModal } from './AccidentDetailModal';
import { AccidentReportModal } from './AccidentReportModal';

export const AccidentHistoryView = () => {
  const { accidentHistory, selectedAccidentDetail, setSelectedAccidentDetail } = useSimulation();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [reportModalAccident, setReportModalAccident] = useState(null);

  const filteredAccidents = accidentHistory.filter(acc => {
    const matchesSearch = 
      acc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.vehicleId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'ALL' || acc.severity.toUpperCase() === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <History className="w-6 h-6 text-brand-cyan" />
            ACCIDENT INCIDENT REGISTRY & CAD ARCHIVE
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Searchable historical telemetry logs, sensor waveform snapshots, AI severity scores, and responder timelines
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReportModalAccident(accidentHistory[0])}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:brightness-110 text-dark-950 font-bold text-xs shadow-lg shadow-brand-cyan/20 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Official Report</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by ID, Vehicle, Location..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-dark-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan font-mono"
          />
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto text-xs font-mono">
          {['ALL', 'SEVERE', 'MODERATE', 'MINOR'].map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                severityFilter === sev
                  ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40'
                  : 'bg-dark-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-dark-900/90 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="p-4">Accident ID</th>
                <th className="p-4">Date / Time</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Location</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Impact Force</th>
                <th className="p-4">AI Conf</th>
                <th className="p-4">Response</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAccidents.map((acc) => {
                const isSevere = acc.severity.toLowerCase().includes('severe');
                const isMod = acc.severity.toLowerCase().includes('moderate');

                return (
                  <tr key={acc.id} className="hover:bg-dark-850/50 transition-colors">
                    <td className="p-4 font-bold text-brand-cyan">{acc.id}</td>
                    <td className="p-4 text-slate-300">
                      <div>{acc.date}</div>
                      <div className="text-[10px] text-slate-500">{acc.time}</div>
                    </td>
                    <td className="p-4 font-bold text-white">{acc.vehicleId}</td>
                    <td className="p-4 text-slate-300 max-w-xs truncate">{acc.location}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isSevere 
                          ? 'bg-emergency-red/20 text-emergency-red border border-emergency-red/40' 
                          : isMod 
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' 
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {acc.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-slate-200 font-bold">{acc.impactForce}</td>
                    <td className="p-4 text-brand-cyan">{acc.aiConfidence}</td>
                    <td className="p-4 text-slate-300">{acc.responseTime}</td>
                    <td className="p-4">
                      <span className="text-emerald-400 font-bold">{acc.status}</span>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedAccidentDetail(acc)}
                        className="px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 border border-slate-700 text-brand-cyan font-bold text-[11px] inline-flex items-center gap-1 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>
                      <button
                        onClick={() => setReportModalAccident(acc)}
                        className="p-1 rounded-lg bg-dark-800 hover:bg-dark-700 border border-slate-700 text-slate-400 hover:text-white inline-flex items-center"
                        title="Print / Export Report"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drill-down Detail Modal */}
      {selectedAccidentDetail && (
        <AccidentDetailModal
          accident={selectedAccidentDetail}
          onClose={() => setSelectedAccidentDetail(null)}
          onOpenReport={(acc) => {
            setSelectedAccidentDetail(null);
            setReportModalAccident(acc);
          }}
        />
      )}

      {/* Printable Report Modal */}
      {reportModalAccident && (
        <AccidentReportModal
          accident={reportModalAccident}
          onClose={() => setReportModalAccident(null)}
        />
      )}
    </div>
  );
};
