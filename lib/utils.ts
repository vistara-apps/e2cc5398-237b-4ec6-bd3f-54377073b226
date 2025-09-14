import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getIndustryEmoji(industry: string): string {
  const emojiMap: Record<string, string> = {
    fintech: '💰',
    healthtech: '🏥',
    edtech: '📚',
    ecommerce: '🛒',
    saas: '💻',
    social: '👥',
    gaming: '🎮',
    ai: '🤖',
    blockchain: '⛓️',
    sustainability: '🌱',
  };
  return emojiMap[industry] || '💡';
}

export function getTechStackEmoji(techStack: string): string {
  const emojiMap: Record<string, string> = {
    web: '🌐',
    mobile: '📱',
    ai: '🤖',
    blockchain: '⛓️',
    iot: '📡',
    'ar-vr': '🥽',
    'no-code': '🔧',
    api: '🔌',
  };
  return emojiMap[techStack] || '⚡';
}

export function getRevenueModelEmoji(revenueModel: string): string {
  const emojiMap: Record<string, string> = {
    subscription: '🔄',
    freemium: '🆓',
    marketplace: '🏪',
    advertising: '📢',
    'transaction-fee': '💳',
    'one-time-purchase': '💵',
    licensing: '📄',
  };
  return emojiMap[revenueModel] || '💰';
}
