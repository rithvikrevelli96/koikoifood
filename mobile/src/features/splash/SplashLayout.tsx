import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Decorations } from './components/Decorations';
import { Branding } from './components/Branding';
import { Hero } from './components/Hero';
import { Landscape } from './components/Landscape';
import { BottomBar } from './components/BottomBar';
import { CTA } from './components/CTA';
import { SplashLayoutMeasurements, SplashAnimatedValues, SplashFeatureFlags } from './types/splash';
import { SplashTheme } from './SplashTheme';

interface SplashLayoutProps {
  anims: SplashAnimatedValues;
  measure: SplashLayoutMeasurements;
  flags: SplashFeatureFlags;
  t: (key: string, defaultValue: string) => string;
  onLongPressLogo: () => void;
  onLayout: (event: any) => void;
  themeVariant?: string;
}

export const SplashLayout: React.FC<SplashLayoutProps> = ({
  anims,
  measure,
  flags,
  t,
  onLongPressLogo,
  onLayout,
  themeVariant = 'light',
}) => {
  const currentTheme = SplashTheme[themeVariant] || SplashTheme.light;

  return (
    <View style={[styles.outerContainer, { backgroundColor: currentTheme.background }]} onLayout={onLayout}>
      <SafeAreaView style={styles.safeArea}>
        {/* Row 1: Decorations */}
        {flags.enableDecorations && (
          <Decorations
            branchFade={anims.branchFade}
            branchTranslateY={anims.branchTranslateY}
            bubbleFade={anims.bubbleFade}
            bubbleScale={anims.bubbleScale}
            isLandscape={measure.isLandscape}
            bubbleWidth={measure.speechBubbleWidth}
            t={t}
            themeVariant={themeVariant}
          />
        )}

        {/* Row 2: Branding logo */}
        <Branding
          logoFade={anims.logoFade}
          logoScale={anims.logoScale}
          logoWidth={measure.logoWidth}
          t={t}
          onLongPressLogo={onLongPressLogo}
          themeVariant={themeVariant}
        />

        {/* Row 3: Hero centerpiece image */}
        {flags.enableHeroAnimation && (
          <Hero
            heroFade={anims.heroFade}
            heroTranslateY={anims.heroTranslateY}
            sketchesFade={anims.sketchesFade}
            heroImageDiameter={measure.heroImageDiameter}
            isLandscape={measure.isLandscape}
            t={t}
            themeVariant={themeVariant}
          />
        )}

        {/* Row 4: Winding Landscape and scooter animation */}
        {flags.enableLandscape && (
          <Landscape
            scooterTranslateX={anims.scooterTranslateX}
            scooterFade={anims.scooterFade}
            isLandscape={measure.isLandscape}
          />
        )}

        {/* Row 5: Call to Action placeholder */}
        {flags.enableCTA && <CTA />}

        {/* Row 6: Bottom Features Bar */}
        {flags.enableFeatureCards && (
          <BottomBar
            bottomFade={anims.bottomFade}
            bottomTranslateY={anims.bottomTranslateY}
            cardsFade={anims.cardsFade}
            bottomBarHeight={measure.bottomBarHeight}
            isLandscape={measure.isLandscape}
            t={t}
            themeVariant={themeVariant}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },
});
