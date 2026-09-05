'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  Award,
  AlertTriangle,
  Lightbulb,
  Compass,
  Download,
  Briefcase,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { VivaSimulator } from '@/components/mentor/VivaSimulator';
import { useProject } from '@/lib/context/ProjectContext';
import { generateUniversitySynopsisMarkdown, downloadFile } from '@/lib/export/synopsisExporter';

export default function MentorPage() {
  const router = useRouter();
  const { suite, profile } = useProject();

  if (!suite) {
    return (
      <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-20 px-4 flex items-center justify-center">
        <EmptyState
          icon={<Compass className="w-8 h-8 text-[#0066cc]" />}
          title="No Project Available for Mentorship"
          description="Complete your student profile to allow our AI Decision Engine to generate recommendations and a pre-development critique."
          actionLabel="Open Student Profiler"
          onAction={() => router.push('/profile')}
        />
      </div>
    );
  }

  const review = suite.mentorReview;
  const project = suite.recommendedProjects[suite.selectedProjectIndex] || suite.recommendedProjects[0];
  const career = suite.careerAlignment;

  const handleExport = () => {
    const md = generateUniversitySynopsisMarkdown(suite, profile);
    downloadFile(md, `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-mentor-critique.md`);
  };

  return (
    <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-12 px-4 sm:px-8">
      <div className="max-w-[1140px] mx-auto space-y-8">
        {/* Mentor Overview Banner */}
        <Card variant="utility" className="p-8 sm:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#f0f0f0]">
            <div>
              <span className="text-[12px] uppercase tracking-wider text-[#0066cc] font-semibold block mb-1">
                Faculty Evaluation & Viva Defense
              </span>
              <h1 className="font-display-lg text-[#1d1d1f] tracking-tight">
                AI Mentor Review & Critique
              </h1>
              <p className="text-[15px] text-[#7a7a7a] mt-1">
                A pre-development technical audit of &ldquo;{project.title}&rdquo; before you write a single line of code.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="secondary-pill" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-1.5" />
                Download Review Pack
              </Button>
            </div>
          </div>

          {/* Portfolio Impact Verdict */}
          <div className="mt-6 p-5 bg-[#fafafc] border border-[#e0e0e0] rounded-[14px]">
            <span className="text-[12px] uppercase tracking-wider text-[#0066cc] font-semibold block mb-1">
              Capstone Portfolio Impact Rating
            </span>
            <p className="text-[15px] text-[#1d1d1f] leading-relaxed">
              {review.portfolioImpact}
            </p>
          </div>
        </Card>

        {/* Strengths vs Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths */}
          <Card variant="utility" className="p-8 border-t-4 border-t-[#137333]">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#137333]" />
              <h2 className="text-[20px] font-semibold text-[#1d1d1f]">
                Competitive Strengths
              </h2>
            </div>
            <p className="text-[13px] text-[#7a7a7a] mb-6">
              Aspects of this project that will impress external examiners and campus recruiters.
            </p>
            <div className="space-y-3.5">
              {review.strengths.map((str, i) => (
                <div key={i} className="flex items-start gap-3 text-[14px] text-[#333333]">
                  <span className="w-5 h-5 rounded-full bg-[#e3f9e5] text-[#137333] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Weaknesses / Vulnerabilities */}
          <Card variant="utility" className="p-8 border-t-4 border-t-[#d93025]">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-[#d93025]" />
              <h2 className="text-[20px] font-semibold text-[#1d1d1f]">
                Vulnerabilities & Pitfalls
              </h2>
            </div>
            <p className="text-[13px] text-[#7a7a7a] mb-6">
              Critical bottlenecks to address during design to avoid examiner point deductions.
            </p>
            <div className="space-y-3.5">
              {review.weaknesses.map((weak, i) => (
                <div key={i} className="flex items-start gap-3 text-[14px] text-[#333333]">
                  <span className="w-5 h-5 rounded-full bg-[#fce8e6] text-[#d93025] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </span>
                  <span>{weak}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Technical & Learning Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card variant="utility" className="p-8">
            <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#0066cc]" />
              Technical Implementation Challenges
            </h3>
            <div className="space-y-3">
              {review.technicalChallenges.map((tc, idx) => (
                <div key={idx} className="p-3 bg-[#f5f5f7] rounded-[11px] text-[13px] text-[#333333]">
                  {tc}
                </div>
              ))}
            </div>
          </Card>

          <Card variant="utility" className="p-8">
            <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#0066cc]" />
              Recommended Concepts to Master
            </h3>
            <div className="space-y-3">
              {review.learningChallenges.map((lc, idx) => (
                <div key={idx} className="p-3 bg-[#f5f5f7] rounded-[11px] text-[13px] text-[#333333]">
                  {lc}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Risk Assessment Matrix */}
        <Card variant="utility" className="p-8 sm:p-10">
          <div className="mb-6">
            <h2 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight mb-2 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-[#b06000]" />
              Engineering Risk Matrix & Mitigations
            </h2>
            <p className="text-[14px] text-[#7a7a7a]">
              Anticipated operational risks categorized by severity with pre-planned fallback strategies.
            </p>
          </div>

          <div className="space-y-4">
            {review.risks.map((riskItem, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-[#e0e0e0] rounded-[14px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#1d1d1f] text-[15px]">
                      {riskItem.risk}
                    </span>
                    <Badge
                      variant={
                        riskItem.severity === 'High'
                          ? 'warning'
                          : riskItem.severity === 'Medium'
                          ? 'blue'
                          : 'neutral'
                      }
                    >
                      {riskItem.severity} Severity
                    </Badge>
                  </div>
                  <p className="text-[13px] text-[#7a7a7a]">
                    <strong className="text-[#1d1d1f]">Mitigation Strategy:</strong> {riskItem.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Interactive Mock Viva Defense Simulator (Differentiator Feature) */}
        <VivaSimulator
          questions={review.vivaQuestions}
          projectTitle={project.title}
        />

        {/* Examiner Viva Defense Questions & Answers */}
        <Card variant="utility" className="p-8 sm:p-10">
          <div className="mb-6">
            <h2 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight mb-2 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#0066cc]" />
              Viva Question Bank & Benchmark Defenses
            </h2>
            <p className="text-[14px] text-[#555555]">
              Full breakdown of conceptual questions with high-scoring model answers for evaluation panels.
            </p>
          </div>

          <div className="space-y-6">
            {review.vivaQuestions.map((viva, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#f5f5f7] border border-[#e0e0e0] rounded-[14px] space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    Q{idx + 1}
                  </span>
                  <h4 className="text-[16px] font-semibold text-[#1d1d1f]">
                    &ldquo;{viva.question}&rdquo;
                  </h4>
                </div>

                <div className="pl-9 text-[14px] text-[#333333] bg-white p-4 rounded-[11px] border border-[#e0e0e0] leading-relaxed">
                  <span className="font-semibold text-[#0066cc] block mb-1">Recommended Defense Strategy:</span>
                  {viva.answerGuidance}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Priority Action Checklist & Career Talking Points */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Action Checklist */}
          <Card variant="utility" className="p-8 space-y-4">
            <h3 className="text-[20px] font-semibold text-[#1d1d1f] flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#0066cc]" />
              Priority Actions Before Starting Code
            </h3>
            <div className="space-y-3">
              {review.improvementPriorities.map((item, i) => (
                <div key={i} className="p-3.5 bg-white border border-[#e0e0e0] rounded-[11px] flex items-center justify-between text-[13px]">
                  <span className="text-[#1d1d1f] font-medium">{item.action}</span>
                  <div className="flex items-center gap-1.5 shrink-0 ml-3">
                    <Badge variant="blue">{item.impact} Impact</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Career & Interview Talking Points */}
          <Card variant="utility" className="p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-semibold text-[#1d1d1f] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#0066cc]" />
                Placement Interview Angles
              </h3>
              <Badge variant="success">{career.score}% Alignment</Badge>
            </div>
            <p className="text-[13px] text-[#7a7a7a]">
              {career.rationale}
            </p>
            <div className="space-y-2 pt-2">
              {career.interviewTalkingPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[13px] text-[#333333]">
                  <span className="text-[#0066cc] font-bold">•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Final CTA Banner */}
        <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[20px] font-semibold text-[#1d1d1f]">
              Ready to submit your synopsis to your faculty coordinator?
            </h3>
            <p className="text-[14px] text-[#7a7a7a] mt-1">
              Export your university-formatted markdown synopsis containing all abstract, workflow, and milestone details.
            </p>
          </div>
          <Button variant="primary" size="lg" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Download Complete Project Pack
          </Button>
        </div>
      </div>
    </div>
  );
}
