import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { F } from '../../../../design-system';

interface WordmarkProps {
  primaryColor: string;
  secondaryColor: string;
  brandName1: string;
  brandName2: string;
}

// Custom leaf-like flanking arrows matching the mockup branding exactly
const BrandArrow = ({ color }: { color: string }) => (
  <Svg width={30} height={14} viewBox="0 0 30 14" fill="none">
    <Path d="M 28 7 L 4 7" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M 12 2 Q 4 7 12 12" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M 18 3 Q 10 7 18 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

export const Wordmark: React.FC<WordmarkProps> = ({
  primaryColor,
  secondaryColor,
  brandName1,
  brandName2,
}) => {
  return (
    <View style={styles.container}>
      {/* Title wrapper holds the cursive brand text and absolute-positioned orange leaf dot */}
      <View style={styles.titleWrapper}>
        <Text style={[styles.brandTitle, { color: primaryColor }]}>
          {brandName1}
        </Text>
        <View style={styles.leafDot}>
          <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
            <Path d="M 2 10 C 2 6, 6 2, 10 2 C 10 6, 6 10, 2 10 Z" fill="#C96B3C" />
          </Svg>
        </View>
      </View>

      <View style={styles.subtitleRow}>
        <BrandArrow color={secondaryColor} />
        <Text style={[styles.brandSubtitle, { color: secondaryColor }]}>
          {brandName2}
        </Text>
        <View style={{ transform: [{ scaleX: -1 }] }}>
          <BrandArrow color={secondaryColor} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    position: 'relative',
    alignSelf: 'center',
    paddingRight: 6, // creates spacing for the leaf dot
  },
  brandTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'serif',
    fontStyle: 'italic',
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: Platform.OS === 'ios' ? 56 : 50,
  },
  leafDot: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? -2 : 2,
    right: Platform.OS === 'ios' ? 6 : -4, // positions leaf exactly on the top right dotting the 'i'
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: Platform.OS === 'ios' ? -4 : 4,
  },
  brandSubtitle: {
    fontFamily: F.mono,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 6,
    textAlign: 'center',
    lineHeight: 28,
    marginLeft: 6,
  },
});
