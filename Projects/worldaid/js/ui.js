/**
 * WORLDAID — USER INTERFACE RENDERER & INTERACTION ENGINE (ui.js)
 * Manages UI updates across all cards, dynamic weather atmospheres,
 * animated number counters, and the hero particle connection canvas.
 */

window.WorldAidUI = (function () {
  'use strict';

  /**
   * Render All Retrieved Intelligence Across the Platform
   */
  function renderAll(data) {
    if (!data) return;

    if (data.location && data.timezone) {
      renderLocationAndTime(data.location, data.timezone);
    }
    if (data.weather) {
      renderWeather(data.weather, data.location);
    }
    if (data.country) {
      renderCountry(data.country);
      renderCountryExplorerShowcase(data.country);
    }
    if (data.news) {
      renderNews(data.news);
    }
    updateCapacityMeters(data.location, data.weather);
  }

  /**
   * Render API 1 Weather Conditions
   */
  function renderWeather(weather, location) {
    if (!weather) return;

    const tempVal = document.getElementById('weatherTempVal');
    const cityCountry = document.getElementById('weatherCityCountry');
    const condPill = document.getElementById('weatherConditionPill');
    const condIcon = document.getElementById('weatherConditionIcon');
    const condText = document.getElementById('weatherConditionText');
    const visualIcon = document.getElementById('weatherVisualIcon');
    const feelsLike = document.getElementById('weatherFeelsLike');
    const humidityVal = document.getElementById('weatherHumidityVal');
    const windVal = document.getElementById('weatherWindVal');
    const precipVal = document.getElementById('weatherPrecipVal');
    const sunCycle = document.getElementById('weatherSunCycle');
    const advisoryText = document.getElementById('weatherAdvisoryText');
    const alertBadge = document.getElementById('weatherAlertBadge');
    const alertText = document.getElementById('weatherAlertText');
    const backdrop = document.getElementById('weatherBackdrop');

    // Hero stat update
    const heroTemp = document.getElementById('heroLiveTemp');
    if (heroTemp) heroTemp.textContent = `${weather.temperature}°C`;

    if (tempVal) tempVal.textContent = `${weather.temperature}°`;
    if (cityCountry && location) cityCountry.textContent = `${location.city}, ${location.country}`;
    if (condIcon) condIcon.textContent = weather.icon;
    if (condText) condText.textContent = weather.condition;
    if (visualIcon) visualIcon.textContent = weather.icon;
    if (feelsLike) feelsLike.textContent = `Feels like ${weather.feelsLike}°C`;
    if (humidityVal) humidityVal.textContent = `${weather.humidity}%`;
    if (windVal) windVal.textContent = `${weather.windSpeed} km/h`;
    if (precipVal) precipVal.textContent = `${weather.precipitation} mm`;
    if (sunCycle) sunCycle.textContent = `${weather.sunrise} / ${weather.sunset}`;
    if (advisoryText) advisoryText.textContent = weather.advisory;

    if (alertBadge && alertText) {
      alertText.textContent = weather.alertLevel;
      alertBadge.className = `stream-status-badge ${weather.alertClass}`;
    }

    // Update atmospheric visual backdrop
    if (backdrop) {
      backdrop.className = `card-atmospheric-backdrop ${weather.atmosphereClass}`;
    }
  }

  /**
   * Render API 2 Country Dossier
   */
  function renderCountry(country) {
    if (!country) return;

    const flagImg = document.getElementById('countryFlagImg');
    const nameDisplay = document.getElementById('countryNameDisplay');
    const officialName = document.getElementById('countryOfficialName');
    const isoTag = document.getElementById('countryIsoTag');
    const capitalVal = document.getElementById('countryCapitalVal');
    const popVal = document.getElementById('countryPopulationVal');
    const regionVal = document.getElementById('countryRegionVal');
    const langVal = document.getElementById('countryLanguagesVal');
    const currVal = document.getElementById('countryCurrencyVal');
    const bordersVal = document.getElementById('countryBordersVal');
    const accessTier = document.getElementById('countryAccessTier');

    if (flagImg) flagImg.src = country.flagUrl || 'https://flagcdn.com/un.svg';
    if (nameDisplay) nameDisplay.textContent = country.name;
    if (officialName) officialName.textContent = country.officialName;
    if (isoTag) isoTag.textContent = `ISO: ${country.name.slice(0, 3).toUpperCase()}`;
    if (capitalVal) capitalVal.textContent = country.capital;
    if (popVal) popVal.textContent = country.population;
    if (regionVal) regionVal.textContent = `${country.region} (${country.subregion})`;
    if (langVal) langVal.textContent = country.languages;
    if (currVal) currVal.textContent = `${country.currencyCode} (${country.currencySymbol})`;
    if (bordersVal) bordersVal.textContent = country.borders;

    if (accessTier) {
      if (country.name === 'Haiti' || country.name === 'Syria' || country.name === 'Yemen') {
        accessTier.textContent = 'HIGH PRIORITY DISASTER CORRIDOR';
        accessTier.className = 'readiness-val status-tag-red';
      } else if (country.name === 'Ukraine' || country.name === 'Bangladesh') {
        accessTier.textContent = 'SPECIAL MONITORING ACCESS';
        accessTier.className = 'readiness-val status-tag-amber';
      } else {
        accessTier.textContent = 'OPEN HUMANITARIAN CORRIDOR';
        accessTier.className = 'readiness-val status-tag-green';
      }
    }
  }

  /**
   * Render Dedicated Country Intelligence Explorer Section
   */
  function renderCountryExplorerShowcase(country) {
    if (!country) return;

    const dossierFlag = document.getElementById('explorerDossierFlag');
    const dossierTitle = document.getElementById('dossierCountryTitle');
    const dossierSub = document.getElementById('dossierCountrySub');
    const dossierCapital = document.getElementById('dossierCapital');
    const dossierPop = document.getElementById('dossierPopulation');
    const dossierRegion = document.getElementById('dossierRegion');
    const dossierCurrency = document.getElementById('dossierCurrency');
    const dossierLang = document.getElementById('dossierLanguages');
    const dossierBorders = document.getElementById('dossierBorders');

    if (dossierFlag) dossierFlag.src = country.flagUrl || 'https://flagcdn.com/un.svg';
    if (dossierTitle) dossierTitle.textContent = country.name.toUpperCase();
    if (dossierSub) dossierSub.textContent = `${country.officialName} • ${country.region}`;
    if (dossierCapital) dossierCapital.textContent = country.capital;
    if (dossierPop) dossierPop.textContent = country.population;
    if (dossierRegion) dossierRegion.textContent = `${country.region} — ${country.subregion}`;
    if (dossierCurrency) dossierCurrency.textContent = `${country.currencyCode} — ${country.currencyName} (${country.currencySymbol})`;
    if (dossierLang) dossierLang.textContent = country.languages;
    if (dossierBorders) dossierBorders.textContent = country.borders;
  }

  /**
   * Render API 4 & 5 Location Geocoding & Operational Chronometer
   */
  function renderLocationAndTime(loc, tz) {
    if (!loc || !tz) return;

    const digitalClock = document.getElementById('liveDigitalClock');
    const dateStr = document.getElementById('liveDateStr');
    const coordsStr = document.getElementById('locationCoordsStr');
    const tzStr = document.getElementById('locationTimezoneStr');
    const elevStr = document.getElementById('locationElevationStr');
    const terminalCoords = document.getElementById('terminalCurrentCoords');
    const heroLiveZone = document.getElementById('heroLiveZone');

    if (heroLiveZone) heroLiveZone.textContent = loc.city;
    if (digitalClock) digitalClock.textContent = tz.localTime;
    if (dateStr) dateStr.textContent = tz.localDate;

    const latDir = loc.latitude >= 0 ? 'N' : 'S';
    const lonDir = loc.longitude >= 0 ? 'E' : 'W';
    const formattedCoords = `${Math.abs(loc.latitude).toFixed(4)}° ${latDir}, ${Math.abs(loc.longitude).toFixed(4)}° ${lonDir}`;

    if (coordsStr) coordsStr.textContent = formattedCoords;
    if (terminalCoords) terminalCoords.textContent = `LAT ${Math.abs(loc.latitude).toFixed(4)}° ${latDir} • LON ${Math.abs(loc.longitude).toFixed(4)}° ${lonDir}`;
    if (tzStr) tzStr.textContent = `${loc.timezone} (${tz.utcOffset})`;
    if (elevStr) elevStr.textContent = `${loc.elevation} m above sea level`;
  }

  /**
   * Render API 3 Humanitarian News Dispatches
   */
  function renderNews(news) {
    if (!news) return;

    const previewContainer = document.getElementById('newsPreviewFeed');
    const leadImg = document.getElementById('leadNewsImg');
    const leadCategory = document.getElementById('leadNewsCategory');
    const leadSource = document.getElementById('leadNewsSource');
    const leadDate = document.getElementById('leadNewsDate');
    const leadTitle = document.getElementById('leadNewsTitle');
    const leadSummary = document.getElementById('leadNewsSummary');
    const leadLink = document.getElementById('leadNewsLink');
    const leadBtn = document.getElementById('leadNewsBtn');
    const supportingContainer = document.getElementById('supportingNewsFeed');

    // 1. Render Lead Article
    const lead = news.leadStory || (news.articles && news.articles[0]);
    if (lead) {
      if (leadImg) leadImg.src = lead.imageUrl;
      if (leadSource) leadSource.textContent = lead.source.toUpperCase();
      if (leadDate) leadDate.textContent = lead.date.toUpperCase();
      if (leadTitle && leadLink) {
        leadLink.textContent = lead.title;
        leadLink.href = lead.url;
      }
      if (leadSummary) leadSummary.textContent = lead.summary;
      if (leadBtn) leadBtn.href = lead.url;
    }

    // 2. Render Supporting Deck (Right column)
    if (supportingContainer && news.articles) {
      const supportingItems = news.articles.slice(1, 5);
      supportingContainer.innerHTML = supportingItems.map(art => `
        <div class="news-support-card glass-panel">
          <div class="news-meta-row">
            <span class="news-source-tag">${art.source}</span>
            <span class="news-date-tag">${art.date}</span>
          </div>
          <h4 class="support-title">
            <a href="${art.url}" target="_blank" rel="noopener noreferrer">${art.title}</a>
          </h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.45;">${art.summary}</p>
        </div>
      `).join('');
    }

    // 3. Render Mini Preview in Core Streams Card 5
    if (previewContainer && news.articles) {
      previewContainer.innerHTML = news.articles.slice(0, 3).map(art => `
        <div class="news-preview-item">
          <div class="news-prev-source">${art.source} • ${art.date}</div>
          <div class="news-prev-title">
            <a href="${art.url}" target="_blank" rel="noopener noreferrer">${art.title}</a>
          </div>
        </div>
      `).join('');
    }
  }

  /**
   * Update Dynamic Aid Capacity Meters
   */
  function updateCapacityMeters(loc, weather) {
    const foodVal = document.getElementById('meterFoodVal');
    const medVal = document.getElementById('meterMedVal');
    const washVal = document.getElementById('meterWashVal');
    const airVal = document.getElementById('meterAirVal');

    if (!foodVal) return;

    // Dynamically calibrate capacity based on location and environmental stress
    let food = 84;
    let med = 76;
    let wash = 72;
    let air = 92;

    if (loc && loc.city) {
      const name = loc.city.toLowerCase();
      if (name.includes('port-au-prince') || name.includes('haiti')) {
        food = 48; med = 42; wash = 38; air = 65;
      } else if (name.includes('goma') || name.includes('congo')) {
        food = 38; med = 45; wash = 32; air = 50;
      } else if (name.includes('kyiv')) {
        food = 78; med = 82; wash = 75; air = 70;
      } else if (name.includes('dhaka')) {
        food = 68; med = 64; wash = 55; air = 80;
      }
    }

    foodVal.textContent = `${food}%`;
    medVal.textContent = `${med}%`;
    washVal.textContent = `${wash}%`;
    airVal.textContent = `${air}%`;

    const fills = document.querySelectorAll('.meter-bar-fill');
    if (fills.length >= 4) {
      fills[0].style.width = `${food}%`;
      fills[1].style.width = `${med}%`;
      fills[2].style.width = `${wash}%`;
      fills[3].style.width = `${air}%`;
    }
  }

  /**
   * Viewport Animated Number Counters
   */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter'), 10);
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = target === 100 ? `${current}%` : current.toLocaleString();
          }, 25);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  /**
   * Animated Hero Planetary Coordinate Mesh Canvas
   */
  function initHeroCanvas() {
    const canvas = document.getElementById('heroMeshCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    const numPoints = 48;
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1,
        isCoral: Math.random() > 0.82 // Humanitarian coral node
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw connection vectors
      for (let i = 0; i < numPoints; i++) {
        for (let j = i + 1; j < numPoints; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = 1 - dist / 140;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = points[i].isCoral || points[j].isCoral
              ? `rgba(255, 107, 107, ${alpha * 0.28})`
              : `rgba(56, 189, 248, ${alpha * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isCoral ? '#FF6B6B' : '#38BDF8';
        ctx.shadowColor = p.isCoral ? 'rgba(255, 107, 107, 0.8)' : 'rgba(56, 189, 248, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  /**
   * Mobile Menu Drawer Toggle
   */
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileMenuDrawer');
    const links = document.querySelectorAll('.mobile-menu-link');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('active');
    });

    links.forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.remove('active');
      });
    });
  }

  return {
    renderAll,
    initCounters,
    initHeroCanvas,
    initMobileMenu
  };

})();
