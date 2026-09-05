'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Clock, Award, Zap } from 'lucide-react';
import { ProjectIdea } from '@/lib/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useProject } from '@/lib/context/ProjectContext';

export interface ProjectCardProps {
  project: ProjectIdea;
  index: number;
  isSelected?: boolean;
}

export function ProjectCard({ project, index, isSelected = false }: ProjectCardProps) {
  const router = useRouter();
  const { setSelectedProjectIndex } = useProject();

  const handleSelect = () => {
    setSelectedProjectIndex(index);
    router.push('/blueprint');
  };

  return (
    <Card
      variant="utility"
      className={`transition-all duration-200 flex flex-col justify-between ${
        isSelected ? 'border-[#0071e3] ring-2 ring-[#0071e3]/20' : 'hover:border-[#cccccc]'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge variant="blue" className="font-semibold text-[13px]">
            {project.matchScore}% Match
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#7a7a7a] font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#7a7a7a]" />
              {project.estimatedDuration}
            </span>
            <Badge
              variant={
                project.difficulty === 'Beginner'
                  ? 'success'
                  : project.difficulty === 'Intermediate'
                  ? 'blue'
                  : 'warning'
              }
            >
              {project.difficulty}
            </Badge>
          </div>
        </div>

        {/* Category & Title */}
        <span className="text-[12px] uppercase tracking-wider text-[#7a7a7a] font-semibold block mb-1">
          {project.category}
        </span>
        <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-tight mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-[14px] text-[#0066cc] font-medium mb-3">
          {project.tagline}
        </p>
        <p className="text-[14px] text-[#7a7a7a] leading-relaxed mb-5 line-clamp-3">
          {project.problemStatement}
        </p>

        {/* Evaluation Metrics Pill Row */}
        <div className="grid grid-cols-2 gap-2 bg-[#f5f5f7] rounded-[11px] p-3 mb-5 text-[12px]">
          <div className="flex items-center gap-1.5 text-[#1d1d1f]">
            <Award className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>Resume Value:</span>
            <span className="font-semibold">{project.resumeValue} / 10</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#1d1d1f]">
            <Zap className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>Practicality:</span>
            <span className="font-semibold">{project.practicalityScore} / 10</span>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="mb-5">
          <span className="text-[11px] uppercase tracking-wider text-[#7a7a7a] font-semibold block mb-2">
            Recommended Technologies
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.recommendedTech.map((tech) => (
              <span
                key={tech}
                className="text-[12px] bg-white border border-[#e0e0e0] text-[#1d1d1f] px-2.5 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Why it matches */}
        <div className="text-[13px] text-[#7a7a7a] bg-[#fafafc] border-l-2 border-[#0066cc] p-3 rounded-r-[8px] mb-6">
          <span className="font-semibold text-[#1d1d1f]">Why this fits: </span>
          {project.matchReason}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
        <span className="text-[12px] text-[#7a7a7a]">
          Option #{index + 1}
        </span>
        <Button variant="primary" size="sm" onClick={handleSelect}>
          Inspect Blueprint
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </Card>
  );
}
