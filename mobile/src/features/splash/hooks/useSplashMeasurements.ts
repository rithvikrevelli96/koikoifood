import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { getSplashMeasurements } from '../SplashMeasurements';
import { SplashLayoutMeasurements } from '../types/splash';

export interface UseSplashMeasurementsResult {
  measurements: SplashLayoutMeasurements;
  dimensions: { width: number; height: number };
}

export function useSplashMeasurements(): UseSplashMeasurementsResult {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });
    return () => subscription.remove();
  }, []);

  const measurements = getSplashMeasurements(dimensions.width, dimensions.height);

  return {
    measurements,
    dimensions,
  };
}
