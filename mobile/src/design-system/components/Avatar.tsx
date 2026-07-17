import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface AvatarProps {
  emoji: string;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
}

export function Avatar({
  emoji,
  onPress,
  size = 64,
  style,
}: AvatarProps) {
  const containerStyle = [
    styles.container,
    {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.colors.light.surface,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={containerStyle}
        accessible={true}
        accessibilityRole="imagebutton"
        accessibilityLabel="Change profile avatar"
      >
        <Text style={{ fontSize: size * 0.5 }}>{emoji}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle} accessible={true} accessibilityRole="image">
      <Text style={{ fontSize: size * 0.5 }}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    ...theme.shadows.card,
  },
});
