/**
 * IT: THE WORLD WE BUILT — Chapter 03: Builder & Alternative Systems Engine (builder.js)
 * Powers the Interactive Network Diagram, Knowledge Grid Simulator, and Civilization World Builder.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNetworkDiagram();
  initKnowledgeGrid();
  initCivilizationBuilder();
});

/* ==========================================================================
   1. Interactive Human Infrastructure Network Diagram
   ========================================================================== */
const networkNodeDetails = {
  hub: {
    title: "HUMAN INFRASTRUCTURE NETWORK",
    subtitle: "The Central Civic Backbone",
    desc: "In the absence of digital IT, human networks, physical relays, and mechanical coordination form the sovereign infrastructure of civilization."
  },
  communication: {
    title: "COMMUNICATION RELAY",
    subtitle: "Physical Couriers, Pneumatic Tubes & Copper Lines",
    desc: "Messages travel through high-speed rail dispatches, pneumatic city circuits, and operator-switched copper telephone lines. Information moves with deliberate human presence."
  },
  finance: {
    title: "PHYSICAL FINANCE NETWORK",
    subtitle: "Secured Vaults, Token Ledgers & Trust Hubs",
    desc: "Transactions clear through regional banking halls, embossed token certificates, and verified signatory affidavits rather than digital cloud ledgers."
  },
  healthcare: {
    title: "CONNECTED MEDICAL RELAY",
    subtitle: "Tiered Diagnostics & Physical Specimen Dispatch",
    desc: "Patient care moves seamlessly from neighborhood clinics to regional research hospitals using dedicated diagnostic couriers and manual laboratory registers."
  },
  education: {
    title: "CIVIC KNOWLEDGE CENTERS",
    subtitle: "Living Repositories & Master Guilds",
    desc: "Learning flourishes within community reference citadels, structured correspondence courses, and master-apprentice guilds."
  },
  commerce: {
    title: "LOCAL COMMERCE NETWORK",
    subtitle: "Regional Cooperatives & Physical Supply Chains",
    desc: "Commerce is grounded in local storefronts, municipal warehouses, and direct producer-consumer relationships, fortifying neighborhood resilience."
  },
  transport: {
    title: "MECHANICAL TRANSIT GRID",
    subtitle: "Synchronized Rail & Scheduled Freight",
    desc: "High-density passenger rail and freight shipping operate with mechanical clockwork precision, moving goods without automated GPS routing."
  },
  knowledge: {
    title: "THE KNOWLEDGE GRID",
    subtitle: "Massive Municipal Archives & Expert Curators",
    desc: "Human research specialists catalog, verify, and retrieve authoritative knowledge on demand within minutes across municipal library branches."
  }
};

function initNetworkDiagram() {
  const nodes = document.querySelectorAll('.network-node-circle');
  const detailBox = document.getElementById('networkActiveDetail');
  if (!nodes.length || !detailBox) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-node');
      const data = networkNodeDetails[key];
      if (!data) return;

      nodes.forEach(n => n.classList.remove('active-node'));
      node.classList.add('active-node');

      detailBox.style.opacity = '0';
      detailBox.style.transform = 'translateY(6px)';

      setTimeout(() => {
        detailBox.innerHTML = `
          <span class="tag-chapter mb-2"><span class="indicator-dot"></span> ${data.subtitle}</span>
          <h4 class="text-accent-emerald mb-2">${data.title}</h4>
          <p class="text-secondary mb-0">${data.desc}</p>
        `;
        detailBox.style.opacity = '1';
        detailBox.style.transform = 'translateY(0)';
      }, 100);

      if (window.SoundEngine) window.SoundEngine.playTone(680, 0.08, 'sine');
    });
  });
}

/* ==========================================================================
   2. The Knowledge Grid Search Simulator
   ========================================================================== */
function initKnowledgeGrid() {
  const input = document.getElementById('kgQueryInput');
  const submitBtn = document.getElementById('kgSubmitBtn');
  const resultDossier = document.getElementById('kgResultDossier');
  const chips = document.querySelectorAll('.kg-preset-chip');

  if (!input || !submitBtn || !resultDossier) return;

  const runSearch = (queryText) => {
    const q = (queryText || input.value || '').trim();
    if (!q) return;

    if (window.SoundEngine) window.SoundEngine.playChime();

    submitBtn.disabled = true;
    submitBtn.textContent = 'DISPATCHING COURIER...';

    resultDossier.classList.remove('active');

    setTimeout(() => {
      renderKnowledgeGridResult(q);
      submitBtn.disabled = false;
      submitBtn.textContent = 'QUERY GRID';
    }, 450);
  };

  submitBtn.addEventListener('click', () => runSearch(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch(input.value);
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      input.value = query;
      runSearch(query);
    });
  });
}

function renderKnowledgeGridResult(query) {
  const dossier = document.getElementById('kgResultDossier');
  if (!dossier) return;

  // Generate pseudo-deterministic values based on query length
  const hash = query.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const distance = ((hash % 40) / 10 + 1.2).toFixed(1);
  const minutes = (12 + (hash % 16));
  const sources = (28 + (hash % 50));
  const slipId = `KG-${(hash % 900) + 100}-${query.substring(0, 3).toUpperCase()}`;

  dossier.innerHTML = `
    <div class="kg-dossier-header">
      <span>TRANSMISSION REF: ${slipId}</span>
      <span>STATUS: DISPATCH COMPLETE</span>
    </div>

    <div class="mb-3">
      <span class="text-mono small text-dim">INQUIRY SUBJECT:</span>
      <h4 class="text-primary mt-1">“${query}”</h4>
    </div>

    <div class="kg-stats-row">
      <div class="kg-stat-box">
        <div class="kg-stat-val text-accent-emerald">${distance} km</div>
        <div class="kg-stat-label">Nearest Knowledge Centre</div>
      </div>
      <div class="kg-stat-box">
        <div class="kg-stat-val text-primary">${minutes} min</div>
        <div class="kg-stat-label">Estimated Retrieval Time</div>
      </div>
      <div class="kg-stat-box">
        <div class="kg-stat-val text-primary">${sources}</div>
        <div class="kg-stat-label">Physical Folios & Volumes</div>
      </div>
      <div class="kg-stat-box">
        <div class="kg-stat-val text-accent-emerald">YES</div>
        <div class="kg-stat-label">Human Specialist Available</div>
      </div>
    </div>

    <div class="p-3 rounded bg-black bg-opacity-40 border border-secondary border-opacity-10 text-secondary small">
      <strong class="text-primary d-block mb-1">Archival Dispatch Memo:</strong>
      "Pneumatic cylinder arrived at District 4 Botanical Archives. Senior Research Cataloger pulled 3 cross-referenced treatises including Engelmann's light spectrum plates. Physical micro-folios packaged for carrier dispatch."
    </div>
  `;

  dossier.classList.add('active');
}

/* ==========================================================================
   3. "Build Your Alternative World" Civilization Simulator
   ========================================================================== */
function initCivilizationBuilder() {
  const categoryBlocks = document.querySelectorAll('.civ-category-block');
  const triggerBtn = document.getElementById('civBuildTriggerBtn');
  const resultDossier = document.getElementById('civResultDossier');

  if (!categoryBlocks.length || !triggerBtn || !resultDossier) return;

  // Track user selections
  const userChoices = {
    communication: "Physical Relay",
    banking: "Secure Token",
    education: "Knowledge Centres",
    healthcare: "Medical Relay",
    shopping: "Local Commerce"
  };

  categoryBlocks.forEach(block => {
    const cat = block.getAttribute('data-cat');
    const cards = block.querySelectorAll('.civ-opt-card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        userChoices[cat] = card.getAttribute('data-value');
        if (window.SoundEngine) window.SoundEngine.playTone(520, 0.05, 'sine');
      });
    });
  });

  triggerBtn.addEventListener('click', () => {
    triggerBtn.disabled = true;
    triggerBtn.textContent = 'COMPUTING SOCIETAL EQUILIBRIUM...';

    if (window.SoundEngine) window.SoundEngine.playChime();

    setTimeout(() => {
      evaluateAndRenderWorld(userChoices, resultDossier);
      triggerBtn.disabled = false;
      triggerBtn.textContent = 'RE-GENERATE CIVILIZATION';
      resultDossier.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  });
}

function evaluateAndRenderWorld(choices, container) {
  // Civilization archetype logic
  let archetypeTitle = "THE ANALOG CITADEL";
  let resilienceScore = 88;
  let speedScore = 62;
  let humanProximity = 95;
  let privacyScore = 92;
  let scalability = 58;

  // Dynamic calculations based on combinations
  if (choices.communication === "Radio Network") {
    speedScore += 18;
    privacyScore -= 12;
  }
  if (choices.communication === "Physical Relay") {
    privacyScore += 6;
    resilienceScore += 5;
    speedScore -= 10;
  }

  if (choices.banking === "Telephone Verification") {
    speedScore += 12;
    resilienceScore -= 6;
  }
  if (choices.banking === "Secure Token") {
    resilienceScore += 8;
    privacyScore += 6;
  }

  if (choices.education === "Community Libraries") {
    humanProximity += 4;
  }
  if (choices.education === "Correspondence Learning") {
    scalability += 15;
    humanProximity -= 8;
  }

  if (choices.shopping === "Local Commerce") {
    humanProximity += 5;
    resilienceScore += 6;
  }
  if (choices.shopping === "Physical Distribution Network") {
    scalability += 16;
    speedScore += 8;
  }

  // Determine title
  if (choices.communication === "Radio Network" && choices.banking === "Telephone Verification") {
    archetypeTitle = "THE RESONANT COMMONWEALTH";
  } else if (choices.shopping === "Local Commerce" && choices.education === "Community Libraries") {
    archetypeTitle = "THE GUILD CITADEL";
  } else if (choices.communication === "Physical Relay" && choices.banking === "Secure Token") {
    archetypeTitle = "THE COURIER FEDERATION";
  } else {
    archetypeTitle = "THE HIGH-FIDELITY ANALOG COMMONWEALTH";
  }

  container.innerHTML = `
    <span class="civ-result-badge">CIVILIZATION PROFILE GENERATED</span>
    <h3 class="civ-result-title text-accent-emerald">${archetypeTitle}</h3>
    
    <div class="row g-3 mb-4 text-mono small">
      <div class="col-sm-4"><span class="text-dim">COMMUNICATION:</span> <span class="text-primary">${choices.communication}</span></div>
      <div class="col-sm-4"><span class="text-dim">FINANCE:</span> <span class="text-primary">${choices.banking}</span></div>
      <div class="col-sm-4"><span class="text-dim">EDUCATION:</span> <span class="text-primary">${choices.education}</span></div>
      <div class="col-sm-4"><span class="text-dim">HEALTHCARE:</span> <span class="text-primary">${choices.healthcare}</span></div>
      <div class="col-sm-4"><span class="text-dim">COMMERCE:</span> <span class="text-primary">${choices.shopping}</span></div>
    </div>

    <div class="civ-radar-bars">
      <div class="civ-bar-item">
        <div class="bar-label"><span>Systemic Resilience</span><span>${resilienceScore}%</span></div>
        <div class="civ-bar-track"><div class="civ-bar-fill" style="width: ${resilienceScore}%"></div></div>
      </div>
      <div class="civ-bar-item">
        <div class="bar-label"><span>Transaction Speed</span><span>${speedScore}%</span></div>
        <div class="civ-bar-track"><div class="civ-bar-fill" style="width: ${speedScore}%"></div></div>
      </div>
      <div class="civ-bar-item">
        <div class="bar-label"><span>Human Proximity</span><span>${humanProximity}%</span></div>
        <div class="civ-bar-track"><div class="civ-bar-fill" style="width: ${humanProximity}%"></div></div>
      </div>
      <div class="civ-bar-item">
        <div class="bar-label"><span>Privacy & Autonomy</span><span>${privacyScore}%</span></div>
        <div class="civ-bar-track"><div class="civ-bar-fill" style="width: ${privacyScore}%"></div></div>
      </div>
      <div class="civ-bar-item">
        <div class="bar-label"><span>Continental Scalability</span><span>${scalability}%</span></div>
        <div class="civ-bar-track"><div class="civ-bar-fill" style="width: ${scalability}%"></div></div>
      </div>
    </div>

    <div class="p-4 rounded bg-surface border border-secondary border-opacity-10">
      <h5 class="text-primary mb-2">Societal Profile Analysis:</h5>
      <p class="text-secondary mb-3">
        Your civilization achieves high civic cohesion through <strong>${choices.communication}</strong> and <strong>${choices.shopping}</strong>. By refusing digital intermediaries, your population maintains direct community bonds, eliminates cyber-extortion, and preserves physical institutional memory.
      </p>
      <p class="text-secondary mb-0">
        <em>Key Civilization Trade-off:</em> While immune to automated grid malware and algorithmic polarization, coordination across transcontinental distances requires disciplined scheduling and manual verification protocols.
      </p>
    </div>
  `;

  container.classList.add('revealed');
}
