import React, { useState } from 'react';
import { 
  PhoneCall, 
  UserPlus, 
  Trash2, 
  Send, 
  ShieldCheck, 
  Bell, 
  CheckCircle2,
  X
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const EmergencyContactsView = () => {
  const { contacts, addContact, deleteContact, addNotification } = useSimulation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relation: 'Family',
    phone: '',
    priority: 'Priority 1 (Instant Voice & SMS)',
    method: 'Automated Voice Call & SMS'
  });

  const handleTestAlert = (contact) => {
    addNotification(
      'Test Alert Dispatched',
      `Simulated SOS SMS & GPS ping sent to ${contact.name} (${contact.phone}). Status: Delivered.`,
      'success'
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    addContact({ ...formData, status: 'Active' });
    setFormData({
      name: '',
      relation: 'Family',
      phone: '',
      priority: 'Priority 1 (Instant Voice & SMS)',
      method: 'Automated Voice Call & SMS'
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2.5">
            <PhoneCall className="w-6 h-6 text-brand-cyan" />
            EMERGENCY CONTACTS & CAD DISPATCH ROSTER
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Manage high-priority SOS contacts, automated GSM notification routing, and automated webhook recipients
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:brightness-110 text-dark-950 font-bold text-xs shadow-lg shadow-brand-cyan/20 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Emergency Contact</span>
        </button>
      </div>

      {/* Contacts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{c.name}</h3>
                <span className="text-xs text-brand-cyan font-mono">{c.relation}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                {c.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Phone Number:</span>
                <span className="font-bold text-white">{c.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dispatch Priority:</span>
                <span className="text-amber-400 font-semibold">{c.priority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Channel Method:</span>
                <span className="text-slate-300">{c.method}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => handleTestAlert(c)}
                className="px-3 py-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3 h-3 text-brand-cyan" />
                <span>Test Alert</span>
              </button>

              <button
                onClick={() => deleteContact(c.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                title="Delete Contact"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl glass-panel border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Register Emergency Contact</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Verma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Relationship / Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Family / Doctor / Transport Lead"
                  value={formData.relation}
                  onChange={e => setFormData({ ...formData, relation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Priority Level</label>
                <select
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan font-sans"
                >
                  <option>Priority 1 (Instant Voice & SMS)</option>
                  <option>Priority 2 (SMS Only)</option>
                  <option>Priority 3 (Post-Incident Report)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-dark-800 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-dark-950 font-bold"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
