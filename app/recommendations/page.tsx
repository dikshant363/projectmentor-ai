'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, SlidersHorizontal, RefreshCw, ArrowRight, Compass, Layers } from 'lucide-react';
import { ProjectCard } from '@/components/recommendations/ProjectCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { useProject } from '@/lib/context/ProjectContext';

export default function RecommendationsPage() {
  const router = useRouter();
  const { suite, profile, isGenerating, generateProjectSuite, selectedProjectIndex } = useProject();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  if (!suite) {
    return (
      <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-20 px-4 flex items-center justify-center">
        <EmptyState
          icon={<Compass className="w-8 h-8 text-[#0066cc]" />}
          title="No Project Ideas Evaluated Yet"
          description="Complete your student profile to allow our AI Decision Engine to generate 5 customized, faculty-ready engineering projects."
          actionLabel="Open Student Profiler"
          onAction={() => router.push('/profile')}
        />
      </div>
    );
  }

  const filteredProjects = suite.recommendedProjects.filter((p) => {
    if (filterDifficulty === 'All') return true;
    return p.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
  });

  return (
    <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-12 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Profile Summary Banner */}
        <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] uppercase tracking-wider text-[#0066cc] font-semibold">
                Evaluated Student Profile
              </span>
              {suite.isFallback && (
                <span className="text-[11px] bg-[#f5f5f7] text-[#7a7a7a] px-2 py-0.5 rounded-full border border-[#e0e0e0]">
                  Deterministic High-Fidelity Mode
                </span>
              )}
            </div>
            <h1 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight">
              {profile.branch} • {profile.availableMonths} Months • {profile.weeklyHours}h/week
            </h1>
            <p className="text-[14px] text-[#7a7a7a] mt-1">
              {suite.profileAnalysis.studentSummary}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/profile">
              <Button variant="secondary-pill" size="sm">
                Edit Profile
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              isLoading={isGenerating}
              onClick={() => generateProjectSuite()}
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Re-evaluate
            </Button>
          </div>
        </div>

        {/* Filters & Count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[24px] font-semibold text-[#1d1d1f] tracking-tight">
              Curated Project Ideas ({filteredProjects.length})
            </h2>
            <p className="text-[14px] text-[#7a7a7a]">
              Select an idea to inspect its architectural modules, datasets, APIs, and timeline.
            </p>
          </div>

          {/* Difficulty Filter Chips */}
          <div className="flex items-center gap-1.5 bg-white border border-[#e0e0e0] p-1 rounded-full text-[13px]">
            <span className="px-3 text-[#7a7a7a] text-[12px] font-medium hidden sm:inline-block">
              Difficulty:
            </span>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`px-3 py-1 rounded-full text-[13px] transition-colors btn-apple-active ${
                  filterDifficulty === diff
                    ? 'bg-[#0066cc] text-white font-medium'
                    : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              isSelected={selectedProjectIndex === idx}
            />
          ))}
        </div>

        {/* Bottom Banner to Blueprint */}
        <div className="mt-12 bg-[#272729] text-white rounded-[18px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[12px] uppercase tracking-wider text-[#2997ff] font-semibold block mb-1">
              Next Step in the Workflow
            </span>
            <h3 className="text-[20px] font-semibold text-white">
              Ready to examine the full system architecture?
            </h3>
            <p className="text-[14px] text-[#cccccc] mt-1">
              Currently inspecting: {suite.recommendedProjects[selectedProjectIndex]?.title}
            </p>
          </div>
          <Link href="/blueprint">
            <Button variant="store-hero" size="md">
              Inspect Blueprint Studio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
