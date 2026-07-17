import { Animated } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

export interface SplashLayoutMeasurements {
  isLandscape: boolean;
  heroImageDiameter: number;
  bottomBarHeight: number;
  speechBubbleWidth: number;
  logoWidth: number;
  steelFrameBorderWidth: number;
  strokeWidth: number;
}

export interface FeatureItem {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  accentColor: string;
  analyticsEvent: string;
  accessibilityLabel: string;
}

export interface SplashAnimatedValues {
  branchFade: Animated.Value;
  branchTranslateY: Animated.Value;
  bubbleFade: Animated.Value;
  bubbleScale: Animated.Value;
  logoFade: Animated.Value;
  logoScale: Animated.Value;
  heroFade: Animated.Value;
  heroTranslateY: Animated.Value;
  sketchesFade: Animated.Value;
  scooterTranslateX: Animated.Value;
  scooterFade: Animated.Value;
  bottomFade: Animated.Value;
  bottomTranslateY: Animated.Value;
  cardsFade: Animated.Value;
}

export interface SplashFeatureFlags {
  enableLandscape: boolean;
  enableScooter: boolean;
  enableCTA: boolean;
  enableFeatureCards: boolean;
  enableDecorations: boolean;
  enableHeroAnimation: boolean;
}

export interface SplashConfig {
  theme: 'light' | 'festive' | 'summer' | 'monsoon' | 'diwali' | 'christmas';
  flags: SplashFeatureFlags;
  navigationTarget: string;
}
