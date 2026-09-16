/**
 * WORLDAID — LIVE TELEMETRY DRAWER & GLOBAL CLOCK TICKER (telemetry.js)
 * Manages on-screen evaluator JSON viewer and synchronized dynamic clocks.
 */

window.WorldAidTelemetry = (function () {
  'use strict';

  let currentTelemetry = {
    weather: null,
    country: null,
    news: null,
    location: null,
    timezone: null
  };

  /**
   * Update internal telemetry object and update JSON view
   */
  function update(streamKey, data) {
    currentTelemetry[streamKey] = data;

    const elIdMap = {
      weather: 'telemetryCodeWeather',
      country: 'telemetryCodeCountry',
      news: 'telemetryCodeNews',
      location: 'telemetryCodeLocation',
      timezone: 'telemetryCodeTimezone'
    };

    const targetEl = document.getElementById(elIdMap[streamKey]);
    if (targetEl) {
      targetEl.textContent = JSON.stringify(data, null, 2);
    }
  }

  /**
   * Initialize Telemetry Terminal Drawer UI
   */
  function initDrawer() {
    const drawer = document.getElementById('telemetryDrawer');
    const toggleBtn = document.getElementById('telemetryToggleBtn');
    const footerBtn = document.getElementById('footerTelemetryBtn');
    const closeBtn = document.getElementById('telemetryCloseBtn');
    const copyBtn = document.getElementById('copyTelemetryBtn');

    if (!drawer) return;

    const openDrawer = () => drawer.classList.add('active');
    const closeDrawer = () => drawer.classList.remove('active');

    if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
    if (footerBtn) footerBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Tab switcher inside telemetry drawer
    const tabs = document.querySelectorAll('.telemetry-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabKey = tab.getAttribute('data-tab');
        const panels = document.querySelectorAll('.telemetry-tab-panel');
        panels.forEach(p => p.classList.remove('active'));

        const targetPanel = document.getElementById(`panel-${tabKey}`);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });

    // Copy active JSON
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const activePanel = document.querySelector('.telemetry-tab-panel.active pre code');
        if (activePanel) {
          navigator.clipboard.writeText(activePanel.textContent).then(() => {
            const origText = copyBtn.textContent;
            copyBtn.textContent = 'Copied! ✓';
            copyBtn.style.background = 'var(--status-stable)';
            setTimeout(() => {
              copyBtn.textContent = origText;
              copyBtn.style.background = '';
            }, 1800);
          }).catch(() => {
            copyBtn.textContent = 'Select all & copy';
          });
        }
      });
    }
  }

  /**
   * Synchronized Dynamic Global Clock Ticker (API 5 Intl Engine)
   */
  function startGlobalClockTicker() {
    const clockMap = [
      { idTime: 'clockNairobi', idDate: 'dateNairobi', tz: 'Africa/Nairobi' },
      { idTime: 'clockGeneva', idDate: 'dateGeneva', tz: 'Europe/Zurich' },
      { idTime: 'clockNewYork', idDate: 'dateNewYork', tz: 'America/New_York' },
      { idTime: 'clockNewDelhi', idDate: 'dateNewDelhi', tz: 'Asia/Kolkata' },
      { idTime: 'clockTokyo', idDate: 'dateTokyo', tz: 'Asia/Tokyo' },
      { idTime: 'clockLondon', idDate: 'dateLondon', tz: 'Europe/London' }
    ];

    function tick() {
      const now = new Date();

      clockMap.forEach(item => {
        try {
          const timeEl = document.getElementById(item.idTime);
          const dateEl = document.getElementById(item.idDate);

          if (timeEl) {
            const timeFormatter = new Intl.DateTimeFormat('en-US', {
              timeZone: item.tz,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            });
            timeEl.textContent = timeFormatter.format(now);
          }

          if (dateEl) {
            const dateFormatter = new Intl.DateTimeFormat('en-US', {
              timeZone: item.tz,
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            });
            dateEl.textContent = dateFormatter.format(now);
          }
        } catch (e) {
          // ignore timezone edge cases
        }
      });
    }

    tick();
    setInterval(tick, 1000);
  }

  return {
    update,
    initDrawer,
    startGlobalClockTicker
  };

})();
