# IdeaSpark API Documentation

## Overview

IdeaSpark is a Next.js application that provides AI-powered startup idea generation with social sharing capabilities. This document outlines the API endpoints and their usage.

## Base URL
```
http://localhost:3000 (development)
https://your-domain.com (production)
```

## Authentication

The application uses MiniKit for Base ecosystem authentication. API keys are required for AI services.

### Environment Variables Required
```bash
NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_BASE_URL=your_app_url
```

## API Endpoints

### 1. Farcaster Frame Generation

#### GET `/api/frame/idea/[ideaId]`

Generates a Farcaster frame for sharing startup ideas.

**Parameters:**
- `ideaId` (string): Unique identifier for the idea

**Response:**
- Content-Type: `text/html`
- Returns HTML with Farcaster frame metadata

**Example:**
```bash
curl http://localhost:3000/api/frame/idea/abc123
```

### 2. Frame Image Generation

#### GET `/api/frame/image/[ideaId]`

Generates an SVG image for Farcaster frames.

**Parameters:**
- `ideaId` (string): Unique identifier for the idea

**Response:**
- Content-Type: `image/svg+xml`
- Returns SVG image for social sharing

**Example:**
```bash
curl http://localhost:3000/api/frame/image/abc123
```

### 3. Save Idea from Frame

#### GET `/api/save/[ideaId]`

Saves an idea shared via Farcaster frame to local storage.

**Parameters:**
- `ideaId` (string): Unique identifier for the idea

**Response:**
- Redirects to main app with success message

**Example:**
```bash
curl http://localhost:3000/api/save/abc123
```

## Data Models

### Idea
```typescript
interface Idea {
  ideaId: string;
  rawIdeaText: string;
  oneLiner?: string;
  description?: string;
  industry?: Industry;
  techStack?: TechStack;
  revenueModel?: RevenueModel;
  marketSummary?: string;
  validationTips?: string;
  createdAt: Date;
}
```

### SavedIdea
```typescript
interface SavedIdea {
  savedIdeaId: string;
  userId: string;
  ideaId: string;
  savedAt: Date;
  idea?: Idea;
}
```

### FilterOptions
```typescript
interface FilterOptions {
  industry?: Industry;
  techStack?: TechStack;
  revenueModel?: RevenueModel;
}
```

## AI Service Integration

### OpenRouter API

The application uses OpenRouter to access multiple AI models:

**Model Used:** `google/gemini-2.0-flash-001`

**Features:**
- Idea generation with filtering
- One-liner creation
- Detailed descriptions
- Market analysis
- Validation tips

### Request/Response Examples

#### Idea Generation
```typescript
const request = {
  industry: 'fintech',
  techStack: 'web',
  revenueModel: 'subscription'
};

const response = {
  ideaId: "abc123",
  rawIdeaText: "A platform that connects local farmers with restaurants...",
  industry: "fintech",
  techStack: "web",
  revenueModel: "subscription",
  createdAt: "2024-01-01T00:00:00.000Z"
};
```

#### Idea Expansion
```typescript
const request = {
  rawIdea: "A platform that connects local farmers with restaurants...",
  expandOneLiner: true,
  expandDescription: true,
  expandMarketAnalysis: true,
  expandValidationTips: true
};

const response = {
  oneLiner: "Fresh farm-to-table delivery platform",
  description: "Connects local farmers directly with restaurants...",
  marketSummary: "Growing market with $10B TAM...",
  validationTips: "1. Interview 20 restaurant owners..."
};
```

## Error Handling

### Common Error Responses

#### 404 - Idea Not Found
```json
{
  "error": "Idea not found or expired"
}
```

#### 500 - Server Error
```json
{
  "error": "Failed to generate frame"
}
```

## Rate Limiting

- AI API calls are rate-limited based on OpenRouter quotas
- Farcaster frame data expires after 24 hours
- Local storage has size limitations

## Security Considerations

- API keys are stored as environment variables
- User data is stored locally (localStorage)
- No sensitive data is transmitted to external services
- Farcaster frames include basic validation

## Deployment

### Environment Setup
1. Set all required environment variables
2. Configure MiniKit API key for Base integration
3. Set up OpenRouter API key for AI services
4. Configure domain for Farcaster frame URLs

### Build Process
```bash
npm run build
npm start
```

### Mini App Configuration
- Add manifest.json to root
- Configure Base Mini App settings
- Set up proper CORS headers for frame sharing

## Monitoring & Logging

- Client-side errors are logged to console
- AI service errors include detailed error messages
- Farcaster frame generation includes error boundaries
- Network requests include timeout handling

## Future Enhancements

- Database integration for persistent storage
- User authentication system
- Advanced filtering and search
- Social features and collaboration
- Premium subscription management
- Analytics and usage tracking

