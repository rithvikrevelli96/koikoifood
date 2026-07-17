import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { theme, F } from '../theme';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  isLandscape?: boolean;
  accessibilityLabel?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: IconComponent,
  title,
  subtitle,
  isLandscape,
  accessibilityLabel,
}) => {
  const primaryColor = theme.colors.primary;

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={accessibilityLabel || `${title}: ${subtitle}`}
    >
      <View style={styles.card}>
        <IconComponent size={26} color={primaryColor} strokeWidth={2} />
      </View>
      <Text style={styles.title}>
        {title}
      </Text>
      {!isLandscape && subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '23%',
  },
  card: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.control, // 18px matching global Radius tokens
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    // Soft Ambient Shadow using theme shadows
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.light.text,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontFamily: F.body,
    fontSize: 10, // 10px matching design token
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 12,
  },
  subtitle: {
    fontFamily: F.body,
    fontSize: 9,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 11,
  },
});
