import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  label,
  variant = 'primary',
  style,
  textStyle,
}: BadgeProps) {
  const bgStyles = [
    styles.container,
    variant === 'primary' && { backgroundColor: theme.colors.primary },
    variant === 'secondary' && { backgroundColor: theme.colors.secondary },
    variant === 'accent' && { backgroundColor: theme.colors.accent },
    variant === 'neutral' && { backgroundColor: theme.colors.light.sub },
    style,
  ];

  const labelStyles = [
    styles.text,
    variant === 'neutral' ? { color: '#FFFFFF' } : { color: '#FFFFFF' },
    variant === 'accent' && { color: '#1F1F1F' },
    textStyle,
  ];

  return (
    <View style={bgStyles}>
      <Text style={labelStyles}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: theme.typography.monoFamily, // Mono font for stats/badges
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
