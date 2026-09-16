# IT: THE WORLD WE BUILT
> **“Imagine tomorrow. Remove yesterday. Design what comes next.”**

An interactive digital exhibition investigating the central thesis:
**“IT is not just an industry. It has become infrastructure for modern life.”**

---

## 🏛 Exhibition Overview (Three Chapters of One Continuous Story)

1. **Chapter 01: IT 2029 — THE SHIFT** (`index.html` / `/` / `/tomorrow`)
   - **Tone & Atmosphere**: *Fast → Intelligent → Evolving*
   - **Hero Thesis**: *"The future isn't about IT disappearing. It's about IT changing its identity."*
   - **Interactive 2026 → 2029 Timeline**: Clickable year scrubber analyzing how software creation transforms from manual syntax into intent-driven architecture.
   - **Replace / Reshape / Create**: Interactive expandable cards deconstructing tasks automated, jobs transformed, and emerging roles created.
   - **Your Job in 2029 (Role Simulator)**: Interactive simulation for Software Developers, IT Support, Data Analysts, Software Testers, and UI/UX Designers using nuanced, probabilistic analysis.
   - **The 2029 IT Landscape**: 5 foundational pillars (AI & Agentic Systems, Cloud + Edge, Cybersecurity, Human + AI Symbiosis, Automation).
   - **Three Possible 2029s**: Interactive scenario switcher (AI Accelerates, Human + AI, The Regulation Era).
   - **The Skill Shift**: Visual comparison between Technology Skills and Human Traits.
   - **Research Note**: World Economic Forum Future of Jobs Report 2025 (Global 2030 Outlook: ~170M roles created, ~92M displaced, +78M net increase).

2. **Chapter 02: THE WORLD THAT NEVER WENT DIGITAL** (`without-it.html` / `/without`)
   - **Tone & Atmosphere**: *Empty → Human → Physical → Alternate*
   - **Hero Question**: *"What if Information Technology had never been invented?"* (No internet, smartphones, cloud, digital banking, social media, online shopping... *What would humans have built instead?*)
   - **Day 0 to Today Chronology**: Interactive alternate-history stepper tracking society’s physical adaptations across Day 0, Day 1, Year 1, Year 10, Year 25, and Today.
   - **Domain Comparisons & Dilemmas**:
     - *Communication*: Instant messaging vs Pneumatic dispatch, copper telegraph, and physical relay centers.
     - *Banking*: Instant UPI & digital wallets vs Vault ledgers, cheques, and telephone verification.
     - *Healthcare*: EHRs & telemedicine vs Physical paper dossiers and diagnostic couriers.
     - *Education*: Global digital platforms vs Municipal reference citadels and master-apprentice guilds.
     - *Business*: Global cloud SaaS & e-commerce vs Local merchant cooperatives and high streets.
   - **The Trade-off Matrix**: *"Removing IT doesn't remove problems. It replaces them."* High-contrast comparison table.

3. **Chapter 03: DESIGNING THE ALTERNATIVE** (`beyond-it.html` / `/beyond`)
   - **Tone & Atmosphere**: *Inventive → Experimental → Hopeful*
   - **Hero Thesis**: *"If technology disappeared tomorrow, humans would not stop innovating."*
   - **The Human Infrastructure Network**: Interactive SVG radial network diagram linking the civic hub to Communication, Finance, Healthcare, Education, Commerce, Transport, and Knowledge.
   - **Five Non-Digital Systems**: Blueprints for Global Relay Network, Physical Finance Network, Connected Medical Relay, Local Commerce Network, and The Knowledge Grid.
   - **The Knowledge Grid Search Simulator**: Interactive input simulating how a non-digital archival grid dispatches human specialists and card-catalog references (e.g. testing *"How does photosynthesis work?"*).
   - **Build Your Alternative World**: Interactive civilization builder simulation allowing visitors to select 5 infrastructural pillars and generate a customized Societal Profile, resilience radar, and trade-off analysis.
   - **The Question & Climax**: *"If IT disappeared tomorrow, what would you build first?"* + Experience Restart trigger.

---

## ⚡ How to Run & View

### Option 1: Instant Direct Browser Preview (No Server Required)
Double-click `index.html` in your file explorer or open it in any modern browser:
```bash
# Path:
C:\Users\acer\.gemini\antigravity\scratch\it-the-world-we-built\index.html
```
All interactive features, timeline scrubbers, role simulators, search simulations, audio synthesizer, and navigation work directly off the local filesystem!

### Option 2: Run with Spring Boot & Thymeleaf
This project is fully configured as a standard Spring Boot 3.3.x Maven application with Thymeleaf templates.

```bash
cd C:\Users\acer\.gemini\antigravity\scratch\it-the-world-we-built
mvn spring-boot:run
```
Once started, visit:
- `http://localhost:8080/` (Chapter 01)
- `http://localhost:8080/without` (Chapter 02)
- `http://localhost:8080/beyond` (Chapter 03)

---

## 🎨 Visual Identity & Technical Architecture

- **Bespoke Color Palette**:
  - Deep near-black canvas (`#07080b`, `#0d0f15`, `#13161f`)
  - Off-white typography (`#f8fafc`, `#94a3b8`, `#64748b`)
  - Controlled burnt orange (`#ff6b35` / `#f97316`)
  - Deep crimson red (`#dc2626`)
  - Phosphor emerald green (`#10b981`)
- **Interactive Audio Feedback**: Built-in Web Audio API synthesizer generates gentle futuristic tactile clicks and chime responses without requiring external audio files. Sound can be toggled on/off with persistent memory.
- **Dual-Compatibility Templates**: Uses standard semantic HTML5 combined with Thymeleaf attributes (`th:replace`, `th:href` with fallback `href`), enabling flawless execution in both standalone static mode and dynamic Spring Boot mode.
- **Research Sources Paraphrased**:
  - World Economic Forum — *Future of Jobs Report 2025*
  - World Bank — *Digital Progress and Trends Report*
  - McKinsey Global Institute — *Research on AI-native & agentic software systems*
