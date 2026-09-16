/**
 * WORLDPULSE — INTERACTIVE GLOBAL DATA MAP (map.js)
 * High-definition geospatial matrix featuring 3 authentic, pristine planetary perspectives:
 * 1. Satellite Earth (Photorealistic daytime blue oceans, green continents & coral coasts)
 * 2. Vibrant Atlas (National Geographic physical & political world atlas with colorful borders)
 * 3. Earth at Night (Nocturnal Earth with visible continental structures & glittering NASA city lights)
 * 
 * Note: Earth at Night combines a nocturnal physical Earth base (showing oceans, coastlines, and mountain relief)
 * with a high-resolution NASA VIIRS City Lights overlay blended via screen mix-mode, matching NASA's Blue Marble.
 */

window.WorldPulseMap = (function () {
  'use strict';

  let mapInstance = null;
  let currentTileLayer = null;
  let nightOverlayLayer = null;
  let markersLayer = null;
  let currentTheme = 'satellite';
  let selectCityCallback = null;

  // Authentic, highly reliable tile providers (100% CORS-friendly, zero key required)
  const tileProviders = {
    // 1. Satellite Earth: Real photorealistic blue oceans & green continents
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
    // 2. Vibrant Atlas: Authentic National Geographic world atlas with rich turquoise waters & colorful territories
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
    // 3. Earth at Night: Nocturnal Earth with visible physical continental structure & glittering NASA city lights
    night: {
      name: 'Earth at Night',
      // Base layer shows Earth's physical structure: deep midnight oceans, continents, and mountain relief
      baseMapUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      baseMapOptions: {
        maxZoom: 18,
        attribution: 'Base: ESRI Satellite &copy; Earthstar | Lights: NASA Earth Observatory'
      },
      baseCssFilter: 'brightness(34%) contrast(150%) hue-rotate(205deg) saturate(180%)',
      // Overlay layer shows genuine glittering city lights from NASA VIIRS sensor
      lightsUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_CityLights_2012/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg',
      lightsFallbackUrl: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg'
    }
  };

  // Major global hubs with coordinates for interactive pins
  const globalLocations = [
    { name: 'Tokyo', country: 'Japan', lat: 35.6895, lon: 139.6917, desc: 'East Asian Tech & Finance Metropolis', temp: '22°C' },
    { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, desc: 'European Cultural & Architectural Nexus', temp: '19°C' },
    { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060, desc: 'Global Commercial & Financial Capital', temp: '24°C' },
    { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, desc: 'International Financial Meridian', temp: '15°C' },
    { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777, desc: 'South Asian Economic Engine', temp: '30°C' },
    { name: 'Chennai', country: 'India', lat: 13.0827, lon: 80.2707, desc: 'Coastal Automobile & Software Gateway', temp: '31°C' },
    { name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708, desc: 'Arabian Gulf Aviation & Trade Hub', temp: '34°C' },
    { name: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357, desc: 'Historic Nile Valley Megacity', temp: '29°C' },
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, desc: 'Oceanic Pacific Harbor Gateway', temp: '21°C' },
    { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198, desc: 'Equatorial Maritime Tech Center', temp: '28°C' },
    { name: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050, desc: 'Central European Innovation Hub', temp: '18°C' },
    { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729, desc: 'South American Coastal Metropolis', temp: '26°C' },
    { name: 'San Francisco', country: 'United States', lat: 37.7749, lon: -122.4194, desc: 'Pacific Innovation & Tech Capital', temp: '20°C' },
    { name: 'Cape Town', country: 'South Africa', lat: -33.9249, lon: 18.4241, desc: 'Atlantic-Indian Ocean Confluence', temp: '23°C' }
  ];

  /**
   * Helper to build custom pulsing beacon icons
   */
  const createPulseIcon = (cityName, isNight = false) => {
    const beaconColor = isNight ? '#F59E0B' : '#A855F7';
    const coreGradient = isNight
      ? 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 55%, #D97706 100%)'
      : 'linear-gradient(135deg, #A855F7 0%, #38BDF8 100%)';
    const coreGlow = isNight
      ? '0 0 16px rgba(245, 158, 11, 0.95), 0 0 28px rgba(251, 191, 36, 0.65)'
      : '0 0 14px rgba(168, 85, 247, 0.9), 0 0 22px rgba(56, 189, 248, 0.5)';

    return L.divIcon({
      className: `custom-pulse-marker ${isNight ? 'night-marker-mode' : ''}`,
      html: `
        <div style="position: relative; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${beaconColor}; opacity: 0.75; animation: pulseBeacon 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: 16px; height: 16px; border-radius: 50%; background: ${coreGradient}; border: 2.5px solid #FFFFFF; box-shadow: ${coreGlow};"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -16]
    });
  };

  /**
   * Render or re-render marker pins
   */
  function renderMarkers(isNight = false) {
    if (!markersLayer) return;
    markersLayer.clearLayers();

    globalLocations.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lon], {
        icon: createPulseIcon(loc.name, isNight)
      });

      const tempColor = isNight ? '#FBBF24' : '#38BDF8';
      const popupContent = `
        <div class="map-custom-popup-content">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <span class="map-popup-title">${loc.name}</span>
            <span style="font-family: var(--font-mono); font-size: 0.85rem; color: ${tempColor}; font-weight: bold;">${loc.temp}</span>
          </div>
          <div style="font-size: 0.82rem; color: #DDD6FE; margin-bottom: 8px;">${loc.country} • ${loc.desc}</div>
          <button class="map-popup-btn" data-city="${loc.name}">Sync World Explorer →</button>
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
    const mapElement = document.getElementById('worldMapLeaflet');
    if (!mapElement || typeof L === 'undefined') {
      console.warn("Leaflet not loaded or map container missing.");
      return;
    }

    try {
      // Create map instance centered globally
      mapInstance = L.map('worldMapLeaflet', {
        center: [24, 15],
        zoom: 2.3,
        minZoom: 2,
        maxZoom: 16,
        zoomControl: false,
        attributionControl: false
      });

      // Position zoom control in top-right
      L.control.zoom({ position: 'topright' }).addTo(mapInstance);

      // Setup pins layer
      markersLayer = L.layerGroup().addTo(mapInstance);
      renderMarkers(false);

      // Default to Satellite Earth (rich blue oceans and photorealistic terrain!)
      setMapTheme('satellite');

      // Handle popup button click delegation
      mapInstance.on('popupopen', () => {
        const btns = document.querySelectorAll('.map-popup-btn');
        btns.forEach(btn => {
          btn.onclick = () => {
            const cityName = btn.getAttribute('data-city');
            if (selectCityCallback) selectCityCallback(cityName);
            mapInstance.closePopup();
          };
        });
      });

      // Setup theme switch buttons
      setupThemeSwitcher();

    } catch (e) {
      console.warn("Leaflet initialization error:", e);
    }
  }

  /**
   * Switch Map Layer Dynamically
   */
  function setMapTheme(themeKey) {
    if (!mapInstance) return;
    // Map legacy 'topo' or 'violet' to 'satellite'
    if (themeKey === 'topo' || themeKey === 'violet') themeKey = 'satellite';
    if (!tileProviders[themeKey]) return;

    currentTheme = themeKey;
    const provider = tileProviders[themeKey];

    // Remove existing base layer
    if (currentTileLayer) {
      mapInstance.removeLayer(currentTileLayer);
      currentTileLayer = null;
    }

    // Handle Earth at Night (dual-layer compositing)
    if (themeKey === 'night') {
      // 1. Base Layer: Earth's nocturnal physical structure (oceans, continents, mountain relief)
      currentTileLayer = L.tileLayer(provider.baseMapUrl, provider.baseMapOptions).addTo(mapInstance);

      const tilePane = mapInstance.getPane('tilePane');
      if (tilePane) {
        tilePane.style.filter = provider.baseCssFilter || 'none';
        tilePane.style.webkitFilter = provider.baseCssFilter || 'none';
        tilePane.style.transition = 'filter 0.4s ease';
      }

      // 2. Ensure nightLightsPane exists with screen blend mode
      if (!mapInstance.getPane('nightLightsPane')) {
        const p = mapInstance.createPane('nightLightsPane');
        p.style.zIndex = 220; // Above tilePane (200), below markers (600)
        p.style.mixBlendMode = 'screen';
        p.style.pointerEvents = 'none';
      }

      // 3. Add NASA glittering city lights overlay on top
      if (!nightOverlayLayer) {
        nightOverlayLayer = L.tileLayer(provider.lightsUrl, {
          pane: 'nightLightsPane',
          maxZoom: 16,
          maxNativeZoom: 8,
          attribution: 'NASA Earth Observatory / NOAA NGDC'
        });

        // Error fallback for NASA lights
        nightOverlayLayer.on('tileerror', function (error) {
          if (error.tile && !error.tile.getAttribute('data-fallback-tried')) {
            error.tile.setAttribute('data-fallback-tried', 'true');
            const z = Math.min(error.coords.z, 8);
            const x = error.coords.x;
            const y = error.coords.y;
            error.tile.src = `${provider.lightsFallbackUrl || 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg'}`
              .replace('{z}', z)
              .replace('{x}', x)
              .replace('{y}', y);
          }
        });

        nightOverlayLayer.addTo(mapInstance);
      }
    } else {
      // Daytime themes (satellite or voyager)
      // Clean up night overlay if switching away from night
      if (nightOverlayLayer) {
        mapInstance.removeLayer(nightOverlayLayer);
        nightOverlayLayer = null;
      }

      // Standard single tile layer
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

    // Re-render markers with golden theme if night mode, or violet/cyan if day modes
    renderMarkers(themeKey === 'night');

    // Update active button state
    const themeBtns = document.querySelectorAll('.map-theme-pill');
    themeBtns.forEach(btn => {
      const btnTheme = btn.getAttribute('data-theme');
      if (btnTheme === themeKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * Bind Theme Switcher Buttons in UI
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
   * Pan/Zoom map smoothly to specific coordinates
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
