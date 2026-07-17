import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

interface ChipProps {
  label: string;
  type: 'veg' | 'nonveg' | 'premium' | 'healthy';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Chip({
  label,
  type,
  style,
  textStyle,
}: ChipProps) {
  const chipColors = theme.colors[type === 'nonveg' ? 'nonVeg' : type];
  
  return (
    <View style={[styles.container, { backgroundColor: chipColors.bg }, style]}>
      <Text style={[styles.text, { color: chipColors.text }, textStyle]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.control,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
