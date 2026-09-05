'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, Sparkles, FolderGit2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useProject } from '@/lib/context/ProjectContext';

export function GlobalNav() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { suite } = useProject();

  const navLinks = [
    { label: 'Discover', href: '/' },
    { label: 'Profile', href: '/profile' },
    { label: 'Recommendations', href: '/recommendations' },
    { label: 'Blueprint', href: '/blueprint' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Mentor Review', href: '/mentor' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000] text-white">
      <div className="max-w-[1440px] mx-auto h-[44px] px-4 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <Compass className="w-4 h-4 text-[#2997ff]" />
          <span className="text-[13px] font-semibold tracking-tight">ProjectMentor AI</span>
          <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#272729] text-[#2997ff] font-medium hidden sm:inline-block">
            PromptWars
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[12px] tracking-[-0.12px] transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-[#cccccc] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action / Project Indicator */}
        <div className="hidden md:flex items-center gap-3">
          {suite ? (
            <Link href="/blueprint">
              <span className="inline-flex items-center gap-1.5 text-[11px] bg-[#272729] text-[#2997ff] px-3 py-1 rounded-full border border-[#333333] hover:border-[#2997ff] transition-colors">
                <FolderGit2 className="w-3 h-3" />
                <span>Active: {suite.recommendedProjects[suite.selectedProjectIndex]?.title.slice(0, 20)}...</span>
              </span>
            </Link>
          ) : (
            <Link href="/profile">
              <button className="bg-[#0066cc] text-white text-[12px] px-3.5 py-1 rounded-full hover:bg-[#0071e3] transition-colors font-medium btn-apple-active">
                Start Blueprint
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-1.5 text-[#cccccc] hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#1d1d1f] border-b border-[#333333] px-6 py-4 flex flex-col gap-3.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`text-[15px] py-1 transition-colors ${
                  isActive ? 'text-[#2997ff] font-semibold' : 'text-[#cccccc]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#333333]">
            <Link
              href="/profile"
              onClick={() => setIsMobileOpen(false)}
              className="w-full"
            >
              <Button variant="primary" size="sm" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Build Project Blueprint
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
