import { theme } from '../../design-system';

export interface SplashColorPalette {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  waterColorBlob: string;
  speechBubbleBg: string;
  bottomPanelBg: string;
}

export const SplashTheme: Record<string, SplashColorPalette> = {
  light: {
    background: '#FCFAF6',
    surface: '#F4EFE6',
    primary: theme.colors.primary,      // #4B5D3A
    secondary: theme.colors.secondary,  // #C96B3C
    accent: theme.colors.accent,        // #D9B65A
    text: theme.colors.light.text,      // #1F1F1F
    waterColorBlob: 'rgba(221, 233, 213, 0.2)', // #DDE9D5 at 20% opacity
    speechBubbleBg: 'rgba(221, 233, 213, 0.9)', // #DDE9D5 at 90% opacity
    bottomPanelBg: theme.colors.primary,
  },
  festive: {
    background: '#FCFAF0',
    surface: '#F6EEDB',
    primary: '#B82E2E',                 // Festive red
    secondary: '#D9B65A',               // Golden accent
    accent: '#B82E2E',
    text: '#1F1F1F',
    waterColorBlob: 'rgba(217, 182, 90, 0.15)',
    speechBubbleBg: 'rgba(246, 238, 219, 0.9)',
    bottomPanelBg: '#B82E2E',
  },
  summer: {
    background: '#FFFDF9',
    surface: '#FFF4E5',
    primary: '#C96B3C',                 // Summer Orange
    secondary: '#D9B65A',
    accent: '#4B5D3A',
    text: '#1F1F1F',
    waterColorBlob: 'rgba(244, 179, 106, 0.15)',
    speechBubbleBg: 'rgba(255, 244, 229, 0.9)',
    bottomPanelBg: '#C96B3C',
  },
  monsoon: {
    background: '#F0F5F6',              // Rain grey-blue
    surface: '#E2ECEE',
    primary: '#2B5E66',
    secondary: '#4A90E2',
    accent: '#D9B65A',
    text: '#1F1F1F',
    waterColorBlob: 'rgba(74, 144, 226, 0.15)',
    speechBubbleBg: 'rgba(226, 236, 238, 0.9)',
    bottomPanelBg: '#2B5E66',
  },
  diwali: {
    background: '#FCF7F0',
    surface: '#F4E4D3',
    primary: '#D35400',                 // Deep Saffron/Clay Lamp
    secondary: '#F1C40F',               // Bright Gold
    accent: '#4B5D3A',
    text: '#1F1F1F',
    waterColorBlob: 'rgba(241, 196, 15, 0.2)',
    speechBubbleBg: 'rgba(244, 228, 211, 0.9)',
    bottomPanelBg: '#D35400',
  },
  christmas: {
    background: '#F9FBF9',
    surface: '#E8EFE8',
    primary: '#196F3D',                 // Holly green
    secondary: '#CB4335',               // Ribbon red
    accent: '#D4AC0D',
    text: '#1F1F1F',
    waterColorBlob: 'rgba(25, 111, 61, 0.1)',
    speechBubbleBg: 'rgba(232, 239, 232, 0.9)',
    bottomPanelBg: '#196F3D',
  }
};

export const getSplashTheme = (variant: string): SplashColorPalette => {
  return SplashTheme[variant] || SplashTheme.light;
};
