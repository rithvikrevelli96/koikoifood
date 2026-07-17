import React from 'react';
import { TextInput, ViewStyle, TextStyle } from 'react-native';
import { Input } from './Input';

interface DateInputProps {
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

export const DateInput = React.forwardRef<TextInput, DateInputProps>(({
  value,
  onChangeText,
  label = 'Date of Birth',
  error,
  success,
  required,
  placeholder = 'DD-MM-YYYY',
  containerStyle,
  inputStyle,
  shakeTrigger,
  onBlur,
  ...props
}, ref) => {
  const handleDateChange = (val: string) => {
    // Format to DD-MM-YYYY on keystrokes
    const clean = val.replace(/[^0-9]/g, '');
    let formatted = clean;
    if (clean.length > 2 && clean.length <= 4) {
      formatted = `${clean.slice(0, 2)}-${clean.slice(2)}`;
    } else if (clean.length > 4) {
      formatted = `${clean.slice(0, 2)}-${clean.slice(2, 4)}-${clean.slice(4, 8)}`;
    }
    onChangeText(formatted);
  };

  return (
    <Input
      ref={ref}
      value={value}
      onChangeText={handleDateChange}
      label={label}
      error={error}
      success={success}
      required={required}
      placeholder={placeholder}
      containerStyle={containerStyle}
      inputStyle={inputStyle}
      shakeTrigger={shakeTrigger}
      keyboardType="number-pad"
      maxLength={10}
      onBlur={onBlur}
      {...props}
    />
  );
});
