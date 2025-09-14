import { NextRequest, NextResponse } from 'next/server';
import { FarcasterService } from '@/lib/farcaster-service';

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

    const frameHtml = FarcasterService.generateFrameHtml(idea);

    return new NextResponse(frameHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error generating frame:', error);
    return NextResponse.json(
      { error: 'Failed to generate frame' },
      { status: 500 }
    );
  }
}

