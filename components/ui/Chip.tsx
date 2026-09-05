'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onToggle?: () => void;
  icon?: React.ReactNode;
}

export function Chip({
  className,
  selected = false,
  onToggle,
  icon,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] transition-all duration-150 cursor-pointer select-none font-normal btn-apple-active',
        selected
          ? 'bg-[#0066cc]/10 border-2 border-[#0071e3] text-[#0066cc] font-medium'
          : 'bg-white border border-[#e0e0e0] text-[#1d1d1f] hover:border-[#cccccc]',
        className
      )}
      {...props}
    >
      {icon && <span className="text-[14px]">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
