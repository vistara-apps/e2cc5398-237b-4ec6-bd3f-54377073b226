import { SavedIdea, Idea, FilterOptions } from './types';
import { STORAGE_KEYS } from './constants';

export class StorageService {
  static getSavedIdeas(): SavedIdea[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_IDEAS);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved ideas:', error);
      return [];
    }
  }

  static saveIdea(idea: Idea): SavedIdea {
    const savedIdea: SavedIdea = {
      savedIdeaId: `saved_${idea.ideaId}`,
      userId: 'current_user', // In a real app, this would come from auth
      ideaId: idea.ideaId,
      savedAt: new Date(),
      idea,
    };

    const savedIdeas = this.getSavedIdeas();
    
    // Check if already saved
    const existingIndex = savedIdeas.findIndex(si => si.ideaId === idea.ideaId);
    if (existingIndex >= 0) {
      return savedIdeas[existingIndex];
    }

    savedIdeas.unshift(savedIdea);
    
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_IDEAS, JSON.stringify(savedIdeas));
    } catch (error) {
      console.error('Error saving idea:', error);
    }

    return savedIdea;
  }

  static removeSavedIdea(ideaId: string): void {
    const savedIdeas = this.getSavedIdeas();
    const filtered = savedIdeas.filter(si => si.ideaId !== ideaId);
    
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_IDEAS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing saved idea:', error);
    }
  }

  static isIdeaSaved(ideaId: string): boolean {
    const savedIdeas = this.getSavedIdeas();
    return savedIdeas.some(si => si.ideaId === ideaId);
  }

  static filterSavedIdeas(filters: FilterOptions): SavedIdea[] {
    const savedIdeas = this.getSavedIdeas();
    
    return savedIdeas.filter(savedIdea => {
      const idea = savedIdea.idea;
      if (!idea) return false;

      if (filters.industry && idea.industry !== filters.industry) {
        return false;
      }

      if (filters.techStack && idea.techStack !== filters.techStack) {
        return false;
      }

      if (filters.revenueModel && idea.revenueModel !== filters.revenueModel) {
        return false;
      }

      return true;
    });
  }

  static getUserPreferences(): FilterOptions {
    if (typeof window === 'undefined') return {};
    
    try {
      const prefs = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return prefs ? JSON.parse(prefs) : {};
    } catch (error) {
      console.error('Error loading user preferences:', error);
      return {};
    }
  }

  static saveUserPreferences(preferences: FilterOptions): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  }

  static isPremiumUser(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const premium = localStorage.getItem(STORAGE_KEYS.PREMIUM_STATUS);
      return premium === 'true';
    } catch (error) {
      console.error('Error checking premium status:', error);
      return false;
    }
  }

  static setPremiumStatus(isPremium: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PREMIUM_STATUS, isPremium.toString());
    } catch (error) {
      console.error('Error setting premium status:', error);
    }
  }
}
