import { typography as foundationTypography } from '../foundation/typography';

export const typography = {
  // Families
  headingFamily: foundationTypography.heading,
  bodyFamily: foundationTypography.body,
  monoFamily: foundationTypography.mono,

  // Frozen Typography Presets
  display: {
    fontFamily: foundationTypography.heading,
    fontSize: 56,
    fontWeight: '800' as const,
  },
  hero: {
    fontFamily: foundationTypography.heading,
    fontSize: 48,
    fontWeight: '800' as const,
  },
  headingXl: {
    fontFamily: foundationTypography.heading,
    fontSize: 40,
    fontWeight: '800' as const,
  },
  headingL: {
    fontFamily: foundationTypography.heading,
    fontSize: 32,
    fontWeight: '800' as const,
  },
  headingM: {
    fontFamily: foundationTypography.heading,
    fontSize: 26,
    fontWeight: '800' as const,
  },
  title: {
    fontFamily: foundationTypography.heading,
    fontSize: 22,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontFamily: foundationTypography.heading,
    fontSize: 18,
    fontWeight: '600' as const,
  },
  bodyL: {
    fontFamily: foundationTypography.body,
    fontSize: 16,
    fontWeight: '400' as const,
  },
  body: {
    fontFamily: foundationTypography.body,
    fontSize: 15,
    fontWeight: '400' as const,
  },
  caption: {
    fontFamily: foundationTypography.body,
    fontSize: 13,
    fontWeight: '400' as const,
  },
  label: {
    fontFamily: foundationTypography.body,
    fontSize: 12,
    fontWeight: '500' as const,
  },
  button: {
    fontFamily: foundationTypography.body,
    fontSize: 14,
    fontWeight: '700' as const,
  },
  mono: {
    fontFamily: foundationTypography.mono,
    fontSize: 15,
    fontWeight: '500' as const,
  },

  // Semantic aliases
  h1: {
    fontFamily: foundationTypography.heading,
    fontSize: 32,
    fontWeight: '800' as const,
  },
  h2: {
    fontFamily: foundationTypography.heading,
    fontSize: 24,
    fontWeight: '700' as const,
  },
  h3: {
    fontFamily: foundationTypography.heading,
    fontSize: 20,
    fontWeight: '600' as const,
  },
};

