import React from 'react';
import { cn } from '@/lib/utils/cn';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-[#f5f5f7] rounded-[8px]',
        className
      )}
      {...props}
    />
  );
}
