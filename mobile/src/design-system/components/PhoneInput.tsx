import React from 'react';
import { TextInput, ViewStyle, TextStyle } from 'react-native';
import { Input } from './Input';
import { usePhone } from '../hooks/usePhone';

interface PhoneInputProps {
  value: string;
  onChangeText: (val: string) => void;
  label?: string;
  error?: string;
  success?: boolean;
  required?: boolean;
  placeholder?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  shakeTrigger?: boolean;
  onBlur?: () => void;
}

export const PhoneInput = React.forwardRef<TextInput, PhoneInputProps>(({
  value,
  onChangeText,
  label = 'Phone Number',
  error,
  success,
  required,
  placeholder = 'XXXXX XXXXX',
  containerStyle,
  inputStyle,
  shakeTrigger,
  onBlur,
  ...props
}, ref) => {
  const { formatPhone } = usePhone();

  const handleChange = (val: string) => {
    const formatted = formatPhone(val);
    onChangeText(formatted);
  };

  return (
    <Input
      ref={ref}
      value={value}
      onChangeText={handleChange}
      label={label}
      error={error}
      success={success}
      required={required}
      placeholder={placeholder}
      containerStyle={containerStyle}
      inputStyle={inputStyle}
      shakeTrigger={shakeTrigger}
      keyboardType="phone-pad"
      maxLength={11} // 10 digits + 1 space
      onBlur={onBlur}
      {...props}
    />
  );
});
