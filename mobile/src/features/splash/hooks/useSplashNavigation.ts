import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAppContext } from '../../../app/context';
import { SplashTelemetryEvent } from '../utils/analytics';
import { NAVIGATION_CONFIG } from '../constants/config/navigation';

interface SplashNavigationProps {
  onAnimationComplete?: () => void;
  onPauseAnimations: () => void;
  onResumeAnimations: () => void;
  trackSplashEvent: (event: SplashTelemetryEvent, properties?: Record<string, any>) => void;
}

export interface UseSplashNavigationResult {
  triggerNavigation: () => void;
  triggerSkip: () => void;
  hasCompleted: boolean;
}

export function useSplashNavigation({
  onAnimationComplete,
  onPauseAnimations,
  onResumeAnimations,
  trackSplashEvent,
}: SplashNavigationProps): UseSplashNavigationResult {
  const { go } = useAppContext();
  const hasCompletedRef = useRef(false);
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      // Pause animations when app is backgrounded; resume when returning to active foreground
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        onResumeAnimations();
      } else if (nextAppState.match(/inactive|background/)) {
        onPauseAnimations();
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [onPauseAnimations, onResumeAnimations]);

  const triggerNavigation = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    const target = NAVIGATION_CONFIG.defaultTarget;
    trackSplashEvent('Navigation Started', { target });

    if (onAnimationComplete) {
      onAnimationComplete();
      trackSplashEvent('Navigation Finished', { target: 'callback' });
    } else {
      go(target);
      trackSplashEvent('Navigation Finished', { target });
    }
  };

  const triggerSkip = () => {
    if (hasCompletedRef.current) return;
    trackSplashEvent('Navigation Started', { skipped: true });
    triggerNavigation();
  };

  return {
    triggerNavigation,
    triggerSkip,
    hasCompleted: hasCompletedRef.current,
  };
}
