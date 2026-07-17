import { colors as foundationColors } from '../foundation/colors';

export const colors = {
  // Brand
  primary: foundationColors.primary,
  secondary: foundationColors.secondary,
  accent: foundationColors.accent,

  // Semantics
  success: foundationColors.success,
  warning: foundationColors.warning,
  error: foundationColors.error,
  info: foundationColors.info,
  disabled: foundationColors.disabled,
  divider: foundationColors.borderLight,

  // Custom Chip colors mapping
  veg: {
    bg: foundationColors.vegBg,
    text: foundationColors.success,
  },
  nonVeg: {
    bg: foundationColors.nonVegBg,
    text: foundationColors.secondary,
  },
  premium: {
    bg: foundationColors.premiumBg,
    text: foundationColors.accent,
  },
  healthy: {
    bg: foundationColors.healthyBg,
    text: foundationColors.success,
  },

  // Themes
  light: {
    bg: foundationColors.bgLight,
    surface: foundationColors.surfaceLight,
    card: foundationColors.cardLight,
    text: foundationColors.textLight,
    sub: foundationColors.subLight,
    muted: foundationColors.mutedLight,
    border: foundationColors.borderLight,
    nav: foundationColors.bgLight,
    input: foundationColors.surfaceLight,
  },
  dark: {
    bg: foundationColors.bgDark,
    surface: foundationColors.surfaceDark,
    card: foundationColors.cardDark,
    text: foundationColors.textDark,
    sub: foundationColors.subDark,
    muted: foundationColors.mutedDark,
    border: foundationColors.borderDark,
    nav: foundationColors.bgDark,
    input: foundationColors.surfaceDark,
  },
};
