'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { IdeaCard } from '@/components/IdeaCard';
import { ActionButton } from '@/components/ActionButton';
import { FarcasterService } from '@/lib/farcaster-service';
import { Idea } from '@/lib/types';
import { ArrowLeft, Share2 } from 'lucide-react';

export default function IdeaDetailPage() {
  const params = useParams();
  const ideaId = params.ideaId as string;
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIdea = () => {
      try {
        const ideaData = FarcasterService.getIdeaForFrame(ideaId);
        if (ideaData) {
          setIdea(ideaData);
        } else {
          setError('Idea not found or has expired');
        }
      } catch (err) {
        setError('Failed to load idea');
      } finally {
        setLoading(false);
      }
    };

    loadIdea();
  }, [ideaId]);

  const handleShare = () => {
    if (idea) {
      FarcasterService.shareIdeaToFarcaster(idea);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-secondary">Loading idea...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (error || !idea) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h3 className="text-headline text-text-primary mb-2">
            {error || 'Idea Not Found'}
          </h3>
          <p className="text-body text-text-secondary mb-6">
            This idea may have expired or doesn't exist.
          </p>
          <ActionButton variant="primary" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </ActionButton>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <ActionButton variant="icon" onClick={handleBack}>
          <ArrowLeft className="w-5 h-5" />
        </ActionButton>

        <ActionButton variant="icon" onClick={handleShare}>
          <Share2 className="w-5 h-5" />
        </ActionButton>
      </div>

      {/* Idea Card */}
      <IdeaCard
        idea={idea}
        variant="showcase"
        onShare={handleShare}
      />

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-caption text-text-secondary mb-4">
          Shared via IdeaSpark - Shake for startup ideas!
        </p>
        <ActionButton variant="primary" onClick={() => window.open('/', '_blank')}>
          Try IdeaSpark
        </ActionButton>
      </div>
    </AppShell>
  );
}

