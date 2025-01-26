export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  occupation?: string;
  tradingExperience?: TradingExperience;
  preferredMarkets?: string[];
  notifications: NotificationPreferences;
  createdAt: string;
  updatedAt: string;
}

export type TradingExperience = 'beginner' | 'intermediate' | 'advanced' | 'professional';

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  priceAlerts: boolean;
  newsAlerts: boolean;
  marketUpdates: boolean;
}

export interface ProfileUpdateData {
  name?: string;
  phone?: string;
  occupation?: string;
  tradingExperience?: TradingExperience;
  preferredMarkets?: string[];
  notifications?: Partial<NotificationPreferences>;
}
