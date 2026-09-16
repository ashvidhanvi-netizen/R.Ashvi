/**
 * WORLDPULSE — TELEMETRY & WORLD CLOCK ENGINE (telemetry.js)
 * Powers the On-Screen Live API Telemetry Terminal Drawer,
 * live destination atomic chronometer, and 6-capital world clock deck.
 */

window.WorldPulseTelemetry = (function () {
  'use strict';

  let currentDestinationTimezone = 'Asia/Tokyo';
  let tickerIntervalId = null;

  // Multi-city clock deck configuration
  const worldCapitals = [
    { id: 'clockTokyo', name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { id: 'clockLondon', name: 'London', timezone: 'Europe/London' },
    { id: 'clockNewYork', name: 'New York', timezone: 'America/New_York' },
    { id: 'clockChennai', name: 'Chennai', timezone: 'Asia/Kolkata' },
    { id: 'clockSydney', name: 'Sydney', timezone: 'Australia/Sydney' },
    { id: 'clockParis', name: 'Paris', timezone: 'Europe/Paris' }
  ];

  /**
   * Initialize UI and Live Tickers
   */
  function init() {
    setupDrawerListeners();
    startLiveClocks();
  }

  /**
   * Setup slide-out telemetry drawer
   */
  function setupDrawerListeners() {
    const toggleBtn = document.getElementById('telemetryToggleBtn');
    const drawer = document.getElementById('telemetryDrawerOverlay');
    const closeBtn = document.getElementById('telemetryDrawerClose');

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
    }
    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
    }
    if (drawer) {
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) drawer.classList.remove('open');
      });
    }
  }

  /**
   * Update the live telemetry JSON feeds in the on-screen drawer
   */
  function update(streamKey, data) {
    const targetElement = document.getElementById(`telemetryJson-${streamKey}`);
    if (targetElement) {
      targetElement.textContent = JSON.stringify(data, null, 2);
    }
  }

  /**
   * Set active destination timezone for the hero/explorer clock
   */
  function setDestinationTimezone(tz) {
    currentDestinationTimezone = tz || 'UTC';
  }

  /**
   * Start 1-second interval tickers for all world clocks and active destination
   */
  function startLiveClocks() {
    if (tickerIntervalId) clearInterval(tickerIntervalId);

    const tick = () => {
      const now = new Date();

      // 1. Update Destination Clock in Explorer Card
      const destClockEl = document.getElementById('liveClockDisplay');
      const destDateEl = document.getElementById('liveDateDisplay');
      if (destClockEl && currentDestinationTimezone) {
        try {
          const timeFmt = new Intl.DateTimeFormat('en-US', {
            timeZone: currentDestinationTimezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });
          destClockEl.textContent = timeFmt.format(now);

          if (destDateEl) {
            const dateFmt = new Intl.DateTimeFormat('en-US', {
              timeZone: currentDestinationTimezone,
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            destDateEl.textContent = dateFmt.format(now);
          }
        } catch (e) {
          destClockEl.textContent = now.toLocaleTimeString();
        }
      }

      // 2. Update 6-City World Clock Grid
      worldCapitals.forEach(city => {
        const el = document.getElementById(city.id);
        if (el) {
          try {
            const fmt = new Intl.DateTimeFormat('en-US', {
              timeZone: city.timezone,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            });
            el.textContent = fmt.format(now);
          } catch (e) {
            // fallback
          }
        }
      });
    };

    tick();
    tickerIntervalId = setInterval(tick, 1000);
  }

  return {
    init,
    update,
    setDestinationTimezone
  };

})();
