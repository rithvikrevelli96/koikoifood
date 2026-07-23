import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ArrowLeft, ChevronRight, ShieldCheck } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import {
  theme,
  F,
  Text,
  Button,
  BrandLogo,
  PhoneNumberInput,
  OTPInput,
} from '../../../design-system';
import { Country } from '../../../design-system/constants/countries';
import { SocialLoginSection } from './SocialLoginSection';

import { useAppContext } from '../../../app/context';

interface AuthContentProps {
  mobileNumber: string;
  setMobileNumber: (val: string) => void;
  otpCode: string;
  setOtpCode: (val: string) => void;
  otpSent: boolean;
  setOtpSent: (val: boolean) => void;
  otpCountdown: number;
  setOtpCountdown: React.Dispatch<React.SetStateAction<number>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  touched: Record<string, boolean>;
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  btnState: 'idle' | 'loading' | 'success';
  handlePhoneChange: (val: string) => void;
  handlePhoneBlur: () => void;
  handleOtpChange: (val: string) => void;
  handleSendOtp: () => void;
  handleVerifyOtp: () => void;
  setGoogleModalVisible: (val: boolean) => void;
  setAppleModalVisible: (val: boolean) => void;
  country: Country;
  setCountry: (country: Country) => void;
}

export const AuthContent = React.memo(({
  mobileNumber,
  otpCode,
  setOtpCode,
  otpSent,
  setOtpSent,
  otpCountdown,
  setOtpCountdown,
  errors,
  setErrors,
  touched,
  btnState,
  handlePhoneChange,
  handlePhoneBlur,
  handleOtpChange,
  handleSendOtp,
  handleVerifyOtp,
  setGoogleModalVisible,
  setAppleModalVisible,
  country,
  setCountry,
}: AuthContentProps) => {
  const { go, setUser, setToast, setSubscribed } = useAppContext();

  return (
    <View style={styles.container}>
      {/* 1. Header Portion (Logo & Welcome) */}
      <View style={styles.header}>
        {/* Official Brand Logo */}
        <BrandLogo size="xl" style={styles.logo} />

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome</Text>

        {/* Brand Leaves Divider Motif */}
        <View style={styles.motifContainer}>
          <Svg width={100} height={14} viewBox="0 0 100 14" fill="none" accessibilityElementsHidden={true} importantForAccessibility="no">
            <Path d="M 5 7 L 35 7" stroke="#4B5D3A" strokeWidth={1} strokeLinecap="round" />
            <Path d="M 65 7 L 95 7" stroke="#4B5D3A" strokeWidth={1} strokeLinecap="round" />
            {/* Left Leaf */}
            <Path
              d="M 50 7 C 45 4, 43 4, 40 7 C 43 10, 45 10, 50 7 Z"
              stroke="#4B5D3A"
              strokeWidth={0.8}
              fill="#4B5D3A"
            />
            {/* Right Leaf */}
            <Path
              d="M 50 7 C 55 4, 57 4, 60 7 C 57 10, 55 10, 50 7 Z"
              stroke="#4B5D3A"
              strokeWidth={0.8}
              fill="#4B5D3A"
            />
          </Svg>
        </View>
      </View>

      {/* 2. Interactive Form Area (no card frame) */}
      <View style={styles.formArea}>
        {!otpSent ? (
          <View>
            {/* Reusable Phone Number Input with Integrated Picker */}
            <PhoneNumberInput
              value={mobileNumber}
              onChangeText={handlePhoneChange}
              country={country}
              onCountryChange={setCountry}
              error={errors.phone}
              loading={btnState === 'loading' && !otpSent}
              disabled={btnState === 'loading' || btnState === 'success'}
            />

            {/* Continue Button */}
            <Button
              title={btnState === 'success' ? '✓ Success' : 'Continue'}
              loading={btnState === 'loading' && !otpSent}
              disabled={btnState === 'loading' || btnState === 'success'}
              onPress={handleSendOtp}
              iconRight={btnState === 'idle' ? <ChevronRight size={18} color="#FFFFFF" /> : undefined}
              style={styles.submitBtn}
              accessibilityLabel="Continue to OTP verification"
            />

            {/* Divider Line */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text variant="label" color="muted" style={styles.dividerText}>
                OR
              </Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Reusable Social Login Section */}
            <SocialLoginSection
              onGooglePress={() => setGoogleModalVisible(true)}
              onApplePress={() => setAppleModalVisible(true)}
            />

            {/* Just Browse App Secondary Button */}
            <Button
              title="Just Browse App ‣"
              variant="outline"
              size="medium"
              onPress={() => {
                setUser((prev: any) => ({
                  ...prev,
                  name: 'Sophia Williams',
                  email: 'sophia@gmail.com',
                  phone: '+91 98765 43210',
                  avatar: '👩‍🍳',
                  foodPref: 'Veg',
                  height: '172',
                  weight: '68',
                  address: 'Plot 42, Hitech City Road, Madhapur, Hyderabad, Telangana - 500081',
                  addressLabel: 'Home',
                  dob: '15-08-1996',
                  gender: 'Female',
                  profileCompleted: true,
                  locationCompleted: true,
                  healthCompleted: true,
                }));
                setSubscribed(true);
                setToast('👋 Browsing as Demo Guest (Sophia Williams)');
                go('home');
              }}
              style={styles.browseBtn}
              accessibilityLabel="Just browse app as guest with demo details"
            />

            {/* Terms and Privacy Footer */}
            <Text variant="label" color="muted" style={styles.termsText}>
              By continuing, you agree to our{'\n'}
              <Text variant="label" color="secondary" style={styles.underlineText}>
                Terms of Service
              </Text>{' '}
              &{' '}
              <Text variant="label" color="secondary" style={styles.underlineText}>
                Privacy Policy
              </Text>
            </Text>
          </View>
        ) : (
          <View>
            {/* Go Back Trigger */}
            <TouchableOpacity
              onPress={() => setOtpSent(false)}
              style={styles.backTrigger}
              accessibilityRole="button"
              accessibilityLabel="Change mobile number"
            >
              <ArrowLeft size={16} color={theme.colors.light.text} />
              <Text variant="caption" color="sub" style={styles.backTriggerText}>
                Change Number
              </Text>
            </TouchableOpacity>

            {/* Title / Status */}
            <Text variant="title" color="text" style={styles.otpTitle}>
              OTP Verification
            </Text>
            <Text variant="caption" color="sub" style={styles.otpCaption}>
              We sent a 6-digit code to{' '}
              <Text variant="caption" color="secondary" style={styles.boldText}>
                {country.dialCode} {mobileNumber}
              </Text>
            </Text>

            {/* OTP Grid Input */}
            <OTPInput
              value={otpCode}
              onChangeText={handleOtpChange}
              error={!!errors.otp}
              shakeTrigger={!!errors.otp}
              containerStyle={styles.otpInputGrid}
            />

            {/* Timer and Auto-fill Row */}
            <View style={styles.timerRow}>
              {otpCountdown > 0 ? (
                <Text variant="caption" color="sub">
                  Resend code in{' '}
                  <Text variant="caption" color="secondary" style={styles.boldText}>
                    {otpCountdown}s
                  </Text>
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={() => setOtpCountdown(30)}
                  accessibilityRole="button"
                  accessibilityLabel="Resend code"
                >
                  <Text variant="caption" color="secondary" style={styles.boldText}>
                    Resend Code
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  setOtpCode('123456');
                  setErrors({});
                }}
                style={styles.autofillBtn}
                accessibilityRole="button"
                accessibilityLabel="Autofill OTP code"
              >
                <Text variant="label" color="secondary" style={styles.boldText}>
                  AUTO FILL (123456)
                </Text>
              </TouchableOpacity>
            </View>

            {/* OTP Verification Button */}
            <Button
              title={btnState === 'success' ? '✓ Success' : 'Verify & Login'}
              loading={btnState === 'loading' && otpSent}
              disabled={btnState === 'loading' || btnState === 'success'}
              onPress={handleVerifyOtp}
              iconLeft={btnState === 'idle' ? <ShieldCheck size={16} color="#FFFFFF" /> : undefined}
              style={styles.submitBtn}
              accessibilityLabel="Verify OTP code and login"
            />
          </View>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  browseBtn: {
    marginTop: theme.spacing.md,
  },
  logo: {
    marginBottom: theme.spacing.sm,
    alignSelf: 'center',
  },
  welcomeText: {
    fontFamily: 'General Sans',
    fontSize: 32,
    fontWeight: '700',
    color: '#4B5D3A', // Dark Olive Green
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  motifContainer: {
    marginTop: theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formArea: {
    width: '100%',
    paddingHorizontal: theme.spacing.md,
  },
  submitBtn: {
    marginTop: theme.spacing.md,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 1.5,
  },
  termsText: {
    marginTop: theme.spacing.xl,
    textAlign: 'center',
    lineHeight: 18,
    fontSize: 11,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  backTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: theme.spacing.md,
    alignSelf: 'flex-start',
  },
  backTriggerText: {
    fontWeight: '600',
  },
  otpTitle: {
    fontWeight: '700',
  },
  otpCaption: {
    marginTop: theme.spacing.xs,
  },
  boldText: {
    fontWeight: '700',
  },
  otpInputGrid: {
    marginTop: theme.spacing.xl,
    alignSelf: 'center',
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  autofillBtn: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 8,
    backgroundColor: theme.colors.light.surface,
  },
});
