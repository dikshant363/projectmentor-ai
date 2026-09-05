'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Compass,
  CheckSquare,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useProject } from '@/lib/context/ProjectContext';
import { generateUniversitySynopsisMarkdown, downloadFile } from '@/lib/export/synopsisExporter';

export default function RoadmapPage() {
  const router = useRouter();
  const { suite, profile, toggleMilestone } = useProject();

  if (!suite) {
    return (
      <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-20 px-4 flex items-center justify-center">
        <EmptyState
          icon={<Compass className="w-8 h-8 text-[#0066cc]" />}
          title="No Project Selected"
          description="Complete your student profile to view a personalized week-by-week development roadmap."
          actionLabel="Open Student Profiler"
          onAction={() => router.push('/profile')}
        />
      </div>
    );
  }

  const milestones = suite.developmentRoadmap;
  const totalWeeks = profile.availableMonths * 4;
  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);
  const totalHours = milestones.reduce((acc, curr) => acc + curr.estimatedHours, 0);

  const handleExport = () => {
    const md = generateUniversitySynopsisMarkdown(suite, profile);
    const project = suite.recommendedProjects[suite.selectedProjectIndex] || suite.recommendedProjects[0];
    downloadFile(md, `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-roadmap.md`);
  };

  return (
    <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-12 px-4 sm:px-8">
      <div className="max-w-[1024px] mx-auto space-y-8">
        {/* Roadmap Summary Card */}
        <Card variant="utility" className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#f0f0f0]">
            <div>
              <span className="text-[12px] uppercase tracking-wider text-[#0066cc] font-semibold block mb-1">
                Semester Development Schedule
              </span>
              <h1 className="font-display-lg text-[#1d1d1f] tracking-tight">
                {totalWeeks}-Week Milestone Roadmap
              </h1>
              <p className="text-[15px] text-[#7a7a7a] mt-1">
                Calibrated for {profile.weeklyHours} hours per week over {profile.availableMonths} semester months.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="secondary-pill" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-1.5" />
                Export Schedule
              </Button>
              <Link href="/mentor">
                <Button variant="primary" size="sm">
                  Mentor Critique
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Progress & Stat Counter */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#f5f5f7] rounded-[14px] p-4 flex items-center justify-between">
              <div>
                <span className="text-[12px] text-[#7a7a7a] font-medium block">Total Planned Hours</span>
                <span className="text-[22px] font-semibold text-[#1d1d1f]">{totalHours} hrs</span>
              </div>
              <Clock className="w-6 h-6 text-[#0066cc]" />
            </div>

            <div className="bg-[#f5f5f7] rounded-[14px] p-4 flex items-center justify-between">
              <div>
                <span className="text-[12px] text-[#7a7a7a] font-medium block">Phase Milestones</span>
                <span className="text-[22px] font-semibold text-[#1d1d1f]">{milestones.length} Phases</span>
              </div>
              <Calendar className="w-6 h-6 text-[#0066cc]" />
            </div>

            <div className="bg-[#f5f5f7] rounded-[14px] p-4 flex items-center justify-between">
              <div>
                <span className="text-[12px] text-[#7a7a7a] font-medium block">Milestones Completed</span>
                <span className="text-[22px] font-semibold text-[#0066cc]">
                  {completedCount} of {milestones.length} ({progressPercent}%)
                </span>
              </div>
              <CheckCircle2 className="w-6 h-6 text-[#0066cc]" />
            </div>
          </div>
        </Card>

        {/* Timeline Items */}
        <div className="space-y-6">
          {milestones.map((milestone, idx) => (
            <Card
              key={milestone.week}
              variant="utility"
              className={`p-6 sm:p-8 transition-all ${
                milestone.completed ? 'bg-white border-[#81c995]' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleMilestone(milestone.week)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      milestone.completed
                        ? 'bg-[#137333] text-white'
                        : 'border-2 border-[#e0e0e0] hover:border-[#0066cc]'
                    }`}
                    aria-label={`Mark milestone ${milestone.week} as completed`}
                  >
                    {milestone.completed && <CheckSquare className="w-4 h-4" />}
                  </button>

                  <div>
                    <span className="text-[12px] uppercase tracking-wider text-[#0066cc] font-semibold block">
                      Phase #{idx + 1}
                    </span>
                    <h3 className={`text-[19px] font-semibold ${
                      milestone.completed ? 'line-through text-[#7a7a7a]' : 'text-[#1d1d1f]'
                    }`}>
                      {milestone.phaseName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="neutral">
                    <Clock className="w-3 h-3 mr-1 text-[#7a7a7a]" />
                    {milestone.estimatedHours} hrs
                  </Badge>
                </div>
              </div>

              {/* Goal */}
              <div className="bg-[#f5f5f7] p-4 rounded-[11px] mb-5 text-[14px] text-[#1d1d1f] font-medium">
                <span className="text-[#0066cc] font-semibold block mb-0.5">Phase Objective:</span>
                {milestone.goal}
              </div>

              {/* Deliverables List */}
              <div className="mb-5">
                <span className="text-[12px] uppercase tracking-wider text-[#7a7a7a] font-semibold block mb-2">
                  Key Deliverables for Guide Review
                </span>
                <div className="space-y-1.5">
                  {milestone.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-[14px] text-[#333333]">
                      <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning & Risks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#f0f0f0] text-[13px]">
                <div className="flex items-start gap-2 text-[#7a7a7a]">
                  <BookOpen className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1d1d1f] block">Recommended Study:</span>
                    <span>{milestone.learningTopics.join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[#7a7a7a]">
                  <AlertTriangle className="w-4 h-4 text-[#b06000] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1d1d1f] block">Risk to Avoid:</span>
                    <span>{milestone.risks}</span>
                  </div>
                </div>
              </div>

              {/* Success Criteria */}
              <div className="mt-4 pt-3 border-t border-[#f0f0f0] text-[12px] text-[#7a7a7a]">
                <span className="font-semibold text-[#1d1d1f]">Faculty Success Sign-off: </span>
                {milestone.successCriteria}
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA to Mentor Review */}
        <div className="bg-[#272729] text-white rounded-[18px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[20px] font-semibold text-white">
              Next: Review Pre-Development Risks & Viva Prep
            </h3>
            <p className="text-[14px] text-[#cccccc] mt-1">
              Audit the project strengths, bottlenecks, and the 5 tough questions examiners will ask.
            </p>
          </div>
          <Link href="/mentor">
            <Button variant="store-hero">
              Open Mentor Critique Center
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
