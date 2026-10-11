import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { soundFx } from '../utils/audio';
import { 
  INITIAL_HOSPITALS, 
  INITIAL_CONTACTS, 
  INITIAL_ACCIDENT_HISTORY, 
  ROAD_SAFETY_HOTSPOTS,
  FALSE_ALARM_SCENARIOS,
  IOT_DEVICES,
  VICTIM_PROFILE 
} from '../data/mockData';

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'live-vehicle', 'accident-detection', 'emergency-alert', 'live-map', 'victim-profile', 'emergency-contacts', 'hospital-network', 'police-ambulance', 'accident-history', 'analytics', 'sensor-monitoring', 'ai-prediction', 'cloud-data', 'iot-devices', 'false-positives', 'system-arch', 'mobile-app', 'admin', 'settings', 'about'
  
  // Audio Mute setting
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceVoiceEnabled, setVoiceEnabled] = useState(true);

  // System Hardware Online Statuses
  const [systemStatus, setSystemStatus] = useState({
    esp32: 'ONLINE',
    mpu6050: 'ONLINE',
    gps: 'ACTIVE',
    gsm: 'CONNECTED',
    cloud: 'CONNECTED',
    aiModel: 'ACTIVE',
    battery: 87, // %
    detectionSensitivity: 'Balanced (High Accuracy)',
    alertDelayMs: 0
  });

  // Vehicle Telemetry
  const [vehicle, setVehicle] = useState({
    vehicleId: 'TS09AB1234',
    vehicleType: 'Car (Sedan EV)',
    driverName: 'Demo Driver (John Doe)',
    speed: 68, // km/h
    targetSpeed: 68,
    isEngineOn: true,
    seatBelt: true,
    heading: 45, // degrees
    lat: 17.3850,
    lng: 78.4867,
    altitude: 542, // m
    odometer: 14820 // km
  });

  // Sensor Telemetry (MPU6050 + IMU)
  const [sensors, setSensors] = useState({
    accelX: 0.08,
    accelY: 0.12,
    accelZ: 0.98,
    totalG: 1.02,
    gyroX: 1.8,
    gyroY: -2.3,
    gyroZ: 4.1,
    totalGyro: 5.1,
    impactForce: 0.35, // g
    temperature: 31.4, // deg C
    vibrationFreq: 14 // Hz
  });

  // Live Chart Sensor Data Stream (rolling 25 samples)
  const [sensorHistory, setSensorHistory] = useState([
    { time: '00:00', accelX: 0.05, accelY: 0.08, accelZ: 0.99, totalG: 1.02, gyro: 3.2, speed: 65 },
    { time: '00:01', accelX: 0.08, accelY: 0.11, accelZ: 0.98, totalG: 1.01, gyro: 4.5, speed: 66 },
    { time: '00:02', accelX: 0.06, accelY: 0.09, accelZ: 1.01, totalG: 1.03, gyro: 2.8, speed: 68 },
    { time: '00:03', accelX: 0.09, accelY: 0.14, accelZ: 0.97, totalG: 1.04, gyro: 5.1, speed: 68 },
  ]);

  // AI & ML Engine State
  const [aiState, setAiState] = useState({
    modelStatus: 'ACTIVE',
    modelArchitecture: '1D-CNN + Random Forest Sensor Fusion Ensemble',
    trainingTarget: '10,000+ Simulated Crash Scenarios (Research Target)',
    accidentProbability: 1.8, // %
    classification: 'NORMAL DRIVING',
    severity: 'NONE', // 'NONE', 'MINOR', 'MODERATE', 'SEVERE', 'CRITICAL'
    confidenceScore: 99.1, // %
    detectionLatency: 84, // ms
    decisionExplanation: 'Vehicle kinematics within nominal operational bounds. Stable tri-axial acceleration and zero angular rollover detected.',
    estimatedDamage: 'None (0%)',
    injuryRisk: 'Low (< 2%)',
    emergencyPriority: 'NONE'
  });

  // Detection Pipeline Step
  // 'MONITORING', 'IMPACT_DETECTED', 'SENSOR_FUSION', 'AI_CLASSIFICATION', 'SEVERITY_ASSESSMENT', 'GPS_LOCATION', 'EMERGENCY_ALERT', 'VICTIM_CONFIRMATION', 'DISPATCH_COMMITTED', 'CLOUD_LOGGED'
  const [pipelineStep, setPipelineStep] = useState('MONITORING');

  // Emergency Alert & Victim Voice Confirmation State
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [confirmationSeconds, setConfirmationSeconds] = useState(10);
  const [confirmationStatus, setConfirmationStatus] = useState('IDLE'); // 'IDLE', 'COUNTING_DOWN', 'SAFE_CANCELLED', 'HELP_CONFIRMED'
  const countdownIntervalRef = useRef(null);

  // Response Timer State
  const [responseTimers, setResponseTimers] = useState({
    detectionTime: '00:00:084',
    alertTime: '--',
    confirmationTime: '--',
    dispatchTime: '--',
    arrivalTime: '--',
    activeTimerSeconds: 0
  });

  // Emergency Dispatched Units
  const [hospitals, setHospitals] = useState(INITIAL_HOSPITALS);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [accidentHistory, setAccidentHistory] = useState(INITIAL_ACCIDENT_HISTORY);
  const [selectedAccidentDetail, setSelectedAccidentDetail] = useState(null);

  // Active Emergency Response Dispatch Entities
  const [dispatchStatus, setDispatchStatus] = useState({
    ambulance: { status: 'STANDBY', unit: 'Ambulance Unit 108-A4', distance: '2.4 km', eta: '5 min' },
    police: { status: 'STANDBY', unit: 'Cyberabad Patrol 09', distance: '1.8 km', eta: '3 min' },
    hospital: { status: 'STANDBY', name: 'Apollo Emergency Trauma Centre', beds: '14 Available', icu: '6 Ready' },
    family: { status: 'STANDBY', contact: 'Priya Sharma (+91 98765 43210)', delivery: 'SMS Queue' }
  });

  // Notification Toasts
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Initialized', message: 'ESP32 & MPU6050 edge nodes connected with zero telemetry packet loss.', type: 'info', time: 'Just now' },
    { id: 2, title: 'GPS Fix Acquired', message: 'NEO-6M locked 11 satellites at 17.3850° N, 78.4867° E.', type: 'success', time: '1m ago' }
  ]);

  // Cloud / Firebase Telemetry Simulation
  const [cloudStats, setCloudStats] = useState({
    connection: 'CONNECTED',
    database: 'Google Firebase Realtime DB & Firestore',
    lastSync: '1s ago',
    recordCount: 1248,
    isSyncing: false,
    latencyMs: 38
  });

  // Auto Demo Animation Tracker
  const [isAutoDemoRunning, setIsAutoDemoRunning] = useState(false);
  const [autoDemoStep, setAutoDemoStep] = useState(0);

  // Sound sync
  useEffect(() => {
    soundFx.isMuted = !soundEnabled;
  }, [soundEnabled]);

  // Add toast helper
  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: Date.now() + Math.random(),
      title,
      message,
      type,
      time: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  };

  // Continuous Telemetry Loop for realistic continuous variations
  useEffect(() => {
    const timer = setInterval(() => {
      if (pipelineStep === 'MONITORING') {
        // Subtle driving fluctuations
        setSensors(prev => {
          const noiseX = (Math.random() - 0.5) * 0.08;
          const noiseY = (Math.random() - 0.5) * 0.08;
          const noiseZ = (Math.random() - 0.5) * 0.04;
          const gx = 0.06 + noiseX;
          const gy = 0.08 + noiseY;
          const gz = 0.98 + noiseZ;
          const totalG = parseFloat(Math.sqrt(gx * gx + gy * gy + gz * gz).toFixed(2));
          const gyroX = parseFloat(((Math.random() - 0.5) * 4).toFixed(1));
          const gyroY = parseFloat(((Math.random() - 0.5) * 4).toFixed(1));
          const gyroZ = parseFloat((3.0 + (Math.random() - 0.5) * 6).toFixed(1));
          const totalGyro = parseFloat(Math.sqrt(gyroX * gyroX + gyroY * gyroY + gyroZ * gyroZ).toFixed(1));
          
          return {
            accelX: parseFloat(gx.toFixed(2)),
            accelY: parseFloat(gy.toFixed(2)),
            accelZ: parseFloat(gz.toFixed(2)),
            totalG,
            gyroX,
            gyroY,
            gyroZ,
            totalGyro,
            impactForce: parseFloat((0.2 + Math.random() * 0.2).toFixed(2)),
            temperature: parseFloat((31.2 + Math.random() * 0.6).toFixed(1)),
            vibrationFreq: Math.floor(12 + Math.random() * 5)
          };
        });

        // Add history chart point
        setSensorHistory(prev => {
          const nowStr = new Date().toLocaleTimeString('en-US', { minute: '2-digit', second: '2-digit' });
          const newPoint = {
            time: nowStr,
            accelX: parseFloat((0.06 + (Math.random() - 0.5) * 0.1).toFixed(2)),
            accelY: parseFloat((0.08 + (Math.random() - 0.5) * 0.1).toFixed(2)),
            accelZ: parseFloat((0.98 + (Math.random() - 0.5) * 0.05).toFixed(2)),
            totalG: parseFloat((1.01 + (Math.random() - 0.5) * 0.05).toFixed(2)),
            gyro: parseFloat((4.0 + (Math.random() - 0.5) * 3).toFixed(1)),
            speed: vehicle.speed
          };
          return [...prev.slice(-24), newPoint];
        });

        // Vehicle GPS minor drift to simulate forward driving
        if (vehicle.speed > 0) {
          setVehicle(prev => ({
            ...prev,
            lat: prev.lat + 0.00003,
            lng: prev.lng + 0.00004,
            odometer: parseFloat((prev.odometer + 0.001).toFixed(3))
          }));
        }
      }
    }, 1200);

    return () => clearInterval(timer);
  }, [pipelineStep, vehicle.speed]);

  // Voice confirmation timer countdown effect
  useEffect(() => {
    if (confirmationStatus === 'COUNTING_DOWN') {
      countdownIntervalRef.current = setInterval(() => {
        setConfirmationSeconds(prev => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            // Expired countdown triggers automatic dispatch
            commitEmergencyDispatch();
            return 0;
          }
          if (soundEnabled && prev <= 5) {
            soundFx.playBeep(900, 0.06, 'sawtooth');
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    }

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [confirmationStatus, soundEnabled]);

  // Execute simulation types
  const triggerSimulation = (type) => {
    soundFx.playBeep(440, 0.1);

    if (type === 'NORMAL') {
      resetSimulation();
      addNotification('Normal Driving Simulation', 'Vehicle cruising stably at 68 km/h. Sensor telemetry nominal.', 'info');
      return;
    }

    if (type === 'MINOR') {
      setSensors({
        accelX: 1.45,
        accelY: 0.85,
        accelZ: 1.60,
        totalG: 2.32,
        gyroX: 24.5,
        gyroY: 18.2,
        gyroZ: 35.0,
        totalGyro: 46.4,
        impactForce: 2.32,
        temperature: 32.5,
        vibrationFreq: 45
      });
      setVehicle(prev => ({ ...prev, speed: 25 }));
      setAiState({
        modelStatus: 'ACTIVE',
        modelArchitecture: '1D-CNN + Random Forest Sensor Fusion Ensemble',
        trainingTarget: '10,000+ Simulated Crash Scenarios (Research Target)',
        accidentProbability: 64.2,
        classification: 'MINOR ACCIDENT (Curb/Low-Speed Bump)',
        severity: 'MINOR',
        confidenceScore: 88.5,
        detectionLatency: 92,
        decisionExplanation: 'Moderate G-force spike detected with mild angular displacement. Low kinetic hazard classification.',
        estimatedDamage: 'Minor Fender (15%)',
        injuryRisk: 'Low (< 10%)',
        emergencyPriority: 'LOW (Warning Mode)'
      });
      addNotification('Minor Impact Detected', '2.32g shock detected. AI generated low severity advisory.', 'warning');
      return;
    }

    if (type === 'MODERATE') {
      setSensors({
        accelX: 3.80,
        accelY: 2.90,
        accelZ: 2.10,
        totalG: 5.22,
        gyroX: 68.0,
        gyroY: 42.0,
        gyroZ: 85.0,
        totalGyro: 116.7,
        impactForce: 5.22,
        temperature: 34.0,
        vibrationFreq: 88
      });
      setVehicle(prev => ({ ...prev, speed: 10 }));
      setAiState({
        modelStatus: 'ACTIVE',
        modelArchitecture: '1D-CNN + Random Forest Sensor Fusion Ensemble',
        trainingTarget: '10,000+ Simulated Crash Scenarios (Research Target)',
        accidentProbability: 88.6,
        classification: 'MODERATE ACCIDENT (Collision Warning)',
        severity: 'MODERATE',
        confidenceScore: 94.2,
        detectionLatency: 86,
        decisionExplanation: 'Significant multi-axis kinetic impulse with sustained yaw angle deviation. Secondary crash protection protocol armed.',
        estimatedDamage: 'Moderate Frontal (45%)',
        injuryRisk: 'Medium (38%)',
        emergencyPriority: 'MEDIUM'
      });
      addNotification('Moderate Accident Warning', '5.22g impact registered. Emergency escalation prepped.', 'warning');
      return;
    }

    if (type === 'SEVERE' || type === 'CRITICAL') {
      startSevereAccidentPipeline();
    }
  };

  // Start Severe Accident Full Pipeline
  const startSevereAccidentPipeline = () => {
    soundFx.playCrashAlert();
    if (voiceVoiceEnabled) {
      soundFx.speak('Warning! High impact accident detected. Initiating emergency response protocol.');
    }

    // Abrupt physical crash sensor readings
    const crashG = 8.84;
    const crashGyro = 168.4;

    setSensors({
      accelX: 6.20,
      accelY: 5.10,
      accelZ: 3.40,
      totalG: crashG,
      gyroX: 120.5,
      gyroY: 88.0,
      gyroZ: 145.2,
      totalGyro: crashGyro,
      impactForce: crashG,
      temperature: 38.6,
      vibrationFreq: 160
    });

    // Velocity crashes to 0 abruptly
    setVehicle(prev => ({
      ...prev,
      speed: 0
    }));

    // AI Classification
    setAiState({
      modelStatus: 'ACTIVE',
      modelArchitecture: '1D-CNN + Random Forest Sensor Fusion Ensemble',
      trainingTarget: '10,000+ Simulated Crash Scenarios (Research Target)',
      accidentProbability: 98.7,
      classification: 'SEVERE ACCIDENT (Critical Impact & Rollover Risk)',
      severity: 'SEVERE',
      confidenceScore: 98.2,
      detectionLatency: 84,
      decisionExplanation: 'Tri-axial impact peak (8.84g) accompanied by instant velocity drop to zero and severe 168.4°/s angular rotation.',
      estimatedDamage: 'Extensive (85%)',
      injuryRisk: 'Critical (> 80%)',
      emergencyPriority: 'HIGH (Immediate Dispatch)'
    });

    // Add drastic spike to history chart
    const nowStr = new Date().toLocaleTimeString('en-US', { minute: '2-digit', second: '2-digit' });
    setSensorHistory(prev => [
      ...prev.slice(-20),
      { time: nowStr, accelX: 6.2, accelY: 5.1, accelZ: 3.4, totalG: 8.84, gyro: 168.4, speed: 0 }
    ]);

    setEmergencyActive(true);
    setPipelineStep('IMPACT_DETECTED');
    setResponseTimers(prev => ({
      ...prev,
      detectionTime: '00:00:084',
      alertTime: '00:01:200',
      activeTimerSeconds: 0
    }));

    addNotification('🚨 SEVERE ACCIDENT DETECTED', '8.84g shock on vehicle TS09AB1234. AI ML Model triggered emergency sequence.', 'emergency');

    // Progression of pipeline
    setTimeout(() => setPipelineStep('SENSOR_FUSION'), 600);
    setTimeout(() => setPipelineStep('AI_CLASSIFICATION'), 1200);
    setTimeout(() => setPipelineStep('SEVERITY_ASSESSMENT'), 1800);
    setTimeout(() => setPipelineStep('GPS_LOCATION'), 2400);
    setTimeout(() => {
      setPipelineStep('EMERGENCY_ALERT');
      addNotification('📡 GSM Emergency Dispatched', 'Automated SMS and CAD data packets transmitted to 108 Emergency & Family.', 'emergency');
    }, 3000);

    setTimeout(() => {
      setPipelineStep('VICTIM_CONFIRMATION');
      setConfirmationStatus('COUNTING_DOWN');
      setConfirmationSeconds(10);
      if (voiceVoiceEnabled) {
        setTimeout(() => {
          soundFx.speak('Are you safe? Press I am safe within 10 seconds or emergency teams will arrive.');
        }, 300);
      }
    }, 3800);
  };

  // Commit Emergency Dispatch when countdown runs out or user clicks "Need Help"
  const commitEmergencyDispatch = () => {
    setConfirmationStatus('HELP_CONFIRMED');
    setPipelineStep('DISPATCH_COMMITTED');

    soundFx.playSuccess();
    if (voiceVoiceEnabled) {
      soundFx.speak('Emergency confirmed. Nearest ambulance and police dispatched to your GPS location.');
    }

    setDispatchStatus({
      ambulance: { status: 'DISPATCHED 🚑', unit: 'Apollo Trauma Ambulance 09', distance: '2.4 km', eta: '4 min' },
      police: { status: 'EN ROUTE 👮', unit: 'Cyberabad Police Patrol 04', distance: '1.8 km', eta: '3 min' },
      hospital: { status: 'READY & ALERTED 🏥', name: 'Apollo Emergency Trauma Centre', beds: '14 Available', icu: '6 Ready' },
      family: { status: 'SMS DELIVERED ✓', contact: 'Priya Sharma (+91 98765 43210)', delivery: 'Voice Call + Live GPS Link' }
    });

    setResponseTimers(prev => ({
      ...prev,
      confirmationTime: '00:06:400',
      dispatchTime: '00:08:120',
      arrivalTime: '04:50:000'
    }));

    addNotification('🚑 Ambulance Unit Dispatched', 'Apollo Trauma ALS Ambulance rolling with GPS vectoring. ETA: 4 mins.', 'success');
    addNotification('👮 Police CAD Unit Alerted', 'Cyberabad Traffic Police Patrol alerted to cordon scene.', 'info');

    // Cloud record update
    setTimeout(() => {
      setPipelineStep('CLOUD_LOGGED');
      setCloudStats(prev => ({
        ...prev,
        recordCount: prev.recordCount + 1,
        lastSync: 'Just now'
      }));

      // Add to accident history
      const newAccident = {
        id: `ACC-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        vehicleId: vehicle.vehicleId,
        driver: vehicle.driverName,
        location: 'Outer Ring Road, Hyderabad (Simulated Live)',
        coordinates: `${vehicle.lat.toFixed(4)}° N, ${vehicle.lng.toFixed(4)}° E`,
        severity: 'Severe',
        impactForce: `${sensors.impactForce} g`,
        gyroMax: `${sensors.totalGyro}°/s`,
        aiConfidence: `${aiState.confidenceScore}%`,
        responseTime: '4 min 50 sec (ETA)',
        status: 'Active Emergency / En Route',
        hospital: 'Apollo Emergency Trauma Centre',
        policeUnit: 'Cyberabad Police Patrol 04',
        summary: 'Critical high-g rollover accident detected via sensor fusion. Paramedic units en route.',
        timeline: [
          { time: '00:00.084', title: 'Impact Detected', desc: `MPU6050 recorded ${sensors.impactForce}g spike.` },
          { time: '00:00.120', title: 'AI Classification', desc: '1D-CNN confirmed Severe Crash with 98.2% confidence.' },
          { time: '00:01.200', title: 'GPS Location Tagged', desc: `NEO-6M locked at ${vehicle.lat.toFixed(4)}° N, ${vehicle.lng.toFixed(4)}° E.` },
          { time: '00:02.400', title: 'GSM SMS Dispatched', desc: 'SIM800L dispatched alerts to 108 CAD and family.' },
          { time: '00:08.120', title: 'Ambulance & Police Rolling', desc: 'Apollo Trauma Ambulance rolling.' }
        ]
      };

      setAccidentHistory(prev => [newAccident, ...prev]);
      addNotification('☁️ Cloud Record Created', 'Firebase document stored in Firestore collection /emergency_events.', 'success');
    }, 2000);
  };

  // Victim marks "I AM SAFE"
  const cancelEmergencyResponse = () => {
    setConfirmationStatus('SAFE_CANCELLED');
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    
    soundFx.playSuccess();
    if (voiceVoiceEnabled) {
      soundFx.speak('Accident alarm cancelled by user. Returning to normal monitoring.');
    }

    addNotification('Emergency Cancelled by Driver', 'Driver selected "I AM SAFE". Response stood down. Logged as false alarm test.', 'info');
    
    setTimeout(() => {
      resetSimulation();
    }, 2500);
  };

  // Reset all simulation parameters to pristine normal
  const resetSimulation = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setEmergencyActive(false);
    setConfirmationStatus('IDLE');
    setConfirmationSeconds(10);
    setPipelineStep('MONITORING');
    setIsAutoDemoRunning(false);
    setAutoDemoStep(0);

    setVehicle(prev => ({
      ...prev,
      speed: 68,
      targetSpeed: 68
    }));

    setSensors({
      accelX: 0.08,
      accelY: 0.12,
      accelZ: 0.98,
      totalG: 1.02,
      gyroX: 1.8,
      gyroY: -2.3,
      gyroZ: 4.1,
      totalGyro: 5.1,
      impactForce: 0.35,
      temperature: 31.4,
      vibrationFreq: 14
    });

    setAiState({
      modelStatus: 'ACTIVE',
      modelArchitecture: '1D-CNN + Random Forest Sensor Fusion Ensemble',
      trainingTarget: '10,000+ Simulated Crash Scenarios (Research Target)',
      accidentProbability: 1.8,
      classification: 'NORMAL DRIVING',
      severity: 'NONE',
      confidenceScore: 99.1,
      detectionLatency: 84,
      decisionExplanation: 'Vehicle kinematics within nominal operational bounds. Stable tri-axial acceleration and zero angular rollover detected.',
      estimatedDamage: 'None (0%)',
      injuryRisk: 'Low (< 2%)',
      emergencyPriority: 'NONE'
    });

    setDispatchStatus({
      ambulance: { status: 'STANDBY', unit: 'Ambulance Unit 108-A4', distance: '2.4 km', eta: '5 min' },
      police: { status: 'STANDBY', unit: 'Cyberabad Patrol 09', distance: '1.8 km', eta: '3 min' },
      hospital: { status: 'STANDBY', name: 'Apollo Emergency Trauma Centre', beds: '14 Available', icu: '6 Ready' },
      family: { status: 'STANDBY', contact: 'Priya Sharma (+91 98765 43210)', delivery: 'SMS Queue' }
    });

    setResponseTimers({
      detectionTime: '00:00:084',
      alertTime: '--',
      confirmationTime: '--',
      dispatchTime: '--',
      arrivalTime: '--',
      activeTimerSeconds: 0
    });
  };

  // Run full Auto Demo orchestrator for college viva / presentations
  const runAutoDemo = () => {
    resetSimulation();
    setIsAutoDemoRunning(true);
    setAutoDemoStep(1);
    addNotification('🎬 Presentation Demo Started', 'Step 1/8: Normal highway cruising at 72 km/h.', 'info');

    // Step 1: Normal Driving
    setTimeout(() => {
      setAutoDemoStep(2);
      addNotification('🎬 Auto Demo: Collision Incoming', 'Step 2/8: Triggering 8.84g multi-axis rollover collision.', 'warning');
      triggerSimulation('SEVERE');
    }, 3000);

    // Step 2-7 are handled by the pipeline
    // After 12s in auto demo, let it automatically trigger dispatch to complete the story
    setTimeout(() => {
      setAutoDemoStep(6);
      commitEmergencyDispatch();
    }, 9500);

    setTimeout(() => {
      setAutoDemoStep(8);
      setIsAutoDemoRunning(false);
      addNotification('🎬 Auto Demo Completed', 'Full lifecycle: Impact → ML Verdict → CAD Dispatch → Firebase Cloud verified!', 'success');
    }, 15000);
  };

  // Vehicle manual controls
  const startVehicle = () => {
    setVehicle(prev => ({ ...prev, isEngineOn: true, speed: 68 }));
    addNotification('Engine Started', 'Vehicle powertrain online. GPS telemetry tracking active.', 'info');
  };

  const stopVehicle = () => {
    setVehicle(prev => ({ ...prev, speed: 0 }));
    addNotification('Vehicle Stopped', 'Velocity zeroed. Engine idling.', 'info');
  };

  const accelerateVehicle = () => {
    setVehicle(prev => ({ ...prev, speed: Math.min(prev.speed + 15, 140) }));
    soundFx.playBeep(600, 0.08);
  };

  const brakeVehicle = () => {
    setVehicle(prev => ({ ...prev, speed: Math.max(prev.speed - 20, 0) }));
    soundFx.playBeep(350, 0.08);
  };

  // Trigger manual cloud sync
  const triggerCloudSync = () => {
    setCloudStats(prev => ({ ...prev, isSyncing: true }));
    soundFx.playBeep(880, 0.05);
    setTimeout(() => {
      setCloudStats(prev => ({
        ...prev,
        isSyncing: false,
        lastSync: 'Just now',
        latencyMs: Math.floor(25 + Math.random() * 20),
        recordCount: prev.recordCount + 1
      }));
      addNotification('Cloud Synchronized', 'ESP32 local buffer synchronized with Firebase Realtime Database.', 'success');
    }, 900);
  };

  // Manage Contacts
  const addContact = (newContact) => {
    setContacts(prev => [...prev, { ...newContact, id: `c-${Date.now()}` }]);
    addNotification('Emergency Contact Added', `${newContact.name} registered for automated CAD alerts.`, 'success');
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    addNotification('Contact Removed', 'Emergency dispatch routing updated.', 'info');
  };

  return (
    <SimulationContext.Provider
      value={{
        activeTab,
        setActiveTab,
        soundEnabled,
        setSoundEnabled,
        voiceVoiceEnabled,
        setVoiceEnabled,
        systemStatus,
        setSystemStatus,
        vehicle,
        setVehicle,
        sensors,
        sensorHistory,
        aiState,
        pipelineStep,
        emergencyActive,
        confirmationSeconds,
        confirmationStatus,
        responseTimers,
        hospitals,
        setHospitals,
        contacts,
        addContact,
        deleteContact,
        accidentHistory,
        selectedAccidentDetail,
        setSelectedAccidentDetail,
        dispatchStatus,
        notifications,
        addNotification,
        cloudStats,
        isAutoDemoRunning,
        autoDemoStep,
        // Actions
        triggerSimulation,
        commitEmergencyDispatch,
        cancelEmergencyResponse,
        resetSimulation,
        runAutoDemo,
        startVehicle,
        stopVehicle,
        accelerateVehicle,
        brakeVehicle,
        triggerCloudSync,
        victimProfile: VICTIM_PROFILE,
        roadSafetyHotspots: ROAD_SAFETY_HOTSPOTS,
        falseAlarmScenarios: FALSE_ALARM_SCENARIOS,
        iotDevices: IOT_DEVICES
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);
