import React from 'react';
import Link from 'next/link';
import { Compass, House } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center bg-[#f5f5f7] px-4 py-16">
      <div className="max-w-[480px] w-full bg-white border border-[#e0e0e0] rounded-[18px] p-8 sm:p-10 text-center space-y-5 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#f0f0f0] text-[#7a7a7a] mx-auto flex items-center justify-center">
          <Compass className="w-6 h-6 text-[#0066cc]" />
        </div>
        <div className="space-y-2">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc]">
            Error 404
          </span>
          <h1 className="text-[24px] font-semibold text-[#1d1d1f] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-[14px] text-[#7a7a7a] leading-relaxed">
            The engineering blueprint or resource you requested could not be located in this project studio.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md" className="w-full sm:w-auto">
              <House className="w-4 h-4 mr-2" />
              Return to Overview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
