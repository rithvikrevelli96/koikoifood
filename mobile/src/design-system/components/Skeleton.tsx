import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface SkeletonProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width,
  height,
  borderRadius = 8,
  style,
}: SkeletonProps) {
  const opacityAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.shimmer,
        {
          width,
          height,
          borderRadius,
          opacity: opacityAnim,
          backgroundColor: theme.colors.light.muted,
        } as any,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  shimmer: {
    overflow: 'hidden',
  },
});
