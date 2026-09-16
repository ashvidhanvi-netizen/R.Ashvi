/**
 * IT: THE WORLD WE BUILT — Main Experience Controller
 * Handles audio synthesis, navigation states, chapter HUD, and ambient FX.
 */

(function () {
  'use strict';

  // --- Web Audio Synthesizer (Subtle Haptic Audio Feedback) ---
  class AudioFX {
    constructor() {
      this.ctx = null;
      this.isMuted = localStorage.getItem('agy_sound_muted') === 'true';
      this.initOnFirstInteraction = this.initOnFirstInteraction.bind(this);
      window.addEventListener('click', this.initOnFirstInteraction, { once: true });
      window.addEventListener('keydown', this.initOnFirstInteraction, { once: true });
    }

    initOnFirstInteraction() {
      if (!this.ctx && !this.isMuted) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        } catch (e) {
          console.warn('Web Audio not supported or blocked:', e);
        }
      }
    }

    ensureContext() {
      if (!this.ctx) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        } catch (e) {
          return null;
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      localStorage.setItem('agy_sound_muted', this.isMuted);
      return !this.isMuted;
    }

    playClick() {
      if (this.isMuted) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    }

    playTone(freq = 520, duration = 0.12, type = 'sine') {
      if (this.isMuted) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    }

    playChime() {
      if (this.isMuted) return;
      this.playTone(587.33, 0.09, 'sine');
      setTimeout(() => this.playTone(880, 0.15, 'sine'), 60);
    }
  }

  window.SoundEngine = new AudioFX();

  // --- DOM Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initAudioToggleButton();
    initMobileNav();
    bindInteractiveSoundEvents();
    initScrollObserver();
  });

  // Header background on scroll
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Audio Toggle UI
  function initAudioToggleButton() {
    const audioBtn = document.getElementById('audioToggleBtn');
    if (!audioBtn) return;

    const isMuted = window.SoundEngine.isMuted;
    updateAudioBtnState(audioBtn, !isMuted);

    audioBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isEnabled = window.SoundEngine.toggleMute();
      updateAudioBtnState(audioBtn, isEnabled);
      if (isEnabled) {
        window.SoundEngine.playChime();
      }
    });
  }

  function updateAudioBtnState(btn, isEnabled) {
    if (isEnabled) {
      btn.classList.add('active');
      btn.innerHTML = `<span class="sound-icon">🔊</span> <span>AUDIO ON</span>`;
      btn.setAttribute('title', 'Sound feedback enabled. Click to mute.');
    } else {
      btn.classList.remove('active');
      btn.innerHTML = `<span class="sound-icon">🔇</span> <span>AUDIO OFF</span>`;
      btn.setAttribute('title', 'Sound feedback muted. Click to enable.');
    }
  }

  // Mobile navigation toggle
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-chapters');
    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('show-mobile');
      toggle.setAttribute('aria-expanded', isExpanded);
      window.SoundEngine.playClick();
    });
  }

  // Bind clicks to tactile audio
  function bindInteractiveSoundEvents() {
    const interactiveElements = document.querySelectorAll(
      'button, .nav-link-chapter, .role-pill-btn, .timeline-step-btn, .scenario-tab-btn, .civ-opt-card, .alt-timeline-node, .kg-preset-chip'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('click', () => {
        window.SoundEngine.playClick();
      });
    });
  }

  // Intersection Observer for subtle reveal animations
  function initScrollObserver() {
    const revealElements = document.querySelectorAll('.editorial-card, .timeline-container, .simulator-wrapper, .skills-column, .domain-comparison-card');
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

})();
