import React from 'react';
import { Text as RNText, TextStyle, StyleProp } from 'react-native';
import { theme } from '../theme';

import { useAppContext } from '../../app/context';

export type TextVariant =
  | 'display'
  | 'headingXl'
  | 'headingL'
  | 'headingM'
  | 'title'
  | 'subtitle'
  | 'bodyL'
  | 'body'
  | 'caption'
  | 'label'
  | 'mono';

export type SemanticColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'text'
  | 'sub'
  | 'muted'
  | 'success'
  | 'warning'
  | 'error'
  | 'inverse';

interface TextProps {
  variant?: TextVariant;
  color?: SemanticColor;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numberOfLines?: number;
  accessible?: boolean;
  accessibilityRole?: 'header' | 'text' | 'summary' | 'link';
  accessibilityLabel?: string;
}

export function Text({
  variant = 'body',
  color = 'text',
  style,
  children,
  ...props
}: TextProps) {
  let isDark = false;
  try {
    const context = useAppContext();
    if (context) {
      isDark = context.isDark;
    }
  } catch (e) {}

  const currentTheme = isDark ? theme.colors.dark : theme.colors.light;

  // Resolve preset layout from theme typography tokens
  const variantStyle = theme.typography[variant] || theme.typography.body;

  // Resolve color dynamically from semantic tokens
  const colorHex =
    currentTheme[color as keyof typeof currentTheme] ||
    (theme.colors[color as keyof typeof theme.colors] as string) ||
    currentTheme.text;

  return (
    <RNText
      style={[
        variantStyle,
        { color: colorHex },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}
