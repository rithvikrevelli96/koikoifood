import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ViewStyle,
  TextStyle
} from 'react-native';
import { theme } from '../theme';
import { useAnalytics } from '../hooks/useAnalytics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  analyticsEvent?: string;
  analyticsScreen?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  accessibilityLabel,
  analyticsEvent,
  analyticsScreen,
}: ButtonProps) {
  const { track } = useAnalytics();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

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
    if (analyticsEvent) {
      track(analyticsEvent, { screen: analyticsScreen || 'Unknown' });
    }
    onPress();
  };

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  const containerStyle: any[] = [
    styles.button,
    isPrimary && { backgroundColor: theme.colors.secondary },
    isSecondary && {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.secondary,
    },
    isGhost && { backgroundColor: 'transparent' },
    disabled && { backgroundColor: theme.colors.disabled, borderColor: 'transparent' },
    style || {},
  ];

  const titleStyle: any[] = [
    styles.text,
    isPrimary && { color: '#FFFFFF' },
    isSecondary && { color: theme.colors.secondary },
    isGhost && { color: theme.colors.primary },
    disabled && { color: '#FFFFFF' },
    textStyle || {},
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      style={{ width: '100%' }}
    >
      <Animated.View style={[containerStyle, { transform: [{ scale: scaleAnim }] }]}>
        {loading ? (
          <ActivityIndicator color={isPrimary ? '#FFFFFF' : theme.colors.secondary} size="small" />
        ) : (
          <Text style={titleStyle}>{title}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: theme.radius.control,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xxl,
    flexDirection: 'row',
  },
  text: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 16,
    fontWeight: '700',
  },
});
