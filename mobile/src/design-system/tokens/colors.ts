import { colors as foundationColors } from '../foundation/colors';

export interface ThemeColors {
  // Surfaces & Backgrounds
  bg: string;
  surface: string;
  card: string;
  elevated: string;
  modal: string;
  bottomSheet: string;
  overlay: string;
  backdrop: string;
  input: string;
  nav: string;
  tabBar: string;
  statusBar: string;

  // Neutrals & Typography
  text: string;
  sub: string;
  secondaryText: string;
  muted: string;
  placeholder: string;
  disabled: string;
  border: string;
  divider: string;
  shadow: string;

  // Brand & Accents
  primary: string;
  secondary: string;
  accent: string;

  // Semantics
  success: string;
  warning: string;
  error: string;
  info: string;

  // Domain Presets
  veg: { bg: string; text: string };
  nonVeg: { bg: string; text: string };
  premium: { bg: string; text: string };
  wallet: { bg: string; text: string };

  // Components & Controls
  chip: { bg: string; text: string; border: string };
  badge: { bg: string; text: string };
  progressTrack: string;
  progressFill: string;
  skeleton: string;

  // Interaction State Tokens
  states: {
    hover: string;
    pressed: string;
    focused: string;
    selected: string;
    disabled: string;
    error: string;
    success: string;
    warning: string;
  };
}

export const lightThemeColors: ThemeColors = {
  // Surfaces & Backgrounds
  bg: foundationColors.bgLight,          // #FCFAF6
  surface: foundationColors.surfaceLight, // #F4EFE6
  card: foundationColors.cardLight,       // #F4EFE6
  elevated: foundationColors.elevatedLight, // #FCFAF6
  modal: foundationColors.bgLight,        // #FCFAF6
  bottomSheet: foundationColors.surfaceLight, // #F4EFE6
  overlay: 'rgba(31, 31, 31, 0.4)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  input: foundationColors.bgLight,        // #FCFAF6
  nav: foundationColors.surfaceLight,     // #F4EFE6
  tabBar: foundationColors.surfaceLight,  // #F4EFE6
  statusBar: 'dark-content',

  // Neutrals & Typography
  text: foundationColors.textLight,       // #1F1F1F
  sub: foundationColors.subLight,         // #6E6A63
  secondaryText: foundationColors.subLight, // #6E6A63
  muted: foundationColors.mutedLight,     // #8A857B
  placeholder: '#8A857B',
  disabled: foundationColors.disabled,
  border: foundationColors.borderLight,   // #E8E2D8
  divider: foundationColors.dividerLight, // #ECE6DD
  shadow: '#1F1F1F',

  // Brand & Accents
  primary: foundationColors.primary,      // #4B5D3A
  secondary: foundationColors.secondary,  // #C96B3C
  accent: foundationColors.accent,        // #D9B65A

  // Semantics
  success: foundationColors.success,
  warning: foundationColors.warning,
  error: foundationColors.error,
  info: foundationColors.info,

  // Domain Presets
  veg: {
    bg: foundationColors.vegBg,
    text: foundationColors.primary,
  },
  nonVeg: {
    bg: foundationColors.nonVegBg,
    text: foundationColors.secondary,
  },
  premium: {
    bg: foundationColors.premiumBg,
    text: foundationColors.accent,
  },
  wallet: {
    bg: 'rgba(201, 107, 60, 0.08)',
    text: foundationColors.secondary,
  },

  // Components & Controls
  chip: {
    bg: foundationColors.surfaceLight,
    text: foundationColors.textLight,
    border: foundationColors.borderLight,
  },
  badge: {
    bg: 'rgba(75, 93, 58, 0.12)',
    text: foundationColors.primary,
  },
  progressTrack: foundationColors.borderLight,
  progressFill: foundationColors.primary,
  skeleton: '#E8E2D8',

  // Interaction State Tokens
  states: {
    hover: 'rgba(75, 93, 58, 0.05)',
    pressed: 'rgba(75, 93, 58, 0.12)',
    focused: foundationColors.primary,
    selected: foundationColors.primary,
    disabled: 'rgba(189, 184, 174, 0.4)',
    error: foundationColors.error,
    success: foundationColors.success,
    warning: foundationColors.warning,
  },
};

export const darkThemeColors: ThemeColors = {
  // Surfaces & Backgrounds
  bg: foundationColors.bgDark,           // #171512
  surface: foundationColors.surfaceDark, // #24201C
  card: foundationColors.cardDark,       // #2A2622
  elevated: foundationColors.elevatedDark, // #322D28
  modal: foundationColors.surfaceDark,   // #24201C
  bottomSheet: foundationColors.surfaceDark, // #24201C
  overlay: 'rgba(0, 0, 0, 0.65)',
  backdrop: 'rgba(0, 0, 0, 0.8)',
  input: foundationColors.cardDark,      // #2A2622
  nav: foundationColors.surfaceDark,     // #24201C
  tabBar: foundationColors.surfaceDark,  // #24201C
  statusBar: 'light-content',

  // Neutrals & Typography
  text: foundationColors.textDark,       // #F8F6F2
  sub: foundationColors.subDark,         // #C9C4BC
  secondaryText: foundationColors.subDark, // #C9C4BC
  muted: foundationColors.mutedDark,     // #A19B92
  placeholder: '#7E7769',
  disabled: '#4A443B',
  border: foundationColors.borderDark,   // #3C362F
  divider: foundationColors.dividerDark, // #34302B
  shadow: '#000000',

  // Brand & Accents
  primary: foundationColors.primaryDark,  // #7A9368
  secondary: foundationColors.secondaryDark, // #D78456
  accent: foundationColors.accentDark,    // #E0C26A

  // Semantics
  success: '#5B9A6B',
  warning: foundationColors.accentDark,
  error: '#E55E5E',
  info: '#789BEA',

  // Domain Presets
  veg: {
    bg: 'rgba(122, 147, 104, 0.16)',
    text: foundationColors.primaryDark,
  },
  nonVeg: {
    bg: 'rgba(215, 132, 86, 0.16)',
    text: foundationColors.secondaryDark,
  },
  premium: {
    bg: 'rgba(224, 194, 106, 0.16)',
    text: foundationColors.accentDark,
  },
  wallet: {
    bg: 'rgba(215, 132, 86, 0.12)',
    text: foundationColors.secondaryDark,
  },

  // Components & Controls
  chip: {
    bg: foundationColors.cardDark,
    text: foundationColors.textDark,
    border: foundationColors.borderDark,
  },
  badge: {
    bg: 'rgba(122, 147, 104, 0.2)',
    text: foundationColors.primaryDark,
  },
  progressTrack: foundationColors.borderDark,
  progressFill: foundationColors.primaryDark,
  skeleton: '#34302B',

  // Interaction State Tokens
  states: {
    hover: 'rgba(122, 147, 104, 0.08)',
    pressed: 'rgba(122, 147, 104, 0.18)',
    focused: foundationColors.primaryDark,
    selected: foundationColors.primaryDark,
    disabled: 'rgba(74, 68, 59, 0.4)',
    error: '#E55E5E',
    success: '#5B9A6B',
    warning: foundationColors.accentDark,
  },
};

export const colors = {
  primary: foundationColors.primary,
  secondary: foundationColors.secondary,
  accent: foundationColors.accent,
  success: foundationColors.success,
  warning: foundationColors.warning,
  error: foundationColors.error,
  info: foundationColors.info,
  disabled: foundationColors.disabled,
  divider: foundationColors.borderLight,

  veg: {
    bg: foundationColors.vegBg,
    text: foundationColors.primary,
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
    text: foundationColors.primary,
  },

  light: lightThemeColors,
  dark: darkThemeColors,
};

