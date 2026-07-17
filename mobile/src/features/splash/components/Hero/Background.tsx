import React from 'react';
import { View, StyleSheet } from 'react-native';

interface BackgroundProps {
  backgroundColor: string;
  diameter: number;
}

export const Background: React.FC<BackgroundProps> = ({ backgroundColor, diameter }) => {
  return (
    <View
      style={[
        styles.watercolorBlob,
        {
          backgroundColor,
          width: diameter + 30,
          height: diameter + 20,
          borderRadius: (diameter + 30) / 2,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  watercolorBlob: {
    position: 'absolute',
    zIndex: 0,
  },
});
