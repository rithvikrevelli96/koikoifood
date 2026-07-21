import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

interface BrandLogoProps {
  variant?: 'default' | 'full' | 'mark';
  theme?: 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  style?: StyleProp<ImageStyle>;
}

const sizeMap = {
  xs: 48,
  sm: 64,
  md: 96,
  lg: 120,
  xl: 140,
};

export const BrandLogo = React.memo(({
  variant = 'default',
  theme = 'light',
  size = 'xl',
  style,
}: BrandLogoProps) => {
  let source;
  if (theme === 'dark') {
    source = require('../../../../assets/branding/logo-dark.png');
  } else if (variant === 'mark') {
    source = require('../../../../assets/branding/logo-mark.png');
  } else if (variant === 'full') {
    source = require('../../../../assets/branding/logo-full.png');
  } else {
    source = require('../../../../assets/branding/logo-light.png');
  }

  // Resolve numeric size from token or direct pixel value
  const pixelSize = typeof size === 'number' ? size : sizeMap[size] || 140;

  // Bounding box dimensions maintaining original aspect ratio (170w x 240h)
  const width = pixelSize;
  const height = (pixelSize * 240) / 170;

  return (
    <Image
      source={source}
      style={[{ width, height, resizeMode: 'contain' }, style]}
      accessible={false}
    />
  );
});
