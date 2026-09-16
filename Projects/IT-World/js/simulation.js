/**
 * IT: THE WORLD WE BUILT — Chapter 02: Simulation Engine (simulation.js)
 * Powers the Alternate History Stepper, Domain Comparisons, and Trade-off Matrix.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAltTimeline();
  initDomainFilters();
  initTradeoffInspector();
});

/* ==========================================================================
   1. Day 0 to Today Alternate History Progression
   ========================================================================== */
const altTimelineData = {
  day0: {
    epoch: "DAY 0 — THE FORK IN CIVILIZATION",
    title: "The Silicon Transition Stalls",
    body: "In this imagined timeline, digital computation never scales beyond room-sized electromechanical mainframes. The microchip revolution never occurs. Human ingenuity turns outward toward mechanical efficiency, pneumatic transmission, optical relay towers, and meticulous paper record-keeping.",
    stats: {
      speed: "Mechanical Relay",
      storage: "Physical Ledgers & Microfilm",
      radius: "Local & Regional"
    }
  },
  day1: {
    epoch: "DAY 1 — THE TELEGRAPH & COURIER IMPERATIVE",
    title: "Global Communication Relies on Copper & Steam",
    body: "Without packet switching or binary networks, national governments double down on high-speed pneumatic mail cartridges, copper telegraph lines, and transcontinental express rail couriers. Information moves at the speed of trains and telegraph operators.",
    stats: {
      speed: "Telegraph Speed (Morse)",
      storage: "Paper Vaults",
      radius: "National Hubs"
    }
  },
  year1: {
    epoch: "YEAR 1 — EXPANSION OF PHYSICAL CLEARINGHOUSES",
    title: "The Rise of Mechanical Clearing Centers",
    body: "Banks, shipping firms, and trade syndicates construct cathedral-sized physical clearinghouses. Hundreds of clerks verify paper bills of exchange, emboss wax seals, and cross-examine hand-signed ledger pages using mechanical adding devices.",
    stats: {
      speed: "24-48 Hour Clearing",
      storage: "Filing Cabinets & Safe Rooms",
      radius: "Metropolitan Rings"
    }
  },
  year10: {
    epoch: "YEAR 10 — PNEUMATIC TUBE ARTERIES & OPTICAL TOWERS",
    title: "Cities Transform Into Analog Networks",
    body: "Major metropolises install underground pneumatic tubing networks connecting government halls, financial exchanges, and central hospitals. Line-of-sight optical telegraph towers crest city skylines, flashing coded signals between regional hilltops in seconds.",
    stats: {
      speed: "City-Wide Pneumatic (12 min)",
      storage: "Microfiche Archives",
      radius: "Regional Corridors"
    }
  },
  year25: {
    epoch: "YEAR 25 — THE GOLDEN AGE OF INSTITUTIONAL ARCHIVES",
    title: "Libraries Become Civilization's Citadel",
    body: "Without search engines, municipal reference libraries evolve into vast, hyper-cataloged knowledge engines. Tens of thousands of trained research archivists pull cross-referenced card catalogs for students, doctors, and engineers within thirty minutes.",
    stats: {
      speed: "Human-Curated Retrieval",
      storage: "Vast High-Density Paper Silos",
      radius: "Community Centric"
    }
  },
  today: {
    epoch: "TODAY — THE HYPER-OPTIMIZED ANALOG WORLD",
    title: "A Tangible, Highly Connected Alternative Reality",
    body: "Society is sophisticated, literate, and deeply resilient. Neighborhoods boast thriving high streets with independent merchants; communities rely on face-to-face trust and verified paper credentials. There are no algorithmic echo chambers, but long-distance coordination requires profound patience and physical logistics.",
    stats: {
      speed: "Human & Mechanical Harmony",
      storage: "Multi-Tier Paper & Film Vaults",
      radius: "Vibrant Local Dependencies"
    }
  }
};

function initAltTimeline() {
  const nodes = document.querySelectorAll('.alt-timeline-node');
  const displayCard = document.getElementById('altTimelineActiveDisplay');
  if (!nodes.length) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const step = node.getAttribute('data-step');
      if (!altTimelineData[step]) return;

      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      if (displayCard) {
        renderAltDisplayCard(step, displayCard);
      }

      if (window.SoundEngine) {
        window.SoundEngine.playTone(440, 0.08, 'sawtooth');
      }
    });
  });
}

function renderAltDisplayCard(step, container) {
  const data = altTimelineData[step];
  if (!data) return;

  container.style.opacity = '0.3';
  container.style.transform = 'translateY(6px)';

  setTimeout(() => {
    container.innerHTML = `
      <span class="alt-node-epoch">${data.epoch}</span>
      <h3 class="alt-node-title">${data.title}</h3>
      <p class="alt-node-body mb-4">${data.body}</p>
      
      <div class="row g-2 pt-3 border-top border-secondary border-opacity-25">
        <div class="col-sm-4">
          <div class="small text-mono text-dim">DISPATCH SPEED:</div>
          <div class="text-mono small text-primary font-weight-bold">${data.stats.speed}</div>
        </div>
        <div class="col-sm-4">
          <div class="small text-mono text-dim">PRIMARY MEDIUM:</div>
          <div class="text-mono small text-primary font-weight-bold">${data.stats.storage}</div>
        </div>
        <div class="col-sm-4">
          <div class="small text-mono text-dim">SOCIAL RADIUS:</div>
          <div class="text-mono small text-accent-orange font-weight-bold">${data.stats.radius}</div>
        </div>
      </div>
    `;
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 120);
}

/* ==========================================================================
   2. Domain Comparison Interactive Filter
   ========================================================================== */
function initDomainFilters() {
  const filterBtns = document.querySelectorAll('.domain-filter-btn');
  const cards = document.querySelectorAll('.domain-comparison-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetDomain = btn.getAttribute('data-domain');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cardDomain = card.getAttribute('data-domain');
        if (targetDomain === 'all' || cardDomain === targetDomain) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      if (window.SoundEngine) window.SoundEngine.playClick();
    });
  });
}

/* ==========================================================================
   3. Trade-off Matrix Hover & Inspection
   ========================================================================== */
function initTradeoffInspector() {
  const rows = document.querySelectorAll('.tradeoff-row:not(.tradeoff-header-row)');
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.borderColor = 'rgba(249, 115, 22, 0.4)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    });
  });
}
