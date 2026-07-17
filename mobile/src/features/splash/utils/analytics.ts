import { useCallback } from 'react';
import { useAnalytics } from '../../../design-system';

export type SplashTelemetryEvent =
  | 'Splash Visible'
  | 'Assets Loaded'
  | 'Animations Started'
  | 'Animations Finished'
  | 'Navigation Started'
  | 'Navigation Finished';

export interface UseSplashTelemetryResult {
  trackSplashEvent: (event: SplashTelemetryEvent, properties?: Record<string, any>) => void;
}

export function useSplashTelemetry(): UseSplashTelemetryResult {
  const { track } = useAnalytics();

  const trackSplashEvent = useCallback(
    (event: SplashTelemetryEvent, properties?: Record<string, any>) => {
      track(event, {
        timestamp: Date.now(),
        ...properties,
      });
    },
    [track]
  );

  return {
    trackSplashEvent,
  };
}
