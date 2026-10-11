import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Siren, 
  X 
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const ToastNotifications = () => {
  const { notifications } = useSimulation();

  if (!notifications || notifications.length === 0) return null;

  // Show the most recent 3 toasts
  const recentToasts = notifications.slice(0, 3);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {recentToasts.map((toast) => {
        const isEmergency = toast.type === 'emergency';
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all animate-slide-up flex items-start gap-3 ${
              isEmergency
                ? 'bg-emergency-red/20 border-emergency-red text-white shadow-emergency-red/30 ring-1 ring-emergency-red/50'
                : isSuccess
                ? 'bg-emerald-950/80 border-emerald-500/50 text-slate-100 shadow-emerald-500/10'
                : isWarning
                ? 'bg-amber-950/80 border-amber-500/50 text-slate-100 shadow-amber-500/10'
                : 'bg-dark-900/90 border-slate-700 text-slate-200'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isEmergency && <Siren className="w-5 h-5 text-emergency-red animate-bounce" />}
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {!isEmergency && !isSuccess && !isWarning && <Info className="w-5 h-5 text-brand-cyan" />}
            </div>

            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs font-display text-white">{toast.title}</h4>
                <span className="text-[9px] font-mono text-slate-400">{toast.time}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono leading-tight">
                {toast.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
