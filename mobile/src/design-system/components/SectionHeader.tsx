import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface SectionHeaderProps {
  title: string;
  style?: ViewStyle;
}

export function SectionHeader({ title, style }: SectionHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
    width: '100%',
  },
  title: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.light.text,
  },
});
