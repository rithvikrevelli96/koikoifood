import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, theme } from '../../../design-system';
import { GoogleLogoSvg, AppleLogoSvg } from '../../../core/components/SvgIcons';

interface SocialLoginSectionProps {
  onGooglePress: () => void;
  onApplePress: () => void;
}

export const SocialLoginSection = React.memo(({
  onGooglePress,
  onApplePress,
}: SocialLoginSectionProps) => {
  return (
    <View style={styles.container}>
      {/* Google Sign-In */}
      <TouchableOpacity
        style={styles.button}
        onPress={onGooglePress}
        accessibilityRole="button"
        accessibilityLabel="Continue with Google"
      >
        <GoogleLogoSvg />
        <Text variant="label" color="text" style={styles.buttonText}>
          Continue with Google
        </Text>
      </TouchableOpacity>

      {/* Apple Sign-In */}
      <TouchableOpacity
        style={styles.button}
        onPress={onApplePress}
        accessibilityRole="button"
        accessibilityLabel="Continue with Apple"
      >
        <AppleLogoSvg />
        <Text variant="label" color="text" style={styles.buttonText}>
          Continue with Apple
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.md,
    width: '100%',
    marginTop: theme.spacing.md,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: theme.radius.control,
    borderWidth: 1.5,
    borderColor: theme.colors.light.border,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: theme.spacing.sm,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.1,
  },
});
