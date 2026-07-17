import { SplashLayoutMeasurements } from './types/splash';
import { SplashMeasurements } from './constants/measurements';

export const getSplashMeasurements = (width: number, height: number): SplashLayoutMeasurements => {
  const isLandscape = width > height;
  const isSmallDevice = width < SplashMeasurements.breakpoints.small;
  const isLargeDevice = width > SplashMeasurements.breakpoints.large;

  return {
    isLandscape,
    heroImageDiameter: isLandscape
      ? SplashMeasurements.heroDiameter.landscape
      : (isSmallDevice
          ? SplashMeasurements.heroDiameter.small
          : isLargeDevice
              ? SplashMeasurements.heroDiameter.large
              : SplashMeasurements.heroDiameter.medium),
    bottomBarHeight: isLandscape
      ? SplashMeasurements.bottomBarHeight.landscape
      : (isSmallDevice
          ? SplashMeasurements.bottomBarHeight.small
          : isLargeDevice
              ? SplashMeasurements.bottomBarHeight.large
              : SplashMeasurements.bottomBarHeight.medium),
    speechBubbleWidth: isSmallDevice
      ? SplashMeasurements.speechBubbleWidth.small
      : isLargeDevice
          ? SplashMeasurements.speechBubbleWidth.large
          : SplashMeasurements.speechBubbleWidth.medium,
    logoWidth: width * (isLandscape
      ? SplashMeasurements.logoScaleWidthFactor.landscape
      : SplashMeasurements.logoScaleWidthFactor.portrait),
    steelFrameBorderWidth: SplashMeasurements.steelFrameBorderWidth,
    strokeWidth: SplashMeasurements.strokeWidth,
  };
};
