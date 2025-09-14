export interface User {
  userId: string;
  farcasterId?: string;
  createdAt: Date;
  premiumFeaturesEnabled: boolean;
}

export interface Idea {
  ideaId: string;
  rawIdeaText: string;
  oneLiner?: string;
  description?: string;
  industry?: string;
  techStack?: string;
  revenueModel?: string;
  marketSummary?: string;
  validationTips?: string;
  createdAt: Date;
}

export interface SavedIdea {
  savedIdeaId: string;
  userId: string;
  ideaId: string;
  savedAt: Date;
  idea?: Idea;
}

export interface IdeaGenerationRequest {
  industry?: string;
  techStack?: string;
  revenueModel?: string;
}

export interface IdeaExpansionRequest {
  rawIdea: string;
  expandOneLiner: boolean;
  expandDescription: boolean;
  expandMarketAnalysis: boolean;
  expandValidationTips: boolean;
}

export type Industry = 
  | 'fintech'
  | 'healthtech'
  | 'edtech'
  | 'ecommerce'
  | 'saas'
  | 'social'
  | 'gaming'
  | 'ai'
  | 'blockchain'
  | 'sustainability';

export type TechStack = 
  | 'web'
  | 'mobile'
  | 'ai'
  | 'blockchain'
  | 'iot'
  | 'ar-vr'
  | 'no-code'
  | 'api';

export type RevenueModel = 
  | 'subscription'
  | 'freemium'
  | 'marketplace'
  | 'advertising'
  | 'transaction-fee'
  | 'one-time-purchase'
  | 'licensing';

export interface FilterOptions {
  industry?: Industry;
  techStack?: TechStack;
  revenueModel?: RevenueModel;
}
