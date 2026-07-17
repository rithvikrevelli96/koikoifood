import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const TiffinLogo = React.memo(() => (
  <Svg width={42} height={42} viewBox="0 0 100 100" fill="none" accessibilityElementsHidden={true} importantForAccessibility="no">
    {/* Handle */}
    <Path
      d="M 32 30 C 32 12, 68 12, 68 30"
      stroke="#C96B3C"
      strokeWidth={5}
      strokeLinecap="round"
    />
    {/* Main Container Latch */}
    <Path
      d="M 28 30 L 28 78 C 28 82, 32 84, 36 84 L 64 84 C 68 84, 72 82, 72 78 L 72 30"
      stroke="#C96B3C"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Tiers */}
    <Rect x={34} y={34} width={32} height={11} rx={3} fill="#C96B3C" />
    <Rect x={34} y={49} width={32} height={11} rx={3} fill="#C96B3C" />
    <Rect x={34} y={64} width={32} height={11} rx={3} fill="#C96B3C" />
    {/* Locking Bar */}
    <Path
      d="M 50 30 L 50 82"
      stroke="#FCFAF6"
      strokeWidth={3}
    />
  </Svg>
));
