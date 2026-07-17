import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FoodFrameWrapper } from '../../illustrations';

interface FoodImageProps {
  diameter: number;
  imageFailed: boolean;
  onImageError: () => void;
  primaryColor: string;
}

export const FoodImage: React.FC<FoodImageProps> = ({
  diameter,
  imageFailed,
  onImageError,
  primaryColor,
}) => {
  return (
    <FoodFrameWrapper diameter={diameter}>
      {!imageFailed ? (
        <Image
          source={require('../../../../../assets/splash_food.png')}
          style={styles.foodImage}
          resizeMode="cover"
          onError={onImageError}
        />
      ) : (
        <View style={[styles.fallbackPlaceholder, { borderColor: primaryColor }]}>
          <Text style={[styles.fallbackText, { color: primaryColor }]}>KOI KOI</Text>
        </View>
      )}
    </FoodFrameWrapper>
  );
};

const styles = StyleSheet.create({
  foodImage: {
    width: '100%',
    height: '100%',
  },
  fallbackPlaceholder: {
    flex: 1,
    backgroundColor: '#FCFAF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 9999,
  },
  fallbackText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
