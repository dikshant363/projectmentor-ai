'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Download,
  ArrowRight,
  Layers,
  Cpu,
  Database,
  Globe,
  Lock,
  Workflow,
  FolderTree,
  FileCode2,
  Users,
  Compass,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useProject } from '@/lib/context/ProjectContext';
import { generateUniversitySynopsisMarkdown, downloadFile } from '@/lib/export/synopsisExporter';

export default function BlueprintPage() {
  const router = useRouter();
  const { suite, profile, selectedProjectIndex, setSelectedProjectIndex } = useProject();

  if (!suite) {
    return (
      <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-20 px-4 flex items-center justify-center">
        <EmptyState
          icon={<Compass className="w-8 h-8 text-[#0066cc]" />}
          title="No Active Project Selected"
          description="Complete your student profile to generate and select a project blueprint."
          actionLabel="Open Student Profiler"
          onAction={() => router.push('/profile')}
        />
      </div>
    );
  }

  const project = suite.recommendedProjects[selectedProjectIndex] || suite.recommendedProjects[0];
  const blueprint = suite.projectBlueprint;
  const tech = suite.technologyStack;

  const handleExportSynopsis = () => {
    const md = generateUniversitySynopsisMarkdown(suite, profile);
    downloadFile(md, `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-synopsis.md`);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(suite, null, 2);
    downloadFile(jsonStr, `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-suite.json`, 'application/json');
  };

  return (
    <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-12 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto space-y-8">
        {/* Project Header Card */}
        <Card variant="utility" className="p-8 sm:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#f0f0f0]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="blue">{project.category}</Badge>
                <Badge variant="neutral">Difficulty: {project.difficulty}</Badge>
                <span className="text-[13px] text-[#7a7a7a] font-medium">
                  Est. Duration: {project.estimatedDuration}
                </span>
              </div>
              <h1 className="font-display-lg text-[#1d1d1f] tracking-tight mb-2">
                {project.title}
              </h1>
              <p className="text-[17px] text-[#0066cc] font-medium">
                {project.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button variant="secondary-pill" size="sm" onClick={handleExportJson}>
                <FileCode2 className="w-4 h-4 mr-1.5" />
                Export JSON
              </Button>
              <Button variant="primary" size="sm" onClick={handleExportSynopsis}>
                <Download className="w-4 h-4 mr-1.5" />
                Download Synopsis (MD)
              </Button>
            </div>
          </div>

          {/* Project Switcher Tabs if multiple ideas exist */}
          <div className="pt-6 flex items-center gap-2 overflow-x-auto">
            <span className="text-[12px] text-[#7a7a7a] font-semibold uppercase tracking-wider mr-2 shrink-0">
              Switch Idea:
            </span>
            {suite.recommendedProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedProjectIndex(idx)}
                className={`px-3 py-1.5 rounded-full text-[13px] whitespace-nowrap transition-colors btn-apple-active ${
                  selectedProjectIndex === idx
                    ? 'bg-[#0066cc] text-white font-medium'
                    : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e0e0e0]'
                }`}
              >
                #{idx + 1}: {p.title.slice(0, 24)}...
              </button>
            ))}
          </div>
        </Card>

        {/* Section: Problem & Abstract */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card variant="utility" className="lg:col-span-2 p-8">
            <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#0066cc]" />
              Executive Problem Formulation
            </h2>
            <div className="space-y-4 text-[15px] text-[#333333] leading-relaxed">
              <div className="p-4 bg-[#f5f5f7] rounded-[11px] border border-[#e0e0e0]">
                <span className="font-semibold text-[#1d1d1f] block mb-1">Problem Statement:</span>
                <p>{project.problemStatement}</p>
              </div>
              <p>{blueprint.summary}</p>
            </div>

            {/* Target Personas */}
            <div className="mt-6 pt-6 border-t border-[#f0f0f0]">
              <h3 className="text-[16px] font-semibold text-[#1d1d1f] mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0066cc]" />
                Target Beneficiaries & User Personas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {blueprint.userPersonas.map((persona, i) => (
                  <div key={i} className="p-3.5 bg-white border border-[#e0e0e0] rounded-[11px] text-[13px]">
                    <span className="font-semibold text-[#0066cc] block mb-1">{persona.role}</span>
                    <p className="text-[#7a7a7a] mb-1"><strong className="text-[#1d1d1f]">Pain:</strong> {persona.painPoint}</p>
                    <p className="text-[#333333]"><strong className="text-[#1d1d1f]">Solution:</strong> {persona.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Why this fits the student */}
          <Card variant="utility" className="p-8 flex flex-col justify-between">
            <div>
              <span className="text-[12px] uppercase tracking-wider text-[#0066cc] font-semibold block mb-2">
                Faculty & Career Alignment
              </span>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-4">
                Why this fits {profile.branch}
              </h2>
              <p className="text-[14px] text-[#333333] leading-relaxed mb-6">
                {project.matchReason}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#f0f0f0]">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#7a7a7a]">Match Confidence</span>
                  <span className="font-semibold text-[#0066cc]">{project.confidenceScore}%</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#7a7a7a]">Resume Impact</span>
                  <span className="font-semibold text-[#1d1d1f]">{project.resumeValue} / 10</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#7a7a7a]">Innovation Score</span>
                  <span className="font-semibold text-[#1d1d1f]">{project.innovationScore} / 10</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#7a7a7a]">Target Career Track</span>
                  <span className="font-semibold text-[#1d1d1f]">{suite.careerAlignment.track}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#f0f0f0]">
              <Link href="/roadmap">
                <Button variant="primary" className="w-full">
                  View Development Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Section: System Workflow & Core Modules */}
        <Card variant="utility" className="p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight mb-2 flex items-center gap-2">
              <Workflow className="w-6 h-6 text-[#0066cc]" />
              System Architecture & Workflow Pipeline
            </h2>
            <p className="text-[14px] text-[#7a7a7a]">
              {blueprint.architectureSummary}
            </p>
          </div>

          {/* Workflow Steps Horizontal Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-10">
            {blueprint.systemWorkflow.map((step) => (
              <div
                key={step.step}
                className="bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="w-6 h-6 rounded-full bg-[#0066cc] text-white text-[12px] font-semibold flex items-center justify-center mb-2">
                    {step.step}
                  </span>
                  <h4 className="text-[14px] font-semibold text-[#1d1d1f] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[12px] text-[#7a7a7a] leading-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Modules Breakdown */}
          <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0066cc]" />
            Core Architectural Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blueprint.coreModules.map((mod, i) => (
              <div
                key={i}
                className="p-5 bg-white border border-[#e0e0e0] rounded-[14px] hover:border-[#cccccc] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[16px] font-semibold text-[#1d1d1f]">{mod.name}</h4>
                  <Badge
                    variant={
                      mod.complexity === 'Low'
                        ? 'success'
                        : mod.complexity === 'Medium'
                        ? 'blue'
                        : 'warning'
                    }
                  >
                    {mod.complexity} Complexity
                  </Badge>
                </div>
                <p className="text-[13px] text-[#7a7a7a] mb-3">{mod.description}</p>
                <div className="grid grid-cols-2 gap-2 text-[12px] bg-[#f5f5f7] p-2.5 rounded-[8px]">
                  <div>
                    <span className="font-semibold text-[#1d1d1f] block">Inputs:</span>
                    <span className="text-[#7a7a7a]">{mod.inputs}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#1d1d1f] block">Outputs:</span>
                    <span className="text-[#7a7a7a]">{mod.outputs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Section: Technology Stack Matrix */}
        <Card variant="utility" className="p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight mb-2 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-[#0066cc]" />
              Evaluated Technology Stack
            </h2>
            <p className="text-[14px] text-[#7a7a7a]">
              Recommended for balance between technical rigor, developer velocity, and zero cloud hosting costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 bg-white border border-[#e0e0e0] rounded-[14px]">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] block mb-1">
                Frontend / UI Client
              </span>
              <h4 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{tech.frontend.name}</h4>
              <p className="text-[13px] text-[#7a7a7a] leading-relaxed mb-3">{tech.frontend.reason}</p>
              <span className="text-[11px] text-[#7a7a7a]">Alternatives: {tech.frontend.alternatives.join(', ')}</span>
            </div>

            <div className="p-5 bg-white border border-[#e0e0e0] rounded-[14px]">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] block mb-1">
                Backend / API Engine
              </span>
              <h4 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{tech.backend.name}</h4>
              <p className="text-[13px] text-[#7a7a7a] leading-relaxed mb-3">{tech.backend.reason}</p>
              <span className="text-[11px] text-[#7a7a7a]">Alternatives: {tech.backend.alternatives.join(', ')}</span>
            </div>

            <div className="p-5 bg-white border border-[#e0e0e0] rounded-[14px]">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] block mb-1">
                AI / Computation Layer
              </span>
              <h4 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{tech.aiLayer.name}</h4>
              <p className="text-[13px] text-[#7a7a7a] leading-relaxed mb-3">{tech.aiLayer.reason}</p>
              <span className="text-[11px] text-[#7a7a7a]">Alternatives: {tech.aiLayer.alternatives.join(', ')}</span>
            </div>

            <div className="p-5 bg-white border border-[#e0e0e0] rounded-[14px]">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] block mb-1">
                Database & Storage
              </span>
              <h4 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{tech.database.name}</h4>
              <p className="text-[13px] text-[#7a7a7a] leading-relaxed mb-3">{tech.database.reason}</p>
              <span className="text-[11px] text-[#7a7a7a]">Alternatives: {tech.database.alternatives.join(', ')}</span>
            </div>

            <div className="p-5 bg-white border border-[#e0e0e0] rounded-[14px]">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] block mb-1">
                Cloud Deployment
              </span>
              <h4 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{tech.deployment.name}</h4>
              <p className="text-[13px] text-[#7a7a7a] leading-relaxed mb-3">{tech.deployment.reason}</p>
              <span className="text-[11px] text-[#7a7a7a]">Alternatives: {tech.deployment.alternatives.join(', ')}</span>
            </div>

            <div className="p-5 bg-white border border-[#e0e0e0] rounded-[14px]">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] block mb-1">
                Authentication & RBAC
              </span>
              <h4 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{tech.auth.name}</h4>
              <p className="text-[13px] text-[#7a7a7a] leading-relaxed mb-3">{tech.auth.reason}</p>
            </div>
          </div>
        </Card>

        {/* Section: Datasets & Folder Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Datasets & APIs */}
          <Card variant="utility" className="p-8 space-y-6">
            <h3 className="text-[20px] font-semibold text-[#1d1d1f] flex items-center gap-2">
              <Database className="w-5 h-5 text-[#0066cc]" />
              Verified Public Datasets & APIs
            </h3>

            <div className="space-y-3">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#7a7a7a]">Suggested Datasets:</span>
              {blueprint.suggestedDatasets.map((ds, i) => (
                <div key={i} className="p-3 bg-[#f5f5f7] rounded-[11px] border border-[#e0e0e0] text-[13px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#1d1d1f]">{ds.name}</span>
                    <a
                      href={ds.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066cc] flex items-center gap-1 hover:underline text-[12px]"
                    >
                      <span>{ds.source}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[#7a7a7a]">{ds.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-[#f0f0f0]">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#7a7a7a]">Integrated APIs:</span>
              {tech.externalApis.map((api, i) => (
                <div key={i} className="p-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[13px] flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#1d1d1f] block">{api.name}</span>
                    <span className="text-[#7a7a7a]">{api.purpose}</span>
                  </div>
                  {api.freeTier && <Badge variant="success">Free Tier</Badge>}
                </div>
              ))}
            </div>
          </Card>

          {/* Folder Structure */}
          <Card variant="utility" className="p-8">
            <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-4 flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-[#0066cc]" />
              Clean Architecture Folder Scaffolding
            </h3>
            <p className="text-[14px] text-[#7a7a7a] mb-4">
              Recommended directory tree ready for your single-branch GitHub repository.
            </p>
            <div className="bg-[#1d1d1f] text-white p-5 rounded-[11px] font-mono text-[12px] overflow-x-auto leading-relaxed">
              {blueprint.folderStructure.map((line, idx) => (
                <div key={idx} className="text-[#cccccc]">
                  {line}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Banner */}
        <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[20px] font-semibold text-[#1d1d1f]">
              Next: Plan Your Weekly Execution
            </h3>
            <p className="text-[14px] text-[#7a7a7a] mt-1">
              Translate this architecture into week-by-week deliverables that fit your {profile.availableMonths}-month timeline.
            </p>
          </div>
          <Link href="/roadmap">
            <Button variant="primary">
              View Milestone Roadmap
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
