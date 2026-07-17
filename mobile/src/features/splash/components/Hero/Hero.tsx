import React, { useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Background } from './Background';
import { FoodImage } from './FoodImage';
import { Annotations } from './Annotations';
import { SplashTheme } from '../../SplashTheme';
import { SplashStrings } from '../../constants/strings';

interface HeroProps {
  heroFade: Animated.Value;
  heroTranslateY: Animated.Value;
  sketchesFade: Animated.Value;
  heroImageDiameter: number;
  isLandscape: boolean;
  t: (key: string, defaultValue: string) => string;
  themeVariant?: string;
}

export const Hero: React.FC<HeroProps> = ({
  heroFade,
  heroTranslateY,
  sketchesFade,
  heroImageDiameter,
  isLandscape,
  t,
  themeVariant = 'light',
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const currentTheme = SplashTheme[themeVariant] || SplashTheme.light;

  return (
    <Animated.View
      style={[
        styles.heroContainer,
        {
          opacity: heroFade,
          transform: [{ translateY: heroTranslateY }],
        },
      ]}
    >
      {/* 1. Large organic watercolor backdrop */}
      <Background
        backgroundColor={currentTheme.waterColorBlob}
        diameter={heroImageDiameter}
      />

      {/* 2. Steel-framed circular food centerpiece */}
      <FoodImage
        diameter={heroImageDiameter}
        imageFailed={imageFailed}
        onImageError={() => setImageFailed(true)}
        primaryColor={currentTheme.primary}
      />

      {/* 3. Side sketches annotations (hidden in landscape) */}
      {!isLandscape && (
        <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: sketchesFade }]} pointerEvents="none">
          <Annotations
            primaryColor={currentTheme.primary}
            backgroundColor={currentTheme.background}
            diameter={heroImageDiameter}
            freshText={t('splash.fresh_ingredients', SplashStrings.freshIngredients)}
            dailyText={t('splash.daily_prepared', SplashStrings.dailyPrepared)}
            deliveredText={t('splash.delivered_with_care', SplashStrings.deliveredWithCare)}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
    zIndex: 4,
    width: '100%',
    minHeight: 220,
  },
});
