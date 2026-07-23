import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
  ViewStyle,
} from 'react-native';
import { theme } from '../theme';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number;
  containerStyle?: ViewStyle;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function BottomSheet({
  visible,
  onClose,
  children,
  height = SCREEN_HEIGHT * 0.5,
  containerStyle,
}: BottomSheetProps) {
  const animatedValue = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: theme.motion.timings.fade,
          useNativeDriver: true,
        }),
        Animated.spring(animatedValue, {
          toValue: SCREEN_HEIGHT - height,
          ...theme.motion.physics.springConfig,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: theme.motion.timings.fade,
          useNativeDriver: true,
        }),
        Animated.spring(animatedValue, {
          toValue: SCREEN_HEIGHT,
          ...theme.motion.physics.springConfig,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, height]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          animatedValue.setValue(SCREEN_HEIGHT - height + gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 80) {
          onClose();
        } else {
          Animated.spring(animatedValue, {
            toValue: SCREEN_HEIGHT - height,
            ...theme.motion.physics.springConfig,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* Sheet Content container */}
      <Animated.View
        style={[
          styles.sheet,
          {
            height,
            transform: [{ translateY: animatedValue }],
            backgroundColor: theme.colors.light.surface,
          },
          containerStyle,
        ]}
      >
        {/* Handle */}
        <View style={styles.handleContainer} {...panResponder.panHandlers}>
          <View style={styles.handle} />
        </View>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 999,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: theme.radius.sheet, // 32px
    borderTopRightRadius: theme.radius.sheet,
    zIndex: 1000,
    elevation: 24,
  },
  handleContainer: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: theme.colors.light.muted,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xxl,
  },
});
