import React, { useRef } from 'react';
import { StyleSheet, View, TextInput, ViewStyle, Animated } from 'react-native';
import { theme } from '../theme';

interface OTPInputProps {
  value: string;
  onChangeText: (val: string) => void;
  length?: number;
  error?: boolean;
  containerStyle?: ViewStyle;
  shakeTrigger?: boolean;
}

export function OTPInput({
  value,
  onChangeText,
  length = 6,
  error = false,
  containerStyle,
  shakeTrigger,
}: OTPInputProps) {
  const inputsRef = useRef<TextInput[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (shakeTrigger && error) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 75, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 75, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 75, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 75, useNativeDriver: true }),
      ]).start();
    }
  }, [shakeTrigger, error]);

  const handleChange = (text: string, index: number) => {
    const nextValue = value.split('');
    nextValue[index] = text;
    const combined = nextValue.join('').slice(0, length);
    onChangeText(combined);

    // Focus next box
    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const digits = value.split('');

  return (
    <Animated.View style={[styles.container, containerStyle, { transform: [{ translateX: shakeAnim }] }]}>
      {Array.from({ length }).map((_, i) => {
        const val = digits[i] || '';
        return (
          <TextInput
            key={i}
            ref={el => {
              if (el) inputsRef.current[i] = el;
            }}
            value={val}
            onChangeText={text => handleChange(text, i)}
            onKeyPress={e => handleKeyPress(e, i)}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.digitInput,
              error && styles.digitInputError,
              !!val && styles.digitInputFilled,
            ]}
            selectTextOnFocus
            accessible={true}
            accessibilityLabel={`Digit ${i + 1}`}
          />
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: theme.spacing.lg,
  },
  digitInput: {
    width: 44,
    height: 56,
    borderRadius: 14,
    backgroundColor: theme.colors.light.input,
    borderWidth: 1.5,
    borderColor: 'transparent',
    textAlign: 'center',
    fontFamily: theme.typography.monoFamily,
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.light.text,
  },
  digitInputFilled: {
    borderColor: theme.colors.primary,
  },
  digitInputError: {
    borderColor: theme.colors.error,
  },
});
