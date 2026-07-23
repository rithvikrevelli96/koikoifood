import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import { theme } from '../../theme';
import { Country, COUNTRIES } from '../../constants/countries';

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
  const selectorRef = React.useRef<any>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const handleSelectorPress = () => {
    if (!disabled && editable) {
      selectorRef.current?.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        // Fallback for some Android cases where measure might return 0
        const topPos = pageY > 0 ? pageY + height : 200; 
        const leftPos = pageX > 0 ? pageX : 20;
        setDropdownPos({ top: topPos, left: leftPos });
        setIsPickerVisible(true);
      });
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
          ref={selectorRef}
          style={styles.countrySelector}
          onPress={handleSelectorPress}
          activeOpacity={0.7}
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

      {/* Country Picker Dropdown */}
      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <TouchableOpacity 
          style={StyleSheet.absoluteFill} 
          activeOpacity={1} 
          onPress={() => setIsPickerVisible(false)}
        >
          <View style={[styles.dropdownContainer, { top: dropdownPos.top, left: dropdownPos.left }]}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
            >
              {COUNTRIES.map((item) => (
                <TouchableOpacity
                  key={item.code}
                  style={styles.dropdownItem}
                  onPress={() => {
                    onCountryChange(item);
                    setIsPickerVisible(false);
                  }}
                >
                  <Text style={styles.dropdownFlag}>{item.flag}</Text>
                  <Text style={styles.dropdownDialCode}>{item.dialCode}</Text>
                  <Text style={styles.dropdownName} numberOfLines={1}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
    width: '100%',
    zIndex: 1,
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
  dropdownContainer: {
    position: 'absolute',
    width: 260,
    maxHeight: 250,
    backgroundColor: theme.colors.light.surface,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.light.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.light.border,
  },
  dropdownFlag: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
  },
  dropdownDialCode: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.light.text,
    width: 50,
  },
  dropdownName: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: theme.colors.light.muted,
    flex: 1,
  },
});
