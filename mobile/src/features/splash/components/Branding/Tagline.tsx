import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { F } from '../../../../design-system';

interface TaglineProps {
  primaryColor: string;
  secondaryColor: string;
  taglinePart1: string;
  taglinePart2: string;
}

export const Tagline: React.FC<TaglineProps> = ({
  primaryColor,
  secondaryColor,
  taglinePart1,
  taglinePart2,
}) => {
  return (
    <View style={styles.container}>
      {/* Separator row: line - heart - line */}
      <View style={styles.separatorRow}>
        <View style={[styles.horizontalLine, { backgroundColor: primaryColor }]} />
        <Heart size={10} color={primaryColor} fill={primaryColor} />
        <View style={[styles.horizontalLine, { backgroundColor: primaryColor }]} />
      </View>

      {/* Stacked Tagline Texts */}
      <Text style={[styles.taglineMain, { color: '#1F1F1F' }]}>
        {taglinePart1.trim()}
      </Text>
      <Text style={[styles.taglineSub, { color: secondaryColor }]}>
        {taglinePart2.trim()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 12,
  },
  horizontalLine: {
    width: 32,
    height: 1.5,
    borderRadius: 9,
    opacity: 0.3,
  },
  taglineMain: {
    fontFamily: F.body,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
  },
  taglineSub: {
    fontFamily: F.body,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 2,
  },
});
