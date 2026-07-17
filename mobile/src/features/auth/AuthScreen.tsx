import React from 'react';
import { View, Text, Platform, TextInput, TouchableOpacity, Animated, Modal as RNModal, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Package, ChevronRight, ShieldCheck, ArrowLeft, Check } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { useAppContext } from '../../app/context';
import { GoogleLogoSvg, AppleLogoSvg } from '../../core/components/SvgIcons';
import {
  theme,
  LIGHT,
  DARK,
  B,
  F,
  Input,
  PhoneInput,
  OTPInput,
  Button
} from '../../design-system';

export default function AuthScreen() {
  const {
    mobileNumber,
    setMobileNumber,
    otpCode,
    setOtpCode,
    otpSent,
    setOtpSent,
    otpCountdown,
    setOtpCountdown,
    setToast,
    setUser,
    go,
    authFade,
    authSlideY,
  } = useAppContext();

  // Local validation and interaction states
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [btnState, setBtnState] = React.useState<'idle' | 'loading' | 'success'>('idle');

  // Modals for Google & Apple Sign-In Simulator
  const [googleModalVisible, setGoogleModalVisible] = React.useState(false);
  const [appleModalVisible, setAppleModalVisible] = React.useState(false);

  // Custom email for Google Sign-In "use another account"
  const [customEmail, setCustomEmail] = React.useState('');
  const [showCustomEmailInput, setShowCustomEmailInput] = React.useState(false);
  const [customEmailError, setCustomEmailError] = React.useState('');

  // Shake animation values
  const phoneShake = React.useRef(new Animated.Value(0)).current;
  const otpShake = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    authFade.setValue(0);
    authSlideY.setValue(45);

    Animated.parallel([
      Animated.timing(authFade, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.spring(authSlideY, {
        toValue: 0,
        friction: 7,
        tension: 35,
        useNativeDriver: true,
      })
    ]).start();
  }, [otpSent]);

  React.useEffect(() => {
    if (otpSent && otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpSent, otpCountdown]);

  const triggerShake = (shakeVal: Animated.Value) => {
    Animated.sequence([
      Animated.timing(shakeVal, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeVal, { toValue: -10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeVal, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeVal, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const formatPhone = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    if (clean.length > 5) {
      return `${clean.slice(0, 5)} ${clean.slice(5, 10)}`;
    }
    return clean;
  };

  const handlePhoneChange = (val: string) => {
    const formatted = formatPhone(val);
    setMobileNumber(formatted);
    const clean = val.replace(/[^0-9]/g, '');

    if (touched['phone']) {
      if (clean.length !== 10) {
        setErrors(prev => ({ ...prev, phone: '❌ Please enter a valid 10-digit number.' }));
      } else {
        setErrors(prev => {
          const copy = { ...prev };
          delete copy.phone;
          return copy;
        });
      }
    }
  };

  const handlePhoneBlur = () => {
    setTouched(prev => ({ ...prev, phone: true }));
    const clean = mobileNumber.replace(/[^0-9]/g, '');
    if (clean.length !== 10) {
      setErrors(prev => ({ ...prev, phone: '❌ Please enter a valid 10-digit number.' }));
    } else {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.phone;
        return copy;
      });
    }
  };

  const handleOtpChange = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    setOtpCode(clean);

    if (touched['otp']) {
      if (clean.length !== 6) {
        setErrors(prev => ({ ...prev, otp: '❌ OTP must be a 6-digit code.' }));
      } else {
        setErrors(prev => {
          const copy = { ...prev };
          delete copy.otp;
          return copy;
        });
      }
    }
  };

  const handleOtpBlur = () => {
    setTouched(prev => ({ ...prev, otp: true }));
    if (otpCode.length !== 6) {
      setErrors(prev => ({ ...prev, otp: '❌ OTP must be a 6-digit code.' }));
    } else {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.otp;
        return copy;
      });
    }
  };

  const handleSendOtp = () => {
    setTouched(prev => ({ ...prev, phone: true }));
    const clean = mobileNumber.replace(/[^0-9]/g, '');
    if (clean.length !== 10) {
      setErrors(prev => ({ ...prev, phone: '❌ Please enter a valid 10-digit number.' }));
      triggerShake(phoneShake);
      return;
    }

    setBtnState('loading');
    setTimeout(() => {
      setBtnState('success');
      setTimeout(() => {
        setOtpSent(true);
        setOtpCountdown(30);
        setBtnState('idle');
      }, 500);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    setTouched(prev => ({ ...prev, otp: true }));
    if (otpCode.length !== 6) {
      setErrors(prev => ({ ...prev, otp: '❌ OTP must be a 6-digit code.' }));
      triggerShake(otpShake);
      return;
    }

    if (otpCode !== '123456') {
      setErrors(prev => ({ ...prev, otp: '❌ Incorrect OTP. Try 123456.' }));
      triggerShake(otpShake);
      return;
    }

    setBtnState('loading');
    setTimeout(() => {
      setBtnState('success');
      setTimeout(() => {
        setToast('Verification Successful!');
        const cleanPhone = mobileNumber.replace(/[^0-9]/g, '');
        const REGISTERED_NUMBERS = ['9876543210', '9999999999', '9000000000', '8888888888'];
        if (REGISTERED_NUMBERS.includes(cleanPhone)) {
          setUser((prev: any) => ({
            ...prev,
            phone: '+91 ' + cleanPhone,
            name: 'Bhargav',
            email: 'bhargav@koikoi.in',
            address: 'Plot 42, Jubilee Hills',
            height: '178',
            weight: '74',
            goal: 'Healthy Living',
          }));
          go('home');
        } else {
          setUser((prev: any) => ({ 
            ...prev, 
            phone: '+91 ' + cleanPhone,
            name: '',
            email: '',
            address: '',
            height: '',
            weight: '',
          }));
          go('setup1');
        }
        setBtnState('idle');
      }, 500);
    }, 1200);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF9', alignItems: 'center', justifyContent: 'center' }}>
      <LinearGradient
        colors={['#FED6B3', '#FFFDF9', '#FFF1E5']}
        locations={[0, 0.45, 1.0]}
        style={{ width: '100%', height: '100%', flex: 1 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
          
          {/* Optional Demo Top Header */}
          <View style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 50 : 20,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderWidth: 1.5,
            borderColor: '#FFEEDB',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 10,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            shadowColor: '#A05020',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 6,
            elevation: 3,
            zIndex: 100
          }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#DF7E2C' }} />
            <Text style={{ fontSize: 11, fontWeight: '900', color: '#13352C', letterSpacing: 0.5 }}>
              DEMO SIMULATOR & TESTING SUITE
            </Text>
          </View>

          <Animated.View style={{ 
            width: '100%',
            opacity: authFade,
            transform: [{ translateY: authSlideY }]
          }}>
            {!otpSent ? (
              <View style={{ alignItems: 'center' }}>
                <View style={{
                  width: 64,
                  height: 64,
                  borderRadius: 22,
                  backgroundColor: '#DF7E2C',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                  shadowColor: '#DF7E2C',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                }}>
                  <Package size={32} color="#FFFFFF" />
                </View>

                <Text style={{ fontSize: 24, fontWeight: '900', color: '#13352C', textAlign: 'center', lineHeight: 28 }}>
                  Welcome to <Text style={{ color: '#DF7E2C' }}>KOI KOI{'\n'}DABBA</Text>
                </Text>
                <Text style={{ fontSize: 13, color: '#5A6A64', marginTop: 8, textAlign: 'center', lineHeight: 18 }}>
                  Taste the comfort of pure home-cooked goodness
                </Text>

                <PhoneInput
                  label="MOBILE NUMBER"
                  required
                  value={mobileNumber}
                  onChangeText={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  placeholder="Enter 10-digit number"
                  error={errors.phone}
                  success={touched.phone && !errors.phone && mobileNumber.replace(/[^0-9]/g, '').length === 10}
                  shakeTrigger={!!errors.phone}
                  containerStyle={{ width: '100%', marginTop: 24 }}
                />

                <TouchableOpacity 
                  disabled={btnState !== 'idle'}
                  style={{
                    width: '100%',
                    height: 56,
                    borderRadius: 28,
                    marginTop: 20,
                    overflow: 'hidden',
                    shadowColor: '#DF7E2C',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 5,
                    opacity: btnState !== 'idle' ? 0.9 : 1,
                  }} 
                  onPress={handleSendOtp}
                >
                  <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                    {btnState === 'loading' ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <ActivityIndicator color="#FFFFFF" size="small" />
                        <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>Loading...</Text>
                      </View>
                    ) : btnState === 'success' ? (
                      <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>✓ Success</Text>
                    ) : (
                      <>
                        <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>Continue</Text>
                        <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.5} />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: '900', color: '#90A09A', marginVertical: 20, letterSpacing: 1.5 }}>
                  OR
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, width: '100%', marginTop: 8 }}>
                  <TouchableOpacity 
                    onPress={() => setGoogleModalVisible(true)}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 22,
                      borderWidth: 1.5,
                      borderColor: '#FFEEDB',
                      backgroundColor: '#FFFFFF',
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#A05020',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.08,
                      shadowRadius: 8,
                      elevation: 2
                    }}
                  >
                    <GoogleLogoSvg />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => setAppleModalVisible(true)}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 22,
                      borderWidth: 1.5,
                      borderColor: '#FFEEDB',
                      backgroundColor: '#FFFFFF',
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#A05020',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.08,
                      shadowRadius: 8,
                      elevation: 2
                    }}
                  >
                    <AppleLogoSvg />
                  </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 10, color: '#7A8A83', marginTop: 24, textAlign: 'center', lineHeight: 14 }}>
                  By continuing, you agree to our{'\n'}
                  <Text style={{ textDecorationLine: 'underline', color: '#DF7E2C' }}>Terms of Service</Text> & <Text style={{ textDecorationLine: 'underline', color: '#DF7E2C' }}>Privacy Policy</Text>
                </Text>
              </View>
            ) : (
              <View>
                <TouchableOpacity onPress={() => setOtpSent(false)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                  <ArrowLeft size={16} color="#13352C" />
                  <Text style={{ fontSize: 13, color: '#5A6A64', fontWeight: '600' }}>Change Number</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 24, fontWeight: '900', color: '#13352C' }}>OTP Verification *</Text>
                <Text style={{ fontSize: 13, color: '#5A6A64', marginTop: 8 }}>
                  We sent a 6-digit code to <Text style={{ color: '#DF7E2C', fontWeight: 'bold' }}>+91 {mobileNumber}</Text>
                </Text>

                <OTPInput
                  value={otpCode}
                  onChangeText={handleOtpChange}
                  error={!!errors.otp}
                  shakeTrigger={!!errors.otp}
                  containerStyle={{ marginTop: 24, alignSelf: 'center' }}
                />
                {errors.otp ? (
                  <Text style={{ color: '#DC2626', fontSize: 12, marginTop: 4, marginLeft: 4, fontWeight: '600' }}>{errors.otp}</Text>
                ) : null}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  {otpCountdown > 0 ? (
                    <Text style={{ fontSize: 11, color: '#5A6A64' }}>
                      Resend code in <Text style={{ color: '#DF7E2C', fontWeight: 'bold' }}>{otpCountdown}s</Text>
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={() => setOtpCountdown(30)}>
                      <Text style={{ fontSize: 11, color: '#DF7E2C', fontWeight: 'bold' }}>Resend Code</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => { setOtpCode('123456'); setErrors({}); }} style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: '#FFF4EC' }}>
                    <Text style={{ fontSize: 9, color: '#DF7E2C', fontWeight: 'bold' }}>AUTO FILL (123456)</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  disabled={btnState !== 'idle'}
                  style={{
                    width: '100%',
                    height: 56,
                    borderRadius: 28,
                    marginTop: 20,
                    overflow: 'hidden',
                    shadowColor: '#DF7E2C',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 5,
                    opacity: btnState !== 'idle' ? 0.9 : 1,
                  }} 
                  onPress={handleVerifyOtp}
                >
                  <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                    {btnState === 'loading' ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <ActivityIndicator color="#FFFFFF" size="small" />
                        <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>Loading...</Text>
                      </View>
                    ) : btnState === 'success' ? (
                      <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>✓ Success</Text>
                    ) : (
                      <>
                        <ShieldCheck size={16} color="#FFFFFF" />
                        <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>Verify & Login</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>
      </LinearGradient>

      {/* Google Sign-In Simulator Bottom Sheet */}
      <RNModal
        visible={googleModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setGoogleModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            padding: 24,
            maxHeight: '85%',
          }}>
            <View style={{ width: 44, height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, alignSelf: 'center', marginBottom: 16 }} />

            {/* Google Logo / Header */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                <GoogleLogoSvg />
              </View>
              <Text style={{ fontSize: 18, fontWeight: '800', color: '#1E293B', textAlign: 'center' }}>Choose an account</Text>
              <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>to continue to Koi Koi Dabba</Text>
            </View>

            {/* Account Picker Choices */}
            {!showCustomEmailInput ? (
              <View style={{ gap: 12 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: '#E2E8F0',
                    backgroundColor: '#F8FAFC',
                  }}
                  onPress={() => {
                    setGoogleModalVisible(false);
                    setToast('Signed in as bhargav@koikoi.in');
                    setUser((prev: any) => ({
                      ...prev,
                      phone: '+91 9876543210',
                      name: 'Bhargav',
                      email: 'bhargav@koikoi.in',
                      address: 'Plot 42, Jubilee Hills',
                      height: '178',
                      weight: '74',
                      goal: 'Healthy Living',
                    }));
                    go('home');
                  }}
                >
                  <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: '#DF7E2C', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>B</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: '#1E293B' }}>Bhargav</Text>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>bhargav@koikoi.in</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: '#E2E8F0',
                    backgroundColor: '#F8FAFC',
                  }}
                  onPress={() => {
                    setGoogleModalVisible(false);
                    setToast('Signed in as rithvik@gmail.com');
                    setUser((prev: any) => ({
                      ...prev,
                      phone: '',
                      name: 'Rithvik Revelli',
                      email: 'rithvik@gmail.com',
                      address: '',
                      height: '',
                      weight: '',
                    }));
                    go('setup1');
                  }}
                >
                  <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: '#3BA76A', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>R</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: '#1E293B' }}>Rithvik Revelli</Text>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>rithvik@gmail.com</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: '#E2E8F0',
                    backgroundColor: '#F8FAFC',
                    justifyContent: 'center',
                  }}
                  onPress={() => setShowCustomEmailInput(true)}
                >
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#DF7E2C' }}>+ Use another account</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#1E293B', marginBottom: 8 }}>Email Address</Text>
                <TextInput
                  style={{
                    height: 52,
                    borderRadius: 14,
                    borderWidth: 1.5,
                    borderColor: customEmailError ? '#EF4444' : '#E2E8F0',
                    paddingHorizontal: 16,
                    fontSize: 14,
                    color: '#1E293B',
                    backgroundColor: '#F8FAFC',
                    marginBottom: 4,
                  }}
                  value={customEmail}
                  onChangeText={(text) => {
                    setCustomEmail(text);
                    setCustomEmailError('');
                  }}
                  placeholder="name@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {customEmailError ? (
                  <Text style={{ fontSize: 12, color: '#DC2626', marginTop: 4, marginBottom: 12 }}>{customEmailError}</Text>
                ) : null}

                <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
                  <TouchableOpacity
                    style={{ flex: 1, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                      setShowCustomEmailInput(false);
                      setCustomEmail('');
                      setCustomEmailError('');
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#475569' }}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1, height: 48, borderRadius: 24, backgroundColor: '#DF7E2C', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                      const emailRegex = /\S+@\S+\.\S+/;
                      if (!emailRegex.test(customEmail.trim())) {
                        setCustomEmailError('❌ Please enter a valid email address.');
                        return;
                      }
                      setGoogleModalVisible(false);
                      setToast(`Signed in as ${customEmail}`);
                      setUser((prev: any) => ({
                        ...prev,
                        phone: '',
                        name: customEmail.split('@')[0],
                        email: customEmail.trim(),
                        address: '',
                        height: '',
                        weight: '',
                      }));
                      go('setup1');
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF' }}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Error simulation badges */}
            {!showCustomEmailInput && (
              <View style={{ borderTopWidth: 1, borderColor: '#F1F5F9', marginTop: 24, paddingTop: 16 }}>
                <Text style={{ fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1, marginBottom: 10, textAlign: 'center' }}>SIMULATE ERROR STATES</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TouchableOpacity
                    style={{ flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: '#FEF2F2', borderWidth: 1.3, borderColor: '#FCA5A5', alignItems: 'center' }}
                    onPress={() => {
                      setGoogleModalVisible(false);
                      setToast('❌ Authentication failed. Try again.');
                    }}
                  >
                    <Text style={{ fontSize: 10, color: '#B91C1C', fontWeight: '800' }}>Auth Failed</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: '#FEF2F2', borderWidth: 1.3, borderColor: '#FCA5A5', alignItems: 'center' }}
                    onPress={() => {
                      setGoogleModalVisible(false);
                      setToast('❌ No internet connection.');
                    }}
                  >
                    <Text style={{ fontSize: 10, color: '#B91C1C', fontWeight: '800' }}>No Internet</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {!showCustomEmailInput && (
              <TouchableOpacity
                style={{ marginTop: 16, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setGoogleModalVisible(false)}
              >
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#475569' }}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </RNModal>

      {/* Apple Sign-In Simulator Bottom Sheet */}
      <RNModal
        visible={appleModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAppleModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: 24,
            width: '100%',
            maxWidth: 320,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 15,
            elevation: 10,
          }}>
            {/* White Apple Icon inside black circle */}
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
              {/* Custom SVG Path for Apple Logo in White */}
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="#FFFFFF">
                <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.1.08.21.12.28.12.9 0 2.03-.65 2.53-1.45" />
              </Svg>
            </View>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#1B1B1B', textAlign: 'center', marginBottom: 8 }}>Sign in with Apple ID</Text>
            <Text style={{ fontSize: 13, color: '#7A7A7A', textAlign: 'center', marginBottom: 24, lineHeight: 18 }}>
              Sign in to Koi Koi Dabba using your Apple ID <Text style={{ fontWeight: 'bold', color: '#1B1B1B' }}>amrita.sen@icloud.com</Text>.
            </Text>

            <View style={{ width: '100%', gap: 10 }}>
              <TouchableOpacity
                style={{ height: 50, borderRadius: 25, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  setAppleModalVisible(false);
                  setToast('Signed in with Apple ID');
                  setUser((prev: any) => ({
                    ...prev,
                    phone: '',
                    name: 'Amrita Sen',
                    email: 'amrita.sen@icloud.com',
                    address: '',
                    height: '',
                    weight: '',
                  }));
                  go('setup1');
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 14.5, fontWeight: '800' }}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 50, borderRadius: 25, borderWidth: 1.5, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setAppleModalVisible(false)}
              >
                <Text style={{ color: '#475569', fontSize: 14.5, fontWeight: '800' }}>Cancel</Text>
              </TouchableOpacity>

              {/* Apple fail simulation */}
              <TouchableOpacity
                style={{ height: 40, borderRadius: 20, backgroundColor: '#FEF2F2', borderStyle: 'dashed', borderWidth: 1, borderColor: '#FCA5A5', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
                onPress={() => {
                  setAppleModalVisible(false);
                  setToast('❌ Sign-in failed. Apple service error.');
                }}
              >
                <Text style={{ color: '#B91C1C', fontSize: 11, fontWeight: '800' }}>Simulate Apple Fail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RNModal>
    </View>
  );
}
