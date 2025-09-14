'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'compact';
  className?: string;
}

export function AppShell({ children, variant = 'default', className }: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen bg-bg',
      variant === 'compact' ? 'px-4 py-4' : 'container',
      className
    )}>
      <div className="max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
}
