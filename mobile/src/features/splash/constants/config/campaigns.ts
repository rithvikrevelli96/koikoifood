export type SplashCampaign = 'Default' | 'Seasonal' | 'Campaign';

export type SeasonalCampaignVariant = 'Christmas' | 'Diwali' | 'Ugadi' | 'Ramadan' | 'NewYear' | 'Normal';

export interface CampaignConfig {
  campaign: SplashCampaign;
  seasonalVariant: SeasonalCampaignVariant;
  themeVariant: string; // references SplashTheme keys (light, festive, christmas, diwali, etc.)
}

export const CAMPAIGN_CONFIG: CampaignConfig = {
  campaign: 'Default',
  seasonalVariant: 'Normal',
  themeVariant: 'light',
};
