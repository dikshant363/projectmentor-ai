'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Layers, Milestone, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useProject } from '@/lib/context/ProjectContext';

export default function HomePage() {
  const { suite } = useProject();

  return (
    <div className="w-full flex flex-col">
      {/* SECTION 1: HERO TILE (Light Canvas #ffffff) */}
      <section className="w-full bg-white py-20 sm:py-28 px-4 sm:px-8 text-center flex flex-col items-center justify-center">
        <div className="max-w-[980px] mx-auto flex flex-col items-center">
          <Badge variant="blue" className="mb-6 px-4 py-1.5 text-[13px]">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#0066cc]" />
            PromptWars Hackathon Edition • Parul University
          </Badge>

          <h1 className="font-hero-display text-[#1d1d1f] max-w-[850px] mb-6">
            Think. Build. Defend.
          </h1>

          <p className="font-lead text-[#7a7a7a] max-w-[700px] mb-10">
            Your final-year engineering project, architected with clarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
            <Link href="/profile">
              <Button variant="store-hero">
                Start Student Profiler
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href={suite ? "/recommendations" : "/profile"}>
              <Button variant="secondary-pill" size="lg">
                {suite ? "View Active Project" : "Explore Recommendations"}
              </Button>
            </Link>
          </div>

          <p className="text-[14px] text-[#7a7a7a] max-w-[540px] leading-relaxed">
            Not a generic chatbot. A specialized AI engineering mentor that analyses your branch, existing skills, and available hours to generate faculty-ready project proposals.
          </p>
        </div>
      </section>

      {/* SECTION 2: SHOWCASE TILE (Near-Black #272729) */}
      <section className="w-full bg-[#272729] text-white py-20 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[760px] mx-auto mb-16">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[#2997ff] font-semibold mb-3 block">
              AI Decision Engine Output
            </span>
            <h2 className="font-display-lg text-white mb-4">
              From raw skills to an evaluated engineering blueprint.
            </h2>
            <p className="text-[17px] text-[#cccccc] leading-relaxed">
              Every proposal includes strict architectural separation, verified open datasets, week-by-week milestones, and anticipated viva defense questions.
            </p>
          </div>

          {/* Signature Product Showcase with Resting Apple Drop-Shadow */}
          <div className="bg-[#1d1d1f] border border-[#333333] rounded-[18px] p-6 sm:p-10 apple-product-shadow max-w-[940px] mx-auto">
            {/* Window header */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#333333]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="text-[12px] text-[#7a7a7a] font-mono ml-3">
                  projectmentor_suite.json
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] bg-[#272729] text-[#2997ff] px-3 py-1 rounded-full border border-[#333333]">
                  Match Score: 98%
                </span>
                <span className="text-[12px] bg-[#137333]/20 text-[#81c995] px-3 py-1 rounded-full border border-[#137333]/40">
                  Feasibility: High
                </span>
              </div>
            </div>

            {/* Simulated Project Card Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-[12px] text-[#2997ff] uppercase tracking-wider font-semibold">
                  <span>AI & Edge Vision</span>
                  <span>•</span>
                  <span>4 Months Timeline</span>
                </div>
                <h3 className="text-[24px] font-semibold text-white tracking-tight">
                  NeuroSync: Edge Anomaly Telemetry & Diagnostics
                </h3>
                <p className="text-[15px] text-[#cccccc] leading-relaxed">
                  Sub-second edge inference pipeline with verified explainability for industrial and clinical sensor arrays, featuring zero-cloud data exfiltration.
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {['FastAPI', 'PyTorch / ONNX', 'Next.js 15', 'Docker', 'PostgreSQL'].map((tech) => (
                    <span
                      key={tech}
                      className="text-[12px] bg-[#2a2a2c] text-[#cccccc] px-3 py-1 rounded-full border border-[#333333]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics Column */}
              <div className="bg-[#252527] border border-[#333333] rounded-[11px] p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#7a7a7a] block mb-1">
                    Evaluation Matrix
                  </span>
                  <div className="space-y-3 mt-3">
                    <div>
                      <div className="flex justify-between text-[13px] mb-1">
                        <span className="text-[#cccccc]">Resume Impact</span>
                        <span className="text-white font-semibold">9.8 / 10</span>
                      </div>
                      <div className="w-full bg-[#333333] h-[3px] rounded-full overflow-hidden">
                        <div className="bg-[#2997ff] h-full w-[98%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[13px] mb-1">
                        <span className="text-[#cccccc]">Innovation Rating</span>
                        <span className="text-white font-semibold">9.2 / 10</span>
                      </div>
                      <div className="w-full bg-[#333333] h-[3px] rounded-full overflow-hidden">
                        <div className="bg-[#2997ff] h-full w-[92%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[13px] mb-1">
                        <span className="text-[#cccccc]">Practicality</span>
                        <span className="text-white font-semibold">9.5 / 10</span>
                      </div>
                      <div className="w-full bg-[#333333] h-[3px] rounded-full overflow-hidden">
                        <div className="bg-[#2997ff] h-full w-[95%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/profile" className="mt-5">
                  <button className="w-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[13px] py-2 rounded-full font-medium transition-colors btn-apple-active">
                    Generate For My Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS TILE (Parchment #f5f5f7) */}
      <section className="w-full bg-[#f5f5f7] py-20 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[#0066cc] font-semibold mb-3 block">
              Architectural Workflow
            </span>
            <h2 className="font-display-lg text-[#1d1d1f] mb-4">
              How ProjectMentor AI guides your semester.
            </h2>
            <p className="text-[17px] text-[#7a7a7a] leading-relaxed">
              Three deliberate stages to move from ambiguous ideas to an approved, fully planned engineering project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#f5f5f7] text-[#0066cc] font-semibold flex items-center justify-center text-[15px] mb-6">
                  01
                </div>
                <h3 className="font-tagline text-[#1d1d1f] mb-3">
                  Profile Your Arsenal
                </h3>
                <p className="text-[15px] text-[#7a7a7a] leading-relaxed mb-6">
                  Input your exact academic branch, real programming competencies, available weekly hours, and whether you target campus placements, research, or startups.
                </p>
              </div>
              <div className="pt-4 border-t border-[#f0f0f0] text-[13px] text-[#1d1d1f] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
                Zero guesswork or generic advice
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#f5f5f7] text-[#0066cc] font-semibold flex items-center justify-center text-[15px] mb-6">
                  02
                </div>
                <h3 className="font-tagline text-[#1d1d1f] mb-3">
                  5 Ranked Project Proposals
                </h3>
                <p className="text-[15px] text-[#7a7a7a] leading-relaxed mb-6">
                  The decision engine calculates Match Scores, feasibility ratios, and resume value for five distinct directions, filtering out unoriginal student clones.
                </p>
              </div>
              <div className="pt-4 border-t border-[#f0f0f0] text-[13px] text-[#1d1d1f] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
                Strict technical feasibility audit
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#f5f5f7] text-[#0066cc] font-semibold flex items-center justify-center text-[15px] mb-6">
                  03
                </div>
                <h3 className="font-tagline text-[#1d1d1f] mb-3">
                  Defense & Roadmap Studio
                </h3>
                <p className="text-[15px] text-[#7a7a7a] leading-relaxed mb-6">
                  Unlock a complete architectural module breakdown, week-by-week milestone calendar, verified public datasets, and 5 tough questions external examiners will ask.
                </p>
              </div>
              <div className="pt-4 border-t border-[#f0f0f0] text-[13px] text-[#1d1d1f] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
                1-Click University Synopsis Export
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DEEP CAPABILITIES (White Canvas #ffffff) */}
      <section className="w-full bg-white py-20 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[760px] mx-auto mb-16">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[#0066cc] font-semibold mb-3 block">
              Built for Engineering Rigor
            </span>
            <h2 className="font-display-lg text-[#1d1d1f] mb-4">
              Everything your project coordinator demands.
            </h2>
            <p className="text-[17px] text-[#7a7a7a] leading-relaxed">
              Designed according to university evaluation criteria to ensure your project passes scrutiny with distinction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="utility">
              <Layers className="w-6 h-6 text-[#0066cc] mb-4" />
              <h4 className="font-body-strong text-[#1d1d1f] mb-2">Modular Architecture</h4>
              <p className="text-[14px] text-[#7a7a7a] leading-relaxed">
                Clear separation between UI client, computation services, and persistence layers to eliminate spaghetti code.
              </p>
            </Card>

            <Card variant="utility">
              <Milestone className="w-6 h-6 text-[#0066cc] mb-4" />
              <h4 className="font-body-strong text-[#1d1d1f] mb-2">Paced Roadmap</h4>
              <p className="text-[14px] text-[#7a7a7a] leading-relaxed">
                Chronological deliverables matched to your available semester months and weekly commitment.
              </p>
            </Card>

            <Card variant="utility">
              <ShieldCheck className="w-6 h-6 text-[#0066cc] mb-4" />
              <h4 className="font-body-strong text-[#1d1d1f] mb-2">Viva Defense Prep</h4>
              <p className="text-[14px] text-[#7a7a7a] leading-relaxed">
                Anticipate examiner traps: trade-offs, scalability bottlenecks, latency profiles, and failure modes.
              </p>
            </Card>

            <Card variant="utility">
              <Terminal className="w-6 h-6 text-[#0066cc] mb-4" />
              <h4 className="font-body-strong text-[#1d1d1f] mb-2">Folder Scaffolding</h4>
              <p className="text-[14px] text-[#7a7a7a] leading-relaxed">
                Ready-to-use repository folder structures that adhere to modern production engineering standards.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA TILE (Near-Black #252527) */}
      <section className="w-full bg-[#252527] text-white py-20 sm:py-28 px-4 sm:px-8 text-center">
        <div className="max-w-[760px] mx-auto flex flex-col items-center">
          <h2 className="font-hero-display text-white mb-6">
            Ready to build your capstone project?
          </h2>
          <p className="text-[18px] text-[#cccccc] leading-relaxed mb-10 max-w-[620px]">
            Join university engineers creating distinction-worthy, interview-grade projects powered by AI decision architecture.
          </p>
          <Link href="/profile">
            <Button variant="store-hero">
              Launch Profiler & Generate
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
