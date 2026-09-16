/**
 * IT: THE WORLD WE BUILT — IT INFRASTRUCTURE & SYSTEM BUILDER (builder.js)
 * Interactive architectural topology simulator for Page 1.
 * Allows users to toggle digital infrastructure components and observe packet routing.
 */

window.WorldBuilder = (function () {
  'use strict';

  // Architectural Component Registry
  const components = {
    datacenter: { name: 'Hyperscale Data Center', active: true, icon: '🏢', x: 0.25, y: 0.45, throughput: 1.8, latency: 12 },
    subsea: { name: 'Subsea Fiber Cable Corridors', active: true, icon: '🌊', x: 0.5, y: 0.78, throughput: 2.4, latency: 28 },
    edge: { name: 'Distributed Edge CDN Pop Nodes', active: true, icon: '⚡', x: 0.75, y: 0.45, throughput: 0.8, latency: 4 },
    ai: { name: 'AI Tensor Neural Clusters', active: true, icon: '🧠', x: 0.5, y: 0.22, throughput: 1.2, latency: 16 },
    security: { name: 'Zero-Trust Cryptographic Firewall', active: true, icon: '🛡️', x: 0.38, y: 0.55, throughput: 0.4, latency: 2 },
    satellite: { name: 'LEO Orbital Satellite Mesh', active: false, icon: '🛰️', x: 0.65, y: 0.18, throughput: 0.6, latency: 45 }
  };

  let canvas = null;
  let ctx = null;
  let packets = [];

  function init() {
    canvas = document.getElementById('builderCanvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    setupToggleButtons();
    initPackets();
    animate();
    updateTelemetryReadouts();
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight || 480;
  }

  function setupToggleButtons() {
    const buttons = document.querySelectorAll('.component-toggle-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-component');
        if (components[key]) {
          components[key].active = !components[key].active;
          btn.classList.toggle('active', components[key].active);
          updateTelemetryReadouts();
        }
      });
    });
  }

  function updateTelemetryReadouts() {
    const latencyEl = document.getElementById('builderLatency');
    const throughputEl = document.getElementById('builderThroughput');
    const uptimeEl = document.getElementById('builderUptime');
    const nodesEl = document.getElementById('builderActiveNodes');

    let totalThroughput = 0;
    let activeCount = 0;
    let totalLatency = 0;

    for (const key in components) {
      if (components[key].active) {
        activeCount++;
        totalThroughput += components[key].throughput;
        totalLatency += components[key].latency;
      }
    }

    const avgLatency = activeCount > 0 ? Math.round(totalLatency / activeCount) : 999;
    const uptime = activeCount >= 4 ? '99.999%' : activeCount >= 2 ? '99.9%' : 'DEGRADED';

    if (latencyEl) latencyEl.textContent = `${avgLatency} ms`;
    if (throughputEl) throughputEl.textContent = `${totalThroughput.toFixed(1)} Tbps`;
    if (uptimeEl) uptimeEl.textContent = uptime;
    if (nodesEl) nodesEl.textContent = `${activeCount} / ${Object.keys(components).length}`;
  }

  function initPackets() {
    packets = [];
    for (let i = 0; i < 24; i++) {
      packets.push({
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.005,
        source: 'datacenter',
        target: 'edge'
      });
    }
  }

  function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    // Draw routing connections between active nodes
    const activeKeys = Object.keys(components).filter(k => components[k].active);

    for (let i = 0; i < activeKeys.length; i++) {
      for (let j = i + 1; j < activeKeys.length; j++) {
        const n1 = components[activeKeys[i]];
        const n2 = components[activeKeys[j]];

        const x1 = n1.x * w;
        const y1 = n1.y * h;
        const x2 = n2.x * w;
        const y2 = n2.y * h;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.22)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Animate flow packets between random pairs of active nodes
    if (activeKeys.length >= 2) {
      packets.forEach(pkt => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          const srcIdx = Math.floor(Math.random() * activeKeys.length);
          let dstIdx = Math.floor(Math.random() * activeKeys.length);
          while (dstIdx === srcIdx) {
            dstIdx = Math.floor(Math.random() * activeKeys.length);
          }
          pkt.source = activeKeys[srcIdx];
          pkt.target = activeKeys[dstIdx];
        }

        const s = components[pkt.source];
        const t = components[pkt.target];
        if (s && t && s.active && t.active) {
          const px = (s.x + (t.x - s.x) * pkt.progress) * w;
          const py = (s.y + (t.y - s.y) * pkt.progress) * h;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#C4B5FD';
          ctx.shadowColor = '#8B5CF6';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
    }

    // Draw component node circles & labels
    for (const key in components) {
      const node = components[key];
      const nx = node.x * w;
      const ny = node.y * h;

      ctx.beginPath();
      ctx.arc(nx, ny, node.active ? 26 : 20, 0, Math.PI * 2);
      ctx.fillStyle = node.active ? '#200C3C' : 'rgba(30, 15, 55, 0.4)';
      ctx.strokeStyle = node.active ? '#A78BFA' : 'rgba(167, 139, 250, 0.2)';
      ctx.lineWidth = node.active ? 2.5 : 1;
      ctx.shadowColor = node.active ? 'rgba(139, 92, 246, 0.5)' : 'transparent';
      ctx.shadowBlur = node.active ? 15 : 0;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw node icon
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.icon, nx, ny);

      // Label below
      ctx.font = '11px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = node.active ? '#DDD6FE' : '#64748B';
      ctx.fillText(node.name, nx, ny + 38);
    }

    requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', init);

  return { init };
})();
