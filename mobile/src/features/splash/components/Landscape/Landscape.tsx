import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { LandscapeIllustration, ScooterIllustration } from '../../illustrations';
import { theme } from '../../../../design-system';

interface LandscapeProps {
  scooterTranslateX: Animated.Value;
  scooterFade: Animated.Value;
  isLandscape: boolean;
}

export const Landscape: React.FC<LandscapeProps> = ({
  scooterTranslateX,
  scooterFade,
  isLandscape,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Static Winding Landscape Illustration */}
      <LandscapeIllustration />

      {/* 2. Animated Scooter Rider riding along the road */}
      <Animated.View
        style={[
          styles.scooterContainer,
          {
            opacity: scooterFade,
            transform: [{ translateX: scooterTranslateX }],
          },
        ]}
      >
        <ScooterIllustration />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 75,
    position: 'relative',
    justifyContent: 'flex-end',
    marginVertical: theme.spacing.md,
    zIndex: 2,
  },
  scooterContainer: {
    position: 'absolute',
    bottom: 2,
    left: 40,
    zIndex: 3,
  },
});
