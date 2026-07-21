import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, ViewStyle, StyleProp } from 'react-native';
import { BackgroundIllustration, BackgroundVariant, BackgroundDensity } from './BackgroundIllustration';
import { theme } from '../../theme';

import { useAppContext } from '../../../app/context';

interface OrganicBackgroundProps {
  children?: React.ReactNode;
  variant?: BackgroundVariant;
  density?: BackgroundDensity;
  withSafeArea?: boolean;
  scrollable?: boolean;
  animated?: boolean;
  isDark?: boolean;
  artwork?: any;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const OrganicBackground = React.memo(({
  children,
  variant = 'default',
  density,
  withSafeArea = false,
  scrollable = false,
  animated = false,
  isDark,
  artwork,
  style,
  contentContainerStyle,
}: OrganicBackgroundProps) => {
  // Try to use context theme if isDark is not explicitly provided
  let contextIsDark = false;
  try {
    const context = useAppContext();
    if (context) {
      contextIsDark = context.isDark;
    }
  } catch (e) {
    // Fail silently if context is not available
  }

  const finalIsDark = isDark !== undefined ? isDark : contextIsDark;
  // Base Layout Wrapper
  const renderContent = () => {
    if (scrollable) {
      return (
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        >
          <ScrollView
            style={[styles.scroll, style]}
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            automaticallyAdjustKeyboardInsets={true}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }

    return (
      <View style={[styles.content, style]}>
        {children}
      </View>
    );
  };

  // Optional Safe Area Wrapper
  const renderSafeArea = () => {
    if (withSafeArea) {
      return (
        <SafeAreaView style={styles.safeArea}>
          {renderContent()}
        </SafeAreaView>
      );
    }
    return renderContent();
  };

  return (
    <View style={[styles.container, { backgroundColor: finalIsDark ? theme.colors.dark.bg : theme.colors.light.bg }]}>
      {/* Background illustration stack - zIndex 1-7, pointerEvents none */}
      <BackgroundIllustration
        variant={variant}
        density={density}
        animated={animated}
        isDark={finalIsDark}
        artwork={artwork}
      />

      {/* Layer 8: Content - zIndex 8 */}
      <View style={styles.contentLayer} pointerEvents="box-none">
        {renderSafeArea()}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentLayer: {
    flex: 1,
    zIndex: 8,
  },
  keyboardView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
