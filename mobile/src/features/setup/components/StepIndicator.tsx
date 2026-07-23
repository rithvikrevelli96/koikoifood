import React from 'react';
import { View } from 'react-native';
import { theme } from '../../../design-system';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <View style={{ flexDirection: 'row', gap: theme.spacing.sm, marginVertical: theme.spacing.md }}>
      {[1, 2].map(i => {
        const isDone = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: theme.radius.xs,
              backgroundColor: isDone
                ? theme.colors.success
                : isCurrent
                ? theme.colors.secondary
                : theme.colors.light.border,
            }}
          />
        );
      })}
    </View>
  );
}
