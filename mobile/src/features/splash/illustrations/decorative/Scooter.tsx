import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export const ScooterIllustration = React.memo(() => (
  <Svg width={36} height={28} viewBox="0 0 36 28" fill="none" accessibilityElementsHidden={true} importantForAccessibility="no">
    <Circle cx={8} cy={22} r={3.5} stroke="#4B5D3A" strokeWidth={1.5} fill="#FCFAF6" />
    <Circle cx={28} cy={22} r={3.5} stroke="#4B5D3A" strokeWidth={1.5} fill="#FCFAF6" />
    <Path d="M 8 22 L 18 22 Q 22 22, 23 18 L 26 8" stroke="#4B5D3A" strokeWidth={1.8} strokeLinecap="round" />
    <Path d="M 28 22 L 26 8 L 23 8" stroke="#4B5D3A" strokeWidth={1.8} strokeLinecap="round" />
    <Path d="M 26 8 L 27 16" stroke="#4B5D3A" strokeWidth={1.8} />
    <Rect x={4} y={11} width={8} height={7} rx={1.5} stroke="#4B5D3A" strokeWidth={1.5} fill="#FCFAF6" />
    <Path d="M 16 18 C 16 14, 20 12, 20 9" stroke="#C96B3C" strokeWidth={2.2} strokeLinecap="round" />
    <Path d="M 18 10 L 24 11" stroke="#C96B3C" strokeWidth={1.5} strokeLinecap="round" />
    <Circle cx={20} cy={6} r={2.8} fill="#C96B3C" />
  </Svg>
));
