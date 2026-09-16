/**
 * IT: THE WORLD WE BUILT — Chapter 01: Future Engine (future.js)
 * Powers the 2026-2029 Timeline, Job Simulator, Scenario Selector, and Trio Cards.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initTrioCards();
  initJobSimulator();
  initScenarioSelector();
  animateSkillsOnScroll();
});

/* ==========================================================================
   1. Interactive Timeline 2026 -> 2029
   ========================================================================== */
const timelineData = {
  2026: {
    badge: "FOUNDATIONAL HYBRID ERA",
    title: "Augmentation & The Copilot Stage",
    description: "Developers and IT professionals widely adopt AI copilots for autocomplete and snippet generation. Human developers remain the primary authors of logic, architecture, and deployment pipelines. AI serves primarily as an accelerated lookup engine and junior pair programmer.",
    metrics: [
      { label: "Assisted Code Writing", val: "35% - 48%" },
      { label: "Autonomous Agent Decisions", val: "< 5%" },
      { label: "Human Verification Need", val: "Continuous & Direct" }
    ]
  },
  2027: {
    badge: "INTEGRATION & WORKFLOW REFACTOR",
    title: "Multi-Agent Systems & Continuous Context",
    description: "Specialized agentic tools start orchestrating multi-file pull requests, automated test generation, and incident triage. Engineering teams shift from line-by-line syntax writing to reviewing system proposals, specification design, and cross-service security boundaries.",
    metrics: [
      { label: "Assisted Code Writing", val: "55% - 65%" },
      { label: "Autonomous Agent Decisions", val: "18% - 25%" },
      { label: "Human Verification Need", val: "Architectural & Gatekeeper" }
    ]
  },
  2028: {
    badge: "ARCHITECTURAL ORCHESTRATION",
    title: "Intent-Driven Infrastructure & Adaptive Systems",
    description: "Systems transition toward natural intent configuration. Cloud infrastructure self-tunes against latency, cost, and threat surfaces. IT operations become predominantly automated for routine scaling and patch management, elevating human roles into system architects and compliance custodians.",
    metrics: [
      { label: "Assisted Code Writing", val: "70% - 80%" },
      { label: "Autonomous Agent Decisions", val: "38% - 45%" },
      { label: "Human Verification Need", val: "Intent & Strategic Alignment" }
    ]
  },
  2029: {
    badge: "THE SYSTEM IDENTITY SHIFT",
    title: "Symbiotic Systems & Human Judgment Core",
    description: "The definition of an IT professional has evolved. Software creation is no longer constrained by mechanical typing speed, but by conceptual clarity, domain empathy, safety governance, and human judgment. Technology operates as an ambient cognitive infrastructure woven into every business process.",
    metrics: [
      { label: "Assisted Code Writing", val: "80% - 90%+" },
      { label: "Autonomous Agent Decisions", val: "55% - 65%" },
      { label: "Human Verification Need", val: "Ethical, Core Truth & Resilience" }
    ]
  }
};

function initTimeline() {
  const buttons = document.querySelectorAll('.timeline-step-btn');
  const panel = document.getElementById('timelinePanel');
  if (!buttons.length || !panel) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const year = btn.getAttribute('data-year');
      if (!timelineData[year]) return;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      renderTimelinePanel(year);
      if (window.SoundEngine) window.SoundEngine.playTone(380 + (parseInt(year) - 2026) * 90, 0.08);
    });
  });
}

function renderTimelinePanel(year) {
  const data = timelineData[year];
  const panel = document.getElementById('timelinePanel');
  if (!panel || !data) return;

  panel.style.opacity = '0';
  panel.style.transform = 'translateY(6px)';

  setTimeout(() => {
    panel.innerHTML = `
      <span class="timeline-panel-badge">${data.badge}</span>
      <h3 class="timeline-panel-title">${year}: ${data.title}</h3>
      <p class="timeline-panel-desc">${data.description}</p>
      <div class="timeline-metrics-grid">
        ${data.metrics.map(m => `
          <div class="timeline-metric-card">
            <div class="timeline-metric-val">${m.val}</div>
            <div class="timeline-metric-lbl">${m.label}</div>
          </div>
        `).join('')}
      </div>
    `;
    panel.style.opacity = '1';
    panel.style.transform = 'translateY(0)';
  }, 150);
}

/* ==========================================================================
   2. Replace / Reshape / Create Interactive Trio Cards
   ========================================================================== */
function initTrioCards() {
  const cards = document.querySelectorAll('.trio-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isAlreadyExpanded = card.classList.contains('expanded');
      
      // Close other cards for clean presentation
      cards.forEach(c => {
        c.classList.remove('expanded');
        const hint = c.querySelector('.trio-expand-hint span');
        if (hint) hint.textContent = 'Click to explore deep breakdown';
      });

      if (!isAlreadyExpanded) {
        card.classList.add('expanded');
        const hint = card.querySelector('.trio-expand-hint span');
        if (hint) hint.textContent = 'Click to collapse breakdown';
        if (window.SoundEngine) window.SoundEngine.playTone(600, 0.1, 'triangle');
      }
    });
  });
}

/* ==========================================================================
   3. "Your Job In 2029" Interactive Role Simulator
   ========================================================================== */
const jobRoleData = {
  developer: {
    title: "Software Developer",
    now: {
      year: "2026",
      desc: "Developers spend significant hours writing routine boilerplate, running manual debugging sessions, fixing syntax bugs, and writing unit tests with conventional IDE tools.",
      elements: [
        "Writing & debugging individual code functions manually",
        "StackOverflow & documentation searching",
        "Routine Git conflict resolution and PR reviews",
        "Writing test coverage scripts manually"
      ]
    },
    future: {
      year: "2029 (Projected Evolution)",
      desc: "Developers may increasingly act as System Architects and Verification Directors. Routine synthesis is handled by multi-agent coding engines, shifting human focus to system architecture, complex constraints, edge-case validation, and security boundaries.",
      elements: [
        "Prompt-driven & specification-level architecture definition",
        "Synthesized code audit, security & latency verification",
        "Focus on domain-specific business logic & edge cases",
        "Human-in-the-loop ethical and regulatory review"
      ]
    }
  },
  support: {
    title: "IT Support Specialist",
    now: {
      year: "2026",
      desc: "Support staff triage tickets manually, perform password resets, guide end-users through standard network reconnection steps, and document hardware issues.",
      elements: [
        "Manual ticket categorization and priority assignment",
        "Repetitive credential and login resets",
        "Standard operating procedure walkthroughs over phone/chat",
        "Hardware provisioning and inventory tracking"
      ]
    },
    future: {
      year: "2029 (Projected Evolution)",
      desc: "First-tier resolution may be almost entirely resolved by contextual conversational assistants. Support engineers likely evolve into Experience & Infrastructure Reliability Specialists, handling complex organizational anomalies and human crisis escalations.",
      elements: [
        "Managing autonomous self-healing IT diagnostic fleets",
        "High-empathy escalations for mission-critical business disruptions",
        "Zero-trust credential lifecycle policy tuning",
        "Cross-organizational technology onboarding and training"
      ]
    }
  },
  analyst: {
    title: "Data Analyst",
    now: {
      year: "2026",
      desc: "Analysts spend substantial time writing SQL queries, cleaning incomplete CSVs, stitching disparate databases, and building manual dashboard visualizations.",
      elements: [
        "Manual SQL querying and database transformation",
        "Spreadsheet formula cleaning and missing-data imputation",
        "Building static Business Intelligence reports",
        "Explaining historical trend shifts retroactively"
      ]
    },
    future: {
      year: "2029 (Projected Evolution)",
      desc: "Autonomous query pipelines could automatically spot statistical anomalies and build dynamic visual narratives. The analyst’s role may focus on framing critical business hypotheses, investigating causality, and questioning automated model assumptions.",
      elements: [
        "Strategic hypothesis formulation and causal modeling",
        "Validating autonomous insight engines for hidden bias",
        "Translating abstract data insights into board-level decisions",
        "Data lineage integrity and sovereign privacy oversight"
      ]
    }
  },
  tester: {
    title: "Software Tester / QA Engineer",
    now: {
      year: "2026",
      desc: "Testers write regression scripts, perform click-through exploratory tests, maintain Selenium/Cypress suites, and file detailed reproduction bug reports.",
      elements: [
        "Manual UI sanity checks and edge-case click-paths",
        "Writing brittle end-to-end regression scripts",
        "Filing manual reproduction logs in issue trackers",
        "Testing API endpoints against schema documentation"
      ]
    },
    future: {
      year: "2029 (Projected Evolution)",
      desc: "Automated agent fleets can generate thousands of concurrent exploratory tests and synthetic user journeys. QA engineers are likely to transition into Quality Strategists and System Resilience Architects, designing chaotic stress scenarios and user-experience guardrails.",
      elements: [
        "Designing continuous synthetic adversary tests",
        "Defining ethical safety and behavioral guardrails",
        "Resilience engineering and chaos testing orchestration",
        "Real-user perceptual friction analysis"
      ]
    }
  },
  designer: {
    title: "UI/UX Designer",
    now: {
      year: "2026",
      desc: "Designers construct wireframes, build high-fidelity Figma components, manage design system tokens, and prepare handoff assets for frontend teams.",
      elements: [
        "Crafting component variants and layout responsive states",
        "Manual prototyping and micro-interaction keyframing",
        "Handoff documentation for engineering teams",
        "Static user journey mapping"
      ]
    },
    future: {
      year: "2029 (Projected Evolution)",
      desc: "Interfaces may become dynamically generative, adapting layout and affordances in real time to each user's context. Designers may focus on brand emotional tonality, systemic interaction ethics, accessibility paradigms, and cognitive ergonomics.",
      elements: [
        "Directing generative and contextual interface engines",
        "Behavioral psychology and cognitive load optimization",
        "Human-AI dialogue ergonomics and emotional trust design",
        "Universal accessibility and multi-modal sensory design"
      ]
    }
  }
};

function initJobSimulator() {
  const roleButtons = document.querySelectorAll('.role-pill-btn');
  const stage = document.getElementById('roleSimulationStage');
  if (!roleButtons.length || !stage) return;

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const roleKey = btn.getAttribute('data-role');
      if (!jobRoleData[roleKey]) return;

      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      renderRoleSimulation(roleKey);
    });
  });
}

function renderRoleSimulation(roleKey) {
  const role = jobRoleData[roleKey];
  const stage = document.getElementById('roleSimulationStage');
  if (!stage || !role) return;

  stage.style.opacity = '0.3';
  stage.style.transform = 'scale(0.99)';

  setTimeout(() => {
    stage.innerHTML = `
      <div class="sim-side-card now-card">
        <div class="sim-year-tag">
          <span>${role.now.year}</span>
          <span class="sim-status-pill">CONVENTIONAL PRACTICE</span>
        </div>
        <h4 class="mb-3">${role.title} — Present Reality</h4>
        <p class="sim-body-text">${role.now.desc}</p>
        <ul class="sim-key-elements">
          ${role.now.elements.map(e => `<li><span class="text-dim">→</span> ${e}</li>`).join('')}
        </ul>
      </div>

      <div class="sim-side-card future-card">
        <div class="sim-year-tag">
          <span class="text-accent-orange">${role.future.year}</span>
          <span class="sim-status-pill">POSSIBLE EVOLUTION</span>
        </div>
        <h4 class="mb-3">${role.title} — Emergent Future</h4>
        <p class="sim-body-text">${role.future.desc}</p>
        <ul class="sim-key-elements">
          ${role.future.elements.map(e => `<li><span class="text-accent-orange">✦</span> ${e}</li>`).join('')}
        </ul>
      </div>
    `;
    stage.style.opacity = '1';
    stage.style.transform = 'scale(1)';
  }, 120);
}

/* ==========================================================================
   4. Three Possible 2029s Scenario Selector
   ========================================================================== */
const scenariosData = {
  a: {
    letter: "SCENARIO A",
    title: "AI ACCELERATES",
    headline: "Unfettered Integration & Maximum Velocity",
    summary: "Artificial intelligence becomes deeply integrated into almost every layer of software development and IT operations. Autonomous systems synthesize code, manage cloud environments, and triage security incidents with minimal friction.",
    consequences: [
      { title: "HYPER-AUTOMATION", desc: "Routine testing, documentation, and tier-1 support are 80%+ automated." },
      { title: "COMPRESSION OF DEV CYCLES", desc: "Software delivery cycles shrink from months to continuous hourly releases." },
      { title: "INTENSE RESKILLING", desc: "Professionals who cannot orchestrate agentic systems face acute market pressure." },
      { title: "SYSTEM FRAGILITY RISKS", desc: "High reliance on complex synthesized logic introduces subtle systemic vulnerabilities." }
    ]
  },
  b: {
    letter: "SCENARIO B",
    title: "HUMAN + AI SYMBIOSIS",
    headline: "Balanced Augmentation & Human Stewardship",
    summary: "AI manages cognitive grunt work while humans remain strictly central to architecture, ethical accountability, creativity, and strategic domain nuance. Organizations institutionalize 'human-in-the-loop' mandates for mission-critical logic.",
    consequences: [
      { title: "HYBRID PROFESSIONS", desc: "Teams blend technical fluency with deep domain empathy and critical inquiry." },
      { title: "ETHICAL ACCOUNTABILITY", desc: "Humans remain legally and morally liable for automated outcomes and safety." },
      { title: "CONTINUOUS COLLABORATIVE LEARNING", desc: "Workplace training shifts toward cognitive agility and prompt-driven orchestration." },
      { title: "SUSTAINABLE TALENT RETENTION", desc: "Workers report lower burnout on routine tasks and higher creative fulfillment." }
    ]
  },
  c: {
    letter: "SCENARIO C",
    title: "THE REGULATION ERA",
    headline: "Governance, Data Sovereignty & Guardrails",
    summary: "Governments, multilateral institutions, and global consortiums establish stringent boundaries around automated decision-making, synthetic data liability, copyright provenance, and sovereign algorithmic auditing.",
    consequences: [
      { title: "GOVERNANCE-FIRST IT", desc: "Compliance, algorithmic auditing, and privacy certification become top-budget items." },
      { title: "PRUDENT DEPLOYMENTS", desc: "Healthcare, finance, and public infrastructure mandate verified human verification." },
      { title: "SOVEREIGN DATA BORDERS", desc: "Strict localized data residency slows centralized cross-border model training." },
      { title: "RISE OF AUDIT SPECIALISTS", desc: "Massive demand for AI Forensic Auditors and Algorithm Safety Engineers." }
    ]
  }
};

function initScenarioSelector() {
  const tabs = document.querySelectorAll('.scenario-tab-btn');
  const display = document.getElementById('scenarioDisplay');
  if (!tabs.length || !display) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const scenarioKey = tab.getAttribute('data-scenario');
      if (!scenariosData[scenarioKey]) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      renderScenario(scenarioKey);
    });
  });
}

function renderScenario(key) {
  const data = scenariosData[key];
  const display = document.getElementById('scenarioDisplay');
  if (!display || !data) return;

  display.style.opacity = '0.3';
  display.style.transform = 'translateY(6px)';

  setTimeout(() => {
    display.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="tag-chapter"><span class="indicator-dot"></span> ${data.letter}</span>
        <span class="text-mono text-dim small">SIMULATION EXPLORATION</span>
      </div>
      <h3 class="h2 mb-2">${data.title}</h3>
      <p class="text-accent-orange text-mono mb-3 font-weight-bold">${data.headline}</p>
      <p class="text-lead-editorial mb-4">${data.summary}</p>

      <h5 class="text-mono text-dim text-uppercase small letter-spacing-1 mb-3">Projected System Consequences:</h5>
      <div class="scenario-consequences-grid">
        ${data.consequences.map(c => `
          <div class="consequence-card">
            <div class="consequence-title">${c.title}</div>
            <p class="consequence-desc">${c.desc}</p>
          </div>
        `).join('')}
      </div>
    `;
    display.style.opacity = '1';
    display.style.transform = 'translateY(0)';
  }, 120);
}

/* ==========================================================================
   5. Skill Shift Progress Bar Animation
   ========================================================================== */
function animateSkillsOnScroll() {
  const skillSection = document.getElementById('skillShiftSection');
  if (!skillSection) return;

  const fills = skillSection.querySelectorAll('.skill-progress-fill');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        fills.forEach(bar => {
          const target = bar.getAttribute('data-target') || '75%';
          bar.style.width = target;
        });
        observer.unobserve(skillSection);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillSection);
}
