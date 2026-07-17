import { typography as foundationTypography } from '../foundation/typography';

export const typography = {
  // Families
  headingFamily: foundationTypography.heading,
  bodyFamily: foundationTypography.body,
  monoFamily: foundationTypography.mono,

  // Text Styles Preset
  h1: {
    fontFamily: foundationTypography.heading,
    fontSize: foundationTypography.sizes.huge,
    fontWeight: foundationTypography.weights.bold,
  },
  h2: {
    fontFamily: foundationTypography.heading,
    fontSize: foundationTypography.sizes.xxl,
    fontWeight: foundationTypography.weights.semibold,
  },
  h3: {
    fontFamily: foundationTypography.heading,
    fontSize: foundationTypography.sizes.xl,
    fontWeight: foundationTypography.weights.semibold,
  },
  body: {
    fontFamily: foundationTypography.body,
    fontSize: foundationTypography.sizes.base,
    fontWeight: foundationTypography.weights.regular,
  },
  bodyBold: {
    fontFamily: foundationTypography.body,
    fontSize: foundationTypography.sizes.base,
    fontWeight: foundationTypography.weights.bold,
  },
  label: {
    fontFamily: foundationTypography.body,
    fontSize: foundationTypography.sizes.sm,
    fontWeight: foundationTypography.weights.medium,
  },
  mono: {
    fontFamily: foundationTypography.mono,
    fontSize: foundationTypography.sizes.md,
    fontWeight: foundationTypography.weights.medium,
  },
};
