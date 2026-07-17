import { useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { SplashTimeline, MotionTokens } from './SplashTimeline';
import { SplashAnimatedValues } from './types/splash';

export function useSplashAnimations(): SplashAnimatedValues {
  const branchFade = useRef(new Animated.Value(0)).current;
  const branchTranslateY = useRef(new Animated.Value(-15)).current;

  const bubbleFade = useRef(new Animated.Value(0)).current;
  const bubbleScale = useRef(new Animated.Value(0.8)).current;

  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;

  const heroFade = useRef(new Animated.Value(0)).current;
  const heroTranslateY = useRef(new Animated.Value(20)).current;

  const sketchesFade = useRef(new Animated.Value(0)).current;

  const scooterTranslateX = useRef(new Animated.Value(-40)).current;
  const scooterFade = useRef(new Animated.Value(0)).current;

  const bottomFade = useRef(new Animated.Value(0)).current;
  const bottomTranslateY = useRef(new Animated.Value(50)).current;

  const cardsFade = useRef(new Animated.Value(0)).current;

  return {
    branchFade,
    branchTranslateY,
    bubbleFade,
    bubbleScale,
    logoFade,
    logoScale,
    heroFade,
    heroTranslateY,
    sketchesFade,
    scooterTranslateX,
    scooterFade,
    bottomFade,
    bottomTranslateY,
    cardsFade,
  };
}

export function runSplashTimeline(
  values: SplashAnimatedValues,
  reduceMotion: boolean,
  callback: (result: Animated.EndResult) => void
): { stop: () => void } {
  let activeAnimation: Animated.CompositeAnimation;

  if (reduceMotion) {
    activeAnimation = Animated.parallel([
      Animated.timing(values.branchFade, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(values.bubbleFade, { toValue: 0.9, duration: 300, useNativeDriver: true }),
      Animated.timing(values.logoFade, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(values.heroFade, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(values.sketchesFade, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(values.scooterFade, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(values.bottomFade, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(values.cardsFade, { toValue: 1, duration: 300, useNativeDriver: true }),
      
      Animated.timing(values.branchTranslateY, { toValue: 0, duration: 0, useNativeDriver: true }),
      Animated.timing(values.bubbleScale, { toValue: 1, duration: 0, useNativeDriver: true }),
      Animated.timing(values.logoScale, { toValue: 1, duration: 0, useNativeDriver: true }),
      Animated.timing(values.heroTranslateY, { toValue: 0, duration: 0, useNativeDriver: true }),
      Animated.timing(values.scooterTranslateX, { toValue: 120, duration: 0, useNativeDriver: true }),
      Animated.timing(values.bottomTranslateY, { toValue: 0, duration: 0, useNativeDriver: true }),
    ]);
  } else {
    activeAnimation = Animated.parallel([
      // 1. Initial Phase: branch slides down and bubble springs (DecorativeMotion)
      Animated.timing(values.branchFade, { toValue: 1, duration: MotionTokens.fast, useNativeDriver: true }),
      Animated.timing(values.branchTranslateY, { toValue: 0, duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      
      Animated.sequence([
        Animated.delay(SplashTimeline.scene1Delay + 250),
        Animated.parallel([
          Animated.timing(values.bubbleFade, { toValue: 0.9, duration: MotionTokens.fast, useNativeDriver: true }),
          Animated.spring(values.bubbleScale, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
        ]),
      ]),

      // 2. Brand Phase: Brand logo scale & fade (BrandMotion)
      Animated.sequence([
        Animated.delay(SplashTimeline.scene2Delay),
        Animated.parallel([
          Animated.timing(values.logoFade, { toValue: 1, duration: MotionTokens.fast, useNativeDriver: true }),
          Animated.timing(values.logoScale, { toValue: 1.0, duration: MotionTokens.splash.brand, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        ]),
      ]),

      // 3. Hero Phase: Hero food image float (HeroMotion)
      Animated.sequence([
        Animated.delay(SplashTimeline.scene3Delay),
        Animated.parallel([
          Animated.timing(values.heroFade, { toValue: 1, duration: MotionTokens.fast, useNativeDriver: true }),
          Animated.timing(values.heroTranslateY, { toValue: 0, duration: MotionTokens.splash.hero, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        ]),
      ]),

      // 4. Sketch Phase: Sketches fade in
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(values.sketchesFade, { toValue: 1, duration: MotionTokens.fast, useNativeDriver: true }),
      ]),

      // 5. Landscape Phase: Scooter translates (LandscapeMotion) + bottom bar slides (BottomBarMotion)
      Animated.sequence([
        Animated.delay(SplashTimeline.scene4Delay),
        Animated.parallel([
          Animated.timing(values.scooterFade, { toValue: 1, duration: 150, useNativeDriver: true }),
          Animated.timing(values.scooterTranslateX, { toValue: 120, duration: MotionTokens.slow, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        ]),
      ]),
      Animated.sequence([
        Animated.delay(1700),
        Animated.parallel([
          Animated.timing(values.bottomFade, { toValue: 1, duration: MotionTokens.fast, useNativeDriver: true }),
          Animated.timing(values.bottomTranslateY, { toValue: 0, duration: MotionTokens.splash.footer, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        ]),
      ]),

      // 6. Cards Phase: Bottom cards fade in
      Animated.sequence([
        Animated.delay(SplashTimeline.cardsDelay),
        Animated.timing(values.cardsFade, { toValue: 1, duration: 350, useNativeDriver: true }),
      ]),

      // 7. Navigation Hold Delay: Ensures splash stays active for exactly 5000ms
      Animated.delay(SplashTimeline.totalDuration),
    ]);
  }

  activeAnimation.start(callback);

  return {
    stop: () => activeAnimation.stop(),
  };
}
