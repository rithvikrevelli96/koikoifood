import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useSplashMeasurements } from './hooks/useSplashMeasurements';
import { useSplashAnimation } from './hooks/useSplashAnimation';
import { useSplashNavigation } from './hooks/useSplashNavigation';
import { SplashLayout } from './SplashLayout';
import { Branding } from './components/Branding';
import { preloadLocalAsset } from './utils/preload';
import { useSplashTelemetry } from './utils/analytics';
import { SPLASH_FLAGS } from './constants/config/flags';
import { CAMPAIGN_CONFIG } from './constants/config/campaigns';
import { SplashTheme } from './SplashTheme';

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

export default function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  // 1. Telemetry logger hook
  const { trackSplashEvent } = useSplashTelemetry();

  // 2. Responsive measurements hook
  const { measurements } = useSplashMeasurements();

  // 3. Preloading state
  const [imageReady, setImageReady] = useState(false);

  // Localization translator fallback
  const translate = (key: string, defaultValue: string) => {
    return defaultValue;
  };

  // 4. Navigation hook
  const { triggerNavigation, triggerSkip, hasCompleted } = useSplashNavigation({
    onAnimationComplete,
    onPauseAnimations: () => {
      pauseAnimations();
    },
    onResumeAnimations: () => {
      if (imageReady && !hasCompleted) {
        startAnimations();
      }
    },
    trackSplashEvent,
  });

  // 5. Animation controls hook
  const { anims, startAnimations, pauseAnimations } = useSplashAnimation(() => {
    trackSplashEvent('Animations Finished');
    triggerNavigation();
  });

  // Trigger telemetry on mount & preload asset
  useEffect(() => {
    trackSplashEvent('Splash Visible');
    
    async function loadAssets() {
      const startTime = Date.now();
      const foodAsset = require('../../../assets/splash_food.png');
      await preloadLocalAsset(foodAsset);
      const loadDuration = Date.now() - startTime;
      trackSplashEvent('Assets Loaded', { durationMs: loadDuration });
      setImageReady(true);
    }
    loadAssets();
  }, []);

  // Run animations when ready
  useEffect(() => {
    if (imageReady) {
      trackSplashEvent('Animations Started');
      startAnimations();
    }
  }, [imageReady]);

  const handleLogoLongPress = () => {
    if (__DEV__) {
      pauseAnimations();
      triggerSkip();
    }
  };

  const handleLayout = (event: any) => {
    // handled dynamically inside measurements listener
  };

  const currentTheme = SplashTheme[CAMPAIGN_CONFIG.themeVariant] || SplashTheme.light;

  // Preloading scene placeholder
  if (!imageReady) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: currentTheme.background }]}>
        <Branding
          logoFade={new Animated.Value(1)}
          logoScale={new Animated.Value(0.95)}
          logoWidth={measurements.logoWidth}
          t={translate}
          themeVariant={CAMPAIGN_CONFIG.themeVariant}
        />
      </View>
    );
  }

  return (
    <SplashLayout
      anims={anims}
      measure={measurements}
      flags={SPLASH_FLAGS}
      t={translate}
      onLongPressLogo={handleLogoLongPress}
      onLayout={handleLayout}
      themeVariant={CAMPAIGN_CONFIG.themeVariant}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
