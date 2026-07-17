import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { shadows } from '../tokens/shadows';
import { gradients } from '../tokens/gradients';
import { motion } from '../tokens/motion';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  gradients,
  motion,
};

// Legacy Theme structure matching LIGHT/DARK to maintain backwards compatibility
export const LIGHT = colors.light;
export const DARK = colors.dark;
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
