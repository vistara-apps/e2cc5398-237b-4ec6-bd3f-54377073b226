import { NextRequest, NextResponse } from 'next/server';
import { FarcasterService } from '@/lib/farcaster-service';
import { StorageService } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { ideaId: string } }
) {
  try {
    const ideaId = params.ideaId;
    const idea = FarcasterService.getIdeaForFrame(ideaId);

    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found or expired' },
        { status: 404 }
      );
    }

    // Save the idea to local storage
    StorageService.saveIdea(idea);

    // Redirect back to the main app with a success message
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUrl = `${baseUrl}?saved=${ideaId}&message=Idea saved successfully!`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error saving idea:', error);
    return NextResponse.json(
      { error: 'Failed to save idea' },
      { status: 500 }
    );
  }
}

