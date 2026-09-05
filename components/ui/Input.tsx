import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[14px] font-semibold text-[#1d1d1f] mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full bg-white text-[#1d1d1f] text-[15px] border border-[#e0e0e0] rounded-full px-5 py-3 h-[44px] outline-none transition-all duration-150 focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20 disabled:bg-[#f5f5f7] disabled:text-[#7a7a7a]',
            error && 'border-[#d93025] focus:border-[#d93025] focus:ring-[#d93025]/20',
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="mt-1 text-[12px] text-[#7a7a7a] pl-2">{helperText}</p>
        )}
        {error && (
          <p className="mt-1 text-[12px] text-[#d93025] pl-2 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
