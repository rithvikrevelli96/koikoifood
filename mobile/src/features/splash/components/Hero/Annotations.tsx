import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Leaf, ChefHat, Heart } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { F } from '../../../../design-system';

interface AnnotationsProps {
  primaryColor: string;
  backgroundColor: string;
  diameter: number;
  freshText: string;
  dailyText: string;
  deliveredText: string;
}

// Dotted curved arrows matching final design mockup
const DottedArrowLeft = ({ color }: { color: string }) => (
  <Svg width={40} height={20} viewBox="0 0 40 20" fill="none">
    <Path
      d="M 5 5 C 15 15, 25 15, 35 10"
      stroke={color}
      strokeWidth={1.5}
      strokeDasharray="3,3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M 35 10 L 29 7 M 35 10 L 32 14"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DottedArrowRight = ({ color }: { color: string }) => (
  <Svg width={40} height={20} viewBox="0 0 40 20" fill="none">
    <Path
      d="M 35 5 C 25 15, 15 15, 5 10"
      stroke={color}
      strokeWidth={1.5}
      strokeDasharray="3,3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M 5 10 L 11 7 M 5 10 L 8 14"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const Annotations: React.FC<AnnotationsProps> = ({
  primaryColor,
  backgroundColor,
  diameter,
  freshText,
  dailyText,
  deliveredText,
}) => {
  return (
    <>
      {/* Left Callout: Leaf -> Curved Dotted Line -> Fresh Ingredients */}
      <View style={[styles.annotationLeft, { top: diameter * 0.25 }]}>
        <View style={[styles.sketchOutline, { backgroundColor }]}>
          <Leaf size={22} color={primaryColor} strokeWidth={1.8} />
        </View>
        <View style={styles.arrowSpacing}>
          <DottedArrowLeft color={primaryColor} />
        </View>
        <Text style={[styles.annotationText, { color: primaryColor }]}>
          {freshText}
        </Text>
      </View>

      {/* Right Upper Callout: Chef Hat -> Curved Dotted Line -> Daily Prepared */}
      <View style={[styles.annotationRightUpper, { top: diameter * 0.1 }]}>
        <View style={[styles.sketchOutline, { backgroundColor }]}>
          <ChefHat size={22} color={primaryColor} strokeWidth={1.8} />
        </View>
        <View style={styles.arrowSpacing}>
          <DottedArrowRight color={primaryColor} />
        </View>
        <Text style={[styles.annotationText, { color: primaryColor }]}>
          {dailyText}
        </Text>
      </View>

      {/* Right Lower Callout: Heart -> Curved Dotted Line -> Delivered With Care */}
      <View style={[styles.annotationRightLower, { bottom: diameter * 0.1 }]}>
        <View style={[styles.sketchOutline, { backgroundColor }]}>
          <Heart size={22} color={primaryColor} strokeWidth={1.8} />
        </View>
        <View style={styles.arrowSpacing}>
          <DottedArrowRight color={primaryColor} />
        </View>
        <Text style={[styles.annotationText, { color: primaryColor }]}>
          {deliveredText}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  annotationLeft: {
    position: 'absolute',
    left: 20,
    alignItems: 'center',
    width: 90,
  },
  annotationRightUpper: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    width: 90,
  },
  annotationRightLower: {
    position: 'absolute',
    right: 15,
    alignItems: 'center',
    width: 100,
  },
  sketchOutline: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(75, 93, 58, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowSpacing: {
    marginVertical: 4,
  },
  annotationText: {
    fontFamily: F.body,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },
});
