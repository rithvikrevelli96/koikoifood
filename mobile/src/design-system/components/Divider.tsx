import React from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface DividerProps {
  style?: ViewStyle;
}

export function Divider({ style }: DividerProps) {
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: theme.colors.divider,
          width: '100%',
          marginVertical: theme.spacing.md,
        },
        style,
      ]}
    />
  );
}
