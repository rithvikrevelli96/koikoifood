import { useState, useEffect, useRef } from 'react';
import { AccessibilityInfo } from 'react-native';
import { useSplashAnimations, runSplashTimeline } from '../SplashAnimations';
import { SplashAnimatedValues } from '../types/splash';

export interface UseSplashAnimationResult {
  anims: SplashAnimatedValues;
  reduceMotion: boolean;
  startAnimations: () => void;
  pauseAnimations: () => void;
}

export function useSplashAnimation(onComplete: () => void): UseSplashAnimationResult {
  const [reduceMotion, setReduceMotion] = useState(false);
  const anims = useSplashAnimations();
  const controllerRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      setReduceMotion(enabled);
    });
  }, []);

  const startAnimations = () => {
    if (controllerRef.current) {
      controllerRef.current.stop();
    }

    controllerRef.current = runSplashTimeline(anims, reduceMotion, (result) => {
      if (result.finished) {
        onComplete();
      }
    });
  };

  const pauseAnimations = () => {
    if (controllerRef.current) {
      controllerRef.current.stop();
    }
  };

  useEffect(() => {
    startAnimations();
    return () => {
      if (controllerRef.current) {
        controllerRef.current.stop();
      }
    };
  }, [reduceMotion]);

  return {
    anims,
    reduceMotion,
    startAnimations,
    pauseAnimations,
  };
}
