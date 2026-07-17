import { Platform } from 'react-native';

export const typography = {
  // Platform aware font families mapping
  heading: 'General Sans',
  body: 'Inter',
  mono: 'IBM Plex Mono',

  // Font weights
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Font sizes
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    huge: 32,
  },
};
