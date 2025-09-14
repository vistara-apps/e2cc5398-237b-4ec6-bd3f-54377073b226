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

    // Generate SVG image for the frame
    const svgImage = generateIdeaFrameImage(idea);

    return new NextResponse(svgImage, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Error generating frame image:', error);
    return NextResponse.json(
      { error: 'Failed to generate frame image' },
      { status: 500 }
    );
  }
}

function generateIdeaFrameImage(idea: any): string {
  const title = idea.oneLiner || idea.rawIdeaText;
  const description = idea.description || idea.rawIdeaText;
  const truncatedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  const truncatedDesc = description.length > 120 ? description.substring(0, 117) + '...' : description;

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#16a34a;stop-opacity:1" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)"/>

    <!-- Header -->
    <rect x="0" y="0" width="1200" height="100" fill="url(#accent)"/>
    <text x="60" y="65" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white">
      🚀 IdeaSpark
    </text>

    <!-- Main Content -->
    <text x="60" y="180" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#1e293b">
      ${truncatedTitle}
    </text>

    <text x="60" y="230" font-family="Arial, sans-serif" font-size="18" fill="#64748b" style="width: 1080px;">
      ${truncatedDesc.split('\\n').join(' ')}
    </text>

    <!-- Tags -->
    ${idea.industry ? `
    <rect x="60" y="300" width="120" height="30" rx="15" fill="#f1f5f9" stroke="#cbd5e1"/>
    <text x="120" y="320" font-family="Arial, sans-serif" font-size="14" fill="#475569" text-anchor="middle">
      ${idea.industry}
    </text>
    ` : ''}

    ${idea.techStack ? `
    <rect x="200" y="300" width="120" height="30" rx="15" fill="#f1f5f9" stroke="#cbd5e1"/>
    <text x="260" y="320" font-family="Arial, sans-serif" font-size="14" fill="#475569" text-anchor="middle">
      ${idea.techStack}
    </text>
    ` : ''}

    <!-- Footer -->
    <text x="60" y="580" font-family="Arial, sans-serif" font-size="16" fill="#64748b">
      Shake your phone for your next big startup idea! 📱
    </text>

    <text x="60" y="605" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8">
      Powered by AI • Built on Base
    </text>
  </svg>`;
}

