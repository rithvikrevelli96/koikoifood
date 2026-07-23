import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;

export function cn(...styles: (StyleProp<NamedStyles> | undefined | false | null)[]): StyleProp<NamedStyles> {
  return styles.filter(Boolean) as StyleProp<NamedStyles>;
}

export function mergeClasses(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
