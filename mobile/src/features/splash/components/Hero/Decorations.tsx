import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface DecorationsProps {
  primaryColor: string;
}

export const ArrowLeftToRight: React.FC<DecorationsProps> = ({ primaryColor }) => (
  <Svg width={40} height={20} viewBox="0 0 40 20" fill="none">
    <Path d="M 5 5 C 15 15, 25 15, 35 10" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M 35 10 L 29 7 M 35 10 L 32 14" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ArrowRightToUpper: React.FC<DecorationsProps> = ({ primaryColor }) => (
  <Svg width={40} height={20} viewBox="0 0 40 20" fill="none">
    <Path d="M 35 5 C 25 15, 15 15, 5 10" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M 5 10 L 11 7 M 5 10 L 8 14" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ArrowRightToLower: React.FC<DecorationsProps> = ({ primaryColor }) => (
  <Svg width={40} height={20} viewBox="0 0 40 20" fill="none">
    <Path d="M 35 15 C 25 5, 15 5, 5 10" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M 5 10 L 11 13 M 5 10 L 8 6" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
