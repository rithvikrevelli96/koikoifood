import React from 'react';
import { StyleSheet } from 'react-native';
import { OrganicBackground, organicBackgroundAssets, theme } from '../../../design-system';

interface AuthenticationLayoutProps {
  children: React.ReactNode;
}

export const AuthenticationLayout = React.memo(({ children }: AuthenticationLayoutProps) => {
  return (
    <OrganicBackground
      variant="auth"
      density="full"
      withSafeArea
      scrollable
      artwork={organicBackgroundAssets.login}
      contentContainerStyle={styles.scrollContent}
    >
      {children}
    </OrganicBackground>
  );
});

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xxl, // 24px
    paddingVertical: theme.spacing.xl,
  },
});
