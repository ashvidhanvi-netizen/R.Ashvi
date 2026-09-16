/**
 * WORLDPULSE — UI RENDERER & INTERACTIVE ANIMATIONS (ui.js)
 * Updates visual components, dynamic atmospheric imagery, number counters,
 * and background transitions based on live API streams.
 */

window.WorldPulseUI = (function () {
  'use strict';

  /**
   * Main Render Pipeline: Updates all 5 stream UI cards
   */
  function renderAll(data) {
    if (!data) return;

    if (data.location) renderLocationStream(data.location);
    if (data.weather) renderWeatherStream(data.weather, data.location ? data.location.city : '');
    if (data.country) renderCountryStream(data.country);
    if (data.currency) renderCurrencyStream(data.currency);
    if (data.news) renderNewsStream(data.news);
  }

  /**
   * 1. Render Location & Chronometer
   */
  function renderLocationStream(loc) {
    const explorerCityEl = document.getElementById('explorerCityHeading');
    const explorerCountryEl = document.getElementById('explorerCountrySub');
    const coordLatEl = document.getElementById('valCoordLat');
    const coordLonEl = document.getElementById('valCoordLon');
    const coordTzEl = document.getElementById('valCoordTz');
    const coordElevEl = document.getElementById('valCoordElev');

    if (explorerCityEl) explorerCityEl.textContent = loc.city;
    if (explorerCountryEl) explorerCountryEl.textContent = loc.country || loc.countryCode;
    if (coordLatEl) coordLatEl.textContent = `${loc.latitude.toFixed(2)}° N`;
    if (coordLonEl) coordLonEl.textContent = `${loc.longitude.toFixed(2)}° E`;
    if (coordTzEl) coordTzEl.textContent = loc.timezone;
    if (coordElevEl) coordElevEl.textContent = `${loc.elevation} m`;

    // Inform clock engine of new timezone
    if (window.WorldPulseTelemetry) {
      window.WorldPulseTelemetry.setDestinationTimezone(loc.timezone);
    }
  }

  /**
   * 2. Render Weather Stream & Dynamic Atmospheric Background
   */
  function renderWeatherStream(w, cityName = '') {
    const tempEl = document.getElementById('valWeatherTemp');
    const condEl = document.getElementById('valWeatherCondition');
    const iconEl = document.getElementById('valWeatherIcon');
    const feelsEl = document.getElementById('valWeatherFeels');
    const humidityEl = document.getElementById('valWeatherHumidity');
    const windEl = document.getElementById('valWeatherWind');
    const sunriseEl = document.getElementById('valWeatherSunrise');
    const sunsetEl = document.getElementById('valWeatherSunset');
    const weatherCard = document.getElementById('streamWeatherCard');

    if (tempEl) tempEl.textContent = `${w.temperature}°C`;
    if (condEl) condEl.textContent = w.condition;
    if (iconEl) iconEl.textContent = w.icon;
    if (feelsEl) feelsEl.textContent = `${w.feelsLike}°C`;
    if (humidityEl) humidityEl.textContent = `${w.humidity}%`;
    if (windEl) windEl.textContent = `${w.windSpeed} km/h`;
    if (sunriseEl) sunriseEl.textContent = w.sunrise;
    if (sunsetEl) sunsetEl.textContent = w.sunset;

    // Apply dynamic visual atmosphere to the Weather card
    if (weatherCard) {
      // Clear previous atmosphere classes
      weatherCard.className = 'stream-card weather-card';

      const normalizedCity = cityName.toLowerCase();
      if (normalizedCity.includes('tokyo')) {
        weatherCard.classList.add('atmosphere-city-tokyo');
      } else if (normalizedCity.includes('paris')) {
        weatherCard.classList.add('atmosphere-city-paris');
      } else if (normalizedCity.includes('new york')) {
        weatherCard.classList.add('atmosphere-city-newyork');
      } else if (normalizedCity.includes('london')) {
        weatherCard.classList.add('atmosphere-city-london');
      } else if (normalizedCity.includes('mumbai')) {
        weatherCard.classList.add('atmosphere-city-mumbai');
      } else if (normalizedCity.includes('chennai')) {
        weatherCard.classList.add('atmosphere-city-chennai');
      } else if (normalizedCity.includes('dubai')) {
        weatherCard.classList.add('atmosphere-city-dubai');
      } else if (normalizedCity.includes('sydney')) {
        weatherCard.classList.add('atmosphere-city-sydney');
      } else if (w.atmosphereType === 'rain') {
        weatherCard.classList.add('atmosphere-rain');
      } else if (w.atmosphereType === 'snow') {
        weatherCard.classList.add('atmosphere-snow');
      } else if (w.atmosphereType === 'autumn') {
        weatherCard.classList.add('atmosphere-autumn');
      } else {
        weatherCard.classList.add('atmosphere-clear');
      }
    }
  }

  /**
   * 3. Render Country Information Stream
   */
  function renderCountryStream(c) {
    const flagEl = document.getElementById('valCountryFlag');
    const nameEl = document.getElementById('valCountryName');
    const officialEl = document.getElementById('valCountryOfficial');
    const capitalEl = document.getElementById('valCountryCapital');
    const popEl = document.getElementById('valCountryPop');
    const regionEl = document.getElementById('valCountryRegion');
    const langEl = document.getElementById('valCountryLang');
    const currEl = document.getElementById('valCountryCurrency');
    const bordersEl = document.getElementById('valCountryBorders');

    if (flagEl && c.flagUrl) flagEl.src = c.flagUrl;
    if (nameEl) nameEl.textContent = c.name;
    if (officialEl) officialEl.textContent = c.officialName;
    if (capitalEl) capitalEl.textContent = c.capital;
    if (popEl) popEl.textContent = c.population;
    if (regionEl) regionEl.textContent = `${c.region} (${c.subregion})`;
    if (langEl) langEl.textContent = c.languages;
    if (currEl) currEl.textContent = `${c.currencyCode} (${c.currencySymbol}) — ${c.currencyName}`;
    if (bordersEl) bordersEl.textContent = c.borders;
  }

  /**
   * 4. Render Currency Stream
   */
  function renderCurrencyStream(curr) {
    const rateHeadlineEl = document.getElementById('valCurrencyHeadline');
    const rateSubEl = document.getElementById('valCurrencySub');
    if (rateHeadlineEl) rateHeadlineEl.textContent = curr.formula;
    if (rateSubEl) rateSubEl.textContent = `Live exchange index • Last updated ${curr.lastUpdated.substring(0, 16)}`;
  }

  /**
   * 5. Render News Stream (Digital Magazine Cards)
   */
  function renderNewsStream(news) {
    const streamContainer = document.getElementById('streamNewsList');
    if (!streamContainer || !news.articles) return;

    streamContainer.innerHTML = news.articles.slice(0, 3).map(art => `
      <div class="news-stream-item">
        <div class="news-meta-row">
          <span class="news-source-tag">${art.source}</span>
          <span class="news-time-tag">${art.publishedAt}</span>
        </div>
        <a href="${art.url}" target="_blank" rel="noopener" class="news-item-title">${art.title}</a>
      </div>
    `).join('');
  }

  /**
   * Animated Number Counters for Global Snapshot ("The World in Numbers")
   */
  function initNumberCounters() {
    const counters = document.querySelectorAll('.stat-counter-number[data-target]');
    if (!counters.length) return;

    let hasAnimated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const isDecimal = target % 1 !== 0;
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              counter.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
            }, 30);
          });
        }
      });
    }, { threshold: 0.3 });

    const snapshotSection = document.getElementById('globalSnapshotSection');
    if (snapshotSection) observer.observe(snapshotSection);
  }

  /**
   * Hero Canvas Orbital Particle Constellation
   */
  function initHeroCanvas() {
    const canvas = document.getElementById('heroParticleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(width > 768 ? 65 : 30, 80);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  return {
    renderAll,
    initNumberCounters,
    initHeroCanvas
  };

})();
