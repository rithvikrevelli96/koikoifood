import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { FeatureCard, theme, F } from '../../../../design-system';
import { SPLASH_FEATURES } from '../../constants/featureItems';
import { SplashTheme } from '../../SplashTheme';
import { SplashStrings } from '../../constants/strings';

interface BottomBarProps {
  bottomFade: Animated.Value;
  bottomTranslateY: Animated.Value;
  cardsFade: Animated.Value;
  bottomBarHeight: number;
  isLandscape: boolean;
  t: (key: string, defaultValue: string) => string;
  themeVariant?: string;
}

// Mini White Leaf branch decorations flanking thank you text
const TinyLeafLeft = () => (
  <Svg width={16} height={16} viewBox="0 0 20 20" fill="none" accessibilityElementsHidden={true} importantForAccessibility="no">
    <Path d="M2 18 C6 10, 14 12, 18 2 C10 10, 10 14, 2 18 Z" fill="#FFFFFF" opacity={0.6} />
  </Svg>
);

const TinyLeafRight = () => (
  <Svg width={16} height={16} viewBox="0 0 20 20" fill="none" accessibilityElementsHidden={true} importantForAccessibility="no" style={{ transform: [{ scaleX: -1 }] }}>
    <Path d="M2 18 C6 10, 14 12, 18 2 C10 10, 10 14, 2 18 Z" fill="#FFFFFF" opacity={0.6} />
  </Svg>
);

export const BottomBar: React.FC<BottomBarProps> = ({
  bottomFade,
  bottomTranslateY,
  cardsFade,
  bottomBarHeight,
  isLandscape,
  t,
  themeVariant = 'light',
}) => {
  const currentTheme = SplashTheme[themeVariant] || SplashTheme.light;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: bottomBarHeight,
          opacity: bottomFade,
          transform: [{ translateY: bottomTranslateY }],
        },
      ]}
    >
      {/* Curved SVG Background Shape */}
      <View style={StyleSheet.absoluteFillObject}>
        <Svg
          width="100%"
          height={bottomBarHeight}
          viewBox={`0 0 375 ${bottomBarHeight}`}
          preserveAspectRatio="none"
          style={StyleSheet.absoluteFill}
          accessibilityElementsHidden={true}
          importantForAccessibility="no"
        >
          {/* Main Curved Body Panel */}
          <Path
            d={`M 0 25 C 90 0, 285 0, 375 25 L 375 ${bottomBarHeight} L 0 ${bottomBarHeight} Z`}
            fill={currentTheme.bottomPanelBg}
          />
          {/* Golden Yellow Accent Line on top of curve */}
          <Path
            d={`M 0 25 C 90 0, 285 0, 375 25`}
            stroke={currentTheme.accent}
            strokeWidth={2.5}
            fill="none"
          />
        </Svg>
      </View>

      {/* Content wrapper */}
      <View style={[styles.content, { paddingVertical: isLandscape ? theme.spacing.sm : theme.spacing.md }]}>
        
        {/* Horizontal Feature Icon Cards Row */}
        <Animated.View style={[styles.cardsRow, { opacity: cardsFade }]}>
          {SPLASH_FEATURES.map((item) => (
            <FeatureCard
              key={item.id}
              icon={item.icon}
              title={t(`splash.card_${item.id}_title`, item.title)}
              subtitle={t(`splash.card_${item.id}_sub`, item.subtitle)}
              isLandscape={isLandscape}
              accessibilityLabel={item.accessibilityLabel}
            />
          ))}
        </Animated.View>

        {/* Bottom script message flanked by leaves */}
        <Animated.View style={[styles.messageRow, { opacity: cardsFade }]}>
          <TinyLeafLeft />
          <Text style={[styles.bottomMessage, { fontSize: isLandscape ? 14 : 18 }]}>
            {t('splash.thank_you', SplashStrings.thankYouMessage)}
          </Text>
          <TinyLeafRight />
        </Animated.View>

      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 8,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  bottomMessage: {
    fontFamily: F.heading,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
