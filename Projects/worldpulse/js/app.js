/**
 * WORLDPULSE — APPLICATION COORDINATOR (app.js)
 * Coordinates search queries, preset destination chips, Leaflet map sync,
 * currency converter calculator, and initial startup lifecycle.
 */

document.addEventListener('DOMContentLoaded', async () => {
  'use strict';

  // 1. Initialize Sub-Engines
  if (window.WorldPulseTelemetry) window.WorldPulseTelemetry.init();
  if (window.WorldPulseUI) {
    window.WorldPulseUI.initHeroCanvas();
    window.WorldPulseUI.initNumberCounters();
  }

  // 2. Setup Sticky Navbar Effect
  const navHeader = document.querySelector('.site-nav-header');
  window.addEventListener('scroll', () => {
    if (navHeader) {
      if (window.scrollY > 40) {
        navHeader.classList.add('scrolled');
      } else {
        navHeader.classList.remove('scrolled');
      }
    }
  });

  // 3. Main Exploration Dispatcher
  let activeLocation = 'Tokyo';

  async function exploreDestination(cityName) {
    if (!cityName || !cityName.trim()) return;
    const query = cityName.trim();
    activeLocation = query;

    // Show loading indicators on search button
    const searchBtn = document.getElementById('searchSubmitBtn');
    if (searchBtn) {
      searchBtn.innerHTML = `<span>Fetching...</span>`;
      searchBtn.style.opacity = '0.7';
    }

    try {
      const data = await window.WorldPulseAPI.queryAllStreams(query);
      if (window.WorldPulseUI) {
        window.WorldPulseUI.renderAll(data);
      }

      // Update Map view
      if (window.WorldPulseMap && data.location) {
        window.WorldPulseMap.flyToLocation(data.location.latitude, data.location.longitude);
      }

      // Sync active state on preset chips
      const chips = document.querySelectorAll('.chip-btn');
      chips.forEach(c => {
        if (c.getAttribute('data-city').toLowerCase() === query.toLowerCase()) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });

    } catch (err) {
      console.error("Exploration error:", err);
    } finally {
      if (searchBtn) {
        searchBtn.innerHTML = `<span>Explore</span> ➔`;
        searchBtn.style.opacity = '1';
      }
    }
  }

  // 4. Setup Search Terminal Input
  const searchInput = document.getElementById('searchCityInput');
  const searchSubmitBtn = document.getElementById('searchSubmitBtn');

  if (searchSubmitBtn && searchInput) {
    searchSubmitBtn.addEventListener('click', () => {
      exploreDestination(searchInput.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        exploreDestination(searchInput.value);
      }
    });
  }

  // 5. Setup Preset Chips
  const presetChips = document.querySelectorAll('.chip-btn');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const city = chip.getAttribute('data-city');
      if (searchInput) searchInput.value = city;
      exploreDestination(city);
    });
  });

  // 6. Setup Interactive Leaflet Map
  if (window.WorldPulseMap) {
    window.WorldPulseMap.init((selectedCity) => {
      if (searchInput) searchInput.value = selectedCity;
      exploreDestination(selectedCity);

      // Smooth scroll to Explorer
      const explorerSection = document.getElementById('worldExplorerSection');
      if (explorerSection) {
        explorerSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 7. Setup Weather Stories Cards Click-to-Explore
  const storyCards = document.querySelectorAll('.weather-story-card');
  storyCards.forEach(card => {
    card.addEventListener('click', () => {
      const city = card.getAttribute('data-city');
      if (city) {
        if (searchInput) searchInput.value = city;
        exploreDestination(city);
        const explorerSection = document.getElementById('worldExplorerSection');
        if (explorerSection) {
          explorerSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 8. Setup Dedicated Currency Converter
  const convAmount = document.getElementById('convAmountInput');
  const convFrom = document.getElementById('convFromSelect');
  const convTo = document.getElementById('convToSelect');
  const convResultDisplay = document.getElementById('convResultDisplay');
  const convSwapBtn = document.getElementById('convSwapBtn');

  async function recalculateCurrency() {
    if (!convAmount || !convFrom || !convTo || !convResultDisplay) return;
    const amount = parseFloat(convAmount.value) || 1;
    const from = convFrom.value;
    const to = convTo.value;

    try {
      const currData = await window.WorldPulseAPI.getCurrencyRate(from, to);
      const total = (amount * currData.rate).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      convResultDisplay.innerHTML = `
        <div style="font-size: 2.2rem; font-weight: 800; color: #FFFFFF;">${total} <span style="font-size: 1.1rem; color: #A855F7;">${to}</span></div>
        <div style="font-size: 0.88rem; color: #DDD6FE;">1 ${from} = ${currData.rate} ${to}</div>
      `;
    } catch (e) {
      convResultDisplay.textContent = 'Conversion currently updating...';
    }
  }

  if (convAmount) convAmount.addEventListener('input', recalculateCurrency);
  if (convFrom) convFrom.addEventListener('change', recalculateCurrency);
  if (convTo) convTo.addEventListener('change', recalculateCurrency);

  if (convSwapBtn) {
    convSwapBtn.addEventListener('click', () => {
      const temp = convFrom.value;
      convFrom.value = convTo.value;
      convTo.value = temp;
      recalculateCurrency();
    });
  }

  // 9. Initial Startup: Query default city (Tokyo)
  await exploreDestination('Tokyo');
  recalculateCurrency();

});
