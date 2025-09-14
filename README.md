# IdeaSpark - Base Mini App

Shake your phone for your next big startup idea. AI-powered idea generation and validation for aspiring entrepreneurs.

## Features

- **Shake-to-Generate**: Physical shake gesture triggers new startup ideas
- **AI Idea Expansion**: Get detailed descriptions, market analysis, and validation tips
- **Smart Filtering**: Filter ideas by industry, tech stack, and revenue model
- **Swipe Gestures**: Swipe right to save, left to discard ideas
- **Social Sharing**: Share ideas through Farcaster frames
- **Freemium Model**: Basic features free, premium AI expansions available

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Base Integration**: MiniKit for Base Mini App functionality
- **AI**: OpenRouter API with Gemini 2.0 Flash
- **Storage**: Local storage for saved ideas and preferences
- **Gestures**: Custom hooks for shake detection and swipe gestures

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Base Mini App API keys
- OpenRouter API key for AI services

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key from Base
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENROUTER_API_KEY`: Your OpenRouter API key for AI
   - `NEXT_PUBLIC_BASE_URL`: Your app's URL (http://localhost:3000 for dev)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Base App or browser**:
   - Base App: Add as Mini App using manifest.json
   - Browser: http://localhost:3000

## Usage

### Generating Ideas
- **Shake your device** to generate a new startup idea
- **Tap "Generate Idea"** button as alternative
- Ideas are generated based on your filter preferences

### Managing Ideas
- **Swipe right** on idea cards to save them
- **Swipe left** to discard and generate a new one
- **Tap the heart icon** to save/unsave ideas
- **Use filters** to focus on specific industries or tech stacks

### AI Expansions (Premium)
- Tap the sparkles icon to expand ideas with AI
- Get detailed descriptions, market analysis, and validation tips
- Requires premium subscription or AI credits

### Social Features
- **Share ideas** through the share button
- Creates Farcaster frames for social discussion
- Collaborate with your network on idea development
- **Frame Integration**: Ideas can be shared as interactive Farcaster frames
- **Co-creation Loops**: Users can save and expand on shared ideas

## Architecture

### Components
- `AppShell`: Main layout wrapper with responsive design
- `IdeaCard`: Displays ideas with swipe gestures and actions
- `FilterDropdown`: Multi-category filtering interface
- `ActionButton`: Consistent button component with variants
- `CategoryTag`: Industry/tech stack tags with active states

### Hooks
- `useShakeDetection`: Device motion API for shake gestures
- `useSwipeGesture`: Touch event handling for swipe interactions

### Services
- `AIService`: OpenRouter integration for idea generation and expansion
- `StorageService`: Local storage management for saved ideas and preferences

### Data Models
- `User`: User profile and premium status
- `Idea`: Core idea with optional AI expansions
- `SavedIdea`: User's saved ideas with metadata
- `FilterOptions`: Industry, tech stack, and revenue model filters

## Design System

### Colors
- **Background**: `hsl(220, 20%, 98%)`
- **Accent**: `hsl(170, 70%, 45%)`
- **Primary**: `hsl(210, 80%, 50%)`
- **Surface**: `hsl(220, 20%, 100%)`
- **Text Primary**: `hsl(220, 40%, 20%)`
- **Text Secondary**: `hsl(220, 20%, 50%)`

### Typography
- **Display**: 5xl, bold
- **Headline**: 3xl, semibold  
- **Body**: base, normal, leading-7
- **Caption**: sm, light

### Spacing & Layout
- **Container**: max-w-screen-lg, 20px gutter
- **Card Shadow**: 0 4px 16px hsla(220, 20%, 0%, 0.08)
- **Border Radius**: 4px (sm) to 16px (xl)

## API Endpoints

### Farcaster Integration
- `GET /api/frame/idea/[ideaId]` - Generate Farcaster frame
- `GET /api/frame/image/[ideaId]` - Generate frame image
- `GET /api/save/[ideaId]` - Save idea from frame

### Idea Management
- `GET /idea/[ideaId]` - View shared idea details

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

## Deployment

### Build Process
1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**:
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Your own server

### Base Mini App Configuration
1. **Update environment variables**:
   ```bash
   NEXT_PUBLIC_BASE_URL=https://your-deployed-url.com
   ```

2. **Configure Base Mini App**:
   - Add your deployed URL to Base App
   - Upload manifest.json for app discovery
   - Configure frame permissions for Farcaster integration

3. **Set up webhooks** (optional):
   - Configure webhook endpoints for frame interactions
   - Set up monitoring for API usage

### Production Checklist
- [ ] Environment variables configured
- [ ] API keys validated
- [ ] Manifest.json uploaded to Base
- [ ] Domain configured for Farcaster frames
- [ ] SSL certificate installed
- [ ] Error monitoring set up

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or support:
- Create an issue on GitHub
- Join our Discord community
- Check the Base Mini Apps documentation

---

Built with ❤️ for the Base ecosystem
