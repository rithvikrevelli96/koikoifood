import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export function FilterChip({
  label,
  selected,
  onPress,
  style,
}: FilterChipProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        selected
          ? { backgroundColor: theme.colors.primary, borderColor: 'transparent' }
          : { backgroundColor: theme.colors.light.surface, borderColor: theme.colors.light.border },
        style,
      ]}
      accessible={true}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
    >
      <Text
        style={[
          styles.text,
          { color: selected ? '#FFFFFF' : theme.colors.light.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginRight: theme.spacing.sm,
  },
  text: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    fontWeight: '700',
  },
});
