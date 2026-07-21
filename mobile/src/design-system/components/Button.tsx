import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import { theme } from '../theme';
import { useAnalytics } from '../hooks/useAnalytics';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onlyIcon?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessible?: boolean;
  accessibilityRole?: any;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  analyticsEvent?: string;
  analyticsScreen?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  fullWidth = true,
  iconLeft,
  iconRight,
  onlyIcon = false,
  style,
  textStyle,
  accessible = true,
  accessibilityRole = 'button',
  accessibilityLabel,
  accessibilityHint,
  analyticsEvent,
  analyticsScreen,
}: ButtonProps) {
  const { track } = useAnalytics();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const lastPressTime = React.useRef(0);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (disabled || loading) return;
    
    // Tap debounce safety (prevent double clicks within 800ms)
    const now = Date.now();
    if (now - lastPressTime.current < 800) return;
    lastPressTime.current = now;

    if (analyticsEvent) {
      track(analyticsEvent, { screen: analyticsScreen || 'Unknown' });
    }
    onPress();
  };

  // 1. Resolve container variants
  const getVariantStyle = (): ViewStyle => {
    if (disabled) {
      return { backgroundColor: theme.colors.disabled, borderColor: 'transparent' };
    }
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme.colors.light.surface,
          borderWidth: 2,
          borderColor: theme.colors.secondary,
        };
      case 'ghost':
        return { backgroundColor: 'transparent' };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: theme.colors.light.border,
        };
      case 'destructive':
        return { backgroundColor: theme.colors.error };
      case 'success':
        return { backgroundColor: theme.colors.success };
      case 'primary':
      default:
        return { backgroundColor: theme.colors.secondary };
    }
  };

  // 2. Resolve typography color styles
  const getTextStyle = (): TextStyle => {
    if (disabled) {
      return { color: '#FFFFFF' };
    }
    switch (variant) {
      case 'secondary':
        return { color: theme.colors.secondary };
      case 'ghost':
        return { color: theme.colors.primary };
      case 'outline':
        return { color: theme.colors.light.text };
      case 'destructive':
      case 'success':
      case 'primary':
      default:
        return { color: '#FFFFFF' };
    }
  };

  // 3. Resolve sizing dimensions
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          height: 36,
          borderRadius: 10,
          paddingHorizontal: theme.spacing.md,
        };
      case 'medium':
        return {
          height: 46,
          borderRadius: 14,
          paddingHorizontal: theme.spacing.lg,
        };
      case 'large':
      default:
        return {
          height: 56,
          borderRadius: 18,
          paddingHorizontal: theme.spacing.xl,
        };
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 14;
      case 'large':
      default:
        return 16;
    }
  };

  const containerStyles: any[] = [
    styles.button,
    getVariantStyle(),
    getSizeStyle(),
    fullWidth && !onlyIcon && { width: '100%' },
    onlyIcon && { width: getSizeStyle().height, paddingHorizontal: 0 },
    style || {},
  ];

  const textStyles: any[] = [
    styles.text,
    getTextStyle(),
    { fontSize: getFontSize() },
    textStyle || {},
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      style={fullWidth && !onlyIcon ? { width: '100%' } : undefined}
    >
      <Animated.View style={[containerStyles, { transform: [{ scale: scaleAnim }] }]}>
        {loading ? (
          <ActivityIndicator color={getTextStyle().color} size="small" />
        ) : (
          <View style={styles.contentRow}>
            {iconLeft && <View style={styles.iconLeftSpacing}>{iconLeft}</View>}
            {!onlyIcon && title && <Text style={textStyles}>{title}</Text>}
            {iconRight && <View style={styles.iconRightSpacing}>{iconRight}</View>}
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.typography.bodyFamily,
    fontWeight: '700',
  },
  iconLeftSpacing: {
    marginRight: 8,
  },
  iconRightSpacing: {
    marginLeft: 8,
  },
});
