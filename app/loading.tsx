import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function GlobalLoading() {
  return (
    <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-12 px-4 sm:px-8">
      <div className="max-w-[1140px] mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="p-8 sm:p-10 bg-white border border-[#e0e0e0] rounded-[18px] space-y-4">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-8 w-72 rounded-[8px]" />
          <Skeleton className="h-4 w-full max-w-xl rounded-full" />
        </div>

        {/* Content Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#e0e0e0] rounded-[18px] space-y-3">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-16 w-full rounded-[8px]" />
            <Skeleton className="h-8 w-28 rounded-full" />
          </div>
          <div className="p-6 bg-white border border-[#e0e0e0] rounded-[18px] space-y-3">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-16 w-full rounded-[8px]" />
            <Skeleton className="h-8 w-28 rounded-full" />
          </div>
          <div className="p-6 bg-white border border-[#e0e0e0] rounded-[18px] space-y-3">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-16 w-full rounded-[8px]" />
            <Skeleton className="h-8 w-28 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
