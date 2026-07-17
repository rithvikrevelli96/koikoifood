import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { theme } from '../../../../design-system';

interface FoodFrameWrapperProps {
  diameter: number;
  children: React.ReactNode;
}

export const FoodFrameWrapper: React.FC<FoodFrameWrapperProps> = ({ diameter, children }) => {
  return (
    <View
      style={[
        styles.steelFrame,
        {
          width: diameter,
          height: diameter,
          borderRadius: diameter / 2,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  steelFrame: {
    borderWidth: 8,
    borderColor: '#F4EFE6', // Steel tiffin outline color
    overflow: 'hidden',
    backgroundColor: '#F4EFE6',
    zIndex: 1,
    // Soft Ambient Shadow
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.light.text,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
