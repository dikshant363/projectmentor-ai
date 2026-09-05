import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12 max-w-[540px] mx-auto',
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] mb-5">
          {icon}
        </div>
      )}
      <h3 className="font-display-md text-[#1d1d1f] mb-3">{title}</h3>
      <p className="text-[17px] text-[#7a7a7a] leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
