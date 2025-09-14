'use client';

import { useState, useCallback } from 'react';
import { Smartphone, Sparkles, BookOpen, Crown, Zap } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { IdeaCard } from '@/components/IdeaCard';
import { ActionButton } from '@/components/ActionButton';
import { FilterDropdown } from '@/components/FilterDropdown';
import { useShakeDetection } from '@/hooks/useShakeDetection';
import { AIService } from '@/lib/ai-service';
import { StorageService } from '@/lib/storage';
import { Idea, FilterOptions } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [showSavedIdeas, setShowSavedIdeas] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [savedIdeas, setSavedIdeas] = useState(() => StorageService.getSavedIdeas());
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Handle URL parameters for notifications
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const saved = urlParams.get('saved');
    const message = urlParams.get('message');

    if (message) {
      setNotification({
        message,
        type: saved ? 'success' : 'error'
      });

      // Clear URL parameters
      window.history.replaceState({}, '', window.location.pathname);

      // Auto-hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  }, []);

  const generateNewIdea = useCallback(async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const idea = await AIService.generateIdea(filters);
      setCurrentIdea(idea);
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error generating idea:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [filters, isGenerating]);

  const { isShaking } = useShakeDetection(generateNewIdea, !showSavedIdeas);

  const expandIdea = async (idea: Idea) => {
    if (isExpanding) return;
    
    const isPremium = StorageService.isPremiumUser();
    if (!isPremium) {
      // Show premium prompt
      alert('Upgrade to Premium to unlock AI-powered idea expansions!');
      return;
    }

    setIsExpanding(true);
    try {
      const expansions = await AIService.expandIdea({
        rawIdea: idea.rawIdeaText,
        expandOneLiner: !idea.oneLiner,
        expandDescription: !idea.description,
        expandMarketAnalysis: !idea.marketSummary,
        expandValidationTips: !idea.validationTips,
      });

      const expandedIdea = { ...idea, ...expansions };
      setCurrentIdea(expandedIdea);
    } catch (error) {
      console.error('Error expanding idea:', error);
    } finally {
      setIsExpanding(false);
    }
  };

  const handleSaveIdea = (idea: Idea) => {
    setSavedIdeas(StorageService.getSavedIdeas());
    setNotification({
      message: 'Idea saved successfully!',
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDiscardIdea = () => {
    generateNewIdea();
  };

  const handleShareIdea = async (idea: Idea) => {
    try {
      await FarcasterService.shareIdeaToFarcaster(idea);
    } catch (error) {
      console.error('Error sharing idea:', error);
      setNotification({
        message: 'Failed to share idea. Please try again.',
        type: 'error'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filteredSavedIdeas = StorageService.filterSavedIdeas(filters);

  if (showOnboarding) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-display text-text-primary mb-4">
            IdeaSpark
          </h1>
          
          <p className="text-lg text-accent font-medium mb-2">
            Shake your phone for your next big startup idea
          </p>
          
          <p className="text-body text-text-secondary mb-8 max-w-sm mx-auto">
            Get AI-powered startup ideas instantly. Shake to generate, swipe to save, and share with your network.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-surface rounded-lg border border-border">
              <Smartphone className="w-6 h-6 text-accent" />
              <div className="text-left">
                <h3 className="font-medium text-text-primary">Shake to Generate</h3>
                <p className="text-sm text-text-secondary">Physical shake triggers new ideas</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-surface rounded-lg border border-border">
              <Zap className="w-6 h-6 text-accent" />
              <div className="text-left">
                <h3 className="font-medium text-text-primary">AI Expansion</h3>
                <p className="text-sm text-text-secondary">Get detailed analysis and validation tips</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-surface rounded-lg border border-border">
              <BookOpen className="w-6 h-6 text-accent" />
              <div className="text-left">
                <h3 className="font-medium text-text-primary">Save & Filter</h3>
                <p className="text-sm text-text-secondary">Organize ideas by industry and tech stack</p>
              </div>
            </div>
          </div>

          <ActionButton
            variant="primary"
            onClick={generateNewIdea}
            loading={isGenerating}
            className={cn(
              'w-full mb-4',
              isShaking && 'animate-shake'
            )}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Your First Idea
          </ActionButton>

          <p className="text-caption text-text-secondary">
            Or shake your device to get started
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 left-4 right-4 z-50 p-4 rounded-lg shadow-card animate-slide-up ${
          notification.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">IdeaSpark</h1>
          <p className="text-sm text-text-secondary">
            {showSavedIdeas ? `${filteredSavedIdeas.length} saved ideas` : 'Shake for new ideas'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <ActionButton
            variant="icon"
            onClick={() => setShowSavedIdeas(!showSavedIdeas)}
            className={cn(
              showSavedIdeas ? 'bg-primary text-white' : 'text-text-secondary'
            )}
          >
            <BookOpen className="w-5 h-5" />
          </ActionButton>
          
          <ActionButton
            variant="icon"
            onClick={() => StorageService.setPremiumStatus(!StorageService.isPremiumUser())}
            className={cn(
              StorageService.isPremiumUser() ? 'text-yellow-500' : 'text-text-secondary'
            )}
          >
            <Crown className="w-5 h-5" />
          </ActionButton>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterDropdown
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>

      {/* Content */}
      {showSavedIdeas ? (
        <div>
          {filteredSavedIdeas.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-text-secondary mx-auto mb-4" />
              <h3 className="text-headline text-text-primary mb-2">
                No saved ideas yet
              </h3>
              <p className="text-body text-text-secondary mb-6">
                Generate and save ideas to build your collection
              </p>
              <ActionButton
                variant="primary"
                onClick={() => setShowSavedIdeas(false)}
              >
                Generate Ideas
              </ActionButton>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSavedIdeas.map((savedIdea) => (
                <IdeaCard
                  key={savedIdea.savedIdeaId}
                  idea={savedIdea.idea!}
                  variant="list-item"
                  onShare={handleShareIdea}
                  onExpand={expandIdea}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {currentIdea ? (
            <div className={cn(isShaking && 'animate-shake')}>
              <IdeaCard
                idea={currentIdea}
                variant="showcase"
                onSave={handleSaveIdea}
                onDiscard={handleDiscardIdea}
                onShare={handleShareIdea}
                onExpand={expandIdea}
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <div className={cn(
                'w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300',
                isShaking && 'animate-shake'
              )}>
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-headline text-text-primary mb-2">
                Ready for inspiration?
              </h3>
              <p className="text-body text-text-secondary mb-6">
                Shake your device or tap the button to generate a new startup idea
              </p>
              <ActionButton
                variant="primary"
                onClick={generateNewIdea}
                loading={isGenerating}
                className="w-full"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Idea
              </ActionButton>
            </div>
          )}

          {isExpanding && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-surface p-6 rounded-lg shadow-card max-w-sm mx-4">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    Expanding Idea
                  </h3>
                  <p className="text-sm text-text-secondary">
                    AI is analyzing your idea and generating insights...
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AppShell>
  );
}
