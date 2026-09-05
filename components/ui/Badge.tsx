import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'neutral' | 'dark' | 'success' | 'warning';
}

export function Badge({
  className,
  variant = 'neutral',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    blue: 'bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/20',
    neutral: 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0]',
    dark: 'bg-[#272729] text-white border border-[#333333]',
    success: 'bg-[#e3f9e5] text-[#137333] border border-[#c6f0c9]',
    warning: 'bg-[#fef7e0] text-[#b06000] border border-[#fce8b2]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium tracking-tight',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
