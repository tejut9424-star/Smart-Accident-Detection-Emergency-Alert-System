import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LiveVehicleView } from './components/LiveVehicleView';
import { SensorMonitorView } from './components/SensorMonitorView';
import { AccidentSimulationView } from './components/AccidentSimulationView';
import { AiPredictionView } from './components/AiPredictionView';
import { LiveMapView } from './components/LiveMapView';
import { EmergencyResponseView } from './components/EmergencyResponseView';
import { HospitalNetworkView } from './components/HospitalNetworkView';
import { EmergencyContactsView } from './components/EmergencyContactsView';
import { VictimProfileView } from './components/VictimProfileView';
import { AccidentHistoryView } from './components/AccidentHistoryView';
import { AnalyticsView } from './components/AnalyticsView';
import { RoadHeatmapView } from './components/RoadHeatmapView';
import { CloudDataView } from './components/CloudDataView';
import { IotDevicesView } from './components/IotDevicesView';
import { FalseAlarmView } from './components/FalseAlarmView';
import { SystemArchView } from './components/SystemArchView';
import { SmartphonePreview } from './components/SmartphonePreview';
import { AdminSettingsView } from './components/AdminSettingsView';
import { AboutView } from './components/AboutView';
import { LandingPage } from './components/LandingPage';
import { EmergencyAlertModal } from './components/EmergencyAlertModal';
import { ToastNotifications } from './components/ToastNotifications';
import { Menu } from 'lucide-react';

const MainLayout = () => {
  const { activeTab, setActiveTab } = useSimulation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'live-vehicle':
        return <LiveVehicleView />;
      case 'accident-detection':
        return <AccidentSimulationView />;
      case 'emergency-alert':
        return <EmergencyResponseView />;
      case 'live-map':
        return <LiveMapView />;
      case 'sensor-monitoring':
        return <SensorMonitorView />;
      case 'ai-prediction':
        return <AiPredictionView />;
      case 'police-ambulance':
        return <EmergencyResponseView />;
      case 'hospital-network':
        return <HospitalNetworkView />;
      case 'emergency-contacts':
        return <EmergencyContactsView />;
      case 'victim-profile':
        return <VictimProfileView />;
      case 'accident-history':
        return <AccidentHistoryView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'road-heatmap':
        return <RoadHeatmapView />;
      case 'cloud-data':
        return <CloudDataView />;
      case 'iot-devices':
        return <IotDevicesView />;
      case 'false-positives':
        return <FalseAlarmView />;
      case 'system-arch':
        return <SystemArchView />;
      case 'mobile-app':
        return <SmartphonePreview />;
      case 'admin':
        return <AdminSettingsView />;
      case 'about':
        return <AboutView />;
      case 'landing':
        return <LandingPage />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-cyan/20 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-40 p-3.5 rounded-2xl bg-brand-cyan text-dark-950 shadow-2xl font-bold flex items-center justify-center"
          title="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 cyber-grid">
          <div className="max-w-7xl mx-auto pb-12">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Modal Layers */}
      <EmergencyAlertModal />
      <ToastNotifications />
    </div>
  );
};

export default function App() {
  return (
    <SimulationProvider>
      <MainLayout />
    </SimulationProvider>
  );
}
