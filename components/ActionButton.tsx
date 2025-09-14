'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
  loading?: boolean;
  className?: string;
}

export function ActionButton({ 
  children, 
  variant = 'primary', 
  loading = false,
  disabled,
  className,
  ...props 
}: ActionButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary',
        variant === 'icon' && 'btn-icon',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
