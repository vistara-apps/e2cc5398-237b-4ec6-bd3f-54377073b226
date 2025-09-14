import { Idea } from './types';

export class FarcasterService {
  static async createIdeaFrame(idea: Idea): Promise<string> {
    try {
      // Create a Farcaster frame URL for sharing the idea
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const frameUrl = `${baseUrl}/api/frame/idea/${idea.ideaId}`;

      // Store the idea data for the frame
      this.storeIdeaForFrame(idea);

      return frameUrl;
    } catch (error) {
      console.error('Error creating Farcaster frame:', error);
      throw new Error('Failed to create shareable frame');
    }
  }

  static async shareIdeaToFarcaster(idea: Idea): Promise<void> {
    try {
      const frameUrl = await this.createIdeaFrame(idea);

      // Open Farcaster share URL
      const shareText = `🚀 Just got this startup idea from IdeaSpark: "${idea.oneLiner || idea.rawIdeaText}"\n\n#startup #entrepreneur #ideaspark`;
      const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(frameUrl)}`;

      // In a real implementation, this would open the Farcaster app or web interface
      window.open(farcasterUrl, '_blank');
    } catch (error) {
      console.error('Error sharing to Farcaster:', error);
      throw new Error('Failed to share idea');
    }
  }

  private static storeIdeaForFrame(idea: Idea): void {
    // Store idea data in localStorage for frame retrieval
    // In production, this would be stored in a database
    const frameData = {
      [idea.ideaId]: idea,
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem('ideaspark_frame_data', JSON.stringify(frameData));
    } catch (error) {
      console.error('Error storing frame data:', error);
    }
  }

  static getIdeaForFrame(ideaId: string): Idea | null {
    try {
      const frameData = localStorage.getItem('ideaspark_frame_data');
      if (!frameData) return null;

      const parsed = JSON.parse(frameData);
      const idea = parsed[ideaId];

      // Check if data is not too old (24 hours)
      if (!idea || Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
        return null;
      }

      return idea;
    } catch (error) {
      console.error('Error retrieving frame data:', error);
      return null;
    }
  }

  static generateFrameHtml(idea: Idea): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return `<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${baseUrl}/api/frame/image/${idea.ideaId}" />
  <meta property="fc:frame:button:1" content="💡 View Idea" />
  <meta property="fc:frame:button:1:action" content="link" />
  <meta property="fc:frame:button:1:target" content="${baseUrl}/idea/${idea.ideaId}" />
  <meta property="fc:frame:button:2" content="🔄 Generate New" />
  <meta property="fc:frame:button:2:action" content="link" />
  <meta property="fc:frame:button:2:target" content="${baseUrl}" />
  <meta property="fc:frame:button:3" content="❤️ Save Idea" />
  <meta property="fc:frame:button:3:action" content="link" />
  <meta property="fc:frame:button:3:target" content="${baseUrl}/save/${idea.ideaId}" />
  <meta property="og:title" content="IdeaSpark - Startup Idea" />
  <meta property="og:description" content="${idea.oneLiner || idea.rawIdeaText}" />
  <meta property="og:image" content="${baseUrl}/api/frame/image/${idea.ideaId}" />
</head>
<body>
  <div style="display: none;">
    IdeaSpark Frame for: ${idea.rawIdeaText}
  </div>
</body>
</html>`;
  }
}

