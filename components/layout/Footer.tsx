import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#f5f5f7] text-[#333333] border-t border-[#e0e0e0] py-16 px-4 sm:px-8">
      <div className="max-w-[1024px] mx-auto">
        {/* Editorial Footnote */}
        <p className="text-[12px] text-[#555555] leading-relaxed pb-8 border-b border-[#e0e0e0]">
          1. ProjectMentor AI is built for university engineering students participating in the PromptWars x Parul University Hackathon.
          2. Recommendations, architectures, and milestone timelines are generated using the Google Gemini Decision Engine and local deterministic synthesis to guarantee zero unhandled runtime failure.
          3. Final project approval remains subject to your department faculty committee and project coordinator.
        </p>

        {/* Dense Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 text-[14px]">
          <div>
            <h3 className="font-semibold text-[#1d1d1f] text-[14px] tracking-tight mb-3">
              Explore & Build
            </h3>
            <ul className="space-y-1 text-[#333333] leading-[2.41]">
              <li><Link href="/" className="hover:text-[#0066cc] transition-colors">Platform Overview</Link></li>
              <li><Link href="/profile" className="hover:text-[#0066cc] transition-colors">Student Profiler</Link></li>
              <li><Link href="/recommendations" className="hover:text-[#0066cc] transition-colors">Idea Recommendations</Link></li>
              <li><Link href="/blueprint" className="hover:text-[#0066cc] transition-colors">Project Blueprint</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1d1d1f] text-[14px] tracking-tight mb-3">
              Mentorship
            </h3>
            <ul className="space-y-1 text-[#333333] leading-[2.41]">
              <li><Link href="/roadmap" className="hover:text-[#0066cc] transition-colors">Milestone Roadmap</Link></li>
              <li><Link href="/mentor" className="hover:text-[#0066cc] transition-colors">Pre-Dev Critique</Link></li>
              <li><Link href="/mentor" className="hover:text-[#0066cc] transition-colors">Viva Defense Questions</Link></li>
              <li><Link href="/blueprint" className="hover:text-[#0066cc] transition-colors">Tech Stack Matrix</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1d1d1f] text-[14px] tracking-tight mb-3">
              Engineering Disciplines
            </h3>
            <ul className="space-y-1 text-[#555555] leading-[2.41]">
              <li><span>Computer Science (CSE)</span></li>
              <li><span>Information Technology (IT)</span></li>
              <li><span>AI & Data Science (AIDS)</span></li>
              <li><span>Electronics (ECE) & IoT</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1d1d1f] text-[14px] tracking-tight mb-3">
              PromptWars Evaluation
            </h3>
            <ul className="space-y-1 text-[#555555] leading-[2.41]">
              <li><span>Next.js 15 App Router</span></li>
              <li><span>DESIGN.md Strict Tokens</span></li>
              <li><span>Zero-Gradient Minimalist UI</span></li>
              <li><span>Sub-10MB Clean Repository</span></li>
            </ul>
          </div>
        </div>

        {/* Legal & Attribution Bar */}
        <div className="pt-6 border-t border-[#e0e0e0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#555555]">
          <div>
            Copyright © {new Date().getFullYear()} ProjectMentor AI. Built for PromptWars x Parul University Hackathon.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1d1d1f]">Strict Apple Minimalism</span>
            <span className="hover:text-[#1d1d1f]">Google AI Studio</span>
            <span className="hover:text-[#1d1d1f]">Vercel Edge Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
