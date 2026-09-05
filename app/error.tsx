'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring in production
    console.error('Project Architect AI Application Error:', error);
  }, [error]);

  return (
    <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-20 px-4 flex items-center justify-center">
      <div className="max-w-[480px] w-full bg-white border border-[#e0e0e0] rounded-[18px] p-8 sm:p-10 text-center space-y-5 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#fce8e6] text-[#d93025] mx-auto flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight">
            Unexpected System Interruption
          </h1>
          <p className="text-[14px] text-[#555555] leading-relaxed">
            The architectural studio encountered an unhandled exception. Your local progress is safely preserved in memory.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="p-3 bg-[#fafafc] border border-[#e0e0e0] rounded-[8px] text-[12px] text-[#d93025] font-mono text-left overflow-auto max-h-[120px]">
            {error.message}
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="primary" size="sm" onClick={() => reset()}>
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Retry Action
          </Button>
          <Link href="/">
            <Button variant="secondary-pill" size="sm">
              <Home className="w-3.5 h-3.5 mr-1.5" />
              Return Overview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
