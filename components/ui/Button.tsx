'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary-pill' | 'dark-utility' | 'pearl-capsule' | 'store-hero' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-normal transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none btn-apple-active';

    const variants = {
      primary: 'bg-[#0066cc] text-white hover:bg-[#0071e3] focus-visible:outline-2 focus-visible:outline-[#0071e3] focus-visible:outline-offset-2 rounded-full',
      'secondary-pill': 'bg-transparent text-[#0066cc] border border-[#0066cc] hover:bg-[#0066cc]/5 focus-visible:outline-2 focus-visible:outline-[#0071e3] focus-visible:outline-offset-2 rounded-full',
      'dark-utility': 'bg-[#1d1d1f] text-white hover:bg-[#333333] focus-visible:outline-2 focus-visible:outline-[#1d1d1f] focus-visible:outline-offset-2 rounded-[8px]',
      'pearl-capsule': 'bg-[#fafafc] text-[#333333] border border-[#f0f0f0] hover:bg-[#f5f5f7] rounded-[11px]',
      'store-hero': 'bg-[#0066cc] text-white hover:bg-[#0071e3] text-[18px] rounded-full px-7 py-3.5',
      ghost: 'bg-transparent text-[#0066cc] hover:bg-[#0066cc]/5 rounded-full',
    };

    const sizes = {
      sm: 'text-[14px] px-3.5 py-1.5 min-h-[36px]',
      md: 'text-[17px] px-5 py-2.5 min-h-[44px]',
      lg: 'text-[18px] px-7 py-3.5 min-h-[50px]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          variant !== 'store-hero' && sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
