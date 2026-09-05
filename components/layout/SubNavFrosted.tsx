'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Download, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { useProject } from '@/lib/context/ProjectContext';
import { generateUniversitySynopsisMarkdown, downloadFile } from '@/lib/export/synopsisExporter';

export function SubNavFrosted() {
  const pathname = usePathname();
  const { suite, profile, isGenerating, generateProjectSuite } = useProject();

  const getSectionTitle = () => {
    switch (pathname) {
      case '/':
        return 'Overview';
      case '/profile':
        return 'Student Profiler';
      case '/recommendations':
        return 'Curated Project Ideas';
      case '/blueprint':
        return 'Architecture Blueprint';
      case '/roadmap':
        return 'Development Roadmap';
      case '/mentor':
        return 'Mentor Review & Viva';
      default:
        return 'Project Studio';
    }
  };

  const handleExport = () => {
    if (!suite) return;
    const project = suite.recommendedProjects[suite.selectedProjectIndex] || suite.recommendedProjects[0];
    const md = generateUniversitySynopsisMarkdown(suite, profile);
    downloadFile(md, `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-synopsis.md`);
  };

  return (
    <div className="sticky top-[44px] z-40 w-full bg-[#f5f5f7]/85 backdrop-blur-md border-b border-[#e0e0e0]/70">
      <div className="max-w-[1440px] mx-auto h-[52px] px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Section Title */}
        <div className="flex items-center gap-3">
          <span className="font-tagline text-[19px] sm:text-[21px] text-[#1d1d1f] font-semibold">
            {getSectionTitle()}
          </span>
          {suite && (
            <span className="text-[12px] bg-white border border-[#e0e0e0] px-2.5 py-0.5 rounded-full text-[#7a7a7a] hidden lg:inline-block">
              {suite.recommendedProjects.length} ideas evaluated
            </span>
          )}
        </div>

        {/* Right: Context Actions */}
        <div className="flex items-center gap-3">
          {suite && (
            <Button
              variant="secondary-pill"
              size="sm"
              onClick={handleExport}
              className="text-[13px] py-1 hidden sm:inline-flex"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export Synopsis
            </Button>
          )}

          {pathname === '/' && (
            <Link href="/profile">
              <Button variant="primary" size="sm" className="text-[13px] py-1">
                Start Profiler
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          )}

          {pathname === '/profile' && (
            <Button
              variant="primary"
              size="sm"
              isLoading={isGenerating}
              onClick={() => generateProjectSuite()}
              className="text-[13px] py-1"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Generate Ideas
            </Button>
          )}

          {pathname === '/recommendations' && suite && (
            <Link href="/blueprint">
              <Button variant="primary" size="sm" className="text-[13px] py-1">
                Inspect Blueprint
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          )}

          {(pathname === '/blueprint' || pathname === '/roadmap' || pathname === '/mentor') && (
            <div className="flex items-center gap-2">
              <Link href="/recommendations">
                <Button variant="secondary-pill" size="sm" className="text-[13px] py-1">
                  Change Idea
                </Button>
              </Link>
              {pathname === '/blueprint' && (
                <Link href="/roadmap">
                  <Button variant="primary" size="sm" className="text-[13px] py-1">
                    View Roadmap
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              )}
              {pathname === '/roadmap' && (
                <Link href="/mentor">
                  <Button variant="primary" size="sm" className="text-[13px] py-1">
                    Mentor Critique
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
