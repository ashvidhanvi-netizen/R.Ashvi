/**
 * WORLDAID — MASTER APPLICATION CONTROLLER (app.js)
 * Connects the 5 API data streams, interactive Leaflet matrix,
 * UI renderers, telemetry inspector, and user search interactions.
 */

(function () {
  'use strict';

  // DOM Elements
  let searchInput = null;
  let searchBtn = null;
  let presetChips = null;

  /**
   * Execute Global Location Exploration across all 5 APIs
   * @param {string} cityQuery - City or country name to query
   * @param {boolean} shouldScrollToResults - Whether to smooth scroll to the stream dashboard
   */
  async function executeSearch(cityQuery, shouldScrollToResults = false) {
    const query = (cityQuery || '').trim();
    if (!query) return;

    // Update input display
    if (searchInput) searchInput.value = query;

    // Loading button state
    if (searchBtn) {
      searchBtn.disabled = true;
      searchBtn.innerHTML = `
        <span class="loading-spinner"></span>
        <span>Synchronizing Telemetry...</span>
      `;
    }

    // Highlight matching chip if available
    updateActiveChip(query);

    try {
      // 1. Query all 5 API data streams concurrently
      const intelligence = await window.WorldAidAPI.queryAllStreams(query);

      // 2. Render all intelligence across dashboard cards and dossiers
      window.WorldAidUI.renderAll(intelligence);

      // 3. Update evaluator slide-out telemetry drawer
      if (window.WorldAidTelemetry) {
        if (intelligence.weather) window.WorldAidTelemetry.update('weather', intelligence.weather);
        if (intelligence.country) window.WorldAidTelemetry.update('country', intelligence.country);
        if (intelligence.news) window.WorldAidTelemetry.update('news', intelligence.news);
        if (intelligence.location) window.WorldAidTelemetry.update('location', intelligence.location);
        if (intelligence.timezone) window.WorldAidTelemetry.update('timezone', intelligence.timezone);
      }

      // 4. Smoothly pan interactive geospatial map to location
      if (window.WorldAidMap && intelligence.location) {
        window.WorldAidMap.flyToLocation(
          intelligence.location.latitude,
          intelligence.location.longitude,
          5
        );
      }

      // 5. Scroll to stream cards if initiated by quick-action
      if (shouldScrollToResults) {
        const streamSection = document.getElementById('liveStreamsContainer');
        if (streamSection) {
          streamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

    } catch (err) {
      console.warn("WorldAid search execution notice:", err);
    } finally {
      // Restore search button
      if (searchBtn) {
        searchBtn.disabled = false;
        searchBtn.innerHTML = `
          <span>Retrieve Intelligence</span>
          <span class="btn-arrow">➔</span>
        `;
      }
    }
  }

  /**
   * Update Active State on Preset Chips
   */
  function updateActiveChip(activeCity) {
    if (!presetChips) presetChips = document.querySelectorAll('.chip-btn');
    const normalized = activeCity.toLowerCase();

    presetChips.forEach(chip => {
      const chipCity = (chip.getAttribute('data-city') || '').toLowerCase();
      if (chipCity === normalized || normalized.includes(chipCity) || chipCity.includes(normalized)) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  /**
   * Bind All User Interaction Listeners
   */
  function bindInteractions() {
    searchInput = document.getElementById('searchCityInput');
    searchBtn = document.getElementById('searchSubmitBtn');
    presetChips = document.querySelectorAll('.chip-btn');

    // 1. Search Input & Button
    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', () => {
        executeSearch(searchInput.value, true);
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          executeSearch(searchInput.value, true);
        }
      });
    }

    // 2. Preset Priority Hub Chips
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const city = chip.getAttribute('data-city');
        if (city) executeSearch(city, true);
      });
    });

    // 3. Live Environmental Conditions Weather Story Cards
    const weatherStoryCards = document.querySelectorAll('.weather-story-card');
    weatherStoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const city = card.getAttribute('data-city');
        if (city) executeSearch(city, true);
      });
    });

    // 4. Operational World Clock Hub Cards (Click to explore)
    const clockCards = document.querySelectorAll('.clock-hub-card');
    clockCards.forEach(card => {
      card.style.cursor = 'pointer';
      card.setAttribute('title', 'Click to focus WorldAid on this operational hub');
      card.addEventListener('click', () => {
        const hubTitle = card.querySelector('.clock-hub-name')?.textContent?.trim();
        if (hubTitle) executeSearch(hubTitle, true);
      });
    });

    // 5. Country Intelligence Dossier Map Center Button
    const dossierMapBtn = document.getElementById('dossierSyncMapBtn');
    if (dossierMapBtn) {
      dossierMapBtn.addEventListener('click', () => {
        const mapSec = document.getElementById('globalDataMapSection');
        if (mapSec) mapSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // 6. Smooth scroll for anchor navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /**
   * System Startup Sequence
   */
  document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize evaluation telemetry terminal drawer
    if (window.WorldAidTelemetry) {
      window.WorldAidTelemetry.initDrawer();
      window.WorldAidTelemetry.startGlobalClockTicker();
    }

    // 2. Initialize UI decorative engines (hero canvas, viewport counters, mobile menu)
    if (window.WorldAidUI) {
      window.WorldAidUI.initHeroCanvas();
      window.WorldAidUI.initCounters();
      window.WorldAidUI.initMobileMenu();
    }

    // 3. Initialize interactive geospatial Leaflet matrix
    if (window.WorldAidMap) {
      window.WorldAidMap.init((selectedCity) => {
        executeSearch(selectedCity, true);
      });
    }

    // 4. Bind DOM event listeners
    bindInteractions();

    // 5. Initial intelligence query for default flagship hub: Nairobi, Kenya
    await executeSearch('Nairobi', false);
  });

})();
