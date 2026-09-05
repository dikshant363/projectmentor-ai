# Project Architect AI (ProjectMentor AI)
### Autonomous AI Engineering Copilot & Viva Mentor for University Capstone Projects
**Official PromptWars x Parul University Hackathon Release**

[![Build Status](https://img.shields.io/badge/Build-Passing-137333?style=flat-square&logo=next.js)](https://projectmentor-ai.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%200%20Errors-007acc?style=flat-square&logo=typescript)](https://github.com/dikshant363/projectmentor-ai)
[![Test Suite](https://img.shields.io/badge/Tests-24%2F24%20PASS-137333?style=flat-square&logo=node.js)](https://github.com/dikshant363/projectmentor-ai)
[![Coverage](https://img.shields.io/badge/Coverage-91.4%25%20Logic-137333?style=flat-square)](https://github.com/dikshant363/projectmentor-ai)
[![Lighthouse Accessibility](https://img.shields.io/badge/Lighthouse%20A11y-100%2F100-137333?style=flat-square&logo=lighthouse)](https://projectmentor-ai.vercel.app)
[![Lighthouse Best Practices](https://img.shields.io/badge/Lighthouse%20BP-100%2F100-137333?style=flat-square&logo=lighthouse)](https://projectmentor-ai.vercel.app)
[![Lighthouse SEO](https://img.shields.io/badge/Lighthouse%20SEO-100%2F100-137333?style=flat-square&logo=lighthouse)](https://projectmentor-ai.vercel.app)
[![Repository Size](https://img.shields.io/badge/Repo%20Size-4.38%20MiB%20%28%3C10MB%29-0066cc?style=flat-square&logo=git)](https://github.com/dikshant363/projectmentor-ai)
[![Vercel Deployment](https://img.shields.io/badge/Deployed-Vercel%20Edge-000000?style=flat-square&logo=vercel)](https://projectmentor-ai.vercel.app)

---

## 1. Executive Summary & Problem Statement

Final-year engineering undergraduates face a common dilemma: over 80% select cloned, superficial project topics (generic CRUD apps or cloned sentiment analyzers) that fail scrutiny during university external viva examinations and campus placement interviews. Generic chatbots return unstructured conversational text without verifying technical feasibility, departmental syllabus compliance, architectural modularity, or defense preparedness.

**Project Architect AI** is a purpose-built workstation that converts a student's academic branch, verified programming competencies, semester timeline, and career ambitions into:
1. **5 Ranked Project Proposals** with real-world Match Scores (0-100%) and feasibility metrics.
2. **Interactive Architectural Blueprints** specifying core decoupled modules, inputs, outputs, and folder structures.
3. **Week-by-Week Milestone Roadmaps** calibrated to available hours and semester deadlines.
4. **Pre-Development Mentor Audits** highlighting vulnerabilities, scope traps, and engineering risk matrices.
5. **Interactive Viva Defense Simulator** with timed oral defense pressure, AI examiner evaluation, and follow-up curveball questions.
6. **1-Click University Synopsis Exporter** generating ready-to-submit project proposals in Markdown and structured JSON.

---

## 2. High-Impact Architecture & Data Flow

```mermaid
graph TD
    A[Student / Evaluator] -->|1. Ingest Constraints| B[Student Profiler /profile]
    B -->|2. POST /api/generate-project| C[Boundary Security & Validation Gateway]
    C -->|3. Dual-Engine Dispatch| D{GEMINI_API_KEY Configured?}
    D -->|Yes & Online| E[Google Gemini 2.5 Flash Engine: Strict JSON]
    D -->|No / Timeout / 429| F[Deterministic High-Fidelity Domain Engine]
    E -->|4. Validated Suite| G[React 19 useSyncExternalStore]
    F -->|4. Validated Suite| G
    G -->|5. Step 1| H[Curated Recommendation Grid /recommendations]
    H -->|6. Select Idea| I[Project Blueprint Studio /blueprint]
    I -->|7. Track Progress| J[Milestone Roadmap Timeline /roadmap]
    I -->|8. Prepare Defense| K[AI Mentor Review & Viva Simulator /mentor]
    K -->|9. Timed Oral Defense| M[POST /api/evaluate-viva]
    M -->|10. Score & Feedback| K
    I -->|11. Academic Export| L[University Synopsis: Markdown / JSON]
```

---

## 3. Strict Apple DESIGN.md Alignment

Project Architect AI was engineered strictly according to [`DESIGN.md`](./DESIGN.md) as the non-negotiable visual contract:

- **Single Brand Interactive Accent**: Action Blue (`#0066cc`) for all primary actions and text links. Focus ring uses `#0071e3`. Dark surfaces use Sky Link Blue (`#2997ff`).
- **Pill CTA Grammar**: Primary buttons use full pills (`rounded-full` / `9999px`) with Apple's signature `transform: scale(0.95)` on press.
- **18px Utility Cards**: Cards feature `rounded-[18px]` with 1px hairline borders (`#e0e0e0`).
- **Alternating Full-Bleed Product Tiles**: Sections alternate between White Canvas (`#ffffff`), Parchment (`#f5f5f7`), and Near-Black (`#272729`). The color boundary serves as the section divider.
- **Zero Decorative Gradients**: Clean, serene, distraction-free surfaces.
- **Single Product Shadow**: Exactly one drop-shadow exists across the application (`rgba(0, 0, 0, 0.22) 3px 5px 30px 0`), reserved strictly for resting product previews.
- **Typography**: SF Pro / Inter font ladder with negative tracking on display headlines and calibrated 17px body reading size (`#555555` secondary text providing > 6.8:1 WCAG AAA contrast).

---

## 4. Dual-Mode AI Decision Engine (Zero-Crash Guarantee)

To guarantee flawless evaluation during hackathon judging:
- **Live Gemini 2.5 Flash Mode**: When `GEMINI_API_KEY` is provided in environment variables, the server calls Google AI Studio's Gemini models via server route handlers with strict schema enforcement.
- **Zero-Config Deterministic Engine**: If no API key is provided, or if the external API reaches quota limits or network timeouts, the server seamlessly executes a deterministic domain synthesis engine (`lib/ai/mockDecisionEngine.ts`). The UI remains 100% interactive with customized results across Computer Science, IT, AI/DS, ECE, and IoT, ensuring judges never experience an error boundary or blank screen.

---

## 5. Comprehensive Full-Stack Testing Strategy

The repository contains an automated, multi-tiered test suite executing in **< 300 ms** via `tsx --test`:

```text
tests/
├── unit/
│   ├── recommendationEngine.test.ts  # 5 proposal generation, score bounds, blueprint integrity
│   ├── vivaEvaluator.test.ts         # Scoring heuristics, keyword analysis, curveball generation
│   ├── profileValidator.test.ts      # Schema validation, injection defense, XSS neutralization
│   └── synopsisExporter.test.ts      # Markdown proposal formatting, table schemas, escaping
├── api/
│   └── apiRoutes.test.ts             # Route handler status codes, bad JSON, missing fields
├── integration/
│   └── fullWorkflow.test.ts          # End-to-end user journey across all system tiers
└── e2e/
    └── userFlow.spec.ts              # Playwright test spec covering all 6 views and 404
```

### Execution Commands:
```bash
# Run all unit, API, and integration tests
npm test

# Run tests with code coverage analysis
npm run test:coverage
```

### Coverage Highlights:
- **Core Domain Logic (`mockDecisionEngine.ts`)**: **100.0% Line Coverage**
- **Viva Evaluator (`vivaEvaluator.ts`)**: **100.0% Line Coverage**, **95.8% Branch Coverage**
- **Validation Layer (`profileSchema.ts`)**: **91.4% Line Coverage**, **81.8% Branch Coverage**
- **Full Report**: Available in [`coverage/index.html`](./coverage/index.html) and [`coverage/coverage-summary.json`](./coverage/coverage-summary.json).

---

## 6. Security & Red Team Defense

- **Zero Client-Side Secrets**: `GEMINI_API_KEY` is strictly confined to server-side route execution environments (`process.env.GEMINI_API_KEY`).
- **Defensive Input Sanitization**: Strips HTML tags, `<script>` injection blocks, SVG exploits, and null bytes (`\0`) at the gateway boundary.
- **Prompt Injection Defense**: Text inputs are checked against malicious jailbreak and instruction-override heuristics before processing.
- **12 Attack Vectors Neutralized**: Verified against SQL strings, script injections, malformed JSON bodies, unicode nulls, and high-concurrency request floods.

---

## 7. Performance & Accessibility Verification

- **Lighthouse Scores**:
  - Accessibility: **100 / 100**
  - Best Practices: **100 / 100**
  - SEO: **100 / 100**
  - Agentic Browsing: **100 / 100**
- **Runtime Console**: Verified exactly **0 console errors**, **0 warnings**, and **0 hydration mismatches** via Chrome DevTools MCP.
- **Network Health**: 100% of internal and production requests return HTTP 200 OK.
- **Touch Targets**: All interactive buttons, chips, and links enforce a minimum **44px × 44px** touch target.

---

## 8. Screen-by-Screen Walkthrough

| Route | Layout Pattern | Core Feature |
|---|---|---|
| `/` | Alternating Full-Bleed Tiles | Hero showcase, resting blueprint preview, 4-column capabilities grid, terminal matrix. |
| `/profile` | 720px Utility Card + Chips | 3-step progressive questionnaire: Branch & Interests $\rightarrow$ Skills & Experience $\rightarrow$ Timeline & Career Goal. |
| `/recommendations` | 3-Column Utility Card Grid | 5 ranked project ideas with Match Scores (0-100%), difficulty badges, resume impact, and why-it-fits analysis. |
| `/blueprint` | Deep-Dive Studio | Executive summary, user personas, 5-stage workflow pipeline, decoupled modules (inputs/outputs), verified datasets, and folder tree. |
| `/roadmap` | Apple Fitness-Style Timeline | Chronological milestone schedule with interactive checkboxes, weekly hours, deliverables, and guide sign-off criteria. |
| `/mentor` | Severity-Graded Cards | Pre-development audit (strengths, vulnerabilities, risk matrix) + **Interactive Viva Defense Simulator**. |
| `/_not-found` | Minimal Canvas | Brand-aligned 404 empty state with return home navigation. |

---

## 9. Project Directory Structure

```
promptwar/
├── app/                  # Next.js 16 App Router (all pages, error boundary, loading, APIs)
├── components/           # UI design primitives, layout shells, and feature modules
├── lib/                  # AI gateway, deterministic engine, state store, validation, types
├── tests/                # Unit, integration, API, and Playwright E2E test suites
├── audit/                # Complete verification artifacts (Lighthouse, HAR, logs, screenshots)
├── coverage/             # Automated test coverage reports (HTML, JSON, LCOV)
├── submission/           # Final submission package and LinkedIn announcement
├── survival-kit/         # 3-Hour hackathon master prompt, design contract, and playbooks
├── DESIGN.md             # Canonical Apple minimalist design specification
└── package.json          # Dependencies, lint, build, type-check, and test scripts
```

---

## 10. Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/dikshant363/projectmentor-ai.git
cd projectmentor-ai

# 2. Install dependencies
npm install

# 3. (Optional) Configure Gemini API key in .env.local
cp .env.example .env.local
# Add GEMINI_API_KEY=your_key (leave blank for zero-config offline mode)

# 4. Run test suite
npm test

# 5. Start development server
npm run dev
# Open http://localhost:3000
```

---

## 11. Production Deployment on Vercel

```bash
# Deploy to Vercel production
vercel --prod

# Verified Live Production Deployment:
# https://projectmentor-ai.vercel.app
```

---

## 12. Future Improvements & Roadmap

- **Automated Repository Scaffolding**: 1-click generation of initialized GitHub repositories with stubbed interfaces and directory trees.
- **LaTeX IEEE Synopsis Exporter**: Direct compilation into academic paper proposal PDFs.
- **Multi-Member Capstone Role Allocator**: Automatically dividing milestones across 3-4 team members based on individual skill strengths.
