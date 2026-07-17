import React from 'react';
import { StyleSheet, View, SafeAreaView, ViewStyle, StatusBar } from 'react-native';
import { theme } from '../theme';

interface PageLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isDark?: boolean;
}

export function PageLayout({ children, style, isDark = false }: PageLayoutProps) {
  const currentColors = isDark ? theme.colors.dark : theme.colors.light;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentColors.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={[styles.container, { paddingHorizontal: theme.spacing.xxl }, style]}>
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
