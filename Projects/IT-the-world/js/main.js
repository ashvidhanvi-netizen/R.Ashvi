/**
 * IT: THE WORLD WE BUILT — CORE ENGINE & 3D INTERACTIONS (main.js)
 * Navigation, 3D card tilt physics, scroll reveal, counters, and particle constellations.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. NAVIGATION & READING PROGRESS
     ========================================================================== */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const progressBar = document.getElementById('readingProgressBar');
    const mobileToggle = document.getElementById('mobileNavToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Header shadow on scroll
      if (header) {
        if (scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Reading progress bar
      if (progressBar && docHeight > 0) {
        const progress = (scrollY / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }
    }, { passive: true });

    // Mobile drawer toggle
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
        mobileToggle.textContent = mobileDrawer.classList.contains('open') ? '✕' : '☰';
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
          if (mobileToggle) mobileToggle.textContent = '☰';
        });
      });
    }
  }

  /* ==========================================================================
     2. SUBTLE 3D CARD TILT EFFECT (Physics & Perspective)
     ========================================================================== */
  function init3DCardTilt() {
    const cards = document.querySelectorAll('.card-3d, .glass-panel-interactive');

    // Only enable mouse tilt on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const deltaX = (x - centerX) / centerX;
          const deltaY = (y - centerY) / centerY;

          // Subtle, elegant tilt angles
          const rotateX = -deltaY * 6;
          const rotateY = deltaX * 6;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
      });
    }
  }

  /* ==========================================================================
     3. VIEWPORT SCROLL REVEAL (Fade & Slide in)
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     4. ANIMATED NUMBER COUNTERS
     ========================================================================== */
  function initCounters() {
    const counterElements = document.querySelectorAll('[data-counter-target]');
    if (!counterElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-counter-target'));
          const prefix = el.getAttribute('data-counter-prefix') || '';
          const suffix = el.getAttribute('data-counter-suffix') || '';
          const isDecimal = target % 1 !== 0;

          let current = 0;
          const duration = 1600;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            current = target * easeOut;

            if (frame >= totalFrames) {
              current = target;
              clearInterval(timer);
            }

            el.textContent = `${prefix}${isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString()}${suffix}`;
          }, frameDuration);

          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     5. HERO CONSTELLATION MESH CANVAS
     ========================================================================== */
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

    const isChapter2 = document.body.classList.contains('theme-chapter-2') || document.body.classList.contains('theme-deep-wine');
    const isChapter3 = document.body.classList.contains('theme-chapter-3');

    const nodeColor = isChapter2 ? '#FB7185' : isChapter3 ? '#34D399' : '#C4B5FD';
    const connectionRgba = isChapter2 ? '251, 113, 133' : isChapter3 ? '52, 211, 153' : '167, 139, 250';

    const numPoints = Math.min(Math.floor(width / 24), 50);
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes within proximity threshold
      for (let i = 0; i < numPoints; i++) {
        for (let j = i + 1; j < numPoints; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `rgba(${connectionRgba}, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw active node points
      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      requestAnimationFrame(render);
    }

    render();
  }

  /* ==========================================================================
     6. INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    init3DCardTilt();
    initScrollReveal();
    initCounters();
    initHeroCanvas();
  });

})();
