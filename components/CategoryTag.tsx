'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CategoryTagProps {
  children: ReactNode;
  variant?: 'default' | 'active';
  onClick?: () => void;
  className?: string;
}

export function CategoryTag({ 
  children, 
  variant = 'default', 
  onClick, 
  className 
}: CategoryTagProps) {
  const isClickable = !!onClick;

  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
        variant === 'default' && 'bg-gray-100 text-gray-600',
        variant === 'active' && 'bg-green-600 text-white',
        isClickable && 'cursor-pointer hover:opacity-80 active:scale-95',
        className
      )}
    >
      {children}
    </span>
  );
}
