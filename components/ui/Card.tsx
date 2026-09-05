import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'utility' | 'tile-light' | 'tile-parchment' | 'tile-dark' | 'tile-dark-2' | 'tile-dark-3';
}

export function Card({
  className,
  variant = 'utility',
  children,
  ...props
}: CardProps) {
  const variants = {
    utility: 'bg-white border border-[#e0e0e0] rounded-[18px] p-6 text-[#1d1d1f]',
    'tile-light': 'bg-white text-[#1d1d1f] py-20 px-6 sm:px-12',
    'tile-parchment': 'bg-[#f5f5f7] text-[#1d1d1f] py-20 px-6 sm:px-12',
    'tile-dark': 'bg-[#272729] text-white py-20 px-6 sm:px-12',
    'tile-dark-2': 'bg-[#2a2a2c] text-white py-20 px-6 sm:px-12',
    'tile-dark-3': 'bg-[#252527] text-white py-20 px-6 sm:px-12',
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
