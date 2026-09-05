# PromptWars Production Deployment Report

**Project**: ProjectMentor AI  
**Deployment Platform**: Vercel Production  
**Deployment Target**: Production Edge (`iad1`)  
**Deployment ID**: `dpl_HKwJdqqRzSGVMrfpp4pskUiTfh2L`  
**Production URL**: https://projectmentor-ai.vercel.app  
**GitHub Repository**: https://github.com/dikshant363/projectmentor-ai  
**Latest Production Commit**: `7f2fd7c` (Verified main)  
**Compiler**: Next.js 16.3.4 (Turbopack)  
**Build Time**: 8 seconds  
**Static Routes Prerendered**: 9 static pages + 2 dynamic server routes  
**Status**: 100% OPERATIONAL & VERIFIED  

---

## Verified Endpoints & Routes

| Route | Type | HTTP Status | Feature / Role |
|---|---|:---:|---|
| `/` | Static | `200 OK` | Apple-style Landing Page & Showcase |
| `/profile` | Static | `200 OK` | 3-Step Student Profiler Form |
| `/recommendations` | Static | `200 OK` | 5 Curated Ranked Proposals Grid |
| `/blueprint` | Static | `200 OK` | Deep-Dive Architecture Blueprint Studio |
| `/roadmap` | Static | `200 OK` | 16-Week Chronological Milestones |
| `/mentor` | Static | `200 OK` | Pre-Dev Review & **Interactive Viva Defense Simulator** |
| `/api/generate-project`| Dynamic | `200 OK` | Server Route Handler (Dual-Mode Gemini / Fallback) |
| `/api/evaluate-viva` | Dynamic | `200 OK` | Server-side Viva Oral Defense Evaluator |
| `/_not-found` | Static | `200 OK` | Brand-aligned 404 handler |

---

## Production Security & Hygiene Audit
- No `.env.local` or raw secrets tracked.
- Server-side routes isolate external AI calls from the browser bundle.
- Defensive JSON parsing and input sanitization protects against injection payloads.
- Repository size is comfortably within hackathon requirements (under 4 MiB against 10 MiB limit).
