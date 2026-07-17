import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BubblePointerTriangle = React.memo(() => (
  <Svg width={12} height={6} viewBox="0 0 12 6" fill="none" accessibilityElementsHidden={true} importantForAccessibility="no">
    <Path d="M 0 0 L 6 6 L 12 0 Z" fill="rgba(221, 233, 213, 0.9)" />
  </Svg>
));
