import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { OliveBranchIllustration } from '../../illustrations';
import { theme, F } from '../../../../design-system';
import { SplashTheme } from '../../SplashTheme';
import { SplashStrings } from '../../constants/strings';

interface DecorationsProps {
  branchFade: Animated.Value;
  branchTranslateY: Animated.Value;
  bubbleFade: Animated.Value;
  bubbleScale: Animated.Value;
  isLandscape: boolean;
  bubbleWidth: number;
  t: (key: string, defaultValue: string) => string;
  themeVariant?: string;
}

// Decorative Red-Orange dot grid matching the top right of the mockup
const DotGrid = () => (
  <Svg width={48} height={24} viewBox="0 0 48 24" fill="none" accessibilityElementsHidden={true} importantForAccessibility="no">
    {Array.from({ length: 3 }).map((_, r) =>
      Array.from({ length: 6 }).map((_, c) => (
        <Circle key={`dot-${r}-${c}`} cx={4 + c * 8} cy={4 + r * 8} r={1.5} fill="#C96B3C" opacity={0.4} />
      ))
    )}
  </Svg>
);

// Floating leaf outline vectors matching mockup background details
const FloatingLeaf = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" accessibilityElementsHidden={true} importantForAccessibility="no">
    <Path d="M2 14 C4 8, 11 9, 14 2 C8 8, 8 11, 2 14 Z" fill="#4B5D3A" opacity={0.35} />
  </Svg>
);

export const Decorations: React.FC<DecorationsProps> = ({
  branchFade,
  branchTranslateY,
  bubbleFade,
  bubbleScale,
  isLandscape,
  bubbleWidth,
  t,
  themeVariant = 'light',
}) => {
  const currentTheme = SplashTheme[themeVariant] || SplashTheme.light;

  return (
    <View style={styles.container}>
      {/* Top Left Olive Branch Illustration */}
      <Animated.View
        style={[
          styles.branchContainer,
          {
            opacity: branchFade,
            transform: [{ translateY: branchTranslateY }],
          },
        ]}
      >
        <OliveBranchIllustration />
      </Animated.View>

      {/* Floating leaves floating in the wind under the branch */}
      {!isLandscape && (
        <Animated.View style={[styles.floatingLeavesFrame, { opacity: branchFade }]} pointerEvents="none">
          <View style={styles.leaf1}><FloatingLeaf /></View>
          <View style={styles.leaf2}><FloatingLeaf /></View>
        </Animated.View>
      )}

      {/* Top Right Dot Grid & Speech Bubble */}
      {!isLandscape && (
        <View style={styles.rightSection}>
          <Animated.View style={[styles.dotsContainer, { opacity: bubbleFade }]} pointerEvents="none">
            <DotGrid />
          </Animated.View>

          <Animated.View
            style={[
              styles.bubbleContainer,
              {
                width: bubbleWidth,
                opacity: bubbleFade,
                transform: [{ scale: bubbleScale }],
              },
            ]}
          >
            <View style={[styles.bubbleTextCard, { backgroundColor: currentTheme.speechBubbleBg }]}>
              <Text style={[styles.bubbleText, { color: currentTheme.primary }]}>
                {t('splash.bubble', SplashStrings.bubbleText)}
              </Text>
              <View style={styles.heartRow}>
                <Heart size={11} color={currentTheme.secondary} fill={currentTheme.secondary} />
              </View>
              {/* Pointer triangle */}
              <View style={[styles.bubbleTriangle, { borderTopColor: currentTheme.speechBubbleBg }]} />
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: theme.spacing.lg, // 24px matching global spacing tokens
    height: 100,
    zIndex: 6,
    position: 'relative',
  },
  branchContainer: {
    marginTop: -10,
    marginLeft: -10,
    zIndex: 2,
  },
  floatingLeavesFrame: {
    position: 'absolute',
    left: 20,
    top: 90,
    width: 60,
    height: 60,
  },
  leaf1: {
    position: 'absolute',
    top: 0,
    left: 15,
    transform: [{ rotate: '15deg' }],
  },
  leaf2: {
    position: 'absolute',
    top: 25,
    left: 45,
    transform: [{ rotate: '45deg' }],
  },
  rightSection: {
    position: 'relative',
    height: 100,
    justifyContent: 'center',
  },
  dotsContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 0,
  },
  bubbleContainer: {
    marginTop: 20,
    marginRight: 0,
    zIndex: 1,
  },
  bubbleTextCard: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.control, // 18px matching global Radius tokens
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(75, 93, 58, 0.15)', // light green border outline matching speech bubble
  },
  bubbleText: {
    fontFamily: F.body,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
    fontStyle: 'italic', // Styled handwritten look
  },
  heartRow: {
    marginTop: theme.spacing.xs,
  },
  bubbleTriangle: {
    position: 'absolute',
    bottom: -6,
    right: 28,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
