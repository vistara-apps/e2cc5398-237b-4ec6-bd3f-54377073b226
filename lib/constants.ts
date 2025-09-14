import { Industry, TechStack, RevenueModel } from './types';

export const INDUSTRIES: { value: Industry; label: string }[] = [
  { value: 'fintech', label: 'FinTech' },
  { value: 'healthtech', label: 'HealthTech' },
  { value: 'edtech', label: 'EdTech' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS' },
  { value: 'social', label: 'Social' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'ai', label: 'AI/ML' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'sustainability', label: 'Sustainability' },
];

export const TECH_STACKS: { value: TechStack; label: string }[] = [
  { value: 'web', label: 'Web App' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'ai', label: 'AI/ML' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'iot', label: 'IoT' },
  { value: 'ar-vr', label: 'AR/VR' },
  { value: 'no-code', label: 'No-Code' },
  { value: 'api', label: 'API/Backend' },
];

export const REVENUE_MODELS: { value: RevenueModel; label: string }[] = [
  { value: 'subscription', label: 'Subscription' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'advertising', label: 'Advertising' },
  { value: 'transaction-fee', label: 'Transaction Fee' },
  { value: 'one-time-purchase', label: 'One-time Purchase' },
  { value: 'licensing', label: 'Licensing' },
];

export const SAMPLE_IDEAS = [
  "A platform that connects local farmers with restaurants for same-day fresh produce delivery",
  "An AI-powered personal finance coach that analyzes spending patterns and suggests micro-investments",
  "A social learning app where users teach each other skills through short video tutorials",
  "A marketplace for renting out unused parking spaces in urban areas",
  "An app that gamifies household chores for families with reward systems",
  "A platform for booking last-minute fitness classes at discounted rates",
  "A service that turns old smartphones into home security cameras",
  "An AI tool that helps small businesses write better product descriptions",
  "A community platform for organizing neighborhood tool and equipment sharing",
  "A subscription service for personalized meal kits based on dietary restrictions and local ingredients"
];

export const SHAKE_THRESHOLD = 15;
export const SHAKE_TIMEOUT = 1000;
export const SWIPE_THRESHOLD = 100;
export const SWIPE_VELOCITY_THRESHOLD = 0.3;

export const STORAGE_KEYS = {
  SAVED_IDEAS: 'ideaspark_saved_ideas',
  USER_PREFERENCES: 'ideaspark_user_preferences',
  PREMIUM_STATUS: 'ideaspark_premium_status',
} as const;
