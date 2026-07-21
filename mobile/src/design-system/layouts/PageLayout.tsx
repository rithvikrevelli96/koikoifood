import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ViewStyle } from 'react-native';
import { theme } from '../theme';
import { OrganicBackground } from '../backgrounds/Organic';
import { BackgroundVariant, BackgroundDensity } from '../backgrounds/Organic/BackgroundIllustration';

import { useAppContext } from '../../app/context';

interface PageLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isDark?: boolean;
  background?: 'organic' | 'none';
  backgroundVariant?: BackgroundVariant;
  backgroundDensity?: BackgroundDensity;
}

export function PageLayout({
  children,
  style,
  isDark: explicitIsDark,
  background = 'none',
  backgroundVariant = 'default',
  backgroundDensity,
}: PageLayoutProps) {
  let contextIsDark = false;
  try {
    const context = useAppContext();
    if (context) {
      contextIsDark = context.isDark;
    }
  } catch (e) {}

  const finalIsDark = explicitIsDark !== undefined ? explicitIsDark : contextIsDark;
  const currentColors = finalIsDark ? theme.colors.dark : theme.colors.light;

  if (background === 'organic') {
    return (
      <OrganicBackground
        variant={backgroundVariant}
        density={backgroundDensity}
        withSafeArea
        isDark={finalIsDark}
        style={style}
      >
        <StatusBar barStyle={finalIsDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
        <View style={[styles.container, { paddingHorizontal: theme.spacing.screenHorizontal }]}>
          {children}
        </View>
      </OrganicBackground>
    );
  }

  // Default: generic safe area view with plain theme background color
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentColors.bg }]}>
      <StatusBar barStyle={finalIsDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={[styles.container, { paddingHorizontal: theme.spacing.screenHorizontal }, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
