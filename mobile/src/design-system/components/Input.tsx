import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TextInputProps,
  Animated,
  ViewStyle,
  TextStyle
} from 'react-native';
import { Check } from 'lucide-react-native';
import { theme } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  success?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  shakeTrigger?: boolean;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<TextInput, InputProps>(({
  label,
  error,
  success,
  required,
  containerStyle,
  inputStyle,
  shakeTrigger,
  rightIcon,
  onFocus,
  onBlur,
  onChangeText,
  value,
  placeholder,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
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

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const hasError = !!error;

  return (
    <Animated.View style={[styles.container, containerStyle, { transform: [{ translateX: shakeAnim }] }]}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.asterisk}>*</Text>}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
          props.multiline && { height: undefined, minHeight: 120, alignItems: 'flex-start', paddingTop: theme.spacing.md, paddingBottom: theme.spacing.md }
        ]}
      >
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.light.sub}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            props.multiline && { height: undefined, textAlignVertical: 'top' },
            inputStyle
          ]}
          accessible={true}
          accessibilityLabel={label || placeholder}
          {...props}
        />
        {success && !hasError && (
          <View style={styles.successIcon}>
            <Check size={16} color={theme.colors.success} strokeWidth={3} />
          </View>
        )}
        {rightIcon && <View style={{ marginLeft: theme.spacing.sm }}>{rightIcon}</View>}
      </View>
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
    width: '100%',
  },
  label: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.light.text,
    marginBottom: theme.spacing.sm,
  },
  asterisk: {
    color: theme.colors.error,
  },
  inputContainer: {
    height: 56,
    borderRadius: theme.radius.control,
    backgroundColor: theme.colors.light.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: theme.colors.secondary,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: theme.typography.bodyFamily,
    fontSize: 15,
    color: theme.colors.light.text,
  },
  successIcon: {
    marginLeft: theme.spacing.sm,
  },
  errorText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    fontWeight: '600',
  },
});
