import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { shadows } from '../tokens/shadows';
import { gradients } from '../tokens/gradients';
import { motion } from '../tokens/motion';
import { lightTheme } from './light';
import { darkTheme } from './dark';

export const cardSizes = {
  sm: { mobile: 140, tablet: 180 },
  md: { mobile: 180, tablet: 240 },
  lg: { mobile: 220, tablet: 280 },
  hero: { mobile: 260, tablet: 320 },
  xl: { mobile: 320, tablet: 400 },
};

export function getCardMinHeight(size?: 'sm' | 'md' | 'lg' | 'hero' | 'xl', isTablet?: boolean) {
  if (!size) return undefined;
  const config = cardSizes[size];
  if (!config) return undefined;
  return isTablet ? config.tablet : config.mobile;
}

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  gradients,
  motion,
  cardSizes,
  getCardMinHeight,
};

export const LIGHT = lightTheme;
export const DARK = darkTheme;

export const B = {
  primary: colors.primary,
  secondary: colors.secondary,
  accent: colors.accent,
  orange: colors.secondary,
  orangeL: colors.nonVeg.bg,
  orangeM: colors.nonVeg.bg,
  green: colors.primary,
  greenL: colors.veg.bg,
  cream: colors.light.bg,
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,
  disabled: colors.disabled,
  divider: colors.divider,
};

export const F = {
  heading: typography.headingFamily,
  body: typography.bodyFamily,
  mono: typography.monoFamily,
};
