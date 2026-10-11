# 🚗 Smart Accident Detection & Emergency Alert System
### *Real-Time Vehicle Accident Detection Using IoT & Machine Learning*

A next-generation, high-performance web simulation and emergency-response command center built for demonstrating IoT-enabled vehicular safety, MPU6050 sensor fusion, edge ML crash classification, and automated computer-aided dispatch (CAD).

---

## 🌟 Key Features

1. **Futuristic Emergency Command Center:**
   - Dark modern dashboard with glassmorphic telemetry cards, pulse indicators, and cyber grids.
   - Real-time hardware status indicators: ESP32 (Online), MPU6050 (200Hz), GPS (11 Sats), GSM/4G (CSQ 28), Firebase Cloud (Sync), Battery (87%).

2. **Full End-to-End Accident Simulation Engine:**
   - 4 Interactive Crash Scenarios:
     - 🟢 **Normal Highway Driving:** 1.02g steady acceleration, nominal IMU noise.
     - 🟡 **Minor Impact:** 2.32g shockwave, warning advisory.
     - 🟠 **Moderate Collision:** 5.22g deceleration, rollover prep.
     - 🔴 **Severe Crash:** 8.84g tri-axial impact, sudden velocity null to 0 km/h, 168°/s angular rotation, emergency protocol activation.
   - 10-Stage Automated Pipeline: `MONITORING` ➔ `IMPACT DETECTED` ➔ `SENSOR FUSION` ➔ `AI CLASSIFICATION` ➔ `SEVERITY ASSESSMENT` ➔ `GPS LOCK` ➔ `GSM ALERT` ➔ `VICTIM CONFIRMATION` ➔ `CAD DISPATCH` ➔ `CLOUD SYNC`.

3. **Edge AI & Machine Learning Prediction:**
   - 1D-CNN and Random Forest sensor fusion classifier.
   - Confidence score circular gauge (98.2%), 84ms detection latency, Explainable AI (XAI) decision rationale.
   - Training target benchmark specification: **10,000+ crash scenarios**.

4. **Two-Way Victim Voice Confirmation:**
   - Automated Web Speech voice prompt (*"Are you safe?"*).
   - 10-second countdown with **🟢 I'M SAFE** (cancels CAD dispatch) and **🔴 NEED HELP** (immediate emergency unit dispatch).

5. **Interactive Live GPS Satellite Map (Leaflet):**
   - Live vehicle tracking at `17.3850° N, 78.4867° E`.
   - Nearest 108 Ambulance vector routing (2.4 km / ETA 4 min).
   - Nearest Level-1 Trauma Hospital routing (3.1 km / ETA 6 min).
   - State Police CAD unit routing (1.8 km / ETA 3 min).

6. **Trauma Hospital Network & ICU Beds:**
   - Real-time ICU availability, emergency bed counters, and one-click CAD patient data handover to receiving medical teams.

7. **False Positive & Road Anomaly Rejector:**
   - Interactive testing comparing **Hard Braking, Speed Bumps, Potholes, and Evasive Swerves** against real crashes with 99.1% non-crash immunity.

8. **Road Safety Risk Heatmap:**
   - Hotspot density analysis for urban corridors (Outer Ring Road, Gachibowli, Jubilee Hills, Secunderabad) with municipal safety recommendations.

9. **Companion Smartphone Mobile App Preview:**
   - Realistic mobile mockup with high-priority **🚨 SOS BUTTON**, BLE pairing, and live alerts feed.

10. **Printable & Exportable Incident Investigation Report:**
    - Formal investigation document generator with formatted timestamps, MPU6050 peak metrics, CAD audit trail, and `.txt` / print export.

---

## 🛠️ Hardware & Architecture Topology

```
[MPU6050 6-DoF IMU] ──(I2C 200Hz)──► [ESP32 DevKit Dual-Core 240MHz]
                                              │
                     ┌────────────────────────┴────────────────────────┐
                     ▼                                                 ▼
          [Sensor Fusion Preprocessing]                     [U-Blox NEO-6M GPS]
                     │                                                 │
                     ▼                                                 ▼
          [1D-CNN + RF ML Classifier]                      [SIM800L GSM / 4G CAD]
                     │                                                 │
                     └────────────────────────┬────────────────────────┘
                                              ▼
                    [108 Ambulance / Police 112 / Trauma Hospital]
                                              │
                                              ▼
                            [Firebase Realtime DB & Firestore]
                                              │
                                              ▼
                           [Command Dashboard & Analytics Platform]
```

---

## 🚀 Running the Project Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:5173/
   ```

---

## 🎓 Viva & Presentation Quick Demonstration

- Click **`RUN AUTO DEMO`** on the top header bar to trigger the multi-stage scenario for classroom / viva presentations.
- Toggle sound effects and voice synthesis using the top action buttons.
- Access the **`Project Landing Page`** or navigate to any of the 20+ specialized command modules via the sidebar.
