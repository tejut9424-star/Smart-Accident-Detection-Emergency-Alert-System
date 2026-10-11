// Mock Data & Baseline Hardware Specifications

export const INITIAL_HOSPITALS = [
  {
    id: 'hosp-1',
    name: 'Apollo Emergency Trauma Centre',
    distance: 2.4, // km
    eta: '4-6 min',
    emergencyBeds: 14,
    icuAvailable: 6,
    ambulanceAvailable: 3,
    status: 'READY & ALERTED',
    rating: '4.9 ★ Level 1 Trauma',
    phone: '+91 40 2360 7777',
    lat: 17.3912,
    lng: 78.4795
  },
  {
    id: 'hosp-2',
    name: 'Care Multi-Speciality Hospital',
    distance: 3.1,
    eta: '7-9 min',
    emergencyBeds: 8,
    icuAvailable: 2,
    ambulanceAvailable: 1,
    status: 'STANDBY',
    rating: '4.7 ★ Level 2 Trauma',
    phone: '+91 40 3041 8888',
    lat: 17.3810,
    lng: 78.4950
  },
  {
    id: 'hosp-3',
    name: 'Yashoda Emergency Medical Institute',
    distance: 4.6,
    eta: '10-12 min',
    emergencyBeds: 18,
    icuAvailable: 5,
    ambulanceAvailable: 4,
    status: 'STANDBY',
    rating: '4.8 ★ Level 1 Trauma',
    phone: '+91 40 4567 4567',
    lat: 17.3750,
    lng: 78.4720
  },
  {
    id: 'hosp-4',
    name: 'Continental Advanced Life Support',
    distance: 6.2,
    eta: '14 min',
    emergencyBeds: 22,
    icuAvailable: 9,
    ambulanceAvailable: 5,
    status: 'STANDBY',
    rating: '4.9 ★ Level 1 Trauma',
    phone: '+91 40 6700 0000',
    lat: 17.4050,
    lng: 78.5020
  }
];

export const INITIAL_CONTACTS = [
  {
    id: 'c1',
    name: 'Priya Sharma (Spouse)',
    relation: 'Family / Spouse',
    phone: '+91 98765 43210',
    priority: 'Priority 1 (Instant Call + SMS + Live GPS)',
    method: 'Automated Voice Call & SMS',
    status: 'Active'
  },
  {
    id: 'c2',
    name: 'Dr. Rajesh Verma (Family Physician)',
    relation: 'Doctor',
    phone: '+91 94401 22334',
    priority: 'Priority 2 (SMS + Medical Log)',
    method: 'Automated SMS',
    status: 'Active'
  },
  {
    id: 'c3',
    name: 'Telangana State Emergency Police (112 / 100)',
    relation: 'Law Enforcement / Police',
    phone: '112',
    priority: 'Priority 1 (Automated Police Dispatch Packet)',
    method: 'Govt API & GSM Dispatch',
    status: 'Connected'
  },
  {
    id: 'c4',
    name: 'Central 108 Emergency Ambulance Fleet',
    relation: 'Ambulance Service',
    phone: '108',
    priority: 'Priority 1 (Nearest Unit Vector Routing)',
    method: 'CAD Telemetry Feed',
    status: 'Connected'
  }
];

export const INITIAL_ACCIDENT_HISTORY = [
  {
    id: 'ACC-8921',
    date: '2026-10-06',
    time: '18:42:15',
    vehicleId: 'TS09AB1234',
    driver: 'Demo Driver (John Doe)',
    location: 'Outer Ring Road, Junction 14, Hyderabad',
    coordinates: '17.3850° N, 78.4867° E',
    severity: 'Severe',
    impactForce: '8.4 g',
    gyroMax: '142°/s',
    aiConfidence: '98.2%',
    responseTime: '4 min 18 sec',
    status: 'Resolved',
    hospital: 'Apollo Emergency Trauma Centre',
    policeUnit: 'Cyberabad Traffic Police Patrol 04',
    summary: 'High-speed lateral collision detected via sensor fusion. Automatic CAD dispatch sent in 84ms.',
    timeline: [
      { time: '18:42:15.012', title: 'Impact Detected', desc: 'MPU6050 recorded 8.4g spike across X & Y axes.' },
      { time: '18:42:15.096', title: 'AI Classification Completed', desc: 'Decision tree + ML classifier confirmed Severe Accident (98.2%).' },
      { time: '18:42:15.820', title: 'NEO-6M GPS Latched', desc: 'Accident coordinates (17.3850, 78.4867) tagged with +/- 2.5m precision.' },
      { time: '18:42:16.400', title: 'Emergency Alerts Transmitted', desc: 'SIM800L dispatched SMS to family & emergency webhook.' },
      { time: '18:42:26.000', title: 'Victim Confirmation Expired', desc: 'No cancel input received in 10s countdown. Full dispatch committed.' },
      { time: '18:42:28.100', title: 'Ambulance Unit 09 Dispatched', desc: 'Apollo Trauma ambulance rolling with ETA 5 mins.' },
      { time: '18:46:33.000', title: 'Paramedic On-Scene', desc: 'Victim stabilized and moved to Apollo Trauma ICU.' }
    ]
  },
  {
    id: 'ACC-8890',
    date: '2026-10-04',
    time: '09:15:30',
    vehicleId: 'TS09AB1234',
    driver: 'Demo Driver (John Doe)',
    location: 'Gachibowli Flyover Ramp, Hyderabad',
    coordinates: '17.4401° N, 78.3489° E',
    severity: 'Moderate',
    impactForce: '4.8 g',
    gyroMax: '78°/s',
    aiConfidence: '94.5%',
    responseTime: '6 min 30 sec',
    status: 'Resolved',
    hospital: 'Care Multi-Speciality Hospital',
    policeUnit: 'Traffic Division West',
    summary: 'Rear-end collision during heavy rain conditions. Driver confirmed safe after medical evaluation.',
    timeline: [
      { time: '09:15:30.000', title: 'Impact Spike Detected', desc: '4.8g deceleration recorded on Z-Y axes.' },
      { time: '09:15:30.088', title: 'ML Fusion Verdict', desc: 'Moderate Impact classified (94.5% confidence).' },
      { time: '09:15:31.000', title: 'Alerts Sent', desc: 'Care Hospital & Contact 1 alerted via GSM.' },
      { time: '09:22:00.000', title: 'Scene Cleared', desc: 'No life-threatening injuries sustained.' }
    ]
  },
  {
    id: 'ACC-8750',
    date: '2026-09-29',
    time: '23:10:04',
    vehicleId: 'TS09AB1234',
    driver: 'Demo Driver (John Doe)',
    location: 'Jubilee Hills Road No. 36',
    coordinates: '17.4325° N, 78.4073° E',
    severity: 'Minor',
    impactForce: '2.4 g',
    gyroMax: '35°/s',
    aiConfidence: '89.0%',
    responseTime: '1 min 10 sec',
    status: 'Resolved (Self-Assisted)',
    hospital: 'Yashoda Emergency Medical Institute',
    policeUnit: 'Local Patrol',
    summary: 'Low-speed curb impact with tire rupture. Victim cancelled full ambulance response.',
    timeline: [
      { time: '23:10:04.000', title: 'Minor Impact Recorded', desc: '2.4g shockwave detected.' },
      { time: '23:10:08.000', title: 'Voice Confirmation Handled', desc: 'Driver pressed "I AM SAFE" within countdown.' },
      { time: '23:10:10.000', title: 'Telemetry Logged', desc: 'Logged as minor incident without emergency ambulance roll.' }
    ]
  }
];

export const ROAD_SAFETY_HOTSPOTS = [
  {
    id: 'spot-1',
    name: 'Outer Ring Road (ORR) Exit 14 - High-Speed Merge',
    riskLevel: 'HIGH',
    color: '#ff1744',
    accidents: 42,
    severe: 11,
    avgResponse: '5.4 min',
    peakTime: '8 PM – 11 PM',
    commonCause: 'Overspeeding & Wet Road Skidding',
    lat: 17.3850,
    lng: 78.4867
  },
  {
    id: 'spot-2',
    name: 'Gachibowli Junction - Tech Corridor Chokepoint',
    riskLevel: 'HIGH',
    color: '#ff1744',
    accidents: 38,
    severe: 9,
    avgResponse: '6.2 min',
    peakTime: '6 PM – 9 PM',
    commonCause: 'Abrupt Braking & Intersection Clashes',
    lat: 17.4401,
    lng: 78.3489
  },
  {
    id: 'spot-3',
    name: 'Jubilee Hills Checkpost - Curvature Zone',
    riskLevel: 'MEDIUM',
    color: '#ff6d00',
    accidents: 24,
    severe: 4,
    avgResponse: '4.8 min',
    peakTime: '11 PM – 2 AM',
    commonCause: 'Sharp Turning Roll-Over & Blind Spot',
    lat: 17.4325,
    lng: 78.4073
  },
  {
    id: 'spot-4',
    name: 'Secunderabad Station Road - High Pedestrian Density',
    riskLevel: 'MEDIUM',
    color: '#ff6d00',
    accidents: 19,
    severe: 3,
    avgResponse: '7.1 min',
    peakTime: '7 AM – 10 AM',
    commonCause: 'Dense Traffic Side Swipes',
    lat: 17.4399,
    lng: 78.4983
  },
  {
    id: 'spot-5',
    name: 'Begumpet Airport Boulevard - Regulated Corridor',
    riskLevel: 'LOW',
    color: '#00e676',
    accidents: 6,
    severe: 0,
    avgResponse: '3.9 min',
    peakTime: '3 PM – 5 PM',
    commonCause: 'Minor Fender Benders',
    lat: 17.4520,
    lng: 78.4680
  }
];

export const FALSE_ALARM_SCENARIOS = [
  {
    id: 'hard-braking',
    title: 'Sudden Emergency Braking',
    subtitle: '70 km/h to 0 km/h on highway',
    accelPeak: '0.88 g',
    gyroPeak: '4.2 °/s',
    impactAngle: '0° (Pure Linear Deceleration)',
    mlProbability: '12.4%',
    classification: 'NO ACCIDENT (Normal Safety Maneuver)',
    isAccident: false,
    explanation: 'High deceleration without lateral angular tilt or high-frequency impact shockwaves.'
  },
  {
    id: 'speed-bump',
    title: 'Severe Speed Bump at 45 km/h',
    subtitle: 'Vertical Z-axis shock without yaw change',
    accelPeak: '1.45 g (Z-axis only)',
    gyroPeak: '7.1 °/s',
    impactAngle: 'Vertical Dip < 5°',
    mlProbability: '18.1%',
    classification: 'NO ACCIDENT (Road Anomaly / Bump)',
    isAccident: false,
    explanation: 'Sensor fusion isolates Z-axis bounce; absence of sustained roll or lateral kinetic loss.'
  },
  {
    id: 'pothole',
    title: 'Deep Pothole Impact',
    subtitle: 'High frequency transient vibration',
    accelPeak: '1.82 g (Transient spike 15ms)',
    gyroPeak: '9.8 °/s',
    impactAngle: '0°',
    mlProbability: '21.5%',
    classification: 'NO ACCIDENT (Transient Pothole Shock)',
    isAccident: false,
    explanation: 'Shock duration is under 25ms threshold; ML frequency filter rejects road roughness.'
  },
  {
    id: 'sudden-turn',
    title: 'High-Speed Evasive Turn',
    subtitle: 'Sharp steering wheel swerve',
    accelPeak: '0.72 g',
    gyroPeak: '28.5 °/s (Z-yaw rotation)',
    impactAngle: 'Yaw only',
    mlProbability: '15.9%',
    classification: 'NO ACCIDENT (Controlled Evasive Swerve)',
    isAccident: false,
    explanation: 'Vehicle maintains kinetic momentum without abrupt deceleration spike.'
  },
  {
    id: 'real-crash',
    title: 'Multi-Axis Vehicle Collision / Rollover',
    subtitle: 'High G impact with sudden velocity stop & roll',
    accelPeak: '9.20 g (Tri-axial shockwave)',
    gyroPeak: '185.0 °/s (Angular rollover)',
    impactAngle: '45° Oblique Rollover',
    mlProbability: '98.9%',
    classification: 'CRITICAL ACCIDENT (Automatic CAD Dispatch)',
    isAccident: true,
    explanation: 'Sensor fusion confirms simultaneous G-force spike, rapid velocity null, and extreme roll angle.'
  }
];

export const IOT_DEVICES = [
  {
    name: 'ESP32 DevKit V1 (Main MCU)',
    status: 'ONLINE',
    role: 'Sensor Fusion & Edge ML Inference',
    chipset: 'Dual-core Xtensa 32-bit LX6 @ 240MHz',
    latency: '8.2 ms',
    samplingRate: '100 Hz Continuous',
    signal: 'Excellent (-48 dBm)',
    uptime: '48h 12m',
    icon: 'Cpu'
  },
  {
    name: 'MPU6050 6-DoF IMU Sensor',
    status: 'ONLINE',
    role: 'Tri-axial Accelerometer + Gyroscope',
    chipset: 'I2C Interface (0x68) @ 400kHz',
    latency: '2.1 ms',
    samplingRate: '200 Hz High-Speed Buffering',
    signal: '100% Calibrated (Zero Drift)',
    uptime: 'Continuous',
    icon: 'Activity'
  },
  {
    name: 'NEO-6M GPS Satellite Receiver',
    status: 'ACTIVE',
    role: 'Latitude, Longitude, Altitude & Speed',
    chipset: 'U-Blox NEO-6M High-Sensitivity Engine',
    latency: '1 Hz NMEA-0183 ($GPRMC)',
    samplingRate: 'Accuracy ~2.5m CEP',
    signal: 'Locked (11 Satellites in View)',
    uptime: 'Hot Fix (0.8s update)',
    icon: 'MapPin'
  },
  {
    name: 'SIM800L Quad-Band GSM/GPRS',
    status: 'CONNECTED',
    role: 'Emergency SMS & Cloud Telemetry Stream',
    chipset: 'SIMCom 800L 850/900/1800/1900MHz',
    latency: '85 ms AT Command Response',
    samplingRate: 'CSQ: 28/31 (Strong Cell Tower Link)',
    signal: '4G/2G Hybrid Carrier Active',
    uptime: 'Registered',
    icon: 'Radio'
  },
  {
    name: 'Li-ion Smart Battery Management (BMS)',
    status: 'ONLINE',
    role: 'Independent Backup Power Unit',
    chipset: 'TP4056 BMS with Step-up Booster',
    latency: 'Voltage: 4.12V / 3.7V Nominal',
    samplingRate: 'Current Draw: 180 mA Active',
    signal: 'Capacity: 87% Remaining (16 hrs backup)',
    uptime: 'Optimal Thermal 28°C',
    icon: 'BatteryCharging'
  }
];

export const VICTIM_PROFILE = {
  fullName: 'John Doe / Demo Subject',
  age: 28,
  gender: 'Male',
  bloodGroup: 'O+ Positive',
  allergies: 'Penicillin, Sulfa drugs',
  chronicConditions: 'None reported',
  emergencyMedicalNotes: 'Donor Registered; Wearer of corrective contact lenses.',
  vehicleModel: '2025 Smart Sedan EV',
  vehicleNumber: 'TS09AB1234',
  chassisNo: 'ME4TS09AB12349021',
  insuranceProvider: 'Star Health & Allied Motor Comprehensive',
  policyNumber: 'POL-90821-TS-2026',
  primaryContact: 'Priya Sharma (Spouse) - +91 98765 43210'
};
