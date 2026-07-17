import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { T } from '../constants/types';
import { theme, F } from '../../design-system';

export function PulsingDot({ color, size = 8 }: { color: string; size?: number }) {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: pulseAnim,
      }}
    />
  );
}

export function VegPill({ veg }: { veg: boolean }) {
  const vegBg = '#E8F3E6';
  const vegText = '#4B5D3A';
  const nonVegBg = '#FBE8E0';
  const nonVegText = '#C96B3C';

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: veg ? vegBg : nonVegBg,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 0,
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: veg ? vegText : nonVegText,
          marginRight: 4,
        }}
      />
      <Text
        style={{
          fontFamily: F.body,
          fontSize: 9,
          fontWeight: '800',
          color: veg ? vegText : nonVegText,
        }}
      >
        {veg ? 'VEG' : 'NON-VEG'}
      </Text>
    </View>
  );
}

export function ProgressRing({ pct, size = 64, strokeW = 4, color, label, sub, theme: appTheme }: { pct: number; size?: number; strokeW?: number; color?: string; label: string; sub?: string; theme: T }) {
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (pct / 100) * circ;
  const activeColor = color || theme.colors.secondary;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={appTheme.border}
          strokeWidth={strokeW}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={activeColor}
          strokeWidth={strokeW}
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </Svg>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontFamily: F.mono, fontSize: size * 0.22, fontWeight: '900', color: activeColor, lineHeight: size * 0.26 }}>{label}</Text>
        {sub && <Text style={{ fontFamily: F.body, fontSize: size * 0.12, color: appTheme.muted, marginTop: 1 }}>{sub}</Text>}
      </View>
    </View>
  );
}
