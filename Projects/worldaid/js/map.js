/**
 * WORLDAID — INTERACTIVE GEOSPATIAL INTELLIGENCE MATRIX (map.js)
 * Features 3 authentic planetary perspectives:
 * 1. Satellite Earth (ESRI Photorealistic Orbital Imagery)
 * 2. Vibrant Atlas (National Geographic Physical & Political Atlas)
 * 3. Earth at Night (Dual-layer composited: nocturnal Earth physical structure with visible continents & mountain relief + glittering NASA VIIRS city lights)
 * 
 * Includes humanitarian triage pins: 🔴 Critical Priority, 🟠 Special Attention, 🟢 Coordination Hubs.
 */

window.WorldAidMap = (function () {
  'use strict';

  let mapInstance = null;
  let currentTileLayer = null;
  let nightOverlayLayer = null;
  let markersLayer = null;
  let currentTheme = 'satellite';
  let selectCityCallback = null;

  // 3 Pristine, 100% CORS-clean Map Providers
  const tileProviders = {
    satellite: {
      name: 'Satellite Earth',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: {
        maxZoom: 18,
        attribution: 'ESRI World Imagery &copy; Earthstar Geographics'
      },
      cssFilter: 'saturate(130%) contrast(110%) brightness(100%)',
      fallbackUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    voyager: {
      name: 'Vibrant Atlas',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
      options: {
        maxZoom: 16,
        maxNativeZoom: 12,
        attribution: 'National Geographic &copy; Esri &mdash; DeLorme, NAVTEQ, USGS'
      },
      cssFilter: 'saturate(140%) contrast(106%) brightness(102%)',
      fallbackUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    night: {
      name: 'Earth at Night',
      // Base: Earth's physical geography in deep nocturnal navy moonlight
      baseMapUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      baseMapOptions: {
        maxZoom: 18,
        attribution: 'Base: ESRI Satellite | Lights: NASA Earth Observatory'
      },
      baseCssFilter: 'brightness(34%) contrast(150%) hue-rotate(205deg) saturate(180%)',
      // Overlay: Real glittering NASA VIIRS city lights
      lightsUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_CityLights_2012/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg',
      lightsFallbackUrl: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg'
    }
  };

  // Humanitarian Priority Stations & Operational Hubs
  const humanitarianLocations = [
    // Coordination Hubs (Green)
    { name: 'Nairobi', country: 'Kenya', lat: -1.2921, lon: 36.8219, tier: 'green', desc: 'East African Logistics Gateway & UNON Hub', temp: '24°C', pop: '54M' },
    { name: 'Geneva', country: 'Switzerland', lat: 46.2044, lon: 6.1432, tier: 'green', desc: 'International Humanitarian Secretariat & ICRC HQ', temp: '16°C', pop: '8.8M' },
    { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060, tier: 'green', desc: 'United Nations World Headquarters & OCHA Directorate', temp: '22°C', pop: '335M' },
    { name: 'New Delhi', country: 'India', lat: 28.6139, lon: 77.2090, tier: 'green', desc: 'South Asian Disaster Management & Logistics Hub', temp: '32°C', pop: '1.4B' },
    { name: 'Tokyo', country: 'Japan', lat: 35.6895, lon: 139.6917, tier: 'green', desc: 'Asia-Pacific Early Warning & Disaster Resilience Center', temp: '22°C', pop: '125M' },
    { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, tier: 'green', desc: 'DEC & International Relief Procurement Meridian', temp: '15°C', pop: '67M' },

    // Critical Priority (Red)
    { name: 'Port-au-Prince', country: 'Haiti', lat: 18.5944, lon: -72.3074, tier: 'red', desc: 'Critical Urban Healthcare & Hurricane Flood Risk', temp: '29°C', pop: '11.6M' },
    { name: 'Goma', country: 'DR Congo', lat: -1.6792, lon: 29.2228, tier: 'red', desc: 'Emergency Displacement & Nutrition Corridor', temp: '21°C', pop: '100M' },
    { name: 'Damascus', country: 'Syria', lat: 33.5138, lon: 36.2765, tier: 'red', desc: 'Complex Emergency Water Infrastructure Oversight', temp: '28°C', pop: '22M' },
    { name: 'Sana\'a', country: 'Yemen', lat: 15.3694, lon: 44.1910, tier: 'red', desc: 'Urgent Malnutrition & Food Security Pipeline', temp: '26°C', pop: '33M' },

    // Special Attention (Amber)
    { name: 'Kyiv', country: 'Ukraine', lat: 50.4501, lon: 30.5234, tier: 'amber', desc: 'Civilian Winterization & Heating Infrastructure Care', temp: '11°C', pop: '38M' },
    { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lon: 90.4125, tier: 'amber', desc: 'Delta Flood Mitigation & Refugee WASH Network', temp: '30°C', pop: '170M' },
    { name: 'Manila', country: 'Philippines', lat: 14.5995, lon: 120.9842, tier: 'amber', desc: 'Typhoon Preparedness & Coastal Evacuation Network', temp: '29°C', pop: '115M' },
    { name: 'Lima', country: 'Peru', lat: -12.0464, lon: -77.0428, tier: 'amber', desc: 'Andean Mountain Water Logistics & Seismic Readiness', temp: '19°C', pop: '34M' },
    { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lon: 28.9784, tier: 'amber', desc: 'Eurasian Cross-Continental Disaster Supply Depot', temp: '21°C', pop: '85M' }
  ];

  /**
   * Build Custom Triage Pulsing Marker Icons
   */
  const createTriageIcon = (tier, isNight = false) => {
    let colorPrimary = '#10B981'; // green
    let colorGlow = 'rgba(16, 185, 129, 0.9)';
    let colorRing = '#34D399';

    if (tier === 'red') {
      colorPrimary = '#EF4444';
      colorGlow = 'rgba(239, 68, 68, 0.95)';
      colorRing = '#F87171';
    } else if (tier === 'amber') {
      colorPrimary = '#F59E0B';
      colorGlow = 'rgba(245, 158, 11, 0.95)';
      colorRing = '#FBBF24';
    }

    if (isNight) {
      colorGlow = '0 0 16px rgba(245, 158, 11, 0.95), 0 0 24px rgba(251, 191, 36, 0.6)';
    }

    return L.divIcon({
      className: 'humanitarian-triage-marker',
      html: `
        <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${colorRing}; opacity: 0.65; animation: pulseBeacon 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: 16px; height: 16px; border-radius: 50%; background: ${colorPrimary}; border: 2.5px solid #FFFFFF; box-shadow: ${colorGlow};"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18]
    });
  };

  /**
   * Render or Re-render Humanitarian Markers
   */
  function renderMarkers(isNight = false) {
    if (!markersLayer) return;
    markersLayer.clearLayers();

    humanitarianLocations.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lon], {
        icon: createTriageIcon(loc.tier, isNight)
      });

      let statusBadge = '<span class="status-green">🟢 COORDINATION HUB</span>';
      if (loc.tier === 'red') statusBadge = '<span class="status-red">🔴 CRITICAL PRIORITY</span>';
      if (loc.tier === 'amber') statusBadge = '<span class="status-amber">🟠 SPECIAL ATTENTION</span>';

      const popupContent = `
        <div class="map-custom-popup-content">
          <div style="margin-bottom: 6px;">${statusBadge}</div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <span class="map-popup-title">${loc.name}</span>
            <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-sky-blue); font-weight: bold;">${loc.temp}</span>
          </div>
          <div style="font-size: 0.82rem; color: #CBD5E1; margin-bottom: 4px;">${loc.country} • Pop: ${loc.pop}</div>
          <div style="font-size: 0.78rem; color: #94A3B8; margin-bottom: 10px; line-height: 1.35;">${loc.desc}</div>
          <button class="map-popup-sync-btn" data-city="${loc.name}">Coordinate Response →</button>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.addTo(markersLayer);
    });
  }

  /**
   * Initialize Leaflet World Map
   */
  function init(onCitySelected) {
    selectCityCallback = onCitySelected;
    const mapEl = document.getElementById('worldAidLeafletMap');
    if (!mapEl || typeof L === 'undefined') {
      console.warn("Leaflet container missing or library not loaded.");
      return;
    }

    try {
      mapInstance = L.map('worldAidLeafletMap', {
        center: [15, 25],
        zoom: 2.3,
        minZoom: 2,
        maxZoom: 16,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(mapInstance);

      // Create markers layer
      markersLayer = L.layerGroup().addTo(mapInstance);
      renderMarkers(false);

      // Default to Satellite Earth
      setMapTheme('satellite');

      // Popup synchronization button delegation
      mapInstance.on('popupopen', () => {
        const btns = document.querySelectorAll('.map-popup-sync-btn');
        btns.forEach(btn => {
          btn.onclick = () => {
            const cityName = btn.getAttribute('data-city');
            if (selectCityCallback) selectCityCallback(cityName);
            mapInstance.closePopup();
          };
        });
      });

      // Bind theme buttons
      setupThemeSwitcher();

    } catch (e) {
      console.warn("Leaflet map initialization error:", e);
    }
  }

  /**
   * Set Active Map Theme
   */
  function setMapTheme(themeKey) {
    if (!mapInstance || !tileProviders[themeKey]) return;

    currentTheme = themeKey;
    const provider = tileProviders[themeKey];

    // Remove existing base layer
    if (currentTileLayer) {
      mapInstance.removeLayer(currentTileLayer);
      currentTileLayer = null;
    }

    // Handle Earth at Night (Dual-Layer Compositing with Visible Earth Structure)
    if (themeKey === 'night') {
      // 1. Base Layer: Satellite Earth graded to deep nocturnal navy moonlight
      currentTileLayer = L.tileLayer(provider.baseMapUrl, provider.baseMapOptions).addTo(mapInstance);

      const tilePane = mapInstance.getPane('tilePane');
      if (tilePane) {
        tilePane.style.filter = provider.baseCssFilter || 'none';
        tilePane.style.webkitFilter = provider.baseCssFilter || 'none';
        tilePane.style.transition = 'filter 0.4s ease';
      }

      // 2. Dedicated pane for glittering NASA city lights
      if (!mapInstance.getPane('nightLightsPane')) {
        const p = mapInstance.createPane('nightLightsPane');
        p.style.zIndex = 220; // Above tilePane (200), below markers (600)
        p.style.mixBlendMode = 'screen';
        p.style.pointerEvents = 'none';
      }

      // 3. Add NASA City Lights overlay
      if (!nightOverlayLayer) {
        nightOverlayLayer = L.tileLayer(provider.lightsUrl, {
          pane: 'nightLightsPane',
          maxZoom: 16,
          maxNativeZoom: 8,
          attribution: 'NASA Earth Observatory / NOAA NGDC'
        });

        nightOverlayLayer.on('tileerror', function (error) {
          if (error.tile && !error.tile.getAttribute('data-fallback-tried')) {
            error.tile.setAttribute('data-fallback-tried', 'true');
            const z = Math.min(error.coords.z, 8);
            const x = error.coords.x;
            const y = error.coords.y;
            error.tile.src = `${provider.lightsFallbackUrl}`
              .replace('{z}', z)
              .replace('{x}', x)
              .replace('{y}', y);
          }
        });

        nightOverlayLayer.addTo(mapInstance);
      }
    } else {
      // Daytime themes (satellite or voyager)
      if (nightOverlayLayer) {
        mapInstance.removeLayer(nightOverlayLayer);
        nightOverlayLayer = null;
      }

      currentTileLayer = L.tileLayer(provider.url, provider.options);

      if (provider.fallbackUrl) {
        currentTileLayer.on('tileerror', function (error) {
          if (error.tile && !error.tile.getAttribute('data-fallback-tried')) {
            error.tile.setAttribute('data-fallback-tried', 'true');
            const maxZ = provider.options.maxNativeZoom || 18;
            const z = Math.min(error.coords.z, maxZ);
            const x = error.coords.x;
            const y = error.coords.y;
            error.tile.src = provider.fallbackUrl
              .replace('{z}', z)
              .replace('{x}', x)
              .replace('{y}', y);
          }
        });
      }

      currentTileLayer.addTo(mapInstance);

      const tilePane = mapInstance.getPane('tilePane');
      if (tilePane) {
        tilePane.style.filter = provider.cssFilter || 'none';
        tilePane.style.webkitFilter = provider.cssFilter || 'none';
        tilePane.style.transition = 'filter 0.4s ease';
      }
    }

    // Re-render markers with night golden styling if night mode
    renderMarkers(themeKey === 'night');

    // Update active button state in UI
    const themeBtns = document.querySelectorAll('.map-theme-pill');
    themeBtns.forEach(btn => {
      if (btn.getAttribute('data-theme') === themeKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * Setup Theme Switcher Buttons
   */
  function setupThemeSwitcher() {
    const themeBtns = document.querySelectorAll('.map-theme-pill');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        setMapTheme(theme);
      });
    });
  }

  /**
   * Smoothly Fly Map Viewport to Coordinates
   */
  function flyToLocation(lat, lon, zoom = 5) {
    if (mapInstance && typeof lat === 'number' && typeof lon === 'number') {
      mapInstance.flyTo([lat, lon], zoom, {
        duration: 1.8,
        easeLinearity: 0.25
      });
    }
  }

  return {
    init,
    setMapTheme,
    flyToLocation
  };

})();
