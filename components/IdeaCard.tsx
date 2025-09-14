'use client';

import { useState, useRef } from 'react';
import { Heart, Share2, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { Idea } from '@/lib/types';
import { cn, getIndustryEmoji, getTechStackEmoji, getRevenueModelEmoji } from '@/lib/utils';
import { StorageService } from '@/lib/storage';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { CategoryTag } from './CategoryTag';
import { ActionButton } from './ActionButton';

interface IdeaCardProps {
  idea: Idea;
  variant?: 'showcase' | 'list-item';
  onSave?: (idea: Idea) => void;
  onDiscard?: (idea: Idea) => void;
  onShare?: (idea: Idea) => void;
  onExpand?: (idea: Idea) => void;
  className?: string;
}

export function IdeaCard({
  idea,
  variant = 'showcase',
  onSave,
  onDiscard,
  onShare,
  onExpand,
  className
}: IdeaCardProps) {
  const [isSaved, setIsSaved] = useState(() => StorageService.isIdeaSaved(idea.ideaId));
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useSwipeGesture(cardRef, {
    onSwipeLeft: () => onDiscard?.(idea),
    onSwipeRight: () => handleSave(),
  }, variant === 'showcase');

  const handleSave = () => {
    if (!isSaved) {
      StorageService.saveIdea(idea);
      setIsSaved(true);
      onSave?.(idea);
    }
  };

  const handleShare = () => {
    onShare?.(idea);
  };

  const handleExpand = () => {
    if (onExpand) {
      onExpand(idea);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const hasExpansions = idea.oneLiner || idea.description || idea.marketSummary || idea.validationTips;

  if (variant === 'list-item') {
    return (
      <div
        ref={cardRef}
        className={cn(
          'card p-4 mb-3 transition-all duration-200 hover:shadow-lg',
          className
        )}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-base font-normal leading-7 text-gray-900 mb-2 line-clamp-2">
              {idea.rawIdeaText}
            </p>
            {idea.oneLiner && (
              <p className="text-sm text-green-600 font-medium mb-2">
                {idea.oneLiner}
              </p>
            )}
          </div>
          <ActionButton
            variant="icon"
            onClick={handleSave}
            className={cn(
              'ml-2',
              isSaved ? 'text-red-500' : 'text-gray-600'
            )}
          >
            <Heart className={cn('w-5 h-5', isSaved && 'fill-current')} />
          </ActionButton>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {idea.industry && (
              <CategoryTag variant="default">
                {getIndustryEmoji(idea.industry)} {idea.industry}
              </CategoryTag>
            )}
            {idea.techStack && (
              <CategoryTag variant="default">
                {getTechStackEmoji(idea.techStack)} {idea.techStack}
              </CategoryTag>
            )}
          </div>
          
          <div className="flex gap-1">
            {hasExpansions && (
              <ActionButton variant="icon" onClick={handleExpand}>
                <Sparkles className="w-4 h-4" />
              </ActionButton>
            )}
            <ActionButton variant="icon" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </ActionButton>
          </div>
        </div>

        {isExpanded && hasExpansions && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 animate-slide-up">
            {idea.description && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Description
                </h4>
                <p className="text-sm text-gray-600">{idea.description}</p>
              </div>
            )}

            {idea.marketSummary && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Market Analysis
                </h4>
                <p className="text-sm text-gray-600">{idea.marketSummary}</p>
              </div>
            )}

            {idea.validationTips && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Validation Tips
                </h4>
                <p className="text-sm text-gray-600">{idea.validationTips}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        'card p-6 mb-6 transition-all duration-300 hover:shadow-lg',
        'relative overflow-hidden',
        className
      )}
    >
      {/* Swipe indicators */}
      <div className="absolute top-4 left-4 opacity-0 transition-opacity duration-200 pointer-events-none">
        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Discard
        </div>
      </div>
      <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-200 pointer-events-none">
        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Save
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">
          New Idea
        </h3>
        {idea.oneLiner && (
          <p className="text-lg text-green-600 font-medium mb-4">
            {idea.oneLiner}
          </p>
        )}
      </div>

      <div className="mb-6">
        <p className="text-base font-normal leading-7 text-gray-900 leading-relaxed">
          {idea.rawIdeaText}
        </p>
      </div>

      {idea.description && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
            <Zap className="w-4 h-4" />
            Description
          </h4>
          <p className="text-sm text-gray-600">{idea.description}</p>
        </div>
      )}

      {(idea.marketSummary || idea.validationTips) && (
        <div className="mb-6 space-y-4">
          {idea.marketSummary && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Market Analysis
              </h4>
              <p className="text-sm text-gray-600">{idea.marketSummary}</p>
            </div>
          )}

          {idea.validationTips && (
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                <Users className="w-4 h-4" />
                Validation Tips
              </h4>
              <p className="text-sm text-gray-600">{idea.validationTips}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 mb-6 justify-center">
        {idea.industry && (
          <CategoryTag variant="default">
            {getIndustryEmoji(idea.industry)} {idea.industry}
          </CategoryTag>
        )}
        {idea.techStack && (
          <CategoryTag variant="default">
            {getTechStackEmoji(idea.techStack)} {idea.techStack}
          </CategoryTag>
        )}
        {idea.revenueModel && (
          <CategoryTag variant="default">
            {getRevenueModelEmoji(idea.revenueModel)} {idea.revenueModel}
          </CategoryTag>
        )}
      </div>

      <div className="flex gap-3">
        <ActionButton
          variant="secondary"
          onClick={() => onDiscard?.(idea)}
          className="flex-1"
        >
          Pass
        </ActionButton>
        
        <ActionButton
          variant="primary"
          onClick={handleSave}
          className={cn(
            'flex-1',
            isSaved && 'bg-green-600 hover:bg-green-700'
          )}
        >
          <Heart className={cn('w-4 h-4 mr-2', isSaved && 'fill-current')} />
          {isSaved ? 'Saved' : 'Save'}
        </ActionButton>
        
        <ActionButton
          variant="icon"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5" />
        </ActionButton>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm font-light text-gray-600">
          Swipe right to save • Swipe left to discard
        </p>
      </div>
    </div>
  );
}
