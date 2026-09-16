/**
 * IT: THE WORLD WE BUILT — BEYOND IT: QUANTUM & NEXT-ERA COMPUTING (future.js)
 * Educational quantum superposition visualizer and measurement collapse simulator for Page 3.
 * Zero fake multipliers. Grounded in quantum mechanics principles.
 */

window.FutureHorizon = (function () {
  'use strict';

  let quantumCanvas = null;
  let qCtx = null;
  let currentProb1 = 0.5; // Default 50/50 superposition

  function init() {
    setupQuantumVisualizer();
    setupMeasurementCollapse();
    setupHorizonScrollHighlight();
  }

  function setupQuantumVisualizer() {
    quantumCanvas = document.getElementById('quantumQubitCanvas');
    const slider = document.getElementById('quantumProbSlider');
    const alphaEl = document.getElementById('stateAlphaVal');
    const betaEl = document.getElementById('stateBetaVal');
    const prob0PctEl = document.getElementById('probZeroPct');
    const prob1PctEl = document.getElementById('probOnePct');

    if (!quantumCanvas) return;
    qCtx = quantumCanvas.getContext('2d');

    function updateQubitDisplay(val) {
      currentProb1 = val / 100;
      const currentProb0 = 1 - currentProb1;

      const alpha = Math.sqrt(currentProb0).toFixed(2);
      const beta = Math.sqrt(currentProb1).toFixed(2);

      if (alphaEl) alphaEl.textContent = `${alpha} |0⟩`;
      if (betaEl) betaEl.textContent = `${beta} |1⟩`;
      if (prob0PctEl) prob0PctEl.textContent = `${Math.round(currentProb0 * 100)}%`;
      if (prob1PctEl) prob1PctEl.textContent = `${Math.round(currentProb1 * 100)}%`;

      drawQubit(currentProb1);
    }

    function drawQubit(prob1) {
      if (!qCtx || !quantumCanvas) return;
      const w = quantumCanvas.width = 240;
      const h = quantumCanvas.height = 240;
      const cx = w / 2;
      const cy = h / 2;
      const radius = 86;

      qCtx.clearRect(0, 0, w, h);

      // Outer Probability Sphere
      qCtx.beginPath();
      qCtx.arc(cx, cy, radius, 0, Math.PI * 2);
      qCtx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
      qCtx.lineWidth = 1.5;
      qCtx.setLineDash([4, 4]);
      qCtx.stroke();
      qCtx.setLineDash([]);

      // Coordinate axes
      qCtx.beginPath();
      qCtx.moveTo(cx, cy - radius - 14);
      qCtx.lineTo(cx, cy + radius + 14);
      qCtx.moveTo(cx - radius - 14, cy);
      qCtx.lineTo(cx + radius + 14, cy);
      qCtx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      qCtx.lineWidth = 1;
      qCtx.stroke();

      // State boundary pole labels: |0> and |1>
      qCtx.font = 'bold 12px JetBrains Mono, monospace';
      qCtx.fillStyle = '#DDD6FE';
      qCtx.textAlign = 'center';
      qCtx.fillText('|0⟩', cx, cy - radius - 18);
      qCtx.fillText('|1⟩', cx, cy + radius + 24);

      // Superposition state vector angle theta (0 = pure |0>, PI = pure |1>)
      const theta = prob1 * Math.PI;
      const vx = cx + Math.sin(theta) * radius;
      const vy = cy - Math.cos(theta) * radius;

      // Glow beam
      qCtx.beginPath();
      qCtx.moveTo(cx, cy);
      qCtx.lineTo(vx, vy);
      qCtx.strokeStyle = '#10B981';
      qCtx.lineWidth = 3.5;
      qCtx.shadowColor = 'rgba(16, 185, 129, 0.8)';
      qCtx.shadowBlur = 12;
      qCtx.stroke();
      qCtx.shadowBlur = 0;

      // Vector apex bead
      qCtx.beginPath();
      qCtx.arc(vx, vy, 7, 0, Math.PI * 2);
      qCtx.fillStyle = '#34D399';
      qCtx.shadowColor = '#10B981';
      qCtx.shadowBlur = 16;
      qCtx.fill();
      qCtx.shadowBlur = 0;
    }

    if (slider) {
      slider.addEventListener('input', (e) => {
        updateQubitDisplay(parseFloat(e.target.value));
      });
      updateQubitDisplay(50);
    }
  }

  function setupMeasurementCollapse() {
    const measureBtn = document.getElementById('measureQubitBtn');
    const resultDisplay = document.getElementById('measurementResultDisplay');
    const explanationEl = document.getElementById('measurementExplanation');

    if (!measureBtn) return;

    measureBtn.addEventListener('click', () => {
      // Simulate quantum wave function collapse based on probability amplitude
      const randomSeed = Math.random();
      const collapsedToState1 = randomSeed < currentProb1;
      const collapsedState = collapsedToState1 ? '|1⟩' : '|0⟩';
      const actualProb = collapsedToState1 ? Math.round(currentProb1 * 100) : Math.round((1 - currentProb1) * 100);

      if (resultDisplay) {
        resultDisplay.textContent = `COLLAPSED TO STATE ${collapsedState}`;
        resultDisplay.style.color = collapsedToState1 ? '#34D399' : '#A78BFA';
        resultDisplay.classList.add('pulse-once');
        setTimeout(() => resultDisplay.classList.remove('pulse-once'), 600);
      }

      if (explanationEl) {
        explanationEl.textContent = `Observer interaction destroyed superposition. The quantum wave collapsed into definitive state ${collapsedState} (occurrence probability was ${actualProb}% based on $|\psi\rangle$ amplitude).`;
      }
    });
  }

  function setupHorizonScrollHighlight() {
    // Elegant narrative highlight for the 6 future technology blocks
    const chapters = document.querySelectorAll('.future-tech-narrative-block');
    if (!chapters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-focus');
        }
      });
    }, { threshold: 0.25 });

    chapters.forEach(c => observer.observe(c));
  }

  document.addEventListener('DOMContentLoaded', init);

  return { init };
})();
