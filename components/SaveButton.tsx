'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Idea } from '@/lib/types';
import { StorageService } from '@/lib/storage';
import { ActionButton } from './ActionButton';

interface SaveButtonProps {
  idea: Idea;
  onSave?: (idea: Idea) => void;
  className?: string;
}

export function SaveButton({ idea, onSave, className }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(() => StorageService.isIdeaSaved(idea.ideaId));

  const handleSave = () => {
    if (isSaved) {
      StorageService.removeSavedIdea(idea.ideaId);
      setIsSaved(false);
    } else {
      StorageService.saveIdea(idea);
      setIsSaved(true);
      onSave?.(idea);
    }
  };

  return (
    <ActionButton
      variant="icon"
      onClick={handleSave}
      className={cn(
        'transition-colors duration-200',
        isSaved ? 'text-red-500 hover:text-red-600' : 'text-text-secondary hover:text-text-primary',
        className
      )}
    >
      <Heart className={cn('w-5 h-5', isSaved && 'fill-current')} />
    </ActionButton>
  );
}
