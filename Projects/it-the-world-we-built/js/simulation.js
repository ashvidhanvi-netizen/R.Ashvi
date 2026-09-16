/**
 * IT: THE WORLD WE BUILT — SOCIETY OUTAGE SIMULATOR (simulation.js)
 * Interactive cascading failure simulator for Page 2 ("Without IT").
 * Calculates the societal criticality index when digital sectors collapse.
 */

window.CrisisSimulator = (function () {
  'use strict';

  const sectors = {
    banking: { name: 'Banking & Financial Clearings', offline: false, weight: 25, impact: 'ATM networks frozen. SWIFT, credit cards, and instant payroll halt. Global trade contracts stall instantly.' },
    power: { name: 'Electrical Grid & SCADA Control', offline: false, weight: 25, impact: 'Automated turbine telemetry drops. Cascade blackouts across municipal water purification and regional substations.' },
    supply: { name: 'Global Logistics & Air Traffic', offline: false, weight: 20, impact: 'Air traffic control grounded. Port container cranes freeze. Grocery distribution chains depleted in 48-72 hours.' },
    healthcare: { name: 'Hospital Diagnostic Telemetry', offline: false, weight: 15, impact: 'Electronic health records inaccessible. Digital drug dosing pumps fail. ICU monitoring retreats to manual checks.' },
    comms: { name: 'Cellular, Fiber & Internet', offline: false, weight: 15, impact: 'Emergency 911 dispatch lines silenced. Satellites unmonitored. 8 billion people isolated from global communications.' }
  };

  const tickerAlerts = [
    "ALL SYSTEMS NOMINAL — Real-time telemetry operating across global sectors.",
    "CAUTION: Financial transaction clearing disrupted. Commercial liquidity freezing.",
    "HIGH SEVERITY: SCADA energy substations unresponsive. Regional power blackouts initiated.",
    "CRITICAL CRISIS: Air traffic grounded globally. Food logistics pipelines interrupted.",
    "CIVILIZATIONAL EMERGENCY: Five critical pillars offline. Global economic standstill active."
  ];

  function init() {
    const cards = document.querySelectorAll('.sector-card-toggle');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const sectorKey = card.getAttribute('data-sector');
        if (sectors[sectorKey]) {
          sectors[sectorKey].offline = !sectors[sectorKey].offline;
          card.classList.toggle('offline', sectors[sectorKey].offline);
          updateCrisisStatus();
        }
      });
    });

    const resetBtn = document.getElementById('resetSimulationBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        for (const key in sectors) {
          sectors[key].offline = false;
        }
        document.querySelectorAll('.sector-card-toggle').forEach(c => c.classList.remove('offline'));
        updateCrisisStatus();
      });
    }

    const blackoutAllBtn = document.getElementById('blackoutAllBtn');
    if (blackoutAllBtn) {
      blackoutAllBtn.addEventListener('click', () => {
        for (const key in sectors) {
          sectors[key].offline = true;
        }
        document.querySelectorAll('.sector-card-toggle').forEach(c => c.classList.add('offline'));
        updateCrisisStatus();
      });
    }

    updateCrisisStatus();
  }

  function updateCrisisStatus() {
    let crisisIndex = 0;
    let offlineCount = 0;
    let lastOfflineSector = null;

    for (const key in sectors) {
      if (sectors[key].offline) {
        crisisIndex += sectors[key].weight;
        offlineCount++;
        lastOfflineSector = sectors[key];
      }
    }

    const gaugeEl = document.getElementById('crisisGaugeVal');
    const tierEl = document.getElementById('crisisSeverityTier');
    const tickerTextEl = document.getElementById('simulationTickerText');
    const damageEl = document.getElementById('crisisDailyDamage');

    if (gaugeEl) gaugeEl.textContent = `${crisisIndex}%`;

    // Severity Tiers
    let tierText = 'STATUS: RESILIENT (0/5 OFFLINE)';
    let tierClass = 'status-green';
    let dailyLoss = '$0.0B';

    if (offlineCount === 0) {
      tierText = 'STATUS: RESILIENT (NOMINAL)';
      dailyLoss = '$0.0B';
    } else if (offlineCount <= 2) {
      tierText = `CRISIS LEVEL 2: REGIONAL PARALYSIS (${offlineCount}/5)`;
      dailyLoss = `$${(crisisIndex * 3.8).toFixed(1)}B / day`;
    } else if (offlineCount <= 4) {
      tierText = `CRISIS LEVEL 4: SYSTEMIC SHUTDOWN (${offlineCount}/5)`;
      dailyLoss = `$${(crisisIndex * 4.6).toFixed(1)}B / day`;
    } else {
      tierText = 'CRISIS LEVEL 5: CIVILIZATIONAL BLACKOUT';
      dailyLoss = '$420.0B+ / day';
    }

    if (tierEl) tierEl.textContent = tierText;
    if (damageEl) damageEl.textContent = dailyLoss;

    // Ticker Alert Message
    if (tickerTextEl) {
      if (offlineCount === 0) {
        tickerTextEl.textContent = tickerAlerts[0];
      } else if (lastOfflineSector) {
        tickerTextEl.textContent = `ALERT [${lastOfflineSector.name.toUpperCase()}]: ${lastOfflineSector.impact}`;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', init);

  return { init };
})();
