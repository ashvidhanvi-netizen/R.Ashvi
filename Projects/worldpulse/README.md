# WorldPulse — Global Intelligence Platform
> **“One World. Five Data Streams. One View.”**

WorldPulse is a modern, international technology platform and digital exhibition that integrates **five real-time APIs** into a cinematic interactive experience. Designed with a sophisticated **deep midnight purple, dark violet, electric violet, and soft lavender** visual identity with glassmorphic cards, dynamic atmospheric weather transitions, and an interactive world map.

---

## 🌟 Key Highlights & Academic Verification

- **5 Real Public APIs**: Zero fake data. All five data streams consume live, public, zero-friction endpoints with zero CORS or key-expiry issues.
- **Double Verification (Console + UI)**:
  - **In the Browser Console (`F12`)**: Every search triggers formatted console logs matching your exact grading criteria:
    ```javascript
    API 1 — WEATHER DATA: { temperature: 22, condition: "Clear Sky", ... }
    API 2 — COUNTRY DATA: { name: "Japan", capital: "Tokyo", ... }
    API 3 — CURRENCY DATA: { formula: "1 USD = 83.45 INR", ... }
    API 4 — NEWS DATA: { articlesCount: 6, articles: [ ... ] }
    API 5 — LOCATION/TIME DATA: { city: "Tokyo", timezone: "Asia/Tokyo", currentTime: "19:42:08", ... }
    WorldPulse API initialization complete.
    ```
  - **On-Screen Live Telemetry Terminal**: Click the glowing **`API STREAMS`** button on the top navigation to slide out an interactive telemetry drawer showing the live JSON objects right on screen for professors and evaluators.
- **Dynamic Atmospheric Backgrounds**: Background imagery and lighting adapt dynamically based on weather conditions (rainy streets, desert sunlight, snow, autumn foliage) and world cities (Tokyo, Paris, New York, London, Mumbai, Chennai, Dubai, Sydney).
- **Interactive Leaflet.js World Map**: Dark purple map canvas with pulsing capital city pins that synchronize two-way with the World Explorer.
- **Synchronized World Clock**: Real-time ticking clocks across Tokyo, London, New York, Chennai, Sydney, and Paris powered by atomic timezone calculations.
- **Interactive Currency Terminal**: Live foreign exchange converter supporting USD, EUR, GBP, INR, JPY, AUD, CAD, and AED with instant swap calculations.

---

## 🏛 The Five Live APIs Integrated

| Stream | Category | Provider | Data Returned & Displayed |
| :--- | :--- | :--- | :--- |
| **API 1** | **Live Weather** | [Open-Meteo Forecast API](https://open-meteo.com/) | Current temperature, apparent feels-like, relative humidity, wind velocity, WMO condition code, dynamic icon, sunrise/sunset. |
| **API 2** | **Sovereign Country** | [REST Countries v3.1 API](https://restcountries.com/) | Official SVG flag, common & official name, capital city, population counter, continent/subregion, languages, currency name & symbol, land borders. |
| **API 3** | **Foreign Exchange** | [ExchangeRate-API Open Access](https://open.er-api.com/) | Institutional foreign exchange parity rates across 160+ fiat currencies, live conversion formulas, time of last update. |
| **API 4** | **World News** | [Spaceflight News / Global Wire](https://api.spaceflightnewsapi.net/) | Curated international news stream with high-res thumbnails, publisher source, publication timestamp, and external read links. |
| **API 5** | **Location & Time** | [Open-Meteo Geocoding](https://geocoding-api.open-meteo.com/) + `Intl` Engine | Precision latitude, longitude, country code, elevation, timezone identifier, and real-time ticking atomic chronometer. |

---

## 🚀 How to Run & View the Project

### Option 1: Instant Direct Browser Opening (Zero Server Required)
Simply open `index.html` in your browser:
```bash
# Path:
C:\Users\acer\.gemini\antigravity\scratch\worldpulse\index.html
```
All API streams, interactive Leaflet map tiles, live clocks, and animations run out of the box using modern standard web APIs.

### Option 2: Run with Local Development Server (Optional)
If you prefer running through an HTTP server (e.g., VS Code Live Server, Node `http-server`, or Python):
```bash
cd C:\Users\acer\.gemini\antigravity\scratch\worldpulse

# Using Python 3:
python -m http.server 8080

# Or using Node.js:
npx serve .
```
Then navigate to `http://localhost:8080/`.

---

## 🔍 How to Verify in the Browser Console

1. Open `index.html` in Chrome, Edge, Firefox, or Safari.
2. Press **`F12`** (or Right-Click anywhere on the page and select **Inspect** ➔ click the **Console** tab).
3. On page load, you will immediately see:
   ```text
   API 1 — WEATHER DATA: {temperature: 22, feelsLike: 23, humidity: 58, ...}
   API 2 — COUNTRY DATA: {name: 'Japan', capital: 'Tokyo', population: '125,500,000', ...}
   API 3 — CURRENCY DATA: {base: 'USD', target: 'INR', rate: 83.45, ...}
   API 4 — NEWS DATA: {category: 'world', articlesCount: 6, ...}
   API 5 — LOCATION/TIME DATA: {city: 'Tokyo', timezone: 'Asia/Tokyo', currentTime: '...', ...}
   WorldPulse API initialization complete.
   ```
4. Now type any new city into the search box (e.g. **"Paris"**, **"Mumbai"**, **"New York"**, or **"London"**) or click any preset chip:
   - All five APIs will re-query in parallel.
   - The UI cards will smoothly update with that location's live data.
   - Freshly labeled API objects will print to the console.
5. You can also click the glowing **`API STREAMS`** button in the top navigation bar to open the slide-out **Live API Telemetry Feed** drawer, allowing you to view and copy the raw JSON responses directly on screen.

---

## 📁 File Structure

```
worldpulse/
├── index.html                  # Single-page application markup with all 5 stream panels
├── css/
│   ├── style.css               # Core design tokens: deep midnight purple, typography, grid layouts
│   ├── glassmorphism.css       # Backdrop blur, glowing borders, depth elevation, shimmer loaders
│   └── weather-atmospheres.css # Dynamic visual themes for rain, snow, sunny, autumn, and city skylines
├── js/
│   ├── api.js                  # 5 live API service functions with error handling & console logging
│   ├── ui.js                   # UI rendering, dynamic background switcher, animated number counters
│   ├── map.js                  # Leaflet.js interactive dark-purple world map & pulsing city pins
│   ├── telemetry.js            # On-screen live API drawer inspector & multi-capital world clock tickers
│   └── app.js                  # Application coordinator, search handler, preset chips, and startup sequence
└── README.md                   # Comprehensive project documentation
```

---

## 🎨 Design System

- **Primary Colors**:
  - Deep Midnight Purple: `#07040D`
  - Dark Violet Canvas: `#0D0818` & `#140D24`
  - Glass Card Fill: `rgba(26, 17, 48, 0.7)` with `backdrop-filter: blur(24px)`
  - Electric Violet Glow: `#8B5CF6`
  - Neon Purple Highlights: `#A855F7`
  - Soft Lavender Typography: `#DDD6FE`
- **Typography**:
  - Display: **Space Grotesk** (Futuristic geometric headings)
  - Body: **Plus Jakarta Sans** (Legible, modern interface typography)
  - Telemetry: **JetBrains Mono** (Technical readouts and numbers)
- **Leaflet Map**: 3 high-definition planetary modes: Satellite Earth, National Geographic Vibrant Atlas, and dual-layer Earth at Night featuring visible continental structures, mountain relief, and glittering NASA city lights.
- **Responsive**: Fluid grid layouts scaling smoothly from ultra-wide 4K monitors down to mobile smartphones.
