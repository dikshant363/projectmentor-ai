import { StudentProfile, GeneratedProjectSuite, ProjectIdea, Milestone } from '../types';

export function generateMockProjectSuite(profile: StudentProfile): GeneratedProjectSuite {
  const primaryDomain = profile.preferredDomains[0] || profile.interests[0] || 'Artificial Intelligence / LLMs';
  const hasAI = profile.likesAI || primaryDomain.includes('AI') || profile.currentSkills.some(s => ['Python', 'PyTorch', 'TensorFlow'].includes(s));
  const months = Math.min(Math.max(profile.availableMonths, 2), 8);
  const totalWeeks = months * 4;

  // Generate 5 contextual project ideas tailored to their branch, skills and interests
  const recommendedProjects: ProjectIdea[] = [
    {
      id: 'proj-1',
      title: hasAI ? 'NeuroSync: Real-Time Edge Video Diagnostics & Multimodal Anomaly Alerting' : 'CloudMesh: Resilient Distributed Service Mesh for Microservice Failover',
      tagline: hasAI ? 'Sub-second edge inference pipeline with verified explainability for high-stakes telemetry' : 'Autonomous multi-cloud gateway featuring zero-downtime health probing and circuit-breaking',
      category: primaryDomain,
      problemStatement: hasAI 
        ? 'Industrial and clinical video feeds require immediate anomaly detection without uploading unencrypted raw footage to third-party cloud data centers, demanding edge-quantized reasoning.'
        : 'Microservice ecosystems in academic and enterprise clusters experience cascading failures due to brittle ingress routing and unmonitored inter-service latency spikes.',
      targetAudience: hasAI ? 'Diagnostic centers, factory line operators, and autonomous monitoring units' : 'DevOps engineers, cloud platform teams, and high-availability API providers',
      matchScore: 98,
      confidenceScore: 94,
      difficulty: profile.experienceLevel,
      estimatedDuration: `${months} Months (${months * 4} Weeks)`,
      resumeValue: 9.8,
      innovationScore: 9.2,
      practicalityScore: 9.5,
      matchReason: `Directly matches your ${profile.branch} background, leveraging your experience with ${profile.currentSkills.slice(0, 3).join(', ')} while fitting your ${profile.weeklyHours} hrs/week target.`,
      recommendedTech: hasAI 
        ? ['Python', 'FastAPI', 'PyTorch/ONNX', 'Next.js 15', 'Docker', 'PostgreSQL']
        : ['Go/TypeScript', 'Next.js 15', 'Node.js', 'Docker', 'PostgreSQL', 'Prometheus'],
      coreFeatures: [
        'Edge model quantization and ONNX streaming worker pipeline',
        'Interactive real-time telemetry dashboard with alert dispatching',
        'Audit-grade anomaly classification report generator (PDF/JSON)',
        'Local storage persistence with zero external data exfiltration'
      ]
    },
    {
      id: 'proj-2',
      title: 'VeriDoc AI: Cryptographically Audited Document Verification & Synthesis Engine',
      tagline: 'Tamper-proof academic and legal verification platform using local neural parsing',
      category: 'Fintech & Security',
      problemStatement: 'Institutions process thousands of academic credentials, identity proofs, and certificates with error-prone manual scrutiny and high vulnerability to synthetic forged documents.',
      targetAudience: 'University admissions cells, state licensing boards, and KYC auditing firms',
      matchScore: 92,
      confidenceScore: 89,
      difficulty: profile.experienceLevel === 'Beginner' ? 'Intermediate' : profile.experienceLevel,
      estimatedDuration: `${months} Months`,
      resumeValue: 9.4,
      innovationScore: 8.8,
      practicalityScore: 9.6,
      matchReason: `Capitalizes on your ${profile.careerGoal} target by demonstrating production-grade security, cryptographic hashing, and structured data extraction.`,
      recommendedTech: ['Next.js 15', 'Python/FastAPI', 'Tesseract/EasyOCR', 'PostgreSQL', 'Tailwind CSS'],
      coreFeatures: [
        'Multi-format OCR and tabular extraction with bounding box overlay',
        'SHA-256 digital signature stamp and watermark verification',
        'Reviewer approval workflow with multi-tenant permissions',
        'Automated discrepancy highlight report for administrative review'
      ]
    },
    {
      id: 'proj-3',
      title: 'PulseGrid: Smart Energy Load Forecasting & Microgrid Peak Shaver',
      tagline: 'Time-series predictive analytics platform for community renewable power optimization',
      category: 'IoT & Smart Systems',
      problemStatement: 'Decentralized solar and battery installations struggle with erratic grid draw tariffs during peak hours due to lack of localized consumption predictions.',
      targetAudience: 'Campus facilities teams, residential microgrids, and smart meter operators',
      matchScore: 86,
      confidenceScore: 88,
      difficulty: 'Intermediate',
      estimatedDuration: `${Math.max(months - 1, 2)} Months`,
      resumeValue: 8.9,
      innovationScore: 8.7,
      practicalityScore: 9.1,
      matchReason: `Provides an interdisciplinary engineering project ideal for showcasing data engineering and real-world infrastructure impact.`,
      recommendedTech: ['Python', 'FastAPI', 'Pandas/Scikit-Learn', 'Next.js', 'SQLite/Timescale'],
      coreFeatures: [
        'Hourly solar irradiance and consumption forecasting model',
        'Peak tariff alert simulator with simulated battery discharge trigger',
        'Comparative carbon offset and cost-saving metrics calculator',
        'CSV ingestion and real-time MQTT synthetic feed simulation'
      ]
    },
    {
      id: 'proj-4',
      title: 'DevLoom: Autonomous Codebase Architecture Reviewer & Technical Debt Metrician',
      tagline: 'Local-first AST analyzer mapping code smell hotspots, cyclomatic complexity, and test gaps',
      category: 'Developer Productivity',
      problemStatement: 'Junior and student engineering teams frequently commit anti-patterns, circular dependencies, and unhandled async rejections that degrade long-term maintainability.',
      targetAudience: 'Software engineering students, open-source maintainers, and engineering bootcamp mentors',
      matchScore: 84,
      confidenceScore: 85,
      difficulty: profile.experienceLevel,
      estimatedDuration: `${months} Months`,
      resumeValue: 9.0,
      innovationScore: 8.4,
      practicalityScore: 9.7,
      matchReason: `Extremely attractive to interviewers for ${profile.careerGoal} because it demonstrates your grasp of software engineering fundamentals and static analysis.`,
      recommendedTech: ['TypeScript', 'Node.js', 'Next.js 15', 'Tailwind CSS', 'Tree-Sitter / Babel Parser'],
      coreFeatures: [
        'Abstract Syntax Tree (AST) parsing of multi-file repositories',
        'Visual dependency graph mapping inter-module circular links',
        'Priority technical debt score and actionable remediation prompts',
        'Exportable GitHub Action status report for continuous integration'
      ]
    },
    {
      id: 'proj-5',
      title: 'CareCompass: Offline-First Rural Health Clinic Triage & Inventory Synchronizer',
      tagline: 'Resilient PWA enabling community health workers to record triage vitals and auto-sync on connectivity',
      category: 'Healthcare & Public Good',
      problemStatement: 'Primary health sub-centers in rural areas face intermittent internet connectivity, resulting in lost patient intake data and critical vaccine stock-outs.',
      targetAudience: 'Rural health workers, municipal health officers, and mobile medical camp coordinators',
      matchScore: 81,
      confidenceScore: 90,
      difficulty: 'Intermediate',
      estimatedDuration: `${months} Months`,
      resumeValue: 8.7,
      innovationScore: 8.1,
      practicalityScore: 9.8,
      matchReason: `High social relevance and immediate examiner appeal; highlights offline persistence, sync queues, and empathetic UX.`,
      recommendedTech: ['Next.js (PWA)', 'IndexedDB / Dexie.js', 'Node.js', 'PostgreSQL', 'Docker'],
      coreFeatures: [
        'Offline triage questionnaire with urgent triage triage score computation',
        'Background sync queue with automatic conflict resolution',
        'Drug inventory tracking with low-stock SMS alert trigger',
        'Role-based medical officer verification portal'
      ]
    }
  ];

  // Dynamic roadmap calculated based on the student's exact available months
  const milestones: Milestone[] = [];
  const phases = [
    { name: 'Research & System Architecture', goal: 'Literature review, problem formalization, SRS creation, and data schema finalization.' },
    { name: 'Data Pipeline & Foundation', goal: 'Environment scaffolding, API stubs, database migrations, and baseline data ingestion.' },
    { name: 'Core Engine & Logic Implementation', goal: 'Implement fundamental business algorithms, data processing pipeline, and core services.' },
    { name: 'User Interface & Integration', goal: 'Develop the responsive Apple-style front-end, connect API endpoints, and handle async state.' },
    { name: 'Testing & Performance Optimization', goal: 'Unit testing, load profiling, latency benchmarking, and error-boundary hardening.' },
    { name: 'Final Documentation & Viva Defense', goal: 'Final academic report, IEEE-format paper draft, architecture diagrams, and slide deck.' },
  ];

  const weeksPerPhase = Math.max(1, Math.floor(totalWeeks / phases.length));

  phases.forEach((phase, index) => {
    const weekStart = index * weeksPerPhase + 1;
    const weekEnd = index === phases.length - 1 ? totalWeeks : (index + 1) * weeksPerPhase;
    const weekLabel = weekStart === weekEnd ? `Week ${weekStart}` : `Weeks ${weekStart}–${weekEnd}`;

    milestones.push({
      week: weekStart,
      phaseName: `${weekLabel}: ${phase.name}`,
      goal: phase.goal,
      deliverables: [
        `Deliverable ${index + 1}.1: Verified specification and milestone review log`,
        `Deliverable ${index + 1}.2: Functional code commit with unit validation`,
        `Deliverable ${index + 1}.3: Milestone demo checkpoint for guide review`
      ],
      learningTopics: [
        `${profile.currentSkills[0] || 'Modern Architecture'} Best Practices`,
        'Modular System Design & Clean Separation',
        'Testing and Benchmarking Standards'
      ],
      estimatedHours: profile.weeklyHours * (weekEnd - weekStart + 1),
      risks: index === 0 ? 'Scope creep if requirements are not bounded' : index === 2 ? 'Integration bugs between frontend and backend services' : 'Time compression before academic presentation deadline',
      successCriteria: `All milestone test cases execute green with documented deliverables in GitHub repository.`,
      completed: index === 0
    });
  });

  return {
    profileAnalysis: {
      studentSummary: `${profile.branch} candidate with ${profile.experienceLevel} proficiency in ${profile.currentSkills.slice(0, 4).join(', ')}. Target trajectory aligned with ${profile.careerGoal} with an allocation of ${profile.weeklyHours} hours weekly over ${profile.availableMonths} months.`,
      inferredStrengths: [
        `Proven foundation in ${profile.currentSkills.slice(0, 2).join(' and ')}`,
        `Clear domain clarity towards ${primaryDomain}`,
        `Realistic balance between ${profile.weeklyHours} hours/week commitment and final-year workload`
      ],
      feasibilityVerdict: 'Highly Feasible within academic semester timeline with structured modular deliverables.'
    },
    recommendedProjects,
    selectedProjectIndex: 0,
    technologyStack: {
      frontend: {
        name: 'Next.js 15 (App Router) + Tailwind CSS',
        reason: 'Provides zero-config server rendering, type-safe API routing, and lightning-fast client hydration adhering to DESIGN.md.',
        alternatives: ['React + Vite', 'SvelteKit']
      },
      backend: {
        name: hasAI ? 'FastAPI (Python 3.11+)' : 'Next.js API Routes / Node.js',
        reason: hasAI ? 'Native high-throughput asynchronous execution with immediate PyTorch/NumPy interop.' : 'Unified TypeScript runtime across client and server.',
        alternatives: ['Go (Fiber/Gin)', 'Express.js']
      },
      aiLayer: {
        name: hasAI ? 'Google Gemini 2.5 Flash + ONNX Runtime' : 'Rule-Based Heuristics & Deterministic Engine',
        reason: 'Extremely fast inference latency, generous free tier via Google AI Studio, and structured JSON reliability.',
        alternatives: ['Hugging Face Transformers', 'Claude API']
      },
      database: {
        name: 'PostgreSQL (via Supabase / Neon / Local Docker)',
        reason: 'ACID compliance, relational integrity, JSONB support for flexible metadata, and zero license costs.',
        alternatives: ['SQLite with LibSQL', 'MongoDB']
      },
      deployment: {
        name: 'Vercel (Frontend) + Render / Railway (Backend Worker)',
        reason: 'Free student tier, automatic preview branches, HTTPS out of the box, zero DevOps configuration.',
        alternatives: ['Fly.io', 'AWS Free Tier EC2']
      },
      auth: {
        name: 'NextAuth.js / Supabase Auth',
        reason: 'Zero-cost JWT handling with role-based access for students and faculty evaluators.'
      },
      externalApis: [
        { name: 'Google Gemini API', purpose: 'Contextual synthesis and automated explanation generation', freeTier: true },
        { name: 'Open Meteo / Public Gov API', purpose: 'Live environment telemetry data feeds', freeTier: true }
      ],
      devTools: ['Git / GitHub', 'Docker Desktop', 'Postman / Bruno', 'ESLint + Prettier'],
      testingTools: ['Vitest / Jest', 'Playwright', 'Pytest']
    },
    projectBlueprint: {
      summary: `A high-performance ${primaryDomain} solution engineered specifically for university final-year defense. Combines modular architecture, clean separation of concerns, and verifiable benchmarks.`,
      problemStatement: recommendedProjects[0].problemStatement,
      userPersonas: [
        { role: 'Student Developer', painPoint: 'Needs an impressive yet achievable project with clear academic contribution.', solution: 'Modular roadmap and pre-configured architecture prevents scope dead-ends.' },
        { role: 'Project Guide / Evaluator', painPoint: 'Tired of identical cloned CRUD apps and lacks objective evaluation rubric.', solution: 'Clear architectural diagrams, rigorous benchmarking, and tangible test coverage.' },
        { role: 'Campus Recruiter', painPoint: 'Candidate resumes full of boilerplate tutorial projects with zero depth.', solution: 'Deep technical decisions, trade-off justifications, and production deployment.' }
      ],
      systemWorkflow: [
        { step: 1, title: 'Input Ingestion & Sanitization', description: 'Validate incoming payloads, perform cryptographic integrity checks, and route to processing queue.' },
        { step: 2, title: 'Transformation & Inference Pipeline', description: 'Execute domain computation, vector embeddings or analytical parsing in memory.' },
        { step: 3, title: 'Synthesis & Result Formatting', description: 'Format outcomes into standardized JSON schema with confidence indicators.' },
        { step: 4, title: 'Audit Trail & Storage', description: 'Persist transaction records to database and trigger notification dispatch.' },
        { step: 5, title: 'Interactive Presentation', description: 'Deliver responsive telemetry, visual charts, and PDF export to client.' }
      ],
      coreModules: [
        { name: 'Gateway & Ingress Controller', description: 'Handles request routing, rate limiting, and schema validation.', inputs: 'HTTP requests / Websocket events', outputs: 'Clean normalized event objects', complexity: 'Medium' },
        { name: 'Processing & Analytics Engine', description: 'Core business logic executing algorithms or neural inference.', inputs: 'Normalized event objects', outputs: 'Diagnostic results & confidence metrics', complexity: 'High' },
        { name: 'Persistence & State Manager', description: 'Manages relational storage, caching, and audit logging.', inputs: 'Result objects', outputs: 'Committed DB records', complexity: 'Medium' },
        { name: 'Reporting & Export Service', description: 'Generates downloadable project synopses, charts, and summary reports.', inputs: 'Analytical logs', outputs: 'PDF / Markdown / CSV streams', complexity: 'Low' }
      ],
      architectureSummary: 'Three-tier decoupled architecture comprising an edge-rendered Next.js frontend, an asynchronous API orchestration service, and a relational database with strict schema validation.',
      suggestedDatasets: [
        { name: 'Kaggle Open Benchmark Collection', source: 'Kaggle Datasets', url: 'https://www.kaggle.com/datasets', description: 'Over 50,000 public domain datasets across healthcare, security, vision, and tabular signals.' },
        { name: 'Hugging Face Hub Open Repositories', source: 'Hugging Face', url: 'https://huggingface.co/datasets', description: 'Standardized research datasets with pre-built PyTorch loaders and Apache 2.0 licenses.' }
      ],
      suggestedApis: [
        { name: 'Google AI Studio Gemini API', provider: 'Google', url: 'https://ai.google.dev/', freeTierNotes: '60 RPM free tier with multimodal Gemini 2.5/1.5 Flash.' },
        { name: 'Public REST Directory (Free-API)', provider: 'Open Source', url: 'https://github.com/public-apis/public-apis', freeTierNotes: 'Free open directory', description: 'Vetted list of free APIs for weather, finance, sports, and geo data.' }
      ],
      folderStructure: [
        'project-root/',
        '├── app/                  # Next.js 15 App Router pages & layouts',
        '│   ├── api/              # Serverless API routes & middleware',
        '│   ├── dashboard/        # Interactive telemetry view',
        '│   └── layout.tsx        # Global shell and navigation',
        '├── components/           # Reusable UI & presentation widgets',
        '│   ├── ui/               # Apple-style design system primitives',
        '│   └── charts/           # Visualization canvas components',
        '├── lib/                  # Business logic, utilities & types',
        '│   ├── core/             # Fundamental algorithmic modules',
        '│   ├── db/               # ORM client and migrations',
        '│   └── types/            # Strict TypeScript interfaces',
        '├── tests/                # Unit, integration, and E2E specs',
        '├── .env.example          # Safe configuration template',
        '├── README.md             # Comprehensive academic documentation',
        '└── package.json          # Dependencies and scripts'
      ],
      mvpFeatures: [
        { title: 'Ingestion & Telemetry Pipeline', priority: 'P0', effort: '2 Weeks' },
        { title: 'Core Prediction / Processing Logic', priority: 'P0', effort: '3 Weeks' },
        { title: 'Interactive Web Dashboard', priority: 'P0', effort: '2 Weeks' },
        { title: 'Error Boundary & Audit Logging', priority: 'P1', effort: '1 Week' }
      ],
      v2Features: [
        { title: 'Multi-Tenant Authentication & RBAC', priority: 'P1', effort: '2 Weeks' },
        { title: 'Continuous Telemetry Alert Webhooks', priority: 'P2', effort: '1 Week' },
        { title: 'Automated Benchmark Comparison Charts', priority: 'P2', effort: '2 Weeks' }
      ]
    },
    developmentRoadmap: milestones,
    mentorReview: {
      strengths: [
        'Well-defined problem statement addressing a concrete, measurable inefficiency rather than a generic clone.',
        `Strong alignment with your ${profile.branch} coursework, making viva defense straightforward.`,
        'Clear modular architecture enables presenting individual functioning phases even if late-stage stretch features are trimmed.'
      ],
      weaknesses: [
        'Risk of over-engineering the frontend before verifying the core algorithmic accuracy.',
        'Reliance on public datasets requires thorough validation for sampling bias or missing fields.',
        'High compute operations on the client will cause responsiveness issues unless delegated to web workers or backend tasks.'
      ],
      risks: [
        {
          risk: 'Dataset Availability or Incompatibility',
          severity: 'Medium',
          mitigation: 'Lock your data schema by Week 2. Use synthetic data generators if live API feeds face quota limits.'
        },
        {
          risk: 'Scope Creep in Late Semesters',
          severity: 'High',
          mitigation: 'Adhere strictly to the P0 MVP checklist. Freeze new features 3 weeks before final evaluation.'
        },
        {
          risk: 'External Examiner Skepticism on AI Utility',
          severity: 'Medium',
          mitigation: 'Include a comparative ablation study showing baseline heuristic accuracy vs model accuracy.'
        }
      ],
      technicalChallenges: [
        'Optimizing latency and memory footprint during continuous stream processing.',
        'Ensuring secure storage of environment keys and avoiding rate limit choke-points.',
        'Achieving responsive, accessible UX across mobile and desktop without external bloated libraries.'
      ],
      learningChallenges: [
        'Understanding asynchronous worker thread pipelines.',
        'Writing clean, maintainable unit tests with high code coverage.',
        'Defending system design choices and algorithmic complexity in front of faculty panels.'
      ],
      portfolioImpact: `Ranked in the top 5% of final-year university projects. Emphasizes real-world system architecture, robust trade-off reasoning, and production deployment instead of basic student CRUD tutorials.`,
      vivaQuestions: [
        {
          question: 'Why did you choose this architecture over a monolithic server or traditional MVC pattern?',
          answerGuidance: 'Explain that the decoupled architecture enables independent scaling, fault isolation, and faster client updates without coupling frontend render cycles to backend processing.'
        },
        {
          question: 'How do you measure the accuracy and performance of your system quantitatively?',
          answerGuidance: 'Cite exact metrics: latency in milliseconds (P95), throughput (req/sec), F1-score or accuracy benchmarks, and memory consumption footprints.'
        },
        {
          question: 'What happens when your external services or dependencies fail or timeout?',
          answerGuidance: 'Highlight your circuit-breaking mechanism, graceful error boundaries, local cached fallback state, and user-facing recovery guidance.'
        },
        {
          question: 'What was your single biggest technical hurdle and how did you resolve it?',
          answerGuidance: 'Discuss handling asynchronous race conditions or optimizing data transformations, describing how you profiled the bottleneck with logs and applied indexing or caching.'
        },
        {
          question: 'If you had 6 more months to scale this project, what would be the first bottleneck you address?',
          answerGuidance: 'Discuss migrating from single-instance storage to partitioned multi-region databases and implementing asynchronous message queues (e.g. Redis/Kafka).'
        }
      ],
      improvementPriorities: [
        { action: 'Implement automated unit tests for core validation logic before writing UI', impact: 'High', effort: 'Low' },
        { action: 'Create an ablation baseline to quantitatively prove system effectiveness', impact: 'High', effort: 'Medium' },
        { action: 'Record a 2-minute crisp loom demo video and host live on Vercel', impact: 'High', effort: 'Low' }
      ]
    },
    careerAlignment: {
      track: profile.careerGoal,
      score: 95,
      rationale: `This project directly demonstrates the exact competencies senior engineering interviewers probe: system trade-offs, defensive programming, clean architecture, and verifiable problem-solving.`,
      interviewTalkingPoints: [
        'How I architected the end-to-end data flow with sub-second response times',
        'How I managed trade-offs between client-side compute and backend API efficiency',
        'How I implemented defensive programming to guarantee zero unhandled runtime crashes',
        'How I structured the project for continuous deployment and zero-downtime releases'
      ]
    },
    improvementSuggestions: [
      'Add an automated health check endpoint (`/api/health`) that returns system latency and service status.',
      'Containerize the application with a single `docker-compose.yml` for effortless evaluation by external examiners.',
      'Include a comprehensive `ARCHITECTURE.md` file in your root repository with Mermaid diagrams.',
      'Generate a sample test suite that examiners can run with a single `npm test` command.'
    ],
    nextActions: [
      'Download and review the University Project Synopsis (Markdown/PDF format).',
      'Present the architecture and milestone timeline to your project guide for approval.',
      'Initialize your single-branch GitHub repository using the recommended folder scaffolding.',
      'Deploy the initial prototype to Vercel to establish a live URL on Day 1.'
    ],
    generatedAt: new Date().toISOString(),
    isFallback: true
  };
}
