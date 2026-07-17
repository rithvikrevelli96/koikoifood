import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Logo } from './Logo';
import { Wordmark } from './Wordmark';
import { Tagline } from './Tagline';
import { SplashTheme } from '../../SplashTheme';
import { SplashStrings } from '../../constants/strings';

interface BrandingProps {
  logoFade: Animated.Value;
  logoScale: Animated.Value;
  logoWidth: number;
  t: (key: string, defaultValue: string) => string;
  onLongPressLogo?: () => void;
  themeVariant?: string;
}

export const Branding: React.FC<BrandingProps> = ({
  logoFade,
  logoScale,
  logoWidth,
  t,
  onLongPressLogo,
  themeVariant = 'light',
}) => {
  const currentTheme = SplashTheme[themeVariant] || SplashTheme.light;

  return (
    <Animated.View
      style={[
        styles.logoContainer,
        {
          width: logoWidth,
          opacity: logoFade,
          transform: [{ scale: logoScale }],
        },
      ]}
      accessible={true}
      accessibilityLabel="Koi Koi Dabba logo: Homemade Meals. Delivered with Love."
    >
      <Logo
        backgroundColor={currentTheme.background}
        onLongPress={onLongPressLogo}
      />
      <Wordmark
        primaryColor={currentTheme.primary}
        secondaryColor={currentTheme.secondary}
        brandName1={t('splash.brand_name_1', SplashStrings.brandName1)}
        brandName2={t('splash.brand_name_2', SplashStrings.brandName2)}
      />
      <Tagline
        primaryColor={currentTheme.primary}
        secondaryColor={currentTheme.secondary}
        taglinePart1={t('splash.tagline_part_1', SplashStrings.taglinePart1)}
        taglinePart2={t('splash.tagline_part_2', SplashStrings.taglinePart2)}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    zIndex: 5,
    alignSelf: 'center',
  },
});
