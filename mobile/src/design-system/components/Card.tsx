import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.light.card,
    borderRadius: theme.radius.card, // 24px radius
    padding: theme.spacing.xl,       // 20px padding
    borderWidth: 0,
    ...theme.shadows.card,           // Soft ambient shadows
  },
});
