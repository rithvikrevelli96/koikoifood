import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';
import { theme } from '../theme';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export function Checkbox({
  label,
  checked,
  onPress,
  style,
}: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, style]}
      accessible={true}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View
        style={[
          styles.checkbox,
          checked
            ? { backgroundColor: theme.colors.primary, borderColor: 'transparent' }
            : { borderColor: theme.colors.light.sub },
        ]}
      >
        {checked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
      </View>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  text: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 14,
    color: theme.colors.light.text,
  },
});
