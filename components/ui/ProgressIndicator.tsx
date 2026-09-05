import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  className?: string;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  stepLabels,
  className,
}: ProgressIndicatorProps) {
  const percentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between text-[12px] font-medium text-[#7a7a7a] mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        {stepLabels && stepLabels[currentStep - 1] && (
          <span className="text-[#1d1d1f] font-semibold">{stepLabels[currentStep - 1]}</span>
        )}
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-[#f0f0f0] h-[4px] rounded-full overflow-hidden">
        <div
          className="bg-[#0066cc] h-full transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
