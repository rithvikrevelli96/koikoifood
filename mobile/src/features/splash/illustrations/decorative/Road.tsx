import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export const LandscapeIllustration = React.memo(() => (
  <Svg width="100%" height={75} viewBox="0 0 375 75" fill="none" accessibilityElementsHidden={true} importantForAccessibility="no">
    <Path
      d="M -20 62 Q 95 35, 210 57 T 400 42"
      stroke="#4B5D3A"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M -20 70 C 80 67, 140 60, 200 64 C 260 68, 310 66, 400 60"
      stroke="#4B5D3A"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <Circle cx={295} cy={22} r={10} stroke="#4B5D3A" strokeWidth={1.5} />
    <Path d="M 45 52 L 45 42" stroke="#4B5D3A" strokeWidth={1.5} />
    <Circle cx={45} cy={36} r={7} stroke="#4B5D3A" strokeWidth={1.5} fill="#FCFAF6" />

    <Path d="M 115 56 L 115 46" stroke="#4B5D3A" strokeWidth={1.5} />
    <Circle cx={115} cy={41} r={6} stroke="#4B5D3A" strokeWidth={1.5} fill="#FCFAF6" />

    <Path d="M 235 59 L 235 51" stroke="#4B5D3A" strokeWidth={1.5} />
    <Circle cx={235} cy={46} r={5} stroke="#4B5D3A" strokeWidth={1.5} fill="#FCFAF6" />
    <Rect x={76} y={42} width={14} height={10} stroke="#4B5D3A" strokeWidth={1.5} fill="#FCFAF6" />
    <Path d="M 73 42 L 83 34 L 93 42 Z" stroke="#4B5D3A" strokeWidth={1.5} strokeLinejoin="round" fill="#FCFAF6" />
    <Rect x={155} y={44} width={12} height={8} stroke="#4B5D3A" strokeWidth={1.5} fill="#FCFAF6" />
    <Path d="M 152 44 L 161 38 L 170 44 Z" stroke="#4B5D3A" strokeWidth={1.5} strokeLinejoin="round" fill="#FCFAF6" />
  </Svg>
));
