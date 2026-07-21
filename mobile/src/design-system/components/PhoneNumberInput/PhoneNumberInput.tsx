import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../../theme';
import { Country } from '../../constants/countries';
import { CountryPickerBottomSheet } from '../CountryPickerBottomSheet';

interface PhoneNumberInputProps {
  value: string;
  onChangeText: (text: string) => void;
  country: Country;
  onCountryChange: (country: Country) => void;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
}

export const PhoneNumberInput = React.memo(({
  value,
  onChangeText,
  country,
  onCountryChange,
  error,
  disabled = false,
  loading = false,
  autoFocus = false,
  editable = true,
}: PhoneNumberInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleSelectorPress = () => {
    if (!disabled && editable) {
      setIsPickerVisible(true);
    }
  };

  const hasError = !!error;
  const isInputEditable = editable && !disabled && !loading;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        MOBILE NUMBER <Text style={styles.asterisk}>*</Text>
      </Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
      >
        {/* Country Selector Button */}
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={handleSelectorPress}
          disabled={!isInputEditable}
          accessibilityRole="button"
          accessibilityLabel={`Select country code, current is ${country.name} ${country.dialCode}`}
        >
          <Text style={styles.flag} accessibilityElementsHidden={true} importantForAccessibility="no">
            {country.flag}
          </Text>
          <Text style={styles.dialCode} accessibilityElementsHidden={true} importantForAccessibility="no">
            {country.dialCode}
          </Text>
          <Text style={styles.arrow} accessibilityElementsHidden={true} importantForAccessibility="no">
            ▼
          </Text>
        </TouchableOpacity>

        {/* Vertical Divider */}
        <View style={styles.divider} />

        {/* Text Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter mobile number"
          placeholderTextColor={theme.colors.light.sub}
          keyboardType="phone-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={isInputEditable}
          autoFocus={autoFocus}
          style={[styles.input, disabled && styles.inputDisabledText]}
          accessibilityLabel="Mobile Number"
        />

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator
            size="small"
            color={theme.colors.secondary}
            style={styles.loader}
          />
        )}
      </View>

      {/* Error Message */}
      {hasError && <Text style={styles.errorText}>{error}</Text>}

      {/* Country Picker Sheet */}
      <CountryPickerBottomSheet
        visible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        onSelect={onCountryChange}
      />
    </View>
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
    borderColor: theme.colors.light.border,
  },
  inputFocused: {
    borderColor: theme.colors.secondary,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  inputDisabled: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderColor: 'rgba(0,0,0,0.05)',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingRight: theme.spacing.xs,
  },
  flag: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
  },
  dialCode: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.light.text,
    marginRight: theme.spacing.xs,
  },
  arrow: {
    fontSize: 9,
    color: theme.colors.light.muted,
    marginLeft: 2,
    opacity: 0.8,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: theme.colors.light.border,
    marginHorizontal: theme.spacing.md,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: theme.typography.bodyFamily,
    fontSize: 15,
    color: theme.colors.light.text,
  },
  inputDisabledText: {
    color: theme.colors.light.muted,
  },
  loader: {
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
