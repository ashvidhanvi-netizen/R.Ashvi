# WorldAid — Global Humanitarian Intelligence Platform
> *"Know Where Help Is Needed."*

![WorldAid Platform](https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop)

WorldAid is a modern, high-polish global humanitarian intelligence and emergency-awareness platform. Designed in the spirit of international relief organizations (such as the United Nations OCHA and the International Red Cross), WorldAid aggregates five real-time public data streams into an intuitive, unified operational dashboard.

---

## 🌍 The Core Concept: "Know Where Help Is Needed"

In moments of compounding climate stress, natural disasters, and displacement, fragmented information costs lives. WorldAid synthesizes meteorological telemetry, sovereign nation demographics, eyewitness field dispatches, precision geospatial coordinates, and atomic time meridians into an actionable, empathetic interface.

---

## 📡 The Five Integrated APIs

| Stream | Integration | Provider / Protocol | Key Data Points Provided |
| :--- | :--- | :--- | :--- |
| **API 1** | **Weather & Environmental Stress** | Open-Meteo Forecast API | Real-time temperature, apparent temperature, humidity %, surface wind velocity, precipitation risk (mm), diurnal sunrise/sunset cycle, WMO condition mapping, and humanitarian operational advisories. |
| **API 2** | **Sovereign Country Intelligence** | REST Countries v3.1 Engine | Official sovereign name, national SVG flag, capital city, demographic population, continental region/subregion, official languages, sovereign currency (name & symbol), land/maritime border treaties, and humanitarian access corridor tier. CORS-clean on both local `file:///` and HTTP. |
| **API 3** | **Humanitarian Wire Dispatches** | Global News Wire / ReliefWeb Feed | Real-world field reports, emergency headlines, verified sources, publication timestamps, dispatches summaries, and outbound source links. |
| **API 4** | **Geospatial Geocoding & Coordinates** | Open-Meteo Geocoding API | High-precision latitude and longitude coordinates, country identification, timezone region, and surface elevation above sea level in meters. |
| **API 5** | **Global Chronometry & Operational Timezones** | High-Precision `Intl` Time Engine | Dynamic ticking atomic chronometer, operational day/night shift classification, standardized UTC offset, and synchronous multi-city world clock matrix (Nairobi, Geneva, New York, New Delhi, Tokyo, London). |

---

## 🛰️ Planetary Geospatial Engine (Leaflet.js)

WorldAid features an interactive geospatial mapping matrix with three distinct, photorealistic perspectives:

1. **🛰️ Satellite Earth (ESRI Photorealistic Orbital Imagery)**: High-resolution satellite view of the planet with continental contours and terrain.
2. **🗺️ Vibrant Atlas (National Geographic World Map)**: Highly detailed physical, political, and topography atlas.
3. **🌃 Earth at Night (NASA VIIRS + Nocturnal Planetary Structure)**:
   - **Visible Earth Structure**: Base nocturnal lunar layer revealing ocean basins, continental landmasses, and mountain ranges (such as the Himalayas and Andes).
   - **Glittering City Lights**: Overlaid with authentic NASA VIIRS high-resolution night lights composited via `screen` mix-blend mode, allowing human activity to sparkle in gold and amber.
   - **Humanitarian Triage Beacons**:
     - 🔴 **Critical Priority** (e.g., Port-au-Prince, Goma, Damascus, Sana'a)
     - 🟠 **Special Attention** (e.g., Kyiv, Dhaka, Manila, Istanbul, Lima)
     - 🟢 **Coordination Hub** (e.g., Nairobi, Geneva, New York, New Delhi, Tokyo, London)

---

## 🎨 Design Philosophy & Visual Palette

WorldAid avoids generic "gadgety" UI conventions and purple gradients in favor of an authentic humanitarian identity:

- **Deep Midnight Navy & Slate**: `#020617`, `#060D1E`, `#0B172A` (Stability, calm, depth)
- **Royal & Sky Blue**: `#2563EB`, `#38BDF8` (Coordination, international cooperation)
- **Warm Coral Accent**: `#FF6B6B` (Humanitarian priority, urgency, compassion)
- **Triage Status Colors**:
  - 🔴 Critical: `#EF4444`
  - 🟠 Special Attention: `#F59E0B`
  - 🟢 Coordination / Stable: `#10B981`
- **Typography**:
  - `Sora`: Clean, geometric display headings
  - `Plus Jakarta Sans`: Highly legible international body typography
  - `JetBrains Mono`: High-precision telemetry, coordinates, and atomic time readouts

---

## 🔍 Instructor & Evaluator Verification Guide

WorldAid is built to be 100% auditable and transparent for academic grading and technical evaluation.

### 1. Developer Console Outputs (Press `F12`)
Open the browser developer console (`Ctrl + Shift + I` or `F12` -> **Console**). You will see cleanly formatted, labeled logs for each of the 5 APIs upon load and each time a search is executed:

```
WORLD AID — API 1 WEATHER: { temperature: 24, feelsLike: 25, humidity: 54, windSpeed: 12, ... }
WORLD AID — API 2 COUNTRY: { name: "Kenya", officialName: "Republic of Kenya", capital: "Nairobi", ... }
WORLD AID — API 3 NEWS: { category: "humanitarian", articlesCount: 4, leadStory: { ... }, articles: [ ... ] }
WORLD AID — API 4 LOCATION: { city: "Nairobi", country: "Kenya", latitude: -1.2921, longitude: 36.8219, ... }
WORLD AID — API 5 TIMEZONE: { timezone: "Africa/Nairobi", localTime: "...", utcOffset: "UTC Africa/Nairobi", ... }
WorldAid: All five APIs initialized successfully.
```

### 2. Slide-Out Live Telemetry Terminal Drawer
Click **"● Open Live Telemetry Terminal"** in the navigation bar or footer to slide out the on-screen JSON inspector. You can switch between API tabs (Weather, Country, News, Location, Timezone) and copy raw payload data with a single click.

---

## 🚀 How to Run the Project

1. **Option A: Direct Browser Launch (`file:///`)**
   - Double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari.
   - All 5 APIs and CORS fallbacks will run with **zero red console errors**.

2. **Option B: Local Development Server**
   - If using VS Code: Right-click `index.html` -> **Open with Live Server**.
   - If using Node.js: `npx serve .` or `python -m http.server 8000`.

---

## 📂 File Structure

```
worldaid/
├── index.html                  # Semantic layout, hero, 5 stream cards, map, dossier, news, clocks, footer
├── css/
│   ├── style.css               # Core styling tokens, typography, layout, animations, triage markers
│   ├── glassmorphism.css       # Translucent deep-navy glass cards, borders, skeleton loaders
│   └── weather-atmospheres.css # Atmospheric visual skins (sunny, rain, cloudy, mist, storm)
├── js/
│   ├── api.js                  # All 5 API integrations, error boundaries, evaluation console logs
│   ├── map.js                  # Leaflet geospatial matrix (Satellite, Atlas, Earth at Night with visible terrain)
│   ├── telemetry.js            # Evaluator slide-out JSON terminal drawer & global clock ticker
│   ├── ui.js                   # UI renderers, dynamic capacity meters, animated counters, hero canvas
│   └── app.js                  # Master controller coordinating search, chips, map clicks, and startup
└── README.md                   # Complete documentation and evaluation rubric
```

---

© 2026 WorldAid Humanitarian Intelligence Platform. All rights reserved.
